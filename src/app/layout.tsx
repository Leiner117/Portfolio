import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";
import { CheckDeviceWidth_Provider } from "./utils";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leiner Alvarado - Portfolio",
  description: "Personal Portfolio of Leiner Alvarado Rodriguez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        <LanguageProvider>
          <CheckDeviceWidth_Provider>
            <Navbar />
            <main>{children}</main>
          </CheckDeviceWidth_Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}
