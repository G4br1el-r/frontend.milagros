"use client";

import { motion } from "motion/react";
import { Stagger } from "@/components/motion/stagger";
import { buildFadeVariants, DEFAULT_EASE } from "@/components/motion/variants";
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

const itemVariants = buildFadeVariants("up", 8);

export function SocialLinks() {
  return (
    <Stagger className="flex items-center gap-3">
      {FOOTER_SOCIAL_LINKS.map(({ id, icon, href, label }) => {
        const Icon = socialIconMap[icon];

        return (
          <motion.a
            key={id}
            href={href}
            aria-label={label}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: DEFAULT_EASE }}
            whileHover={{ y: -2 }}
            className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold-light/50 hover:text-gold-light"
          >
            <Icon className="size-4" strokeWidth={1.75} />
          </motion.a>
        );
      })}
    </Stagger>
  );
}
