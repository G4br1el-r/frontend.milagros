import { getImageProps } from "next/image";

const MOBILE_BREAKPOINT = "(min-width: 640px)";

export function HeroBackdrop() {
  const common = { alt: "", loading: "eager" as const };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero-poster.png",
    width: 1536,
    height: 1024,
    sizes: "100vw",
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero-poster-mobile.png",
    width: 941,
    height: 1672,
    // A arte mobile tem 941px de largura; pedir mais que isso só reenvia
    // pixels inventados pelo upscale.
    sizes: "(max-width: 639px) 941px, 1px",
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-dark">
      {/*
       * Art direction via <picture>: em telas estreitas o recorte retrato
       * mantém o assunto enquadrado, o que `object-cover` sozinho não faria
       * a partir da arte widescreen.
       */}
      <picture>
        <source media={MOBILE_BREAKPOINT} srcSet={desktop} />
        <source srcSet={mobile} />
        <img
          {...rest}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full scale-[1.04] object-cover brightness-[0.62] saturate-[0.85]"
        />
      </picture>

      <div className="absolute inset-0 bg-primary-dark/45 mix-blend-multiply" />

      <div className="absolute inset-0 [background:radial-gradient(115%_95%_at_50%_45%,transparent_25%,rgba(135,108,67,0.55)_75%,rgba(135,108,67,0.85)_100%)] mix-blend-multiply" />

      <div className="absolute inset-0 bg-linear-to-b from-primary-dark/60 via-transparent to-primary-dark/75 mix-blend-multiply" />

      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
