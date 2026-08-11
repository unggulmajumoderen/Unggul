import { client } from "@/sanity/lib/client";
    import Navbar from "@/components/Navbar";
    import Image from "next/image";
    import Link from "next/link";

    export const dynamic = 'force-dynamic';

    // Narik SEMUA event tanpa dibatasi [0...4]
    async function getAllEvents() {
    const query = `*[_type == "event" && !(_id in path("drafts.**"))] | order(_createdAt desc) {
        _id, title, "slug": slug.current, "imageUrl": gallery[0].asset->url, "excerpt": pt::text(content), date
    }`;
    return client.fetch(query);
    }

    export default async function EventPage() {
    const events = await getAllEvents();

    return (
        <main className="bg-gray-50 min-h-screen text-gray-800">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Event Unggul Mart</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Ikuti terus keseruan dan berbagai kegiatan menarik dari kami.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {events.map((item: { _id: string; title: string; slug?: string; imageUrl?: string; excerpt?: string; date?: string }) => {
                const targetUrl = `/event/${item.slug || item._id}`;
                const formattedDate = item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : null;

                return (
                <Link key={item._id} href={targetUrl} className="flex flex-col group cursor-pointer transition-all duration-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md p-3">
                    <div className="relative w-full h-32 md:h-44 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
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