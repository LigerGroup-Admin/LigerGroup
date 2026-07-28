import { Staatliches, Work_Sans } from "next/font/google";

const staatliches = Staatliches({
  variable: "--font-staatliches",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RemoteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${staatliches.variable} ${workSans.variable} brand-root remote-root`}>
      {children}
    </div>
  );
}
