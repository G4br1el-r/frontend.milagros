import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { FadeIn } from "@/components/motion/fade-in";
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
      <FadeIn direction="up" distance={24} duration={0.7}>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <Image
              src="/images/hero/milagros-logo.png"
              alt="Milagros"
              width={140}
              height={140}
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
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
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
              <ul className="flex flex-col gap-3">
                {FOOTER_CONTACT_ITEMS.map(({ icon, label }) => {
                  const Icon = contactIconMap[icon];

                  return (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 text-sm text-white/60"
                    >
                      <Icon
                        className="size-4 shrink-0 text-gold-light/80"
                        strokeWidth={1.5}
                      />
                      <span>{label}</span>
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
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-6 text-center sm:px-8">
            <span className="text-xs text-white/40">
              © {year} {FOOTER_LEGAL_NAME} Todos os direitos reservados.
            </span>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
