import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to the top of the page on every route change.
 * Mount this once inside a component that lives inside the Router context.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
