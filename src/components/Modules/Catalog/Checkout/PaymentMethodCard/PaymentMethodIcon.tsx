"use client";

import { Banknote, CreditCard, QrCode, Wallet } from "lucide-react";

interface PaymentMethodIconProps {
  tipoForma: string;
  className?: string;
}

/** Icone por tipoForma da API ("Pix" | "Cartao" | "Boleto"). */
export function PaymentMethodIcon({
  tipoForma,
  className = "size-5",
}: PaymentMethodIconProps) {
  switch (tipoForma) {
    case "Pix":
      return <QrCode className={className} strokeWidth={1.75} />;
    case "Cartao":
      return <CreditCard className={className} strokeWidth={1.75} />;
    case "Boleto":
      return <Banknote className={className} strokeWidth={1.75} />;
    default:
      return <Wallet className={className} strokeWidth={1.75} />;
  }
}
