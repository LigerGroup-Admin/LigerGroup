import { ImageResponse } from "next/og";
import { brands } from "@/lib/brands";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brands.learn.accent,
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        L
      </div>
    ),
    size,
  );
}
