import { Info } from "lucide-react";
import {
  QUOTE_NOTICE_DESCRIPTION,
  QUOTE_NOTICE_SHORT,
  QUOTE_NOTICE_TITLE,
} from "@/lib/checkout/checkout.constants";
import { cn } from "@/lib/utils/cn";

interface QuoteNoticeProps {
  variant?: "full" | "compact";
  className?: string;
}
export function QuoteNotice({ variant = "full", className }: QuoteNoticeProps) {
  if (variant === "compact") {
    return (
      <p
        className={cn(
          "flex items-center gap-1.5 text-[11px] text-primary/50",
          className,
        )}
      >
        <Info className="size-3 shrink-0" strokeWidth={2} aria-hidden="true" />
        <span>{QUOTE_NOTICE_SHORT}</span>
      </p>
    );
  }
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-gold/30 bg-gold/5 p-3",
        className,
      )}
    >
      <Info
        className="mt-px size-4 shrink-0 text-gold"
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold text-primary">
          {QUOTE_NOTICE_TITLE}
        </p>
        <p className="text-xs leading-relaxed text-primary/60">
          {QUOTE_NOTICE_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}
