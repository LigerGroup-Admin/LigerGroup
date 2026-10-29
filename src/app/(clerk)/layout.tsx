import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkScopedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Continue to Liger Group Backend",
            titleCombined: "Continue to Liger Group Backend",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
