export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-white/70">
      <div className="aspect-4/3 w-full animate-pulse bg-primary/10" />

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="h-3 w-20 animate-pulse rounded-full bg-primary/10" />
          <div className="h-3 w-12 animate-pulse rounded-full bg-primary/10" />
        </div>

        <div className="h-6 w-3/4 animate-pulse rounded-full bg-primary/10" />

        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-full animate-pulse rounded-full bg-primary/10" />
          <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-primary/10" />
        </div>

        <div className="mt-auto flex flex-col gap-6 pt-3">
          <div className="h-7 w-24 animate-pulse rounded-full bg-primary/10" />
          <div className="h-12 w-full animate-pulse rounded-full bg-primary/10" />
        </div>
      </div>
    </div>
  );
}
