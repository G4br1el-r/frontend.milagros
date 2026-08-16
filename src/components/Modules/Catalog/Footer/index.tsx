import { Mail } from "lucide-react";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "./brandIcons";

const SOCIAL_LINKS = [
  { id: "instagram", icon: InstagramIcon, href: "#", label: "Instagram" },
  {
    id: "whatsapp",
    icon: WhatsappIcon,
    href: "https://wa.me/5519998364637",
    label: "WhatsApp",
  },
  { id: "facebook", icon: FacebookIcon, href: "#", label: "Facebook" },
  {
    id: "mail",
    icon: Mail,
    href: "mailto:contato@milagros.com.br",
    label: "E-mail",
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-primary-darkest">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-7 px-5 py-14 sm:py-16">
        <Image
          src="/images/hero/milagros-logo.png"
          alt="Milagros"
          width={140}
          height={140}
          sizes="140px"
          className="h-14 w-auto object-contain"
        />

        <ul className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ id, icon: Icon, href, label }) => {
            const isExternal = href.startsWith("http");

            return (
              <li key={id}>
                <a
                  href={href}
                  aria-label={label}
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-light/50 hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:outline-none"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
