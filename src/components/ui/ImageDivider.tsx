import { FadeIn } from "@/components/ui/FadeIn";

interface ImageDividerProps {
  src: string;
  alt: string;
  height?: string;
}

export function ImageDivider({ src, alt, height = "h-48 md:h-64" }: ImageDividerProps) {
  return (
    <FadeIn>
      <div className={`relative w-full ${height} overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, transparent 30%, transparent 70%, rgba(26,26,26,0.3) 100%)",
          }}
        />
      </div>
    </FadeIn>
  );
}
