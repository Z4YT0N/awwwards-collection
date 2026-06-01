import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingButton from "@/components/FloatingButton";
import LenisProvider from "./providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jets Animated Landing Page",
  description: "Jets Animated Landing Page built for jet agencies and travel companies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <Navbar />
          {children}
          <FloatingButton />
        </LenisProvider>
      </body>
    </html>
  );
}
