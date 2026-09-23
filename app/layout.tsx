import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROFIT — Field Profitability",
  description: "Understand the operating profitability of each field."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
