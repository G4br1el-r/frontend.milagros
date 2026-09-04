"use client";

import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "../nav-links.constants";

/**
 * Drawer, não accordion empilhado (pedido explícito da Fase 2). Reaproveita
 * o Sheet de @base-ui/react já usado por Cart/Checkout/RegisterSheet — focus
 * trap e Esc vêm de graça da primitiva. A devolução de foco ao gatilho só
 * funciona quando a abertura passa por SheetTrigger (não um <button onClick>
 * solto) — é assim que o base-ui sabe qual elemento re-focar ao fechar.
 */
export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Abrir menu"
        className="flex size-11 cursor-pointer items-center justify-center rounded-(--radius-sm) text-linho transition-colors duration-200 hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2 lg:hidden"
      >
        <Menu className="size-5" strokeWidth={1.75} />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex w-full flex-col gap-0 border-ouro/10 bg-nave sm:max-w-xs"
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-ouro/10 p-4">
          <SheetTitle className="font-serif text-[length:var(--text-step-1)] text-linho">
            Menu
          </SheetTitle>
          <SheetClose
            aria-label="Fechar menu"
            className="flex size-9 cursor-pointer items-center justify-center rounded-(--radius-sm) text-linho transition-colors duration-200 hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
          >
            <X className="size-5" strokeWidth={1.75} />
          </SheetClose>
        </SheetHeader>

        <nav className="flex flex-col p-2">
          {NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              // O gatilho não é um <button> — nativeButton:false avisa o
              // base-ui para não assumir semântica de botão nativo no <a>.
              nativeButton={false}
              render={
                // biome-ignore lint/a11y/useAnchorContent: render prop do base-ui injeta o children do SheetClose (link.label) neste <a> em runtime
                <a
                  href={link.href}
                  className="cursor-pointer rounded-(--radius-sm) px-3 py-3 font-serif text-[length:var(--text-step-1)] text-linho transition-colors duration-200 hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
