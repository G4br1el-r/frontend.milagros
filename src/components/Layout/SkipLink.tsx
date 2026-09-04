export function SkipLink() {
  return (
    <a
      href="#conteudo-principal"
      className="sr-only cursor-pointer rounded-(--radius-sm) bg-nave px-4 py-3 font-sans text-[length:var(--text-step-neg-1)] text-linho focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-(--z-index-toast) focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
    >
      Pular para o conteúdo
    </a>
  );
}
