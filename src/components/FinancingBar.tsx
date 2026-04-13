import { FadeIn } from "@/components/ui/FadeIn";

const financeOptions = [
  {
    name: "Klarna",
    logo: "/images/finance/klarna.webp",
    logoAlt: "Klarna logo",
    subtitle: "Pay in 3",
    description:
      "Spread the cost of your treatment over 3 interest-free instalments. No fees, no interest.",
    badges: ["0% Interest", "Available at Checkout"],
    color: "#FFB3C7", // Klarna pink
  },
  {
    name: "Clearpay",
    logo: "/images/finance/clearpay.webp",
    logoAlt: "Clearpay logo",
    subtitle: "Pay in 4",
    description:
      "Shop now and pay over 6 weeks. 4 equal payments, due every 2 weeks.",
    badges: ["Always Interest Free", "Available at Checkout"],
    color: "#B2FCE4", // Clearpay mint
  },
  {
    name: "Ideal 4 Finance",
    logo: "/images/finance/ideal4finance-white.png",
    logoAlt: "Ideal 4 Finance logo",
    logoDark: true,
    subtitle: "Medical Loans",
    description:
      "Flexible loans for treatments over £500. Competitive rates and fast decisions.",
    badges: ["Apply in Minutes", "Apply Now"],
    color: "#C8A96E", // Gold
  },
];

export function FinancingBar() {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1A1A1A 0%, #252118 50%, #1A1A1A 100%)",
      }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-page mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-gold">
                Flexible Payment Options
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-white mb-3">
              Invest in{" "}
              <span className="gradient-text-animated">Yourself</span>
            </h2>
            <p className="text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
              Achieving your health goals shouldn&apos;t be a financial burden.
              We offer seamless payment options tailored to your lifestyle.
            </p>
          </div>
        </FadeIn>

        {/* Finance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {financeOptions.map((option, i) => (
            <FadeIn key={option.name} delay={i * 120}>
              <div
                className="group relative rounded-[20px] p-6 h-full transition-all duration-500 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${option.color}08 0%, transparent 70%)`,
                  }}
                />

                {/* Logo */}
                <div
                  className={`h-10 mb-5 flex items-center ${
                    option.logoDark
                      ? "bg-charcoal-light/80 rounded-lg px-3 w-fit"
                      : ""
                  }`}
                >
                  <img
                    src={option.logo}
                    alt={option.logoAlt}
                    className={`h-7 w-auto object-contain ${
                      option.logoDark ? "brightness-110" : "invert brightness-200"
                    }`}
                  />
                </div>

                {/* Subtitle pill */}
                <div
                  className="inline-flex items-center rounded-full px-3 py-1 mb-3"
                  style={{
                    background: `${option.color}15`,
                    border: `1px solid ${option.color}25`,
                  }}
                >
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: option.color }}
                  >
                    {option.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] text-white/50 leading-relaxed mb-5">
                  {option.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {option.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/60"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-trust-green"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom trust line */}
        <FadeIn delay={400}>
          <div className="flex items-center justify-center gap-2 mt-8">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-trust-green/50"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <p className="text-[11px] text-white/25">
              All payment options are subject to eligibility. Finance is
              provided by regulated third-party providers.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
