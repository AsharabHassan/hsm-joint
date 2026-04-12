import { getFAQsByBodyArea } from "@/data/faqs";
import { AccordionItem } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";

interface FAQProps {
  bodyAreaSlug: string;
  bodyAreaName: string;
}

export function FAQ({ bodyAreaSlug, bodyAreaName }: FAQProps) {
  const faqs = getFAQsByBodyArea(bodyAreaSlug);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex mb-4">
              <div className="gold-line" />
              <span>FAQ</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              Common questions about {bodyAreaName.toLowerCase()} treatment options
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="bg-white rounded-card p-7 md:p-9 shadow-card border border-ivory/50 max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
