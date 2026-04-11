import { FadeIn } from "@/components/ui/FadeIn";

const comparisonData = [
  {
    factor: "Procedure time",
    surgery: "1-4 hours",
    prp: "30-60 minutes",
    exosomes: "30-60 minutes",
    stemCells: "1-2 hours",
  },
  {
    factor: "Anaesthesia",
    surgery: "General / spinal",
    prp: "Local / none",
    exosomes: "Local / none",
    stemCells: "Local",
  },
  {
    factor: "Hospital stay",
    surgery: "1-5 days",
    prp: "None (outpatient)",
    exosomes: "None (outpatient)",
    stemCells: "None (outpatient)",
  },
  {
    factor: "Return to work",
    surgery: "2-12 weeks",
    prp: "1-3 days",
    exosomes: "1-3 days",
    stemCells: "1-7 days",
  },
  {
    factor: "Full recovery",
    surgery: "3-12 months",
    prp: "4-6 weeks",
    exosomes: "4-6 weeks",
    stemCells: "6-12 weeks",
  },
  {
    factor: "Infection risk",
    surgery: "1-10%",
    prp: "Minimal (<0.1%)",
    exosomes: "Minimal (0.7% SAE)",
    stemCells: "Minimal",
  },
  {
    factor: "Reversibility",
    surgery: "Irreversible",
    prp: "Non-invasive",
    exosomes: "Non-invasive",
    stemCells: "Non-invasive",
  },
  {
    factor: "Can be repeated",
    surgery: "Revision complex",
    prp: "Yes",
    exosomes: "Yes",
    stemCells: "Yes",
  },
];

export function ComparisonTable() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-center mb-12">
            How Do Non-Surgical Approaches Compare to Surgery?
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Factor
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Surgery
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    PRP Therapy
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Exosome Therapy
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gold">
                    Stem Cell Therapy
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.factor}
                    className={`border-b border-ivory ${
                      i % 2 === 0 ? "bg-white" : "bg-ivory/50"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-charcoal">
                      {row.factor}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.surgery}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">{row.prp}</td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.exosomes}
                    </td>
                    <td className="py-3 px-4 text-charcoal/70">
                      {row.stemCells}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
