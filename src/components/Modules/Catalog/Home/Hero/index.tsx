import { BackgroundVideo } from "@/components/shared/background-video";
import { BrandWordmark } from "../BrandWordmark";
import { ScrollCue } from "./ScrollCue";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-dvh w-full overflow-hidden bg-primary-dark"
    >
      <BackgroundVideo poster="/images/hero/hero-poster.png" />

      <div className="absolute inset-0 bg-primary-dark/65" />
      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/85 via-transparent to-primary-dark/90" />
      <div className="absolute inset-0 bg-linear-to-r from-primary-dark/75 via-transparent to-transparent" />
      <div className="absolute -left-1/4 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full bg-terracotta/15 blur-[160px]" />

      <div className="relative z-10 flex h-full w-full items-center justify-start">
        <BrandWordmark />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-primary-dark/75 to-transparent" />

      <ScrollCue />
    </section>
  );
}
