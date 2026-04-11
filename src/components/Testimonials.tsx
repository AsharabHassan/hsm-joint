import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";

export function Testimonials() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            What Our Patients Say About Their Experience
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <Card>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-charcoal italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ivory rounded-full flex items-center justify-center text-xs font-bold text-gold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">{t.name}</p>
                    <p className="text-[11px] text-muted">{t.label}</p>
                  </div>
                </div>
                <p className="text-[10px] text-muted mt-3 italic">
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
