import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
  FOOTER_CONTACT_ITEMS,
  FOOTER_LEGAL_NAME,
  FOOTER_LINK_GROUPS,
  FOOTER_TAGLINE,
  type FooterContactIconName,
} from "@/lib/utils/constants";
import { WhatsappIcon } from "./brandIcons";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";

const contactIconMap: Record<
  FooterContactIconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  phone: Phone,
  whatsapp: WhatsappIcon,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-dark">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="flex flex-col items-center gap-5 text-center sm:col-span-2 sm:items-start sm:text-left lg:col-span-1">
          <Image
            src="/images/hero/milagros-logo.png"
            alt="Milagros"
            width={140}
            height={140}
            sizes="140px"
            className="h-12 w-auto object-contain"
          />
          <p className="max-w-xs text-sm text-white/60">{FOOTER_TAGLINE}</p>
          <SocialLinks />
        </div>

        {FOOTER_LINK_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {group.title}
            </span>
            <ul className="flex flex-col gap-1">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:outline-none sm:min-h-0 sm:py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              Atendimento
            </span>
            <ul className="flex flex-col gap-1">
              {FOOTER_CONTACT_ITEMS.map(({ icon, label, href }) => {
                const Icon = contactIconMap[icon];
                const isExternal = href.startsWith("http");

                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="-mx-2 flex min-h-11 items-center gap-2.5 px-2 text-sm wrap-break-word text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:outline-none sm:min-h-0 sm:py-1"
                    >
                      <Icon
                        className="size-4 shrink-0 text-gold-light/80"
                        strokeWidth={1.5}
                      />
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="h-px w-full bg-white/10" />

          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-5 py-6 text-center sm:px-8">
          <span className="text-xs text-balance text-white/40">
            © {year} {FOOTER_LEGAL_NAME} Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
