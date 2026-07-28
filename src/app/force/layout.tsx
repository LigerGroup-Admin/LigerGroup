import { Alfa_Slab_One, Public_Sans } from "next/font/google";

const alfaSlab = Alfa_Slab_One({
  variable: "--font-alfa-slab",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function ForceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${alfaSlab.variable} ${publicSans.variable} brand-root force-root`}>
      {children}
    </div>
  );
}
