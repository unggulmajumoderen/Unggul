import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

// Menarik SEMUA berita beserta kategori-nya
async function getAllNews() {
  const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
    _id, 
    title, 
    "slug": slug.current, 
    "imageUrl": gallery[0].asset->url, 
    "excerpt": pt::text(content), 
    date,
    "category": category->title
  }`;
  return client.fetch(query);
}

export default async function BeritaPage() {
  const newsList = await getAllNews();

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Berita Terbaru</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Dapatkan informasi, promo, dan kabar terbaru dari Unggul Mart.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newsList.map((item: { _id: string; title: string; slug?: string; imageUrl?: string; excerpt?: string; date?: string; category?: string }) => {
            const targetUrl = `/berita/${item.slug || item._id}`;
            const formattedDate = item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;

            return (
              <Link key={item._id} href={targetUrl} className="flex flex-col group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md p-3">
                <div className="relative w-full rounded-xl overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-auto block group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full py-12 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  {/* Badge Kategori Berita */}
                  {item.category && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm uppercase tracking-wider">
                      {item.category}
                    </div>
                  )}
                </div>
                {formattedDate && <p className="text-[10px] md:text-xs text-green-700 font-semibold mb-1.5">{formattedDate}</p>}
                <h3 className="font-bold text-xs md:text-base uppercase mb-2 line-clamp-2 text-gray-900 group-hover:text-green-700">{item.title}</h3>
                <p className="text-gray-500 text-[10px] md:text-sm line-clamp-3">{item.excerpt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
