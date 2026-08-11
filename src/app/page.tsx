  import { client } from "@/sanity/lib/client";
  import Image from "next/image";
  import Link from "next/link";
  import HeroSlider from "@/components/HeroSlider";
  import PromoSlider from "@/components/PromoSlider"; // <-- Import Slider Promosi Baru
  import Navbar from "@/components/Navbar";

  export const dynamic = 'force-dynamic';

  // 1. Fungsi untuk menarik data Hero Banner
  async function getHeroBanners() {
    const query = `*[_type == "heroBanner" && isActive == true && !(_id in path("drafts.**"))] {
      _id,
      title,
      "imageUrl": image.asset->url,
      link
    }`;
    return client.fetch(query);
  }

// 2. Fungsi untuk menarik data Event
  async function getEvents() {
    const query = `*[_type == "event" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
      _id, title, "slug": slug.current, "imageUrl": gallery[0].asset->url, "excerpt": pt::text(content), date
    }`;
    return client.fetch(query);
  }

  // 3. Fungsi untuk menarik data Berita
  async function getNews() {
    const query = `*[_type == "news" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
      _id, title, "slug": slug.current, "imageUrl": gallery[0].asset->url, "excerpt": pt::text(content), date, "category": category->title
    }`;
    return client.fetch(query);
  }

  // 4. Fungsi untuk menarik data Promosi
  async function getPromotions() {
    const query = `*[_type == "promotion" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "excerpt": pt::text(description)
    }`;
    return client.fetch(query);
  }

  export default async function Home() {
    // Menjalankan fungsi penarik data
    const banners = await getHeroBanners();
    const events = await getEvents();
    const newsList = await getNews();
    const promos = await getPromotions();

    return (
      <main className="bg-white min-h-screen text-gray-800">
        
        {/* 1. NAVBAR SECTION */}
        <Navbar />


        {/* 2. HERO BANNER SECTION (Slider Iklan) */}
        <section className="w-full">
          <HeroSlider banners={banners} />
        </section>

        {/* 3. EVENT SECTION */}
        <section id="event" className="container mx-auto px-4 py-16 scroll-mt-20">
                <div className="flex flex-col items-center mb-6 md:mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                    Update Seputar Unggul Mart
                  </h2>
                </div>
                {/* UBAH DI SINI: grid-cols-2 untuk HP, gap-3 agar jarak tidak terlalu renggang di HP */}
          {/* 3. EVENT SECTION */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {events.length > 0 ? (
                      // TAMBAHIN type="event" DI SINI
                      events.map((item: any) => <CardItem key={item._id} item={item} type="event" />)
                    ) : (
                      <p className="text-center col-span-full text-gray-500 italic">Belum ada event terbaru.</p>
                    )}
                  </div>
              </section>

        {/* 4. BERITA SECTION */}
        <section id="berita" className="container mx-auto px-4 py-12 border-t border-gray-100 scroll-mt-20">
        <div className="flex flex-col items-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Berita Terbaru
          </h2>
        </div>
        {/* UBAH DI SINI JUGA: grid-cols-2 dan gap-3 */}
{/* 4. BERITA SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
          {newsList.length > 0 ? (
            // TAMBAHIN type="berita" DI SINI
            newsList.map((item: any) => <CardItem key={item._id} item={item} type="berita" />)
          ) : (
            <p className="text-center col-span-full text-gray-500 italic">Belum ada berita terbaru.</p>
          )}
        </div>
        <div className="text-center">
          <Link href="/berita" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md hover:-translate-y-1">
            Lihat Semua Berita
          </Link>
        </div>
      </section>

        {/* 5. PROMOSI SECTION (Desain Slider Lebar Ala Indomaret) */}
        {/* w-full dan overflow-hidden di sini penting banget biar layarnya gak geser ke samping */}
          <section id="promo" className="bg-gray-50 py-16 mt-12 border-t border-gray-200 w-full overflow-hidden">
            
            {/* KURUNGAN CONTAINER: Cuma buat ngebungkus Judulnya aja biar sejajar */}
            <div className="container mx-auto px-4 mb-10">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                  Promo Spesial & Diskon
                </h2>
              </div>
            </div>
            
            {/* SLIDER DI LUAR KURUNGAN: Biar bisa bebas meluber sampai mentok ujung kiri-kanan layar! */}
            <PromoSlider promos={promos} />
            
          </section>



      </main>
    );
  }


// =========================================================================
// KOMPONEN KARTU (Event dan Berita)
// =========================================================================
function CardItem({ item, type }: { item: any; type: string }) {
  const formattedDate = item.date 
    ? new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : null;

  // Menentukan URL, kalau slug gak ada, dia pakai _id sebagai cadangan
  const targetUrl = `/${type}/${item.slug || item._id}`;

  return (
    // Kita ubah div jadi Link biar kartunya bisa diklik pindah halaman
    <Link href={targetUrl} className="flex flex-col group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden hover:bg-gray-50 p-2 md:p-3">
      
      {/* Thumbnail Gambar */}
      <div className="relative w-full h-32 md:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.title || "Image"} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs md:text-base">No Image</div>
        )}
        {/* BADGE KATEGORI */}
        {item.category && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md z-10 shadow-sm uppercase tracking-wider">
            {item.category}
          </div>
        )}
      </div>

      {/* Tanggal */}
      {formattedDate && (
        <p className="text-[10px] md:text-xs text-green-700 font-semibold mb-1.5 flex items-center">
          <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {formattedDate}
        </p>
      )}

      {/* Judul */}
      <h3 className="font-bold text-xs md:text-base uppercase mb-1 md:mb-2 line-clamp-2 transition-colors text-gray-900 group-hover:text-green-700">
        {item.title}
      </h3>

      {/* Deskripsi */}
      <p className="text-gray-500 text-[10px] md:text-sm line-clamp-2 md:line-clamp-3">
        {item.excerpt || "Deskripsi belum tersedia..."}
      </p>
    </Link>
  );
}