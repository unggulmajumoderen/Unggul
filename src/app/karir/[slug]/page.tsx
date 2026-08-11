import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

async function getRecruitmentDetails(slugOrId: string) {
  const query = `*[_type == "recruitment" && (slug.current == $slugOrId || _id == $slugOrId) && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "imageUrl": poster.asset->url,
    description,
    startDate,
    endDate,
    whatsappNumber,
    _createdAt
  }`;
  return client.fetch(query, { slugOrId });
}

export default async function KarirDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const job = await getRecruitmentDetails(params.slug);

  if (!job) {
    return notFound();
  }

  const start = job.startDate ? new Date(job.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;
  const end = job.endDate ? new Date(job.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;
  const periodText = (start && end) ? `${start} - ${end}` : end ? `Batas Akhir: ${end}` : 'Dibuka Terbuka';

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-20">
      <Navbar />

      <section className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* BREADCRUMB */}
        <nav className="flex mb-6 md:mb-8 text-sm md:text-base text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/karir" className="hover:text-green-600 transition-colors">Karir</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 line-clamp-1">{job.title}</span>
        </nav>

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100 max-w-5xl mx-auto">
          {/* HEADER IMAGE */}
          <div className="relative w-full aspect-[16/5] bg-gray-100 border-b border-gray-100">
            {job.imageUrl ? (
              <Image 
                src={job.imageUrl} 
                alt={job.title} 
                fill 
                className="object-cover md:object-contain bg-green-900/5"
                unoptimized
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
            )}
          </div>

          <div className="p-6 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-green-100 text-green-700 font-bold px-4 py-1.5 rounded-full text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {periodText}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              {job.title}
            </h1>

            {/* TOMBOL LAMAR VIA WHATSAPP */}
            {job.whatsappNumber && (
              <div className="mb-8">
                <a 
                  href={`https://wa.me/${job.whatsappNumber}?text=Halo%20Unggul%20Mart,%20saya%20mendapatkan%20informasi%20dari%20website%20dan%20tertarik%20untuk%20melamar%20posisi%20*${encodeURIComponent(job.title)}*.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Kirim Lamaran via WhatsApp
                </a>
              </div>
            )}

            {/* KONTEN ARTIKEL */}
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-green-600 hover:prose-a:text-green-700 prose-li:text-gray-600">
              {job.description ? (
                <PortableText value={job.description} />
              ) : (
                <p>Belum ada deskripsi lengkap atau persyaratan untuk lowongan ini.</p>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link href="/karir" className="inline-flex items-center text-green-600 font-bold hover:text-green-700 transition-colors group">
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Kembali ke Daftar Lowongan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
