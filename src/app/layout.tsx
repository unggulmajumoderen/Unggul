import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script"; 
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://unggul-mart-ten.vercel.app'),
  title: {
    default: "Unggul Mart - Belanja Hemat dan Lengkap",
    template: "%s | Unggul Mart",
  },
  description: "Unggul Mart adalah retail modern Islami di Berau. Tempat belanja hemat, lengkap, nyaman, dan berkualitas.",
  keywords: ["Unggul Mart", "Retail Berau", "Belanja Hemat Berau", "Supermarket Berau", "Swalayan Islami"],
  openGraph: {
    title: "Unggul Mart - Belanja Hemat dan Lengkap",
    description: "Retail modern Islami di Berau. Tempat belanja hemat, lengkap, dan nyaman.",
    url: 'https://unggul-mart-ten.vercel.app',
    siteName: 'Unggul Mart',
    images: [
      {
        url: '/logo-u.png', // Logo Unggul Mart untuk preview WhatsApp/FB
        width: 800,
        height: 600,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={nunito.variable}>
      <body className="min-h-screen bg-white text-gray-800 antialiased">
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-VY9ZJ6ZERR" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VY9ZJ6ZERR');
          `}
        </Script>
        
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}