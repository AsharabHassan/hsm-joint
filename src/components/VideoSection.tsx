import { FadeIn } from "@/components/ui/FadeIn";

interface VideoSectionProps {
  /** The video file path or YouTube embed URL */
  videoSrc?: string;
  /** Title shown above the video */
  title?: string;
  /** Subtitle / description */
  subtitle?: string;
  /** Body area or topic slug — used for placeholder when no video yet */
  topic?: string;
}

export function VideoSection({
  videoSrc,
  title = "Watch: Understanding Your Condition",
  subtitle = "Our specialists explain the latest research on non-surgical treatment options — in plain English.",
  topic = "joint-pain",
}: VideoSectionProps) {
  const isYouTube = videoSrc?.includes("youtube") || videoSrc?.includes("youtu.be");
  const hasVideo = !!videoSrc;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="max-w-page mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-gold">
                Expert Insights
              </span>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <h2 className="font-serif text-h2-mobile lg:text-h2-desktop font-bold text-charcoal mb-3">
              {title}
            </h2>
            <p className="text-sm text-slate max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="max-w-4xl mx-auto">
            {/* Video container with premium frame */}
            <div
              className="relative rounded-[22px] overflow-hidden"
              style={{
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              {/* Gold accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] z-10"
                style={{
                  background:
                    "linear-gradient(90deg, #C8A96E, #E8D5A0, #C8A96E)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s ease infinite",
                }}
              />

              {hasVideo && isYouTube ? (
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={videoSrc}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              ) : hasVideo ? (
                <video
                  src={videoSrc}
                  controls
                  preload="metadata"
                  className="w-full aspect-video bg-black"
                  poster={`/images/video/${topic}-poster.jpg`}
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                /* Placeholder — waiting for video */
                <div
                  className="w-full aspect-video flex flex-col items-center justify-center relative"
                  style={{
                    background:
                      "linear-gradient(160deg, #1A1A1A 0%, #252118 50%, #1A1A1A 100%)",
                  }}
                >
                  <div className="noise-overlay" />
                  <div className="relative z-10 text-center px-6">
                    {/* Play icon */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(200,169,110,0.2) 0%, rgba(200,169,110,0.05) 100%)",
                        border: "2px solid rgba(200,169,110,0.3)",
                        boxShadow: "0 0 40px rgba(200,169,110,0.1)",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gold ml-1"
                      >
                        <path
                          d="M8 5.14v14.72a1 1 0 001.5.86l11.5-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm font-medium mb-2">
                      Video Coming Soon
                    </p>
                    <p className="text-white/30 text-xs max-w-sm mx-auto leading-relaxed">
                      Our specialists are preparing an in-depth video explaining
                      the latest research and treatment options for your condition.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust indicators below video */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-trust-green/50"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                Evidence-based research
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-trust-green/50"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                GMC-registered specialists
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-trust-green/50"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Updated for 2026
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
