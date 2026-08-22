import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  /** Optional image URLs. When omitted, a labeled placeholder panel is shown. */
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Aspect ratio, e.g. "4 / 3" or "16 / 10". */
  ratio?: string;
  className?: string;
};

/**
 * Draggable comparison slider. Drag the handle, or focus it and use the
 * left/right arrow keys. Falls back to labeled placeholder panels until the
 * real before/after screenshots are dropped in.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Listing before the rebuild",
  afterAlt = "Listing after the rebuild",
  beforeLabel = "Before",
  afterLabel = "After",
  ratio = "4 / 3",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, setFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  const Panel = ({
    src,
    alt,
    label,
    variant,
  }: {
    src?: string;
    alt: string;
    label: string;
    variant: "before" | "after";
  }) => (
    <div className="absolute inset-0 h-full w-full select-none">
      {src ? (
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-2 ${
            variant === "before"
              ? "bg-secondary/90 text-secondary-foreground"
              : "bg-primary/10 text-foreground"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
            {variant === "before" ? "Placeholder image" : "Placeholder image"}
          </span>
          <span className="px-6 text-center font-display text-sm font-medium opacity-80">
            {variant === "before"
              ? "Drop the original Amazon listing here"
              : "Drop the rebuilt Amazon listing here"}
          </span>
        </div>
      )}
      <span
        className={`pointer-events-none absolute top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
          variant === "before"
            ? "left-3 bg-foreground/80 text-background"
            : "right-3 bg-primary text-primary-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* After (full, underneath) */}
      <Panel src={afterSrc} alt={afterAlt} label={afterLabel} variant="after" />

      {/* Before (clipped from the left) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="h-full"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
        >
          <Panel src={beforeSrc} alt={beforeAlt} label={beforeLabel} variant="before" />
        </div>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.15)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare the before and after listing"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-lg outline-none transition-shadow duration-200 focus-visible:ring-4 focus-visible:ring-primary/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 7L4 12l5 5M15 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
