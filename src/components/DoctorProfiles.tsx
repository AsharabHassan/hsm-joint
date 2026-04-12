import { doctors } from "@/data/doctors";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/FadeIn";
import { ShieldCheckIcon } from "@/components/ui/Icons";

export function DoctorProfiles() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="section-header-label justify-center flex">
              <div className="gold-line" />
              <span>Our Team</span>
              <div className="gold-line" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold mb-3">
              Our Specialists
            </h2>
            <p className="text-sm text-slate max-w-lg mx-auto">
              GMC-registered practitioners with extensive experience in
              non-surgical joint treatments
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <FadeIn key={doctor.name} delay={i * 100}>
              <Card className="text-center h-full">
                {/* Avatar circle with initials */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-lg font-bold"
                  style={{
                    background: "linear-gradient(135deg, #2D5F5D, #1B3A4B)",
                  }}
                >
                  {doctor.initials}
                </div>

                {/* Name & title */}
                <h3 className="font-serif text-h3-mobile lg:text-h3-desktop font-bold mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gold font-semibold mb-3">
                  {doctor.title}
                </p>

                {/* Credential badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {doctor.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="inline-flex items-center gap-1.5 border border-gold/30 text-gold px-3 py-1 rounded-pill text-[11px] font-semibold"
                    >
                      <ShieldCheckIcon size={11} />
                      {cred}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <p className="text-xs text-slate mb-3">{doctor.experience}</p>

                {/* Specialty tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {doctor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-ivory text-muted px-2.5 py-1 rounded-pill text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Trust line */}
        <FadeIn>
          <p className="text-center text-xs text-muted mt-8">
            All practitioners are GMC-registered and practice from our Harley
            Street clinic
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
