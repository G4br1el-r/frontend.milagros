import { MAIN_CONTENT_ID } from "@/components/Layout/skip-link.constants";
import { NotFoundContent } from "@/components/shared/not-found-content";
import "./globals.css";
export default function NotFound() {
  return (
    <main
      id={MAIN_CONTENT_ID}
      className="flex min-h-svh w-full items-center justify-center bg-cream px-5 py-32"
    >
      <NotFoundContent />
    </main>
  );
}
