"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bodyAreas } from "@/data/bodyAreas";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-cream/97 backdrop-blur-2xl border-b border-black/[0.04] h-[58px] flex items-center">
      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="shrink-0 flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[11px] bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center hover:scale-[1.03] transition-transform duration-200">
            <span className="font-serif text-gold text-xl font-bold">H</span>
          </div>
          <div className="hidden md:block">
            <div className="font-serif text-[15px] font-bold text-charcoal leading-none">Harley Street</div>
            <div className="text-[9px] text-gold-dark font-semibold uppercase tracking-[2.5px]">Wellness Clinic</div>
          </div>
        </Link>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide ml-4">
          {bodyAreas.map((area) => {
            const isActive = pathname === `/${area.slug}`;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className={`whitespace-nowrap px-4 py-[7px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-white"
                    : "text-muted hover:text-charcoal hover:scale-[1.02]"
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
