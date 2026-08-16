import {
  FOOTER_SOCIAL_LINKS,
  type FooterSocialIconName,
} from "@/lib/utils/constants";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./brandIcons";

const socialIconMap: Record<FooterSocialIconName, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsappIcon,
};

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2 sm:gap-3">
      {FOOTER_SOCIAL_LINKS.map(({ id, icon, href, label }) => {
        const Icon = socialIconMap[icon];

        return (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-[color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-light/50 hover:text-gold-light focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:outline-none"
            >
              <Icon className="size-4" strokeWidth={1.75} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
