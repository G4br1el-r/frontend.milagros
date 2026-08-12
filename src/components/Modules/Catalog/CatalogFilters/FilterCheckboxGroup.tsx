import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { CatalogFilterOption } from "@/lib/utils/constants";

interface FilterCheckboxGroupProps {
  title: string;
  options: CatalogFilterOption[];
}

export function FilterCheckboxGroup({
  title,
  options,
}: FilterCheckboxGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
        {title}
      </span>

      <Stagger className="flex flex-col gap-2.5">
        {options.map(({ id, label, count }) => (
          <StaggerItem
            key={id}
            as="label"
            distance={8}
            className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white/90"
          >
            <input
              type="checkbox"
              className="size-3.5 rounded-sm border border-white/25 bg-transparent accent-gold"
            />
            <span className="flex-1">{label}</span>
            <span className="text-xs text-white/35">{count}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
