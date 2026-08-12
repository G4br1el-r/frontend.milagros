import { Stagger, StaggerItem } from "@/components/motion/stagger";
import {
  CATALOG_ACTIVE_CATEGORY_ID,
  CATALOG_CATEGORIES,
} from "@/lib/utils/constants";
import { iconMap } from "@/lib/utils/iconsMap";

export function CategoryList() {
  return (
    <Stagger as="ul" className="flex flex-col gap-1">
      {CATALOG_CATEGORIES.map(({ id, label, count, icon }) => {
        const Icon = iconMap[icon];
        const isActive = id === CATALOG_ACTIVE_CATEGORY_ID;

        return (
          <StaggerItem key={id} as="li" distance={10}>
            <button
              type="button"
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-gold-light/10 text-gold-light"
                  : "text-white/70 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.5} />
              <span className="flex-1 text-left">{label}</span>
              <span className="text-xs text-white/35">{count}</span>
            </button>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
