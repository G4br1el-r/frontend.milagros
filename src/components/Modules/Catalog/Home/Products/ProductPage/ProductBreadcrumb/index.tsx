"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { URL_PARAM_KEYS } from "@/lib/query-state/url-params.constants";

interface ProductBreadcrumbProps {
  category: string | null;
  name: string;
}

export function ProductBreadcrumb({ category, name }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-primary/55">
        <li>
          <Link
            href="/"
            className="cursor-pointer transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
          >
            Catálogo
          </Link>
        </li>

        {category && (
          <>
            <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
            <li>
              <Link
                href={`/?${URL_PARAM_KEYS.categoria}=${encodeURIComponent(category)}#catalog`}
                className="cursor-pointer transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
              >
                {category}
              </Link>
            </li>
          </>
        )}

        <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
        <li
          aria-current="page"
          className="truncate font-medium text-primary/80"
        >
          {name}
        </li>
      </ol>
    </nav>
  );
}
