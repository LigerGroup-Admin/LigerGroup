import { Bevan, Public_Sans } from "next/font/google";

const bevan = Bevan({
  variable: "--font-bevan",
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
    <div className={`${bevan.variable} ${publicSans.variable} brand-root force-root`}>
      {children}
    </div>
  );
}
