"use client";
import {
  type FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ScrollState {
  scrolled: boolean;
  hidden: boolean;
}
export function useScrolled(threshold = 8) {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    hidden: false,
  });
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setState((prev) => {
        const scrolled = y > threshold;
        const hidden =
          y > threshold && delta > 2 ? true : delta < -2 ? false : prev.hidden;
        return prev.scrolled === scrolled && prev.hidden === hidden
          ? prev
          : { scrolled, hidden };
      });
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  const onFocus = useCallback(() => setHasFocusWithin(true), []);
  const onBlur = useCallback((event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setHasFocusWithin(false);
  }, []);
  return {
    scrolled: state.scrolled,
    hidden: state.hidden && !hasFocusWithin,
    onFocus,
    onBlur,
  };
}
