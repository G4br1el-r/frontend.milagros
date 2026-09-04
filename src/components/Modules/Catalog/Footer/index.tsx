import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/Layout/Container";
import { Heading, Meta } from "@/components/Typography";
import { WHATSAPP_URL } from "@/lib/contact/whatsapp";
import { WhatsappIcon } from "./brandIcons";

const CONTACTS = [
  {
    icon: Phone,
    label: "Telefone",
    value: "(12) 3133-1100",
    href: "tel:+551231331100",
  },
  {
    icon: WhatsappIcon,
    label: "Whatsapp",
    value: "(19) 99836-4637",
    href: WHATSAPP_URL,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@milagros.com.br",
    href: "mailto:contato@milagros.com.br",
  },
] as const;
export function Footer() {
  return (
    <footer className="w-full border-t border-ouro/10 bg-nave">
      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/images/hero/milagros-logo.png"
            alt="Milagros"
            width={140}
            height={140}
            sizes="140px"
            className="h-12 w-auto object-contain"
          />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-ouro/20 px-5 py-2.5 font-sans text-[length:var(--text-step-neg-1)] text-linho transition-colors duration-200 hover:border-ouro hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
          >
            <WhatsappIcon className="size-4" strokeWidth={1.75} />
            Falar no WhatsApp
          </a>
        </div>
        <div className="flex flex-col gap-5 border-t border-ouro/10 pt-8">
          <Heading as="h2" size="step-1" className="text-linho">
            Atendimento
          </Heading>
          <ul className="flex flex-col gap-3">
            {CONTACTS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="inline-flex cursor-pointer items-center gap-2.5 font-sans text-[length:var(--text-step-neg-1)] text-linho/80 transition-colors duration-200 hover:text-ouro focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-2"
                >
                  <Icon className="size-4 text-ouro" strokeWidth={1.75} />
                  {label}: {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-ouro/10 pt-8">
          <Meta className="text-fumaca">
            MILAGROS® — incensos e carvões litúrgicos
          </Meta>
        </div>
      </Container>
    </footer>
  );
}
