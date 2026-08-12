import type { SVGProps } from "react";

type BrandIconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 8.5h-2c-.83 0-1.5.67-1.5 1.5v2h3.4l-.5 3H11.5v7h-3v-7H6v-3h2.5v-2.3C8.5 6.9 10 5.5 12.4 5.5H15v3z" />
    </svg>
  );
}

export function YoutubeIcon(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path
        d="M10.5 9.3v5.4l4.8-2.7-4.8-2.7z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function WhatsappIcon(props: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 12a8 8 0 1 1-3.7-6.7" />
      <path d="M20 12a8 8 0 0 1-11.3 7.3L4 20l.8-4.5A8 8 0 0 1 12 4" />
      <path
        d="M9.2 9.5c.2-.5.4-.5.6-.5h.5c.15 0 .35 0 .5.4.2.5.6 1.5.65 1.6.05.1.08.25 0 .4-.08.15-.12.25-.25.4-.12.13-.25.3-.36.4-.12.12-.25.24-.1.5.14.26.65 1.05 1.4 1.7.95.85 1.75 1.1 2 1.25.25.14.4.12.55-.05.15-.16.6-.7.76-.95.15-.24.3-.2.5-.12.2.08 1.3.6 1.5.72.2.1.34.16.4.25.05.1.05.55-.15 1.1-.2.5-1.15 1-1.6 1.07-.4.06-.9.08-1.45-.1-.33-.1-.76-.25-1.3-.5-2.3-1-3.8-3.3-3.9-3.45-.1-.15-.9-1.2-.9-2.3 0-1.1.55-1.6.75-1.85z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
