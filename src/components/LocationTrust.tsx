import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShieldCheckIcon, LocationPinIcon, MedicalCrossIcon } from "@/components/ui/Icons";

export function LocationTrust() {
  return (
    <section className="bg-ivory/50 py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex mb-4">
              <div className="gold-line" />
              <span>Our Location</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Visit Us at Harley Street
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Our clinic is located in the heart of London&apos;s prestigious medical district
            </p>
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
                title="Harley Street Wellness Location"
              />
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <Card className="h-full flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-4">
                  Our Specialist Team
                </h3>
                <p className="text-sm text-slate leading-relaxed mb-6">
                  All consultations and treatments at Harley Street Wellness are
                  carried out by GMC-registered doctors with specialist training
                  in musculoskeletal medicine and regenerative approaches.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: MedicalCrossIcon, label: "GMC Registered" },
                    { icon: LocationPinIcon, label: "Harley Street" },
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
              <address className="text-sm text-slate not-italic border-t border-ivory pt-5">
                <strong className="text-charcoal">10 Harley Street</strong>
                <br />
                London W1G 9PF
                <br />
                <br />
                Phone: +44 20 XXXX XXXX
                <br />
                Email: info@harleystreetmedicalwellness.co.uk
              </address>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
