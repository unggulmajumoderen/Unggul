    "use client";

    import { useState, useEffect } from "react";
    import Image from "next/image";
    import Link from "next/link";

    export default function HeroSlider({ banners }: { banners: { _id: string; title: string; imageUrl: string; link?: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Efek geser otomatis tiap 5 detik
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000); 
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

    if (!banners || banners.length === 0) {
        return (
        <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">Belum ada Banner Iklan yang aktif.</p>
        </div>
        );
    }

    return (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] lg:aspect-[3/1] overflow-hidden bg-gray-100">
        
        {/* Track Slider yang bergeser ke kanan/kiri */}
        <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {banners.map((banner) => (
            <div key={banner._id} className="min-w-full relative h-full">
                {banner.link ? (
                <Link href={banner.link}>
                    <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" unoptimized />
                </Link>
                ) : (
                <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" unoptimized />
                )}
            </div>
            ))}
        </div>

        {/* Tombol Panah Kanan & Kiri */}
        {banners.length > 1 && (
            <>
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-800 text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full z-20 shadow-lg transition-all"
            >
                &#10094;
            </button>
            
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-800 text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full z-20 shadow-lg transition-all"
            >
                &#10095;
            </button>

            {/* Titik-titik Navigasi di bawah gambar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20 bg-black/20 px-4 py-2 rounded-full">
                {banners.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-red-500 w-8" : "bg-white/80 w-3 hover:bg-white"
                    }`}
                />
                ))}
            </div>
            </>
        )}
        </div>
    );
    }