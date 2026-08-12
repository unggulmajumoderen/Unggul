import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export const dynamic = 'force-dynamic';

async function getServices() {
  const query = `*[_type == "service" && isActive == true && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query);
}

export default async function LayananPage() {
  const services = await getServices();

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[350px] overflow-hidden bg-green-900 flex items-center justify-center">
        <Image 
          src="/unggul-antasari.jpeg" 
          alt="Layanan Unggul Mart" 
          fill 
          className="object-cover opacity-60" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
        <div className="relative z-10 text-center px-4 mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-xl tracking-tight">Layanan Kami</h1>
          <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto font-medium drop-shadow-md">
            Solusi kemudahan berbelanja dan berbagai fasilitas ekstra untuk menunjang kebutuhan harian Anda.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="container mx-auto px-4 py-16 max-w-6xl -mt-10 relative z-20">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((item: any) => (
              <div key={item._id} className="bg-white rounded-[24px] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-2 flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-2/5 overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-auto block group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full py-20 flex items-center justify-center text-gray-300">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  {/* Dekorasi overlay tipis */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col min-w-0">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-50 text-green-700 p-2 rounded-lg mr-3 shadow-sm border border-green-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">{item.title}</h3>
                  </div>
                  
                  <div className="w-12 h-1 bg-green-500 rounded-full mb-5"></div>
                  
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base break-words whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-xl p-16 text-center border border-gray-100 max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Layanan Belum Tersedia</h3>
            <p className="text-gray-500">Silakan tambahkan data layanan melalui dashboard CMS Sanity terlebih dahulu agar tampil di sini.</p>
          </div>
        )}
      </section>
    </main>
  );
}
