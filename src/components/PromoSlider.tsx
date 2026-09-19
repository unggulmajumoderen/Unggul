    "use client";

    import { useState, useEffect } from "react";
    import Image from "next/image";
    import Link from "next/link";

    export default function PromoSlider({ promos }: { promos: { _id: string; title: string; imageUrl: string; slug?: string }[] }) {
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
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
        
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Efek geser otomatis tiap 5 detik (Timer direset jika user interaksi)
    useEffect(() => {
        if (promos.length <= 1 || isPaused) return;
        const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [promos.length, currentIndex, isPaused]);

    const nextSlide = () => setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? promos.length - 1 : prev - 1));

    if (!promos || promos.length === 0) return null;

    return (
        // RAHASIA UTAMA: Lebar dibatasi 85vw (biar poster utama pas di tengah),
        // tapi overflow-visible membiarkan sisa poster tetep nongol sampai ke ujung layar!
        <div 
            className="relative w-[85vw] max-w-[1200px] mx-auto overflow-visible py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
        
        {/* Track Geser */}
        <div 
            className="relative w-full overflow-visible flex items-center cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
        <div 
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {promos.map((promo) => (
            // w-full = Lebarnya sama kayak wrapper (1200px).
            // px-2 md:px-4 = INI YANG BIKIN ADA JARAK ANTAR POSTER!
            <div key={promo._id} className="w-full shrink-0 px-2 md:px-4">
                
                {/* Box Poster */}
                <Link href={`/promo/${promo.slug || promo._id}`} className="block w-full relative rounded-2xl md:rounded-[30px] overflow-hidden shadow-xl border border-gray-100 bg-white group cursor-pointer">
                <img 
                    src={promo.imageUrl} 
                    alt={promo.title} 
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" 
                />
                </Link>
                
            </div>
            ))}
        </div>

        {/* Tombol Panah (Diposisikan sedikit ke luar agar tidak menutupi informasi poster) */}
        {promos.length > 1 && (
            <>
            <button 
                onClick={prevSlide} 
                className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xl md:text-2xl font-bold w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full z-20 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all border border-gray-200"
            >
                &#10094;
            </button>
            
            <button 
                onClick={nextSlide} 
                className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xl md:text-2xl font-bold w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full z-20 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all border border-gray-200"
            >
                &#10095;
            </button>
            </>
        )}
        </div>
        </div>
    );
    }