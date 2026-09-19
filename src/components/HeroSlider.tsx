    "use client";

    import { useState, useEffect } from "react";
    import Image from "next/image";
    import Link from "next/link";

    export default function HeroSlider({ banners }: { banners: { _id: string; title: string; imageUrl: string; link?: string }[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    
    // State untuk mendeteksi sentuhan (swipe) di layar HP
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsPaused(true);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsPaused(false);
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50; // Geser jari ke kiri (Next)
        const isRightSwipe = distance < -50; // Geser jari ke kanan (Prev)

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
        
        // Reset
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Efek geser otomatis tiap 5 detik (Timer direset jika user menggeser atau menahan slider)
    useEffect(() => {
        if (banners.length <= 1 || isPaused) return;
        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000); 
        return () => clearInterval(interval);
    }, [banners.length, currentIndex, isPaused]);

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
        <div 
            className="w-full flex flex-col items-center bg-gray-100 pb-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
        
        {/* Kontainer Gambar & Panah */}
        <div 
            className="relative w-full overflow-hidden flex items-center cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
        {/* Track Slider yang bergeser ke kanan/kiri */}
        <div 
            className="flex w-full transition-transform duration-700 ease-in-out items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {banners.map((banner, index) => (
            <div key={banner._id} className="min-w-full flex justify-center">
                {banner.link ? (
                <Link href={banner.link} className="w-full block">
                    <img 
                        src={`${banner.imageUrl}?auto=format&w=1920&q=100`} 
                        srcSet={`${banner.imageUrl}?auto=format&w=600&q=80 600w, ${banner.imageUrl}?auto=format&w=1200&q=90 1200w, ${banner.imageUrl}?auto=format&w=1920&q=100 1920w`}
                        sizes="(max-width: 768px) 600px, (max-width: 1200px) 1200px, 1920px"
                        loading={index === 0 ? "eager" : "lazy"} 
                        fetchPriority={index === 0 ? "high" : "auto"} 
                        alt={banner.title} 
                        className="w-full h-auto block" 
                    />
                </Link>
                ) : (
                <img 
                    src={`${banner.imageUrl}?auto=format&w=1920&q=100`} 
                    srcSet={`${banner.imageUrl}?auto=format&w=600&q=80 600w, ${banner.imageUrl}?auto=format&w=1200&q=90 1200w, ${banner.imageUrl}?auto=format&w=1920&q=100 1920w`}
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1200px, 1920px"
                    loading={index === 0 ? "eager" : "lazy"} 
                    fetchPriority={index === 0 ? "high" : "auto"} 
                    alt={banner.title} 
                    className="w-full h-auto block" 
                />
                )}
            </div>
            ))}
        </div>

        {/* Tombol Panah Kanan & Kiri (Disembunyikan di ukuran HP) */}
        {banners.length > 1 && (
            <>
            <button 
                onClick={prevSlide} 
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-800 text-2xl font-bold w-12 h-12 items-center justify-center rounded-full z-20 shadow-lg transition-all"
            >
                &#10094;
            </button>
            
            <button 
                onClick={nextSlide} 
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-800 text-2xl font-bold w-12 h-12 items-center justify-center rounded-full z-20 shadow-lg transition-all"
            >
                &#10095;
            </button>

            </>
        )}
        </div>

        {/* Titik-titik Navigasi di LUAR gambar (di bawah banner) */}
        {banners.length > 1 && (
            <div className="flex space-x-2 mt-4 mb-2">
                {banners.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-red-500 w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
                    }`}
                />
                ))}
            </div>
        )}
        </div>
    );
    }