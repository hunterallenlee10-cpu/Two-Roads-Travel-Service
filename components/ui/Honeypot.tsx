/** A field people never see. Spam bots tend to fill it in, and the server quietly drops those submissions. */
export function Honeypot() {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Reads the honeypot value from a form element. */
export function honeypotValue(form: HTMLFormElement | null | undefined) {
  const el = form?.elements.namedItem("website");
  return el instanceof HTMLInputElement ? el.value : "";
}
