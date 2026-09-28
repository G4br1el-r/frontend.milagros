"use client";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  SPLASH_SEEN_STORAGE_KEY,
  SPLASH_VISIBLE_DURATION_MS,
} from "./splash-screen.constants";

function hasSeenSplash(): boolean {
  try {
    return window.sessionStorage.getItem(SPLASH_SEEN_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
function markSplashSeen(): boolean {
  try {
    window.sessionStorage.setItem(SPLASH_SEEN_STORAGE_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (hasSeenSplash()) {
      setIsLoading(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const timeoutId = window.setTimeout(() => {
      markSplashSeen();
      setIsLoading(false);
      document.body.style.overflow = "";
    }, SPLASH_VISIBLE_DURATION_MS);
    return () => {
      window.clearTimeout(timeoutId);
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#110803] in-data-splash-seen:hidden"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              repeat: reduceMotion ? undefined : Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hero/milagros-logo.png"
              alt="Milagros"
              width={200}
              height={200}
              loading="eager"
              className="h-16 w-auto object-contain opacity-80 sm:h-20"
            />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
