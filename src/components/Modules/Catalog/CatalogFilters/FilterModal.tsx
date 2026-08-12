"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FilterPanelContent } from "./FilterPanelContent";

export function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-sm font-semibold tracking-wide text-text uppercase transition-colors hover:border-primary/40"
      >
        <SlidersHorizontal className="size-4" strokeWidth={1.75} />
        Filtrar
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />

            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl bg-primary-dark"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5">
                <span className="text-sm font-semibold tracking-[0.2em] text-gold-light uppercase">Filtros</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar filtros"
                  className="flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
                >
                  <X className="size-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterPanelContent />
              </div>

              <div className="shrink-0 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg bg-gold py-3 text-sm font-semibold tracking-wide text-primary-dark uppercase transition-colors hover:bg-gold-light"
                >
                  Ver Resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
