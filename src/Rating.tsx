"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export interface IRating {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
  className?: string;
  showLabel?: boolean;
  filledColor?: string;
  emptyColor?: string;
  halfColor?: string;
  allowHalf?: boolean;
}

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
  className = "",
  showLabel = false,
  filledColor = "#F59E0B",
  emptyColor = "#CBD5E1",
  halfColor = "#F59E0B",
  allowHalf = true,
}: IRating) {
  const isControlled = typeof value === "number";
  const [internal, setInternal] = useState<number>(() => {
    const init = isControlled ? (value as number) : defaultValue;
    return clamp(init, 0, max);
  });

  const [hover, setHover] = useState<number | null>(null);

  const displayValue = clamp(
    isControlled ? (value as number) : internal,
    0,
    max
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isControlled) {
      setInternal(clamp(value as number, 0, max));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, max]);

  const setValue = useCallback(
    (v: number) => {
      const clamped = clamp(v, 0, max);
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
    },
    [isControlled, max, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (readOnly) return;

      const key = e.key;
      let newVal = displayValue;

      if (key === "ArrowRight" || key === "ArrowUp") {
        e.preventDefault();
        newVal = clamp(displayValue + (allowHalf ? 0.5 : 1), 0, max);
        setValue(newVal);
      } else if (key === "ArrowLeft" || key === "ArrowDown") {
        e.preventDefault();
        newVal = clamp(displayValue - (allowHalf ? 0.5 : 1), 0, max);
        setValue(newVal);
      } else if (key === "Home") {
        e.preventDefault();
        setValue(0);
      } else if (key === "End") {
        e.preventDefault();
        setValue(max);
      } else if (key === " " || key === "Enter") {
        e.preventDefault();
        if (hover !== null) setValue(hover);
      }
    },
    [displayValue, hover, max, readOnly, setValue, allowHalf]
  );

  const stars = useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max]
  );

  const renderIcon = (star: number) => {
    const effectiveValue = hover ?? displayValue;
    if (effectiveValue >= star) {
      return (
        <AiFillStar size={size} aria-hidden style={{ color: filledColor }} />
      );
    }
    if (allowHalf && effectiveValue + 0.5 >= star) {
      return (
        <BsStarHalf size={size} aria-hidden style={{ color: halfColor }} />
      );
    }
    return (
      <AiOutlineStar size={size} aria-hidden style={{ color: emptyColor }} />
    );
  };

  const handleClick = (star: number, e: React.MouseEvent) => {
    if (readOnly) return;

    if (allowHalf) {
      const { left, width } = (
        e.currentTarget as HTMLButtonElement
      ).getBoundingClientRect();
      const clickX = e.clientX - left;
      if (clickX < width / 2) {
        setValue(star - 0.5);
        return;
      }
    }
    setValue(star);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label="Star rating"
        tabIndex={readOnly ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHover(null)}
        className={`inline-flex items-center select-none ${
          readOnly ? "opacity-75" : "cursor-pointer"
        }`}
      >
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={displayValue === star}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            onMouseEnter={() => !readOnly && setHover(star)}
            onFocus={() => !readOnly && setHover(star)}
            onBlur={() => !readOnly && setHover(null)}
            onClick={(e) => handleClick(star, e)}
            className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 transition-transform transform hover:scale-110 active:scale-95 ${
              readOnly ? "pointer-events-none" : ""
            }`}
            style={{
              lineHeight: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
            }}
          >
            {renderIcon(star)}
          </button>
        ))}
      </div>

      {showLabel && (
        <div className="text-sm text-slate-600">
          {displayValue} / {max}
        </div>
      )}
    </div>
  );
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
