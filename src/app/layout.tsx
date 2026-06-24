import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pre-Order Manager",
  description: "A simple pre-order management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
