import type { ReactNode } from "react";

interface FilterGroupProps {
  title: string;
  children: ReactNode;
}

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
        {title}
      </span>
      {children}
    </div>
  );
}
