"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Setiap kali pindah halaman, trigger loading screen
    setIsLoading(true);
    setShow(true);
    
    // Hilangkan loading utama setelah 800ms
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Tunggu animasi fade out selesai (500ms) sebelum komponen benar-benar dihilangkan (display: none)
      setTimeout(() => setShow(false), 500);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative w-40 h-40 md:w-56 md:h-56 animate-pulse">
        <Image 
          src="/logo2.png" 
          alt="Loading Unggul Mart..." 
          fill 
          className="object-contain drop-shadow-xl animate-bounce" 
          priority 
        />
      </div>
      {/* Opsional: Progress bar kecil di bawah logo */}
      <div className="mt-8 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full bg-green-600 rounded-full animate-loading"></div>
      </div>
    </div>
  );
}
