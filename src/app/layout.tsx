import type { Metadata, Viewport } from "next";
import { Cinzel_Decorative } from "next/font/google";
import LoaderGate from "@/components/LoaderGate";
import "./globals.css";

export const stylishFont = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-stylish",
});

export const metadata: Metadata = {
  title: "Bhavay Batra",
  description: "My Portfolio Website",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`antialiased ${stylishFont.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <LoaderGate>{children}</LoaderGate>
      </body>
    </html>
  );
}
