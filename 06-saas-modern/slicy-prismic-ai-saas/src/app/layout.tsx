import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.variable}>
      <body className="bg-[#070815] text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>

      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
