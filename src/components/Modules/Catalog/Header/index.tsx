"use client";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Layout/Container";
import { CustomerMenu } from "@/components/Modules/Catalog/Identity";
import { useCartCount, useCartStore } from "@/lib/stores/cart";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav-links.constants";
import { useScrolled } from "./useScrolled";
export function Header() {
  const { scrolled, hidden } = useScrolled();
  const count = useCartCount();
  const openCart = useCartStore((state) => state.open);
  const pathname = usePathname();
  const overDarkHero = pathname === "/";
  const solid = scrolled || !overDarkHero;
  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
      className={cn(
        "fixed inset-x-0 top-0 z-(--z-index-overlay) w-full pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-500",
        solid
          ? "border-b border-ouro/10 bg-nave/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="relative grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-24">
        <div className="flex items-center justify-self-start">
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer font-serif text-[length:var(--text-step-0)] text-linho/70 transition-colors duration-200 hover:text-ouro focus-visible:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <MobileMenu />
        </div>
        <Link
          href="/"
          aria-label="Milagros — página inicial"
          className="cursor-pointer justify-self-center focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-4"
        >
          <Image
            src="/images/hero/milagros-logo.png"
            alt=""
            width={160}
            height={160}
            loading="eager"
            fetchPriority="high"
            className="h-10 w-auto object-contain sm:h-14"
          />
        </Link>
        <div className="flex items-center justify-end gap-1.5 sm:gap-3">
          <CustomerMenu />
          <button
            type="button"
            onClick={openCart}
            aria-label={
              count && count > 0 ? `Carrinho (${count} itens)` : "Carrinho"
            }
            className="relative flex size-9 sm:size-11 cursor-pointer items-center justify-center rounded-full border border-linho/20 text-linho transition-colors duration-300 hover:border-ouro hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />
            <AnimatePresence>
              {count !== null && count > 0 && (
                <motion.span
                  key="count"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-brasa text-[length:var(--text-step-neg-1)] font-bold text-linho"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>
    </motion.header>
  );
}
