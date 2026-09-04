"use client";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils/cn";

function Tabs({ ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}
function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex items-center gap-8 border-b border-primary/10",
        className,
      )}
      {...props}
    >
      {children}
      <TabsIndicator />
    </TabsPrimitive.List>
  );
}
function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        "absolute bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-gold transition-[translate,width] duration-200 ease-out",
        className,
      )}
      {...props}
    />
  );
}
function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "cursor-pointer pb-4 font-display text-lg text-primary/45 outline-none transition-colors duration-200 hover:text-primary/75 data-selected:text-primary focus-visible:text-primary",
        className,
      )}
      {...props}
    />
  );
}
function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}
export { Tabs, TabsList, TabsTab, TabsPanel };
