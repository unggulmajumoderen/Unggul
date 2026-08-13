import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

async function getPrograms() {
  const query = `*[_type == "program" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    "galleryUrls": gallery[].asset->url
  }`;
  return client.fetch(query);
}

export default async function ProgramPage() {
  const programs = await getPrograms();

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="bg-green-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">Program Unggul Mart</h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Berbagai kegiatan, inisiatif, dan program unggulan dari kami untuk memberikan pelayanan serta kontribusi terbaik bagi masyarakat.
          </p>
        </div>
      </section>

      {/* PROGRAMS LIST (NON-CARD DESIGN) */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {programs.length > 0 ? (
          <div className="space-y-24 md:space-y-32">
            {programs.map((item: any, index: number) => {
              // Layout Zig-Zag
              const isEven = index % 2 === 1;

              return (
                <div key={item._id} className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                  
                  {/* BAGIAN GAMBAR UTAMA */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative w-full aspect-[4/3] md:aspect-[1/1] xl:aspect-[4/3] bg-gray-50 overflow-hidden rounded-[40px] shadow-sm border border-gray-100 p-4 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BAGIAN TEKS & GALERI */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                      {item.title}
                    </h2>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                      {item.description}
                    </p>

                    {/* GALERI KEGIATAN (FOTO-FOTO) */}
                    {item.galleryUrls && item.galleryUrls.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-4">
                          Dokumentasi Kegiatan
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {item.galleryUrls.map((img: string, idx: number) => (
                            <div key={idx} className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-2xl group cursor-pointer border border-gray-100 p-2 flex items-center justify-center shadow-sm">
                              <img 
                                src={img} 
                                alt={`Dokumentasi ${item.title} ${idx + 1}`} 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Program Belum Tersedia</h3>
            <p className="text-gray-500 text-lg">Silakan tambahkan data program melalui dashboard CMS Sanity.</p>
          </div>
        )}
      </section>
    </main>
  );
}
