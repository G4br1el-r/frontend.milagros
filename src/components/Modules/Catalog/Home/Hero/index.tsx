import { HeroBackdrop } from "./HeroBackdrop";
import { HeroContent } from "./HeroContent";
import { ScrollCue } from "./ScrollCue";

export function Hero() {
  return (
    <section
      id="home"
      className="sticky top-0 z-0 flex h-dvh w-full items-center overflow-hidden bg-primary-dark"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-5 pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-12 sm:pt-32 sm:pb-[calc(8rem+env(safe-area-inset-bottom))] lg:px-20">
        <HeroContent />
      </div>

      <ScrollCue />
    </section>
  );
}
