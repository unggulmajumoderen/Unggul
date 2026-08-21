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
  title: "Unggul Mart - Belanja Hemat dan Lengkap",
  description: "Website resmi Unggul Mart",
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