import type { Metadata } from "next";
import { Amaranth, Archivo, Instrument_Serif, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const amaranth = Amaranth({
  variable: "--font-amaranth",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Shared "Liger" logotype serif used across every sub-brand's BrandMark lockup.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Liger Group — Potential, made operational",
    template: "%s — Liger Group",
  },
  description:
    "Liger Group builds talent, deploys capability, and transforms organisational performance across Africa and global markets.",
  openGraph: {
    title: "Liger Group",
    description: "Potential, made operational.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${amaranth.variable} ${archivo.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
