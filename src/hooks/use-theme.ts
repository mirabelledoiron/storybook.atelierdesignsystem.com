import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const rootIsDark = document.documentElement.classList.contains("dark");
      const rootTheme: Theme = rootIsDark ? "dark" : "light";
      if (rootIsDark) return rootTheme;
      const stored = localStorage.getItem("atelier-theme") as Theme | null;
      if (stored) return stored;
      return rootTheme;
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("atelier-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      const nextTheme: Theme = root.classList.contains("dark") ? "dark" : "light";
      setThemeState((prev) => (prev === nextTheme ? prev : nextTheme));
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, setTheme: setThemeState, toggleTheme };
}
