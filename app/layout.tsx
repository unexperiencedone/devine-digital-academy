import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devine Digital Academy — Master Digital Marketing & Work From Home for ₹999",
  description: "Learn Facebook Ads, Google Ads, Client Acquisition, and Freelancing in Hindi for just ₹999. 100% practical, video-based training by Mr. Vivek Maurya with 12+ years of experience.",
  applicationName: "Devine Digital Academy",
  authors: [{ name: "Mr. Vivek Maurya", url: "https://devinedigitalacademy.co.in" }],
  creator: "Mr. Vivek Maurya",
  publisher: "Devine Digital Academy",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/devine_logo.png",
  },
  keywords: [
    "Digital Marketing Course",
    "Learn Digital Marketing Hindi",
    "Work From Home Jobs",
    "Earn Money From Home",
    "Facebook Ads Course",
    "Instagram Ads Training",
    "Google Ads Course Hindi",
    "Freelancing Course India",
    "Vivek Maurya",
    "Devine Digital Academy",
    "Affordable Marketing Training",
    "Lead Generation Course",
    "Become Freelancer India"
  ],
  alternates: {
    canonical: "https://devinedigitalacademy.co.in",
  },
  openGraph: {
    title: "Master Digital Marketing & Start Freelancing for just ₹999",
    description: "Learn practical lead generation, client closing, and Facebook/Google Ads setup. 30 detailed video lessons in Hindi by Mr. Vivek Maurya. Get certified and work from home.",
    url: "https://devinedigitalacademy.co.in",
    siteName: "Devine Digital Academy",
    images: [
      {
        url: "https://devinedigitalacademy.co.in/devine_logo.png",
        width: 1200,
        height: 630,
        alt: "Devine Digital Academy Logo — Digital Marketing Course",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Digital Marketing for just ₹999 | Devine Digital Academy",
    description: "High-income skills (Facebook Ads, Google Ads, Lead Gen) taught by Mr. Vivek Maurya. 30 lessons, Hindi medium. Start your freelancing career today.",
    images: ["https://devinedigitalacademy.co.in/devine_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Digital Marketing Certification Course",
  "description": "Basic to Advanced practical digital marketing training in Hindi. Learn Facebook & Instagram Ads, Google Ads, client closing, and freelancing for just ₹999.",
  "provider": {
    "@type": "Organization",
    "name": "Devine Digital Academy",
    "url": "https://devinedigitalacademy.co.in",
    "logo": "https://devinedigitalacademy.co.in/devine_logo.png"
  },
  "creator": {
    "@type": "Person",
    "name": "Mr. Vivek Maurya",
    "jobTitle": "Co-Founder, Digital Marketing Consultant"
  },
  "offers": {
    "@type": "Offer",
    "price": "999",
    "priceCurrency": "INR",
    "category": "Paid",
    "availability": "https://schema.org/InStock",
    "url": "https://devinedigitalacademy.co.in"
  },
  "educationalLevel": "Beginner to Advanced",
  "courseCode": "DDA-DM-01",
  "educationalCredentialAwarded": "Digital Marketing Academy Completion Certificate",
  "inLanguage": "hi",
  "syllabusSections": [
    {
      "@type": "Syllabus",
      "name": "Digital Marketing Fundamentals"
    },
    {
      "@type": "Syllabus",
      "name": "Facebook & Instagram Ads Setup"
    },
    {
      "@type": "Syllabus",
      "name": "Google Ads Basics Training"
    },
    {
      "@type": "Syllabus",
      "name": "Freelancing Business Setup (Fiverr, Upwork)"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
