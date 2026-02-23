export type ThemeMode = "light" | "dark";

function canUseDom() {
  return typeof document !== "undefined" && typeof window !== "undefined";
}

function createThemeProbe(mode: ThemeMode) {
  const probe = document.createElement("div");
  if (mode === "dark") {
    probe.classList.add("dark");
  }
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.inset = "0";
  document.body.appendChild(probe);
  return probe;
}

export function readThemeTokenValues(tokens: readonly string[], mode: ThemeMode): Record<string, string> {
  if (!canUseDom() || !document.body) {
    return {};
  }

  const probe = createThemeProbe(mode);
  const styles = window.getComputedStyle(probe);
  const values = Object.fromEntries(
    tokens.map((token) => [token, styles.getPropertyValue(`--${token}`).trim().replace(/\s+/g, " ")]),
  );
  probe.remove();
  return values;
}

export function formatHslToken(raw: string) {
  return raw ? `hsl(${raw})` : "";
}

export function resolveCssColor(cssColor: string) {
  if (!canUseDom() || !document.body || !cssColor) {
    return "";
  }

  const probe = document.createElement("div");
  probe.style.color = cssColor;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const resolved = window.getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

export function cssColorToHex(cssColor: string) {
  const resolved = resolveCssColor(cssColor);
  const match = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

  if (!match) return "";

  const [, r, g, b] = match;
  return `#${[r, g, b]
    .map((value) => Number(value).toString(16).padStart(2, "0"))
    .join("")}`;
}
