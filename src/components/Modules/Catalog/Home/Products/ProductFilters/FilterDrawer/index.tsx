"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

interface FilterDrawerProps {
  children: ReactNode;
}

export function FilterDrawer({ children }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-primary/15 bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-primary uppercase transition-colors duration-300 hover:border-terracotta/50"
      >
        <SlidersHorizontal className="size-4 shrink-0" strokeWidth={2} />
        Filtrar
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar filtros"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] cursor-pointer bg-primary-darkest/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtros"
              className="fixed inset-y-0 left-0 z-[70] flex w-[85vw] max-w-sm flex-col gap-8 overflow-y-auto bg-cream p-6 pt-[calc(1.5rem+env(safe-area-inset-top))]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal
                    className="size-4 shrink-0 text-terracotta"
                    strokeWidth={2}
                  />
                  <span className="font-display text-lg text-primary">
                    Filtrar
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-300 hover:border-terracotta/50"
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </div>

              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
