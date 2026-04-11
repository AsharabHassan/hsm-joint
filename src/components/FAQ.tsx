import { getFAQsByBodyArea, type FAQ as FAQType } from "@/data/faqs";
import { AccordionItem } from "@/components/ui/Accordion";
import { FadeIn } from "@/components/ui/FadeIn";

interface FAQProps {
  bodyAreaSlug: string;
  bodyAreaName: string;
}

export function FAQ({ bodyAreaSlug, bodyAreaName }: FAQProps) {
  const faqs = getFAQsByBodyArea(bodyAreaSlug);

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            Frequently Asked Questions About {bodyAreaName} Treatment
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="max-w-3xl mx-auto bg-white rounded-card p-6 md:p-8 shadow-card">
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
