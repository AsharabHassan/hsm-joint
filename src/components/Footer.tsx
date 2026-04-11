import Link from "next/link";
import { bodyAreas } from "@/data/bodyAreas";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-page mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-gold mb-4 tracking-tight">
              Harley Street Wellness
            </h3>
            <p className="text-sm leading-relaxed mb-5 text-white/50">
              Educational resources about non-surgical approaches to joint pain.
              GMC-registered specialists providing evidence-based consultations
              at our Harley Street clinic.
            </p>
            <address className="text-sm not-italic text-white/40">
              10 Harley Street
              <br />
              London W1G 9PF
            </address>
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
                    className="text-sm text-white/40 hover:text-gold transition-colors duration-200"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-white/90 mb-5 text-xs uppercase tracking-[2px]">
              Contact
            </h4>
            <p className="text-sm mb-2 text-white/40">Phone: +44 20 XXXX XXXX</p>
            <p className="text-sm mb-6 text-white/40">
              Email: info@harleystreetmedicalwellness.co.uk
            </p>
            <Button variant="outline" size="sm">
              Speak with a Specialist
            </Button>
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
              Regenerative therapies, including PRP and stem cell-based
              approaches, are areas of ongoing research. Some treatments
              discussed on this page may not yet have full regulatory approval
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
