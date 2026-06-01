import "../styles/globals.css";
import Nav from "@/components/layout/Nav";
import { ViewTransitions } from "next-view-transitions";

export const metadata = {
  title: "Zajno Digital Studio | Next.js",
  description: "A combination of Landing Page, Page Transitions and WebGL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ViewTransitions>
          <Nav />
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}
