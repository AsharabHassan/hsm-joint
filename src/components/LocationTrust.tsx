import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShieldCheckIcon, LocationPinIcon, MedicalCrossIcon } from "@/components/ui/Icons";

const clinicImages = [
  { src: "/images/clinic/reception.jpg", alt: "Clinic reception area" },
  { src: "/images/clinic/treatment-room.jpg", alt: "Treatment room" },
  { src: "/images/clinic/consultation.jpg", alt: "Consultation room" },
  { src: "/images/clinic/harley-street.jpg", alt: "Harley Street entrance" },
];

export function LocationTrust() {
  return (
    <section className="bg-ivory/50 py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex mb-4">
              <div className="gold-line" />
              <span>Our Locations</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Find Us in London
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Two convenient locations in the heart of London&apos;s prestigious medical district
            </p>
          </div>
        </FadeIn>

        {/* Clinic photo gallery */}
        <FadeIn delay={50}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {clinicImages.map((image) => (
              <div
                key={image.src}
                className="group relative rounded-xl overflow-hidden h-36 md:h-48 shadow-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-slate-800 flex items-center justify-center p-3">
                  <span className="text-white/60 text-xs font-medium text-center leading-snug">
                    {image.alt}
                  </span>
                </div>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Google Reviews Bar */}
        <FadeIn delay={75}>
          <div className="bg-white rounded-2xl shadow-card border border-gold/10 p-5 md:p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Google G icon */}
              <svg width="32" height="32" viewBox="0 0 48 48" className="shrink-0">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] font-bold text-charcoal">4.9</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04" stroke="#FBBC04" strokeWidth="1">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-[12px] text-slate">Based on 200+ verified patient reviews on Google</p>
              </div>
            </div>
            <a
              href="https://g.co/kgs/harleystreetwellness"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-charcoal bg-cream hover:bg-gold/10 rounded-pill px-5 py-2.5 transition-colors duration-200 whitespace-nowrap"
            >
              See All Reviews →
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={100}>
            <div className="rounded-card overflow-hidden h-80 shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.8!2d-0.1484!3d51.5155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10+Harley+Street%2C+London+W1G+9PF!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harley Street Wellness Locations"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <Card className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-4">
                  Visit Our Clinics
                </h3>
                <p className="text-sm text-slate leading-relaxed mb-6">
                  All consultations and treatments at Harley Street Wellness are
                  carried out by GMC-registered doctors with specialist training
                  in musculoskeletal medicine and evidence-based approaches.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: MedicalCrossIcon, label: "GMC Registered" },
                    { icon: LocationPinIcon, label: "2 London Clinics" },
                    { icon: ShieldCheckIcon, label: "Evidence-Based" },
                    { icon: ShieldCheckIcon, label: "No Obligation" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2.5 bg-trust-green-light rounded-xl px-3.5 py-3"
                    >
                      <badge.icon size={16} className="text-trust-green shrink-0" />
                      <span className="text-[12px] font-semibold text-trust-green">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-ivory pt-5 space-y-4">
                {/* Clinic addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <address className="text-[13px] text-slate not-italic leading-relaxed">
                    <strong className="text-charcoal block mb-1">Harley Street Clinic</strong>
                    10 Harley Street<br />
                    London W1G 9PF
                  </address>
                  <address className="text-[13px] text-slate not-italic leading-relaxed">
                    <strong className="text-charcoal block mb-1">Portpool Lane Clinic</strong>
                    1-5 Portpool Ln<br />
                    London EC1N 7UU
                  </address>
                </div>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate">
                  <a href="tel:02046283137" className="flex items-center gap-2 hover:text-gold transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    020 4628 3137
                  </a>
                  <a href="mailto:hello@harleystreetwellness.co.uk" className="flex items-center gap-2 hover:text-gold transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    hello@harleystreetwellness.co.uk
                  </a>
                </div>

                {/* Transport */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px]">🚇</span>
                    <span className="text-[12px] text-slate">Oxford Circus (3 min walk) · Regent&apos;s Park (5 min walk)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px]">🚌</span>
                    <span className="text-[12px] text-slate">Bus routes: 88, 453, C2 — stop on Harley Street</span>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
