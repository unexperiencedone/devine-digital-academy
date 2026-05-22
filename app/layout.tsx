import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devine Digital Academy — Learn Digital Marketing & Work From Home",
  description: "Basic to Advanced Digital Marketing training by Mr. Vivek Maurya. 30 video lessons, Hindi medium, mobile app based. Enroll for just ₹999.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
