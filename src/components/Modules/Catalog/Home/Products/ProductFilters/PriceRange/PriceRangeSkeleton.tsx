export function PriceRangeSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-1.5 w-full animate-pulse rounded-full bg-primary/10" />
      <div className="flex items-center gap-3">
        <div className="h-[46px] flex-1 animate-pulse rounded-xl bg-primary/10" />
        <span className="mt-5 h-px w-3 shrink-0 bg-primary/20" />
        <div className="h-[46px] flex-1 animate-pulse rounded-xl bg-primary/10" />
      </div>
    </div>
  );
}
