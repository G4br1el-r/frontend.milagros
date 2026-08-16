import Image from "next/image";

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-dark">
      <Image
        src="/images/hero/hero-poster.png"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="scale-[1.04] object-cover brightness-[0.62] saturate-[0.85]"
      />

      <div className="absolute inset-0 bg-primary-dark/45 mix-blend-multiply" />

      <div className="absolute inset-0 [background:radial-gradient(115%_95%_at_50%_45%,transparent_25%,rgba(135,108,67,0.55)_75%,rgba(135,108,67,0.85)_100%)] mix-blend-multiply" />

      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/60 via-transparent to-primary-dark/75 mix-blend-multiply" />

      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
