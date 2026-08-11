import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getPromotions() {
  const query = `*[_type == "promotion" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "excerpt": pt::text(description),
    startDate,
    endDate
  }`;
  return client.fetch(query);
}

export default async function PromoPage() {
  const promos = await getPromotions();

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-red-200 selection:text-red-900 pb-20">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="bg-red-700 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">Promo & Diskon Spesial</h1>
          <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Temukan penawaran terbaik dan diskon menarik khusus untuk Anda hari ini!
          </p>
        </div>
      </section>

      {/* PROMO LIST */}
      <section className="container mx-auto px-4 py-16 max-w-6xl -mt-10 relative z-20">
        {promos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promos.map((item: any) => {
              const start = item.startDate ? new Date(item.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : null;
              const end = item.endDate ? new Date(item.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : null;
              const periodText = (start && end) ? `${start} - ${end}` : end ? `Hingga ${end}` : 'Periode Terbatas';

              return (
                <Link key={item._id} href={`/promo/${item.slug || item._id}`} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-2 flex flex-col cursor-pointer">
                  <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-100">
                    {item.imageUrl ? (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {periodText}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">
                      {item.excerpt || "Klik untuk melihat detail promo dan syarat ketentuan yang berlaku."}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-red-600 font-bold group-hover:text-red-700">
                      <span>Lihat Detail</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-md p-16 text-center border border-gray-100 max-w-2xl mx-auto mt-10">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Promo</h3>
            <p className="text-gray-500">Saat ini belum ada promo yang aktif. Nantikan promo menarik dari Unggul Mart selanjutnya!</p>
          </div>
        )}
      </section>
    </main>
  );
}
