// Helper to combine CSS class names
// Filters out falsy values (false, undefined, null, "")
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
