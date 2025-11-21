import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Portfolio Landing · Chris Wilson",
  description: "Premium landing page and admin dashboard showcasing active apps."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-midnight text-textPrimary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

