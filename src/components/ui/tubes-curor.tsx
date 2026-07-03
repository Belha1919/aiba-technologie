"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal shape of the instance returned by the threejs-components "tubes" cursor.
 * The library ships no types, so we describe only what we use.
 */
type TubesApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose?: () => void;
};

type TubesInit = (
  canvas: HTMLCanvasElement,
  options: {
    tubes: {
      colors: string[];
      lights: { intensity: number; colors: string[] };
    };
  }
) => TubesApp;

// Module-level defaults → stable references so the effect doesn't re-init each render.
const DEFAULT_TUBE_COLORS = ["#1e9bf0", "#7c2db5", "#c01a9c"];
const DEFAULT_LIGHT_COLORS = ["#1e9bf0", "#7c2db5", "#c01a9c", "#2a0a6b"];

/** Generates `count` random hex color strings. */
function randomColors(count: number): string[] {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
}

export type TubesCursorProps = {
  /** Tube gradient colors. */
  colors?: string[];
  /** Point-light colors. */
  lightColors?: string[];
  /** Recolor the tubes/lights on click anywhere (default: true). */
  recolorOnClick?: boolean;
  /**
   * Wrapper className. The library sizes the canvas to its PARENT element,
   * so this wrapper must be viewport-sized (default: a non-blocking top overlay).
   */
  className?: string;
};

/**
 * WebGL "tubes" cursor effect that follows the pointer.
 *
 * Rendered as a fixed, pointer-events-none, screen-blended overlay so it layers
 * over existing content without blocking interaction. The three.js runtime is
 * loaded from a CDN at runtime (bundler ignores the remote import).
 *
 * Automatically disabled on touch devices and when the user prefers reduced motion.
 */
export default function TubesCursor({
  colors = DEFAULT_TUBE_COLORS,
  lightColors = DEFAULT_LIGHT_COLORS,
  recolorOnClick = true,
  className = "pointer-events-none fixed inset-0 z-[60] mix-blend-screen",
}: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);

  useEffect(() => {
    // Skip the effect on touch devices or when reduced motion is requested.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // Perf: cap the WebGL render resolution. The library renders at the full
    // device pixel ratio (2× on Retina = 4× the pixels). Capping to 1.5× cuts
    // GPU work ~45% with a negligible change to the soft, glowing tubes.
    const DPR_CAP = 1.5;
    const realDPR = window.devicePixelRatio;
    const dprDesc = Object.getOwnPropertyDescriptor(window, "devicePixelRatio");
    let dprPatched = false;
    if (realDPR > DPR_CAP) {
      try {
        Object.defineProperty(window, "devicePixelRatio", {
          configurable: true,
          get: () => DPR_CAP,
        });
        dprPatched = true;
      } catch {
        dprPatched = false;
      }
    }

    // Delay init so the canvas has real dimensions before geometry is computed.
    const initTimer = setTimeout(() => {
      import(
        /* webpackIgnore: true */
        /* turbopackIgnore: true */
        // @ts-expect-error — remote ESM module loaded at runtime, no type declarations
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      )
        .then((module: { default: TubesInit }) => {
          if (!canvasRef.current) return;
          appRef.current = module.default(canvasRef.current, {
            tubes: {
              colors,
              lights: { intensity: 120, colors: lightColors },
            },
          });
        })
        .catch((err) =>
          console.error("Failed to load TubesCursor module:", err)
        );
    }, 100);

    const onClick = () => {
      const app = appRef.current;
      if (!app) return;
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    };
    if (recolorOnClick) window.addEventListener("click", onClick);

    return () => {
      clearTimeout(initTimer);
      if (recolorOnClick) window.removeEventListener("click", onClick);
      if (appRef.current && typeof appRef.current.dispose === "function") {
        appRef.current.dispose();
        appRef.current = null;
      }
      if (dprPatched) {
        try {
          if (dprDesc) {
            Object.defineProperty(window, "devicePixelRatio", dprDesc);
          } else {
            Object.defineProperty(window, "devicePixelRatio", {
              configurable: true,
              get: () => realDPR,
            });
          }
        } catch {
          /* ignore — restoring is best-effort */
        }
      }
    };
  }, [colors, lightColors, recolorOnClick]);

  // The canvas is wrapped so the library measures the VIEWPORT-sized wrapper
  // (parentNode), not <body> whose height is the whole scrolling page.
  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
