import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { StarIcon } from "@/components/ui/Icons";

export function Testimonials() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex mb-4">
              <div className="gold-line" />
              <span>Patient Experiences</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              What Our Patients Say
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Real experiences from patients who visited our Harley Street clinic
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <Card hover={true} className="h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon key={j} size={15} className="text-gold" />
                  ))}
                </div>

                <blockquote className="text-sm text-charcoal italic leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="border-t border-ivory pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8DFD0] to-[#F5EFE3] flex items-center justify-center text-[12px] font-bold text-gold-dark">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[13px] text-charcoal">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-muted">{t.label}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-muted mt-4 italic">
                  Individual experiences may vary.
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
