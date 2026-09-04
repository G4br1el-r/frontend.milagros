"use client";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils/cn";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}
function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}
function PopoverArrow({ className, ...props }: PopoverPrimitive.Arrow.Props) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn(
        "data-[side=bottom]:-top-1.75 data-[side=left]:-right-1.75 data-[side=left]:rotate-90 data-[side=right]:-left-1.75 data-[side=right]:-rotate-90 data-[side=top]:-bottom-1.75 data-[side=top]:rotate-180",
        className,
      )}
      {...props}
    >
      <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 0 L8 8 L16 0"
          className="fill-popover stroke-foreground/10"
          strokeWidth="1"
        />
      </svg>
    </PopoverPrimitive.Arrow>
  );
}
function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 8,
  showArrow = true,
  ...props
}: PopoverPrimitive.Popup.Props & {
  align?: PopoverPrimitive.Positioner.Props["align"];
  side?: PopoverPrimitive.Positioner.Props["side"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  showArrow?: boolean;
}) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "w-72 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 shadow-lg outline-none transition-[transform,opacity] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        >
          {props.children}
          {showArrow && <PopoverArrow />}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPortal>
  );
}
function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}
function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
};
