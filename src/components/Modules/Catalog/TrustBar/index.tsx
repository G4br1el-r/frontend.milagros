import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TRUST_BAR_ITEMS } from "@/lib/utils/constants";
import { iconMap } from "@/lib/utils/iconsMap";

export function TrustBar() {
  return (
    <Stagger
      as="section"
      staggerDelay={0.12}
      className="w-full border-b border-border bg-background"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {TRUST_BAR_ITEMS.map(({ icon, title, subtitle }) => {
          const Icon = iconMap[icon];

          return (
            <StaggerItem
              key={title}
              distance={20}
              className="flex items-center gap-3.5 px-6 py-6 sm:px-8"
            >
              <Icon
                className="size-6 shrink-0 text-primary/80"
                strokeWidth={1.25}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium tracking-wide text-text/90">
                  {title}
                </span>
                <span className="text-sm font-light text-text-muted">
                  {subtitle}
                </span>
              </div>
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}
