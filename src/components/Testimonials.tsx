import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { StarIcon, CheckCircleIcon } from "@/components/ui/Icons";

export function Testimonials() {
  return (
    <section className="bg-cream py-20 md:py-28 relative overflow-hidden">
      {/* Large decorative background quote mark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-5">
        <svg
          width="200"
          height="200"
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80V48C0 34.667 3.333 23.667 10 15 16.667 6.333 26.333 1.333 39 0l4 8C34.667 10 29.333 14 26 20c-3.333 6-5 12.333-5 19h19v41H0zm54 0V48c0-13.333 3.333-24.333 10-33C70.667 6.333 80.333 1.333 93 0l4 8c-8.333 2-13.667 6-16 12-2.333 6-3.5 12.333-3.5 19H97v41H54z"
            fill="#C8A96E"
          />
        </svg>
      </div>

      <div className="max-w-page mx-auto px-4 relative">
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
              <Card hover={true} className="h-full flex flex-col relative overflow-hidden pt-6">
                {/* Gold gradient accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: "linear-gradient(90deg, #C8A96E, #E8D5A0, #C8A96E)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s ease infinite",
                  }}
                />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon key={j} size={15} className="text-gold" />
                  ))}
                </div>

                {/* Large gold opening quote mark */}
                <div
                  className="text-[56px] leading-none font-serif text-gold mb-1 select-none"
                  style={{ lineHeight: "0.8", opacity: 0.6 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <blockquote className="text-base text-charcoal italic leading-7 flex-1 mt-2">
                  {t.quote}&rdquo;
                </blockquote>

                {/* Treatment tag */}
                <div className="mt-4">
                  <span className="inline-block text-[11px] font-medium text-gold-dark bg-[#F5EFE3] border border-[#E8DFD0] rounded-full px-3 py-0.5 tracking-wide">
                    {t.treatment}
                  </span>
                </div>

                <div className="border-t border-ivory pt-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8DFD0] to-[#F5EFE3] flex items-center justify-center text-[13px] font-bold text-gold-dark flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[13px] text-charcoal">
                        {t.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircleIcon size={12} className="text-emerald-500 flex-shrink-0" />
                        <p className="text-[11px] text-emerald-600 font-medium">{t.label}</p>
                      </div>
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

        {/* Trust row */}
        <FadeIn delay={400}>
          <div className="mt-12 flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={18} className="text-gold" />
              ))}
            </div>
            <p className="text-sm text-slate font-medium">
              Rated <span className="text-charcoal font-semibold">4.9/5</span> from{" "}
              <span className="text-charcoal font-semibold">200+</span> verified patient reviews
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
