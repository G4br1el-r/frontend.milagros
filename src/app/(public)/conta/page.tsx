import type { Metadata } from "next";
import { AccountView } from "@/components/Modules/Catalog/Account/AccountView";

export const metadata: Metadata = {
  title: "Minha conta | Milagros",
  robots: { index: false, follow: false },
};

export default function ContaPage() {
  return <AccountView />;
}
