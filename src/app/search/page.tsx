import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getSearchResults(queryParam: string) {
  if (!queryParam) return [];
  
  // Membungkus kata kunci dengan wildcard untuk partial match di Sanity
  const keyword = `${queryParam}*`;
  
  // Mencari di tipe news, event, promotion, service, location
  // Atribut yang dicari: title, name, description
  const query = `*[
    _type in ["news", "event", "promotion", "service", "location", "recruitment"] && 
    (
      title match $keyword || 
      name match $keyword || 
      description match $keyword
    )
  ] | order(_createdAt desc) {
    _id,
    _type,
    "title": coalesce(title, name),
    "slug": slug.current,
    "imageUrl": coalesce(image.asset->url, gallery[0].asset->url),
    "description": coalesce(pt::text(content), pt::text(description), description),
    date
  }`;
  
  return client.fetch(query, { keyword });
}

export default async function SearchPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const queryParam = searchParams.q;
  const keyword = Array.isArray(queryParam) ? queryParam[0] : queryParam || "";
  
  const results = await getSearchResults(keyword);

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="bg-green-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-md">Hasil Pencarian</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Menampilkan hasil untuk: <span className="font-bold text-white bg-green-900/50 px-3 py-1 rounded-lg">"{keyword}"</span>
          </p>
        </div>
      </section>

      {/* RESULTS LIST */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Ditemukan {results.length} hasil</h2>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {results.map((item: any) => {
              // Menentukan label tipe dan warna
              let typeLabel = "ITEM";
              let typeColor = "bg-gray-600";
              let targetUrl = "#";

              if (item._type === "news") {
                typeLabel = "BERITA";
                typeColor = "bg-blue-600";
                targetUrl = `/berita/${item.slug || item._id}`;
              } else if (item._type === "event") {
                typeLabel = "EVENT";
                typeColor = "bg-purple-600";
                targetUrl = `/event/${item.slug || item._id}`;
              } else if (item._type === "promotion") {
                typeLabel = "PROMO";
                typeColor = "bg-red-600";
                targetUrl = `/promo/${item.slug || item._id}`;
              } else if (item._type === "service") {
                typeLabel = "LAYANAN";
                typeColor = "bg-yellow-600";
                targetUrl = `/layanan`;
              } else if (item._type === "location") {
                typeLabel = "LOKASI";
                typeColor = "bg-green-700";
                targetUrl = `/lokasi`;
              } else if (item._type === "recruitment") {
                typeLabel = "KARIR";
                typeColor = "bg-teal-600";
                targetUrl = `/karir/${item.slug || item._id}`;
              }

              const itemDate = item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;

              return (
                <Link key={item._id} href={targetUrl} className="flex flex-col group cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1">
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className={`absolute top-3 left-3 ${typeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10 shadow-sm uppercase tracking-wider`}>
                      {typeLabel}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    {itemDate && <p className="text-[11px] text-gray-500 font-semibold mb-2">{itemDate}</p>}
                    <h3 className="font-bold text-lg line-clamp-2 text-gray-900 group-hover:text-green-700 transition-colors mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 break-words">{item.description}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-green-700 text-sm font-bold group-hover:text-green-800">
                      Lihat Detail
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] shadow-sm p-16 text-center border border-gray-100 max-w-2xl mx-auto my-10">
            <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Tidak Ada Hasil</h3>
            <p className="text-gray-500 text-lg mb-8">Maaf, kami tidak menemukan kecocokan untuk kata kunci <span className="font-bold text-gray-700">"{keyword}"</span>.</p>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
