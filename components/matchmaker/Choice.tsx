"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";

type BaseProps = {
  name: string;
  value: string;
  checked: boolean;
  /** viaPointer is true for mouse and touch, false for keyboard. Used for gentle auto-advance. */
  onChange: (value: string, viaPointer: boolean) => void;
  children: ReactNode;
  className?: string;
};

/**
 * Native radio or checkbox, visually hidden, wrapped in a styled label.
 * Keeps arrow-key and space behavior for free.
 */
function ChoiceInput({ type, name, value, checked, onChange, children, className = "" }: BaseProps & { type: "radio" | "checkbox" }) {
  return (
    <label
      className={`group relative block cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-terracotta ${className}`}
      data-checked={checked || undefined}
      onClick={(e) => {
        // Label clicks re-dispatch to the input. Record the pointer origin first,
        // and ignore the forwarded click that lands on the input itself.
        if (e.target instanceof HTMLInputElement) return;
        (e.currentTarget as HTMLElement).dataset.pointer = e.detail > 0 ? "1" : "0";
      }}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          const label = e.currentTarget.closest("label") as HTMLElement | null;
          onChange(value, label?.dataset.pointer === "1");
          if (label) label.dataset.pointer = "0";
        }}
        className="peer sr-only"
      />
      {children}
    </label>
  );
}

export function RadioTile(props: BaseProps) {
  return <ChoiceInput type="radio" {...props} />;
}

export function CheckTile(props: BaseProps) {
  return <ChoiceInput type="checkbox" {...props} />;
}

/** Pill chip for short options. */
export function Chip({ type = "radio", ...props }: BaseProps & { type?: "radio" | "checkbox" }) {
  return (
    <ChoiceInput type={type} {...props}>
      <span
        className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors duration-300 ${
          props.checked ? "border-ink bg-ink text-sand" : "border-ink/20 bg-paper text-ink hover:border-ink/60"
        }`}
      >
        {props.checked && <Check aria-hidden className="h-4 w-4" strokeWidth={2} />}
        {props.children}
      </span>
    </ChoiceInput>
  );
}

/** Small check badge shown on selected photo tiles. */
export function SelectedBadge({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
        on ? "scale-100 border-sand bg-terracotta-deep text-sand" : "scale-90 border-sand/70 bg-ink/20 text-transparent"
      }`}
    >
      <Check className="h-4 w-4" strokeWidth={2.25} />
    </span>
  );
}
