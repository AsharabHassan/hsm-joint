import {
  KneeIcon,
  HipIcon,
  ShoulderIcon,
  SpineIcon,
  ElbowIcon,
  HandFootIcon,
} from "@/components/ui/Icons";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  "knee-pain": KneeIcon,
  "hip-pain": HipIcon,
  "shoulder-pain": ShoulderIcon,
  "back-pain": SpineIcon,
  "elbow-pain": ElbowIcon,
  "hand-wrist-foot-ankle": HandFootIcon,
};

interface BodyAreaIconProps {
  slug: string;
  size?: number;
  className?: string;
}

export function BodyAreaIcon({ slug, size = 24, className = "" }: BodyAreaIconProps) {
  const Icon = iconMap[slug];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
