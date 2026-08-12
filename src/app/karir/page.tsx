import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getRecruitments() {
  const query = `*[_type == "recruitment" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": poster.asset->url,
    startDate,
    endDate,
    "excerpt": pt::text(description)
  }`;
  return client.fetch(query);
}

export default async function KarirPage() {
  const jobs = await getRecruitments();

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="bg-green-900 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">Karir & Rekrutmen</h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Mari bertumbuh bersama Unggul Mart! Temukan peluang karir terbaik dan jadilah bagian dari keluarga besar kami.
          </p>
        </div>
      </section>

      {/* JOBS LIST */}
      <section className="container mx-auto px-4 py-16 max-w-6xl -mt-10 relative z-20">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-10">
            {jobs.map((item: any) => {
              const start = item.startDate ? new Date(item.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : null;
              const end = item.endDate ? new Date(item.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : null;
              const periodText = (start && end) ? `${start} - ${end}` : end ? `Batas Akhir: ${end}` : 'Dibuka';

              return (
                <Link key={item._id} href={`/karir/${item.slug || item._id}`} className="bg-white rounded-[32px] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-2 flex flex-col cursor-pointer max-w-5xl mx-auto w-full">
                  <div className="relative w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-auto block group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full py-20 flex items-center justify-center text-gray-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {periodText}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">
                      {item.excerpt || "Klik untuk melihat detail pekerjaan dan persyaratan rekrutmen ini."}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-green-700 font-bold group-hover:text-green-800">
                      <span>Lihat Detail Lowongan</span>
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
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Lowongan</h3>
            <p className="text-gray-500">Saat ini belum ada lowongan pekerjaan yang tersedia. Nantikan informasi rekrutmen selanjutnya!</p>
          </div>
        )}
      </section>
    </main>
  );
}
