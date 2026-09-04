import { FlameKindling } from "lucide-react";
export function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-linear-to-br from-primary-darkest via-primary-dark to-primary-darkest">
      <FlameKindling
        className="size-9 text-gold-light/50"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="text-[10px] font-medium tracking-[0.22em] text-cream/40 uppercase">
        Sem imagem
      </span>
    </div>
  );
}
