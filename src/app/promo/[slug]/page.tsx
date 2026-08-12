import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

async function getPromoDetails(slugOrId: string) {
  const query = `*[_type == "promotion" && (slug.current == $slugOrId || _id == $slugOrId)][0] {
    _id,
    title,
    "imageUrl": image.asset->url,
    description,
    startDate,
    endDate,
    _createdAt
  }`;
  return client.fetch(query, { slugOrId });
}

export default async function PromoDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const promo = await getPromoDetails(params.slug);

  if (!promo) {
    return notFound();
  }

  const start = promo.startDate ? new Date(promo.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;
  const end = promo.endDate ? new Date(promo.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;
  const periodText = (start && end) ? `${start} - ${end}` : end ? `Berlaku hingga ${end}` : 'Periode Terbatas';

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-red-200 selection:text-red-900 pb-20">
      <Navbar />

      <section className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* BREADCRUMB */}
        <nav className="flex mb-6 md:mb-8 text-sm md:text-base text-gray-500 font-medium">
          <Link href="/" className="hover:text-red-600 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/promo" className="hover:text-red-600 transition-colors">Promo</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 line-clamp-1">{promo.title}</span>
        </nav>

        {/* HEADER IMAGE */}
        <div className="w-full mb-8 rounded-3xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
          {promo.imageUrl ? (
            <img 
              src={promo.imageUrl} 
              alt={promo.title} 
              className="w-full h-auto block"
            />
          ) : (
            <div className="w-full py-32 flex items-center justify-center text-gray-300">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          )}
        </div>

        <div className="md:px-4">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-red-100 text-red-700 font-bold px-4 py-1.5 rounded-full text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {periodText}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              {promo.title}
            </h1>

            {/* KONTEN ARTIKEL PROMO */}
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-red-600 hover:prose-a:text-red-700 prose-li:text-gray-600">
              {promo.description ? (
                <PortableText value={promo.description} />
              ) : (
                <p>Belum ada deskripsi lengkap atau syarat dan ketentuan untuk promo ini.</p>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/promo" className="inline-flex items-center text-red-600 font-bold hover:text-red-700 transition-colors group">
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Daftar Promo
              </Link>
            </div>
          </div>
      </section>
    </main>
  );
}
