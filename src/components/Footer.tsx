import Link from "next/link";
import Image from "next/image";
import { bodyAreas } from "@/data/bodyAreas";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-page mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Brand + Google Reviews */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt="Harley Street Wellness"
                width={44}
                height={44}
                className="w-[44px] h-[44px] object-contain brightness-110"
              />
              <div>
                <div className="font-serif text-[15px] font-bold text-white leading-none tracking-tight">
                  Harley Street
                </div>
                <div className="text-[9px] text-gold font-semibold uppercase tracking-[2px]">
                  Wellness
                </div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-5 text-white/40">
              Educational resources about non-surgical approaches to joint pain.
              GMC-registered specialists providing evidence-based consultations.
            </p>

            {/* Google Reviews Badge */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2.5 mb-2">
                {/* Google G icon */}
                <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                <div>
                  <p className="text-[12px] font-bold text-white/80">Google Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[18px] font-bold text-white">4.9</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= 4 ? "#FBBC04" : "none"} stroke="#FBBC04" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={star <= 5 ? "#FBBC04" : "none"} />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-white/30">Based on 200+ verified patient reviews</p>
            </div>
          </div>

          {/* Column 2: Conditions */}
          <div>
            <h4 className="font-semibold text-white/90 mb-5 text-xs uppercase tracking-[2px]">
              Conditions
            </h4>
            <ul className="space-y-2.5">
              {bodyAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/${area.slug}`}
                    className="text-[13px] text-white/40 hover:text-gold transition-colors duration-200"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h4 className="font-semibold text-white/90 mb-5 text-xs uppercase tracking-[2px]">
              Our Clinics
            </h4>
            <div className="space-y-5">
              <address className="text-[13px] not-italic text-white/40 leading-relaxed">
                <strong className="text-white/70 block mb-1">Harley Street Clinic</strong>
                10 Harley Street<br />
                London W1G 9PF<br />
                United Kingdom
              </address>
              <address className="text-[13px] not-italic text-white/40 leading-relaxed">
                <strong className="text-white/70 block mb-1">Portpool Lane Clinic</strong>
                1-5 Portpool Ln<br />
                London EC1N 7UU<br />
                United Kingdom
              </address>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold text-white/90 mb-5 text-xs uppercase tracking-[2px]">
              Contact
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="tel:02046283137"
                className="flex items-center gap-2.5 text-[13px] text-white/50 hover:text-gold transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold/60 shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                020 4628 3137
              </a>
              <a
                href="mailto:hello@harleystreetwellness.co.uk"
                className="flex items-center gap-2.5 text-[13px] text-white/50 hover:text-gold transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold/60 shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hello@harleystreetwellness.co.uk
              </a>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-[12px] text-white/30">
                <span>🚇</span>
                <span>Oxford Circus (3 min) · Regent&apos;s Park (5 min)</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-white/30">
                <span>🚌</span>
                <span>Bus: 88, 453, C2</span>
              </div>
            </div>

            <Button variant="outline" size="sm">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Finance Partners */}
      <div className="border-t border-white/5">
        <div className="max-w-page mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-white/25">
              Payment Options Available
            </p>
            <div className="flex items-center gap-8">
              <img
                src="/images/finance/klarna.webp"
                alt="Klarna"
                className="h-5 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity duration-300 invert brightness-200"
              />
              <img
                src="/images/finance/clearpay.webp"
                alt="Clearpay"
                className="h-5 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity duration-300 invert brightness-200"
              />
              <div className="bg-white/5 rounded-md px-2 py-1">
                <img
                  src="/images/finance/ideal4finance-white.png"
                  alt="Ideal 4 Finance"
                  className="h-4 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="border-t border-white/5">
        <div className="max-w-page mx-auto px-4 py-8">
          <div className="space-y-3 text-[11px] text-white/25 leading-relaxed">
            <p>
              The information on this page is provided for educational and
              informational purposes only and does not constitute medical advice.
              Always consult a qualified healthcare professional regarding your
              individual circumstances.
            </p>
            <p>
              Individual results may vary. Outcomes depend on a range of factors
              including the nature and severity of your condition, your overall
              health, and your body&apos;s individual response. No treatment outcome
              can be guaranteed.
            </p>
            <p>
              Some advanced therapies discussed on this website are areas of
              ongoing research and may not yet have full regulatory approval
              for all applications. Your practitioner will discuss the current
              evidence base and regulatory status as part of your consultation.
            </p>
            <p>
              All consultations and treatments are carried out by GMC-registered
              doctors at our Harley Street clinic.
            </p>
            <p>
              Booking a consultation does not commit you to any treatment. The
              purpose of the consultation is to assess your condition and discuss
              whether any approach may be appropriate.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-white/20 text-center">
            &copy; {new Date().getFullYear()} Harley Street Wellness. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
