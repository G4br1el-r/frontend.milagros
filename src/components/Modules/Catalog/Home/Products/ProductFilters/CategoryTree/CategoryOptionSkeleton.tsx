export function CategoryOptionSkeleton() {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="size-4.5 shrink-0 animate-pulse rounded-[5px] bg-primary/10" />
      <div className="h-3.5 flex-1 animate-pulse rounded-full bg-primary/10" />
      <div className="h-3 w-5 animate-pulse rounded-full bg-primary/10" />
    </div>
  );
}
