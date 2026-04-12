import { StarIcon } from "@/components/ui/Icons";

export function TrustMarquee() {
  const items = (
    <>
      <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-muted">
        <StarIcon size={12} className="text-gold" />
        4.9 Star Rating
      </span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">GMC Registered Specialists</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">10 Harley Street, London</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">6,000+ Patients Assessed</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
      <span className="whitespace-nowrap text-[11px] text-muted">Non-Surgical Experts</span>
      <span className="text-[11px] text-muted/40">&middot;</span>
    </>
  );

  return (
    <div className="bg-[#F6F1E7] py-2.5 border-b border-black/[0.03] marquee-wrap">
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}
