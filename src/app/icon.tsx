import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #1A1A1A 0%, #2A2420 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#C8A96E",
            letterSpacing: "-0.5px",
            fontFamily: "serif",
          }}
        >
          HSW
        </span>
      </div>
    ),
    { ...size }
  );
}
