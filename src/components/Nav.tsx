"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { bodyAreas } from "@/data/bodyAreas";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ivory h-14 flex items-center">
      <div className="max-w-page mx-auto w-full px-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Harley Street Wellness"
            width={48}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide ml-4">
          {bodyAreas.map((area) => {
            const isActive = pathname === `/${area.slug}`;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className={`whitespace-nowrap px-3 py-1.5 rounded-pill text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gold text-white"
                    : "text-muted hover:text-charcoal hover:bg-ivory"
                }`}
              >
                {area.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
