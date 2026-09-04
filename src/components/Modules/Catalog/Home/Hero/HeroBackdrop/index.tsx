import { getImageProps } from "next/image";

const MOBILE_BREAKPOINT = "(min-width: 640px)";

// Placeholders de 16px gerados a partir dos AVIF finais (ver Fase 0.5C).
const DESKTOP_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwIF/8QAHxAAAgEEAgMAAAAAAAAAAAAAAQIDAAQFESFBIlGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAIv/aAAwDAQACEQMRAD8AzsNIjTGFiCja+GhzUEMdyUj8uOjyDR2KKLiIga0fdTlGIuS2zs90IamXN//Z";
const MOBILE_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQF/8QAIRAAAQQCAgIDAAAAAAAAAAAAAQACAxEEIQVxEzESQUL/xAAWAQEBAQAAAAAAAAAAAAAAAAACAwT/xAAXEQEBAQEAAAAAAAAAAAAAAAABEQAh/9oADAMBAAIRAxEAPwDJw8Vs8TnVRGmn6KnzoPG0BafDuAmfF7DgCb6U/LfHySxkhpaARf66WcW66E0OHkPhyBJdA6G0sic5c5utAiya0EoY2Sut7Qa9ITACV1NA6T5cYzf/2Q==";

export function HeroBackdrop() {
  const common = {
    alt: "",
    priority: true as const,
    placeholder: "blur" as const,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero-poster.avif",
    blurDataURL: DESKTOP_BLUR_DATA_URL,
    width: 1536,
    height: 1024,
    sizes: "100vw",
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/hero/hero-poster-mobile.avif",
    blurDataURL: MOBILE_BLUR_DATA_URL,
    width: 941,
    height: 1672,
    sizes: "(max-width: 639px) 941px, 1px",
  });

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-dark">
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
