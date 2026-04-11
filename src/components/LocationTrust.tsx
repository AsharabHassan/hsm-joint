import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

export function LocationTrust() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Visit Us at Harley Street
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={100}>
            <div className="rounded-card overflow-hidden h-80 bg-ivory flex items-center justify-center">
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
            <Card>
              <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-4">
                Our Specialist Team
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                All consultations and treatments at Harley Street Wellness are
                carried out by GMC-registered doctors with specialist training
                in musculoskeletal medicine and regenerative approaches. Our
                practitioners are committed to providing honest, evidence-based
                assessments tailored to your individual situation.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "GMC Registered",
                  "Harley Street Location",
                  "Evidence-Based",
                  "No Obligation",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="bg-trust-green/10 text-trust-green px-3 py-1.5 rounded-pill text-[11px] font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <address className="text-sm text-charcoal/70 not-italic">
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
