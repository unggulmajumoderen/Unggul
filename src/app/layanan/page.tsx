import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import ServiceList from "@/components/ServiceList";

export const dynamic = 'force-dynamic';

async function getServices() {
  const query = `*[_type == "service" && isActive == true && !(_id in path("drafts.**"))] | order(_createdAt asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    instagram,
    whatsapp
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
        <ServiceList services={services} />
      </section>
    </main>
  );
}
