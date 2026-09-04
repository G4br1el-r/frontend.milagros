"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 500);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#110803]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image
              src="/images/hero/milagros-logo.png"
              alt="Milagros"
              width={200}
              height={200}
              priority
              className="h-16 w-auto object-contain opacity-80 sm:h-20"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
