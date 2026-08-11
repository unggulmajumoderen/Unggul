import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react"; 
import ShareButtons from "@/components/ShareButtons";

async function getOtherEvents(currentSlug: string) {
  if (!currentSlug) return [];
  const query = `*[_type == "event" && slug.current != $slug] | order(_createdAt desc)[0...4] {
    _id, title, "slug": slug.current, "imageUrl": gallery[0].asset->url, "excerpt": pt::text(content), date
  }`;
  return client.fetch(query, { slug: currentSlug });
}

async function getEventDetail(slug: string) {
  if (!slug) return null;

  // PERUBAHAN UTAMA: gallery[].asset->url (tanpa angka [0]) 
  // Ini bakal narik SEMUA foto yang ada di dalam array gallery Sanity!
  const query = `*[_type == "event" && (_id == $slug || slug.current == $slug)][0] {
    _id, 
    title, 
    "images": gallery[].asset->url, 
    content, 
    date
  }`;
  
  return client.fetch(query, { slug: slug });
}

export default async function EventDetail(props: any) {
  const params = await props.params; 
  const event = await getEventDetail(params.slug);
  const otherEvents = await getOtherEvents(params.slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Event Tidak Ditemukan</h2>
            <p className="text-gray-500 mb-8">Mungkin event yang Anda cari sudah dihapus atau linknya salah.</p>
            <Link href="/" className="inline-block bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 hover:shadow-lg transition-all transform hover:-translate-y-1 font-semibold">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = event.date 
    ? new Date(event.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "Tanggal tidak diketahui";

  // Pisahkan gambar utama (hero) dan gambar galeri (sisanya)
  const hasImages = event.images && event.images.length > 0;
  const heroImage = hasImages ? event.images[0] : null;
  const galleryImages = hasImages && event.images.length > 1 ? event.images.slice(1) : [];

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />
      
      {/* HERO SECTION - Menggunakan gambar pertama sebagai background penuh di atas */}
      <section className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] overflow-hidden bg-green-900">
        {heroImage ? (
          <Image 
            src={heroImage} 
            alt={event.title} 
            fill 
            className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105" 
            unoptimized 
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600"></div>
        )}
        
        {/* Overlay Gradient untuk memastikan teks putih selalu terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        {/* Konten Hero (Judul & Tanggal) di posisikan di bawah */}
        <div className="absolute bottom-0 w-full pb-16 md:pb-24 pt-10">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <Link href="/" className="inline-flex items-center text-green-300 hover:text-white text-sm font-semibold mb-4 transition-colors group">
              <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali ke Beranda
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
              {event.title}
            </h1>
            <div className="flex items-center text-green-100 font-medium text-sm md:text-base">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formattedDate}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT - Dibuat melayang (floating) ke atas hero section */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 -mt-10 md:-mt-16">
        <article className="bg-white rounded-3xl md:rounded-[40px] shadow-2xl p-6 md:p-12 lg:p-16 border border-gray-100">
          
          <div className="max-w-4xl mx-auto">
            {/* 
              KONTEN UTAMA
              Styling custom menggunakan Arbitrary Variants Tailwind 
            */}
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 
              [&_p]:mb-6 [&_p]:leading-relaxed [&_p]:text-gray-700 
              [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-green-900 [&_h2]:mb-6 [&_h2]:mt-10 [&_h2]:leading-snug
              [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-green-800 [&_h3]:mb-4 [&_h3]:mt-8
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6 [&_ul_li]:mb-2 [&_ul_li]:pl-2
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-6 [&_ol_li]:mb-2 [&_ol_li]:pl-2
              [&_blockquote]:border-l-4 [&_blockquote]:border-green-600 [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:bg-green-50 [&_blockquote]:rounded-r-xl [&_blockquote]:my-8 [&_blockquote]:shadow-sm
              [&_a]:text-red-600 [&_a]:font-semibold [&_a:hover]:text-red-700 [&_a]:underline [&_a]:decoration-red-200 [&_a:hover]:decoration-red-600 [&_a]:transition-colors
              [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:my-8 [&_img]:mx-auto [&_img]:w-full [&_img]:object-cover [&_img]:transition-all [&_img]:duration-500 hover:[&_img]:scale-[1.15] hover:[&_img]:z-50 hover:[&_img]:shadow-2xl [&_img]:relative
            ">
              {event.content ? (
                <PortableText value={event.content} />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 6M15 10v4" /></svg>
                  <p className="text-gray-500 font-medium text-lg">Belum ada detail kegiatan yang ditulis.</p>
                </div>
              )}
            </div>

            {/* GALERI FOTO TAMBAHAN (Hanya muncul jika foto > 1) */}
            {galleryImages.length > 0 && (
              <div className="mt-12 md:mt-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Galeri Kegiatan</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((imgUrl: string, index: number) => (
                    <div key={index} className="relative w-full h-40 md:h-56 rounded-2xl shadow-md group cursor-pointer transition-all duration-500 hover:scale-[1.5] md:hover:scale-[1.8] hover:z-50 hover:shadow-2xl">
                      <Image 
                        src={imgUrl} 
                        alt={`${event.title} - foto galeri ${index + 1}`} 
                        fill 
                        className="object-cover rounded-2xl group-hover:object-contain transition-all duration-500 bg-white" 
                        unoptimized 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bagian Bawah Artikel: Tombol Share */}
            <hr className="my-10 border-gray-100" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-6 rounded-2xl">
              <p className="text-sm font-semibold text-gray-700">
                Bagikan event ini ke temanmu:
              </p>
              <ShareButtons title={event.title} />
            </div>
            
          </div>
        </article>
      </section>

      {/* RELATED EVENTS SECTION */}
      {otherEvents && otherEvents.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Event Lainnya</h2>
            <div className="w-20 h-1 bg-green-600 rounded-full mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {otherEvents.map((item: any) => {
              const targetUrl = `/event/${item.slug || item._id}`;
              const itemDate = item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;

              return (
                <Link key={item._id} href={targetUrl} className="flex flex-col group cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-gray-100 p-3">
                  <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  {itemDate && <p className="text-[10px] md:text-xs text-green-700 font-semibold mb-2">{itemDate}</p>}
                  <h3 className="font-bold text-sm md:text-base line-clamp-2 text-gray-900 group-hover:text-green-700 transition-colors mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{item.excerpt}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/event" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md group">
              Lihat Semua Event
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}