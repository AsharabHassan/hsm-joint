import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircleIcon } from "@/components/ui/Icons";

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

const positiveValues = new Set([
  "None (outpatient)",
  "Minimal (<0.1%)",
  "Minimal (0.7% SAE)",
  "Minimal",
  "Non-invasive",
  "Yes",
  "Local / none",
  "Local",
]);

function isPositive(val: string) {
  return positiveValues.has(val);
}

export function ComparisonTable() {
  return (
    <section className="relative bg-charcoal py-20 md:py-28 noise-overlay overflow-hidden">
      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26,107,74,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label">
              <div className="gold-line" style={{ opacity: 0.5 }} />
              <span style={{ color: "#C8A96E" }}>Side-by-Side</span>
              <div className="gold-line" style={{ opacity: 0.5 }} />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-white mb-3">
              How Do Non-Surgical Approaches Compare?
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              A side-by-side comparison of traditional surgery versus regenerative options
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-5 font-semibold text-gold text-[10px] uppercase tracking-[2px]">
                    Factor
                  </th>
                  <th className="text-left py-4 px-5 font-semibold text-white/25 text-[10px] uppercase tracking-[2px]">
                    Surgery
                  </th>
                  <th className="text-left py-4 px-5 font-semibold text-gold text-[10px] uppercase tracking-[2px]">
                    PRP Therapy
                  </th>
                  <th className="text-left py-4 px-5 font-semibold text-gold text-[10px] uppercase tracking-[2px]">
                    Exosome Therapy
                  </th>
                  <th className="text-left py-4 px-5 font-semibold text-gold text-[10px] uppercase tracking-[2px]">
                    Stem Cell Therapy
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.factor}
                    className={`border-b border-white/[0.04] ${
                      i % 2 === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-5 font-semibold text-white/85 text-[13px]">
                      {row.factor}
                    </td>
                    <td className="py-3.5 px-5 text-white/25 text-[13px]">
                      {row.surgery}
                    </td>
                    <td className="py-3.5 px-5 text-[13px]">
                      <span
                        className={`inline-flex items-center gap-1.5 ${
                          isPositive(row.prp)
                            ? "font-medium"
                            : "text-white/60"
                        }`}
                        style={
                          isPositive(row.prp) ? { color: "#4ADE80" } : undefined
                        }
                      >
                        <CheckCircleIcon size={14} className="shrink-0" />
                        {row.prp}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[13px]">
                      <span
                        className={`inline-flex items-center gap-1.5 ${
                          isPositive(row.exosomes)
                            ? "font-medium"
                            : "text-white/60"
                        }`}
                        style={
                          isPositive(row.exosomes)
                            ? { color: "#4ADE80" }
                            : undefined
                        }
                      >
                        <CheckCircleIcon size={14} className="shrink-0" />
                        {row.exosomes}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[13px]">
                      <span
                        className={`inline-flex items-center gap-1.5 ${
                          isPositive(row.stemCells)
                            ? "font-medium"
                            : "text-white/60"
                        }`}
                        style={
                          isPositive(row.stemCells)
                            ? { color: "#4ADE80" }
                            : undefined
                        }
                      >
                        <CheckCircleIcon size={14} className="shrink-0" />
                        {row.stemCells}
                      </span>
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
