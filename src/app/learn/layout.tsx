import { Marcellus, Spectral } from "next/font/google";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function LearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${marcellus.variable} ${spectral.variable} brand-root learn-root`}>
      {children}
    </div>
  );
}
