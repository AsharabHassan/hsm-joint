interface IconProps {
  className?: string;
  size?: number;
}

function defaultProps(props: IconProps) {
  return {
    width: props.size ?? 24,
    height: props.size ?? 24,
    className: props.className ?? "",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
}

// ─── Body Area Icons ───────────────────────────────────────────

export function KneeIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 2C10.5 2 9 3.5 9 5.5V8L7 12L8 16L9 20C9 21 10 22 12 22C14 22 15 21 15 20L16 16L17 12L15 8V5.5C15 3.5 13.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 14.5L14 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HipIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M6 8C6 8 4 12 4 14C4 16 5.5 18 8 18L10 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 8C18 8 20 12 20 14C20 16 18.5 18 16 18L14 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8C6 5 8 3 12 3C16 3 18 5 18 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ShoulderIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 6V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 6C12 4.5 13 3 14.5 3C16 3 18 4 19 6C20 8 20 10 20 12L18 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6C12 4.5 11 3 9.5 3C8 3 6 4 5 6C4 8 4 10 4 12L6 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 16H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SpineIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 4H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 7.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

export function ElbowIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M8 3V10C8 10 8 13 12 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14C16 13 19 14 20 17L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 3H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HandFootIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M9 3V9L7 13V18C7 20 8.5 21 10 21H14C15.5 21 17 20 17 18V13L15 9V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// ─── Condition Icons ───────────────────────────────────────────

export function BoneIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M8 4C7 3 5 3 4 4C3 5 3 7 4 8L16 20C17 21 19 21 20 20C21 19 21 17 20 16L8 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="18.5" cy="18.5" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function TearIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 4L8 12C8 12 7 15 8 17C9 19 11 20 12 20C13 20 15 19 16 17C17 15 16 12 16 12L12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 13L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LightningIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 22C16 22 19 18 19 14C19 10 16 7 14 5C13.5 8 12 9 11 9C10 9 9 7 9 5C7 7 5 10 5 14C5 18 8 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C14 22 15 20 15 18C15 16 13 15 12 14C11 15 9 16 9 18C9 20 10 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 3L21 19H3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 10V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function LinkChainIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M10 13C10 13 8 11 8 9C8 7 9.5 5 12 5C14.5 5 16 7 16 9C16 11 14 13 14 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11C14 11 16 13 16 15C16 17 14.5 19 12 19C9.5 19 8 17 8 15C8 13 10 11 10 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TennisIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 5C8 8 8 16 5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 5C16 8 16 16 19 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FootIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M7 21C7 21 4 18 4 15C4 12 6 10 7 8C8 6 8 3 10 3C12 3 12 6 12 8C12 6 12 3 14 3C16 3 16 5 16 7L17 10C17 10 20 11 20 14C20 17 17 19 14 20L7 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M7 11V6C7 5 7.5 4 8.5 4C9.5 4 10 5 10 6V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5V3.5C10 2.5 10.5 2 11.5 2C12.5 2 13 2.5 13 3.5V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 4V3C13 2 13.5 1.5 14.5 1.5C15.5 1.5 16 2 16 3V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 6V5C16 4 16.5 3.5 17.5 3.5C18.5 3.5 19 4 19 5V14C19 18 16 21 12 21C8 21 5 18 5 14V11C5 10 5.5 9 6.5 9C7.5 9 8 9.5 7 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Trust & UI Icons ──────────────────────────────────────────

export function StarIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 2L14.4 8.6L21.5 9.2L16 14L17.8 21L12 17.5L6.2 21L8 14L2.5 9.2L9.6 8.6L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationPinIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5.13 15.87 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MedicalCrossIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M12 2L4 6V12C4 16.42 7.4 20.54 12 22C16.6 20.54 20 16.42 20 12V6L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserCheckIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 21C3 17.13 6.13 14 10 14C11 14 12 14.2 12.8 14.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M16 18L18 20L22 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M3 12H7L9 8L12 16L15 10L17 12H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 7L19 12L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <path
        d="M5 4H9L11 9L8.5 10.5C9.57 12.57 11.43 14.43 13.5 15.5L15 13L20 15V19C20 20.1 19.1 21 18 21C9.72 21 3 14.28 3 6C3 4.9 3.9 4 5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...defaultProps(props)}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 21C4 17.13 7.58 14 12 14C16.42 14 20 17.13 20 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Icon map for dynamic lookup ───────────────────────────────

export const bodyAreaIconMap: Record<string, React.FC<IconProps>> = {
  "knee-pain": KneeIcon,
  "hip-pain": HipIcon,
  "shoulder-pain": ShoulderIcon,
  "back-pain": SpineIcon,
  "elbow-pain": ElbowIcon,
  "hand-wrist-foot-ankle": HandFootIcon,
};

export const conditionIconMap: Record<string, React.FC<IconProps>> = {
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
