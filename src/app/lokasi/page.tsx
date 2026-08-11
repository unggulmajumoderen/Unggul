import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const dynamic = 'force-dynamic';

async function getLocations() {
  const query = `*[_type == "location" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    _id,
    name,
    description,
    "imageUrl": image.asset->url,
    mapsUrl
  }`;
  return client.fetch(query);
}

export default async function LokasiPage() {
  const locations = await getLocations();

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="bg-green-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"></div>
        {/* Dekorasi pola sederhana */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">Lokasi Toko Kami</h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Temukan cabang Unggul Mart terdekat di kota Anda. Kami siap melayani kebutuhan belanja Anda setiap hari dengan senyuman terbaik.
          </p>
        </div>
      </section>

      {/* LOCATIONS LIST */}
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl relative z-20">
        {locations.length > 0 ? (
          <div className="space-y-12 md:space-y-16">
            {locations.map((item: any, index: number) => {
              // Untuk membuat layout zig-zag di desktop: ganjil gambar di kiri, genap gambar di kanan
              const isEven = index % 2 === 1;

              return (
                <div key={item._id} className="bg-white rounded-[32px] shadow-xl overflow-hidden flex flex-col border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                  
                  {/* Bagian Gambar Toko (Sekarang Horizontal di Atas) */}
                  <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] relative bg-gray-100">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        unoptimized 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* Bagian Konten & Peta (Bersebelahan di bawah gambar) */}
                  <div className="w-full p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white">
                    {/* Info Teks */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center mb-3">
                        <div className="bg-red-50 text-red-600 p-2.5 rounded-xl mr-4 shadow-sm border border-red-100">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">{item.name}</h2>
                      </div>
                      
                      <div className="w-12 h-1.5 bg-green-500 rounded-full mb-6 mt-4"></div>
                      
                      <p className="text-gray-600 leading-relaxed text-lg mb-6">
                        {item.description || "Toko Unggul Mart yang nyaman, menyediakan berbagai macam kebutuhan harian Anda dengan harga hemat."}
                      </p>
                    </div>

                    {/* Maps & Button */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      {/* Peta Google Maps Iframe */}
                      <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden mb-6 shadow-inner relative ring-1 ring-gray-200">
                        {/* Overlay yang hilang saat dihover biar peta fokus */}
                        <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10"></div>
                        <iframe 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          style={{ border: 0 }} 
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(item.name)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                          allowFullScreen
                          loading="lazy"
                          className="grayscale group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                      </div>

                      {/* Tombol Arahkan ke Google Maps */}
                      {item.mapsUrl ? (
                        <a 
                          href={item.mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center justify-center w-full px-8 py-4 bg-green-700 text-white rounded-2xl font-bold hover:bg-green-800 hover:shadow-xl transition-all duration-300 group/btn border border-green-600"
                        >
                          <svg className="w-5 h-5 mr-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                          Petunjuk Arah Google Maps
                          <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                      ) : (
                        <button disabled className="inline-flex items-center justify-center w-full px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl font-bold cursor-not-allowed border border-gray-200">
                          Link Maps Belum Tersedia
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-2xl p-20 text-center border border-gray-100 max-w-2xl mx-auto">
            <div className="bg-gray-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">Belum Ada Lokasi</h3>
            <p className="text-gray-500 text-lg">Silakan tambahkan data lokasi toko melalui dashboard CMS Sanity terlebih dahulu agar tampil di sini.</p>
          </div>
        )}
      </section>
    </main>
  );
}
