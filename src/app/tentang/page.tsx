import Navbar from "@/components/Navbar";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function TentangPage() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-0">
      <Navbar />

      {/* HERO SECTION DENGAN GRADIENT TRANSISI */}
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-green-900">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/unggul-antasari.jpeg"
            alt="Unggul Mart Antasari"
            fill
            className="object-cover object-center md:object-right"
            priority
            unoptimized
          />
        </div>
        
        {/* Gradient Overlay: Solid on left to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-900/90 to-transparent w-full md:w-3/4"></div>
        {/* Gradient Overlay for bottom blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent h-full w-full"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-left">
            <div className="inline-block bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-100 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              Tentang Kami
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Lebih Dari Sekadar <span className="text-yellow-400">Retail.</span>
            </h1>
            <p className="text-green-50 text-lg md:text-xl font-medium max-w-xl leading-relaxed border-l-4 border-yellow-400 pl-6">
              Menjadi bagian dari keseharian masyarakat Berau dengan menghadirkan pengalaman belanja yang modern, nyaman, dan Islami.
            </p>
          </div>
        </div>
      </section>

      {/* SEJARAH SECTION (Desain tanpa card, tipografi besar) */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
        {/* Elemen Dekorasi / Watermark */}
        <div className="absolute top-10 left-10 md:-left-10 text-[150px] md:text-[250px] font-black text-gray-200/50 leading-none select-none z-0">
          2011
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                Sejarah <span className="text-green-700">Perjalanan</span> Kami
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                <p>
                  <strong className="text-green-800">Berdiri sejak 2011.</strong> Unggul Mart adalah Retail modern Islami yang berdiri sejak 2011 di Berau.
                </p>
                <p>
                  Kami tidak hanya hadir sebagai tempat belanja yang nyaman, tetapi sekaligus menjadi tempat tumbuh dan belajar.
                </p>
                <p>
                  Dengan izin Allah dan dukungan masyarakat, kini Unggul Mart memiliki beberapa cabang dan terus berkembang untuk memberikan pelayanan terbaik.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-green-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-white rounded-full shadow-2xl flex items-center justify-center p-8 border-[10px] border-green-50">
                  <Image 
                    src="/logo-u.png"
                    alt="Logo Unggul"
                    width={200}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTOR BISNIS UNGGUL GROUP */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Sektor Bisnis <span className="text-green-700">Unggul Group</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              Ekspansi kami di berbagai sektor untuk memenuhi kebutuhan keluarga secara menyeluruh.
            </p>
          </div>

          {/* ZIGZAG LAYOUT TANPA CARD KAKU */}
          <div className="space-y-24 md:space-y-32">
            
            {/* 1. Playground */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <Image 
                    src="/unggul-playground.png" 
                    alt="Unggul Playground" 
                    width={350} 
                    height={350} 
                    className="relative z-10 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-4">Wahana Bermain</div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unggul Playground</h3>
                <p className="text-lg text-gray-600">Menyediakan area wahana bermain yang aman, ceria, dan edukatif bagi si kecil. Tempat favorit keluarga untuk menghabiskan akhir pekan bersama.</p>
              </div>
            </div>

            {/* 2. Cosmetic (Reversed) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <Image 
                    src="/unggul-cosmetik.png" 
                    alt="Unggul Cosmetic" 
                    width={350} 
                    height={350} 
                    className="relative z-10 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-right">
                <div className="inline-block bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-4">Pusat Kecantikan</div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unggul Cosmetic</h3>
                <p className="text-lg text-gray-600">Menghadirkan produk kecantikan dan perawatan tubuh berkualitas, halal, dan aman. Tampil memesona dan percaya diri bersama pilihan produk kosmetik unggulan kami.</p>
              </div>
            </div>

            {/* 3. Bakery */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <Image 
                    src="/unggul-bakery.png" 
                    alt="Unggul Bakery" 
                    width={350} 
                    height={350} 
                    className="relative z-10 object-contain drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-4">Aneka Roti & Kue</div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unggul Bakery</h3>
                <p className="text-lg text-gray-600">Sajian roti dan kue yang dipanggang segar setiap hari. Menggunakan bahan-bahan premium halal pilihan, cocok untuk menemani momen santai maupun perayaan istimewamu.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
