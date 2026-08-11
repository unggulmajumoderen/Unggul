import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white pt-16 pb-8 border-t-[6px] border-red-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          
          {/* Kolom 1: Logo & Info Perusahaan */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block bg-white px-5 py-3.5 rounded-2xl mb-6 shadow-md">
              <Image 
                src="/logo1.png" 
                alt="Unggul Mart Logo" 
                width={200} 
                height={60} 
                className="object-contain h-10 md:h-12 w-auto"
                priority
              />
            </Link>
            <h3 className="text-xl font-extrabold mb-3 text-green-50 drop-shadow-md tracking-tight">CV. Jaya Makmur Persada.</h3>
            <p className="text-green-200 text-sm md:text-base leading-relaxed mb-6 font-medium">
              Satu-satunya pilihan terbaik untuk belanja hemat, lengkap, dan nyaman bagi keluarga Anda.
            </p>
          </div>

          {/* Kolom 2: Kontak & Alamat */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-5 text-white border-b-2 border-green-800 pb-2 inline-block uppercase tracking-wider text-sm">Kantor Pusat</h4>
            <div className="flex items-start mb-6 text-green-50">
              <svg className="w-6 h-6 mr-3 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="text-sm md:text-base leading-relaxed font-semibold">
                <span className="block text-white font-bold mb-1 text-base">Unggul Mart Murjani</span>
                Jl. DR. Murjani II No.107, Karang Ambun,<br />
                Kec. Tj. Redeb, Kabupaten Berau,<br />
                Kalimantan Timur 77315
              </p>
            </div>
            
            <div className="flex items-center text-green-50 bg-green-900/50 p-4 rounded-xl border border-green-800">
              <div className="bg-red-500 text-white p-2.5 rounded-full mr-4 shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="text-xs text-green-300 font-bold uppercase tracking-wider mb-0.5">Layanan Pelanggan (CS)</p>
                <a href="https://wa.me/6285348302778" target="_blank" rel="noopener noreferrer" className="text-white text-lg md:text-xl font-extrabold hover:text-red-400 transition-colors">
                  085348302778
                </a>
              </div>
            </div>
          </div>

          {/* Kolom 3: Tautan Menu */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b-2 border-green-800 pb-2 inline-block uppercase tracking-wider text-sm">Tautan Cepat</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/promo" className="text-green-200 hover:text-white hover:translate-x-2 inline-flex items-center transition-all text-sm md:text-base font-medium group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span> Promo & Diskon
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-green-200 hover:text-white hover:translate-x-2 inline-flex items-center transition-all text-sm md:text-base font-medium group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span> Layanan Kami
                </Link>
              </li>
              <li>
                <Link href="/lokasi" className="text-green-200 hover:text-white hover:translate-x-2 inline-flex items-center transition-all text-sm md:text-base font-medium group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span> Lokasi Toko
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-green-200 hover:text-white hover:translate-x-2 inline-flex items-center transition-all text-sm md:text-base font-medium group">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span> Berita & Pengumuman
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-900 flex flex-col md:flex-row items-center justify-between">
          <p className="text-green-500 text-sm mb-5 md:mb-0 text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Unggul Mart - CV. Jaya Makmur Persada. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-3">
            <p className="text-sm text-green-300 font-bold mr-2 uppercase tracking-wide">Ikuti Kami:</p>
            {/* Instagram */}
            <a href="https://www.instagram.com/unggul_mart/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-green-900 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group" title="Instagram Unggul Mart">
              <svg className="w-5 h-5 text-green-100 group-hover:text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1GQoDEAJX5/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-green-900 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg group" title="Facebook Unggul Mart">
              <svg className="w-5 h-5 text-green-100 group-hover:text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
