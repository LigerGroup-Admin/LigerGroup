import { ImageResponse } from "next/og";
import { brands } from "@/lib/brands";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 30,
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
