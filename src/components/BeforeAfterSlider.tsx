"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

/**
 * Face anchor — describes where the face is in the original image.
 * Used for auto-alignment: the component computes scale + translate
 * so that the face lands at a consistent position and size in the
 * slider container, regardless of how each photo was framed.
 *
 * Measure values by looking at the raw image:
 *   - `y`: vertical center of face (between eyes and chin), in % of image height
 *   - `h`: face height from forehead to chin tip, in % of image height
 *   - `x`: horizontal center of face, in % of image width (default 50)
 *   - `zoom`: per-pair scale multiplier (default 1). Use < 1 to make both
 *     faces in the pair smaller while keeping them aligned. Apply the
 *     SAME `zoom` value to before and after of a pair.
 */
export type FaceAnchor = {
  x?: number;
  y: number;
  h: number;
  zoom?: number;
};

export type ImageAdjust = {
  /** Use face anchor for automatic alignment (preferred) */
  face?: FaceAnchor;
  /** Manual override of computed scale */
  scale?: number;
  /** Manual override of computed translateX */
  offsetX?: string;
  /** Manual override of computed translateY */
  offsetY?: string;
  /** Transform origin (default "center center") */
  origin?: string;
};

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeAdjust?: ImageAdjust;
  afterAdjust?: ImageAdjust;
  caseLabel?: string;
}

// All faces converge to this point/size inside the slider container.
const TARGET_FACE_Y = 45; // % from top of container (slightly above center)
const TARGET_FACE_HEIGHT = 65; // % of container height
const TARGET_FACE_X = 50;

function computeTransform(adjust?: ImageAdjust): {
  transform: string;
  transformOrigin: string;
} {
  let scale: number;
  let offsetX: string;
  let offsetY: string;

  if (adjust?.face) {
    const { face } = adjust;
    const faceX = face.x ?? 50;
    const zoom = face.zoom ?? 1;
    // final scale = base scale to hit TARGET_FACE_HEIGHT × per-pair zoom
    const computedScale = (TARGET_FACE_HEIGHT / face.h) * zoom;
    // offset computed off the FINAL scale so the face center still
    // lands at (TARGET_FACE_X, TARGET_FACE_Y) regardless of zoom
    const computedOffsetX = computedScale * (TARGET_FACE_X - faceX);
    const computedOffsetY = computedScale * (TARGET_FACE_Y - face.y);

    scale = adjust.scale ?? computedScale;
    offsetX = adjust.offsetX ?? `${computedOffsetX}%`;
    offsetY = adjust.offsetY ?? `${computedOffsetY}%`;
  } else {
    scale = adjust?.scale ?? 1;
    offsetX = adjust?.offsetX ?? "0%";
    offsetY = adjust?.offsetY ?? "0%";
  }

  return {
    transform: `translate(${offsetX}, ${offsetY}) scale(${scale})`,
    transformOrigin: adjust?.origin ?? "center center",
  };
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeAdjust,
  afterAdjust,
  caseLabel,
}: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
    setPos(p);
  }, []);

  const beforeStyle = computeTransform(beforeAdjust);
  const afterStyle = computeTransform(afterAdjust);

  const imgProps = {
    fill: true,
    draggable: false as const,
    sizes: "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw",
    className: "object-cover select-none",
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-[14px] bg-surface-warm select-none touch-none cursor-ew-resize"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* BEFORE — full frame underneath */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={beforeStyle}
      >
        <Image src={beforeSrc} alt={beforeAlt} {...imgProps} />
      </div>

      {/* AFTER — clipped from left edge to slider position */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <div className="absolute inset-0" style={afterStyle}>
          <Image src={afterSrc} alt={afterAlt} {...imgProps} />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-2.5 left-2.5 text-[9px] font-bold text-white tracking-[0.08em] bg-black/45 backdrop-blur px-2 py-0.5 rounded pointer-events-none">
        BEFORE
      </span>
      <span className="absolute top-2.5 right-2.5 text-[9px] font-bold text-white tracking-[0.08em] bg-primary/90 backdrop-blur px-2 py-0.5 rounded pointer-events-none">
        AFTER
      </span>

      {caseLabel && (
        <span className="absolute bottom-2.5 left-2.5 text-[9px] font-bold text-white tracking-[0.08em] bg-black/45 backdrop-blur px-2 py-0.5 rounded pointer-events-none">
          {caseLabel}
        </span>
      )}

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none"
        style={{
          left: `calc(${pos}% - 1px)`,
          boxShadow: "0 0 10px rgba(0,0,0,0.35)",
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            className="text-primary"
          >
            <path
              d="M7.5 6 L3.5 10 L7.5 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 6 L16.5 10 L12.5 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
