import { FadeIn } from "@/components/ui/FadeIn";
import {
  ClipboardIcon,
  UserCheckIcon,
  StethoscopeIcon,
  HeartPulseIcon,
} from "@/components/ui/Icons";

const steps = [
  {
    number: 1,
    title: "Free Assessment",
    description:
      "Complete our 3-minute clinical questionnaire online — no obligation, completely confidential.",
    icon: ClipboardIcon,
  },
  {
    number: 2,
    title: "Specialist Review",
    description:
      "A GMC-registered specialist reviews your assessment within 24 hours — not 28 weeks.",
    icon: UserCheckIcon,
  },
  {
    number: 3,
    title: "Consultation",
    description:
      "Discuss your results and treatment options at our Harley Street clinic with your dedicated specialist.",
    icon: StethoscopeIcon,
  },
  {
    number: 4,
    title: "Treatment Plan",
    description:
      "Receive a personalised treatment plan tailored to your condition, goals, and lifestyle.",
    icon: HeartPulseIcon,
  },
];

export function PatientJourney() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" />
              <span>Your Journey</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              How It Works
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              From assessment to treatment plan in four simple steps
            </p>
          </div>
        </FadeIn>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-6 relative">
          {/* Connecting gold line */}
          <div
            className="absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, #C8A96E, #B8912E, #C8A96E, #B8912E)",
            }}
          />

          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div className="relative text-center">
                {/* Numbered circle */}
                <div className="relative z-10 mx-auto mb-6">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto border-4 border-cream"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    <step.icon size={28} className="text-white" />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{
                      background: "#1A1A1A",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 80}>
              <div className="flex gap-5">
                {/* Left: line + circle */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8A96E, #B8912E)",
                    }}
                  >
                    <step.icon size={22} className="text-white" />
                    <div
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: "#1A1A1A" }}
                    >
                      {step.number}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="w-[2px] flex-1 min-h-[40px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #C8A96E, #B8912E)",
                      }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-8">
                  <h3 className="font-serif text-h3-mobile font-bold mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
