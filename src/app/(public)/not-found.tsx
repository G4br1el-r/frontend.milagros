import { MAIN_CONTENT_ID } from "@/components/Layout/skip-link.constants";
import { NotFoundContent } from "@/components/shared/not-found-content";
export default function NotFound() {
  return (
    <main
      id={MAIN_CONTENT_ID}
      className="flex w-full flex-1 items-center justify-center bg-cream px-5 py-32"
    >
      <NotFoundContent />
    </main>
  );
}
