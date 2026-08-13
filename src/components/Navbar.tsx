    "use client";

    import { useState } from "react";
    import Link from "next/link";
    import Image from "next/image";
    import { usePathname, useRouter } from "next/navigation";

    export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isTentangOpen, setIsTentangOpen] = useState(false);
    
    const pathname = usePathname();
    const router = useRouter();
    const isBeritaPage = pathname?.startsWith('/berita');
    const isEventPage = pathname?.startsWith('/event');

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            
            {/* 1. Logo (Kiri) */}
            <div className="w-[150px] md:w-[180px] flex-shrink-0">
            <Link href="/" onClick={closeMenu}>
                <Image
                src="/logo1.png"
                alt="Logo Unggul Mart"
                width={180}
                height={48}
                className="object-contain h-10 md:h-12"
                priority
                />
            </Link>
            </div>

            {/* 2. Menu Tengah (Desktop) */}
            <ul className="hidden md:flex flex-1 justify-center items-center space-x-8 font-semibold text-green-800">
            <li className="relative group">
              <button className="flex items-center hover:text-red-500 transition-colors py-2 outline-none">
                Tentang
                <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {/* Dropdown Menu (Muncul saat di-hover) */}
              <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top scale-95 group-hover:scale-100">
                <div className="py-2">
                  <Link href="/tentang" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 hover:font-bold transition-colors">Tentang Unggul</Link>
                  <Link href="/visi-budaya" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 hover:font-bold transition-colors">Visi & Misi</Link>
                  <Link href="/budaya-perusahaan" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 hover:font-bold transition-colors">Budaya Perusahaan</Link>
                  <Link href="/karir" className="block px-5 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 hover:font-bold transition-colors">Karir & Rekrutmen</Link>
                </div>
              </div>
            </li>
            {!isEventPage && <li><Link href="/#event" className="flex items-center hover:text-red-500 transition-colors py-2">Event</Link></li>}
            {!isBeritaPage && <li><Link href="/#berita" className="flex items-center hover:text-red-500 transition-colors py-2">Berita</Link></li>}
            <li><Link href="/layanan" className="flex items-center hover:text-red-500 transition-colors py-2">Layanan</Link></li>
            <li><Link href="/program" className="flex items-center hover:text-red-500 transition-colors py-2">Program</Link></li>
            <li><Link href="/lokasi" className="flex items-center hover:text-red-500 transition-colors py-2">Lokasi</Link></li>
            <li><Link href="/promo" className="flex items-center hover:text-red-500 transition-colors py-2">Promosi</Link></li>
            </ul>

            {/* 3. Search & Hamburger (Kanan) */}
            <div className="flex items-center space-x-3 w-[150px] md:w-[180px] justify-end">
            
            {/* Tombol Search */}
            <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-green-800 hover:text-red-500 transition-colors p-1"
                aria-label="Search"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {/* Tombol Hamburger (Mobile) */}
            <button 
                onClick={toggleMenu} 
                className="md:hidden text-green-800 focus:outline-none p-1"
                aria-label="Toggle Menu"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>

        {/* Box Input Search (Muncul di bawah navbar utama) */}
        {isSearchOpen && (
            <div className="bg-gray-50 px-4 py-3 border-t">
            <form onSubmit={handleSearch} className="container mx-auto max-w-2xl flex">
                <input
                type="text"
                placeholder="Cari berita, promo, atau event..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-green-600 bg-white text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-r-lg hover:bg-green-800">
                Cari
                </button>
            </form>
            </div>
        )}

        {/* ======================================================= */}
        {/* SIDEBAR MOBILE MENU (SLIDE-OVER DARI KANAN)             */}
        {/* ======================================================= */}
        {isOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
            
            {/* Backdrop (Latar belakang jadi agak gelap transparan) */}
            <div 
                className="fixed inset-0 bg-black/50 transition-opacity" 
                onClick={closeMenu}
            />
            
            {/* Panel Sidebar Warna Hijau */}
            <div className="relative ml-auto w-[280px] h-full bg-green-800 text-white shadow-2xl flex flex-col p-6 z-50">
                
                {/* Header Sidebar: Judul & Tombol Close (X) */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-green-700">
                <span className="font-bold text-lg tracking-wide">Menu Navigasi</span>
                <button 
                    onClick={closeMenu}
                    className="text-white hover:text-red-400 p-1 focus:outline-none transition-colors"
                    aria-label="Close Menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>

                {/* Daftar Menu (Teks Putih, Hover jadi Merah) */}
                <div className="flex flex-col space-y-3 font-semibold text-base">
                <div>
                  <button 
                      onClick={() => setIsTentangOpen(!isTentangOpen)} 
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all outline-none"
                  >
                      Tentang
                      <svg className={`w-5 h-5 transform transition-transform duration-300 ${isTentangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {isTentangOpen && (
                    <div className="pl-4 mt-1 flex flex-col space-y-1 mb-2">
                      <Link href="/tentang" onClick={closeMenu} className="py-2 px-3 rounded-lg text-green-100 hover:text-white hover:bg-green-700/50 text-sm transition-colors border-l-2 border-green-500 ml-2">Tentang Unggul</Link>
                      <Link href="/visi-budaya" onClick={closeMenu} className="py-2 px-3 rounded-lg text-green-100 hover:text-white hover:bg-green-700/50 text-sm transition-colors border-l-2 border-green-500 ml-2">Visi & Misi</Link>
                      <Link href="/budaya-perusahaan" onClick={closeMenu} className="py-2 px-3 rounded-lg text-green-100 hover:text-white hover:bg-green-700/50 text-sm transition-colors border-l-2 border-green-500 ml-2">Budaya Perusahaan</Link>
                      <Link href="/karir" onClick={closeMenu} className="py-2 px-3 rounded-lg text-green-100 hover:text-white hover:bg-green-700/50 text-sm transition-colors border-l-2 border-green-500 ml-2">Karir & Rekrutmen</Link>
                    </div>
                  )}
                </div>
                {!isEventPage && (
                  <Link 
                      href="/#event" 
                      onClick={closeMenu} 
                      className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                  >
                      Event
                  </Link>
                )}
                {!isBeritaPage && (
                  <Link 
                      href="/#berita" 
                      onClick={closeMenu} 
                      className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                  >
                      Berita
                  </Link>
                )}
                <Link 
                    href="/layanan" 
                    onClick={closeMenu} 
                    className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                >
                    Layanan
                </Link>
                <Link 
                    href="/program" 
                    onClick={closeMenu} 
                    className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                >
                    Program
                </Link>
                <Link 
                    href="/lokasi" 
                    onClick={closeMenu} 
                    className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                >
                    Lokasi
                </Link>
                <Link 
                    href="/promo" 
                    onClick={closeMenu} 
                    className="py-2.5 px-3 rounded-lg text-white hover:text-red-400 hover:bg-green-700/50 transition-all"
                >
                    Promosi
                </Link>
                </div>

            </div>
            </div>
        )}
        </nav>
    );
    }