import { Navbar } from "@/components";
import "@/styles/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Flow Party",
  description: "Flow Party Website Clone By Devwithzain",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
