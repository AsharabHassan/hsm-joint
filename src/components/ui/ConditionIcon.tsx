import {
  BoneIcon,
  TearIcon,
  LightningIcon,
  FlameIcon,
  SnowflakeIcon,
  AlertIcon,
  LinkChainIcon,
  TennisIcon,
  FootIcon,
  HandIcon,
} from "@/components/ui/Icons";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  bone: BoneIcon,
  tear: TearIcon,
  lightning: LightningIcon,
  flame: FlameIcon,
  snowflake: SnowflakeIcon,
  alert: AlertIcon,
  chain: LinkChainIcon,
  tennis: TennisIcon,
  foot: FootIcon,
  hand: HandIcon,
};

interface ConditionIconProps {
  iconKey: string;
  size?: number;
  className?: string;
}

export function ConditionIcon({ iconKey, size = 24, className = "" }: ConditionIconProps) {
  const Icon = iconMap[iconKey];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
