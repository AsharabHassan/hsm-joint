"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { bodyAreas } from "@/data/bodyAreas";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-cream/97 backdrop-blur-2xl border-b border-black/[0.04]">
      <div className="max-w-page mx-auto w-full px-4 md:px-8">
        {/* Main row */}
        <div className="flex items-center justify-between h-[62px]">
          <Link href="/" className="shrink-0 flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="Harley Street Wellness"
              width={48}
              height={48}
              className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] object-contain"
              priority
            />
            <div className="hidden sm:block">
              <div className="font-serif text-[14px] md:text-[15px] font-bold text-charcoal leading-none tracking-tight">
                Harley Street
              </div>
              <div className="text-[8px] md:text-[9px] text-gold-dark font-semibold uppercase tracking-[2px]">
                Wellness
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1 ml-6">
            <Link
              href="/joint-pain"
              className={`whitespace-nowrap px-3.5 py-[7px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
                pathname === "/joint-pain"
                  ? "bg-charcoal text-white"
                  : "text-gold-dark hover:text-charcoal hover:scale-[1.02]"
              }`}
            >
              Joint Pain
            </Link>
            <div className="w-[1px] h-4 bg-black/[0.06] mx-1" />
            {bodyAreas.map((area) => {
              const isActive = pathname === `/${area.slug}`;
              return (
                <Link
                  key={area.slug}
                  href={`/${area.slug}`}
                  className={`whitespace-nowrap px-3.5 py-[7px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
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

          {/* Phone CTA */}
          <a
            href="tel:02046283137"
            className="hidden md:flex items-center gap-2 bg-charcoal text-white rounded-pill px-4 py-2 text-[12px] font-semibold hover:bg-charcoal-light transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            020 4628 3137
          </a>
        </div>

        {/* Mobile scrollable nav links */}
        <div className="lg:hidden flex gap-1 overflow-x-auto scrollbar-hide pb-2 -mt-1">
          <Link
            href="/joint-pain"
            className={`whitespace-nowrap px-4 py-[6px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
              pathname === "/joint-pain"
                ? "bg-charcoal text-white"
                : "text-gold-dark hover:text-charcoal"
            }`}
          >
            Joint Pain
          </Link>
          {bodyAreas.map((area) => {
            const isActive = pathname === `/${area.slug}`;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className={`whitespace-nowrap px-4 py-[6px] rounded-pill text-[11px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-white"
                    : "text-muted hover:text-charcoal"
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
