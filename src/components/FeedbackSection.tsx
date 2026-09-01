import { client } from "@/sanity/lib/client";
import FeedbackForm from "./FeedbackForm";

// Komponen untuk merender bintang
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default async function FeedbackSection() {
  // Ambil data feedback yang sudah di-approve dari Sanity (urut dari terbaru, limit 10)
  const feedbacks = await client.fetch(`
    *[_type == "feedback" && isApproved == true && !(_id in path("drafts.**"))] | order(createdAt desc)[0...6] {
      _id,
      rating,
      message,
      createdAt
    }
  `, {}, { next: { revalidate: 0 } });

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            Ulasan Pelanggan
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Kritik & Saran <span className="text-green-600">Terbaik</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Suara Anda sangat berarti untuk kami. Berikan ulasan pengalaman Anda berbelanja di Unggul Mart.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* KOLOM KIRI: TAMPILAN REVIEW */}
          <div className="w-full lg:w-7/12">
            {feedbacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((fb: any) => (
                  <div key={fb._id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 hover:-translate-y-1 transition-transform">
                    <StarRating rating={fb.rating} />
                    <p className="text-gray-700 italic leading-relaxed mb-6 line-clamp-4">"{fb.message}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                        A
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Pelanggan Anonim</p>
                        <p className="text-xs text-gray-400">
                          {new Date(fb.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-3xl border border-gray-200 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03-8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada ulasan</h3>
                <p className="text-gray-500">Jadilah yang pertama memberikan kritik atau saran untuk kami!</p>
              </div>
            )}
          </div>

          {/* KOLOM KANAN: FORM REVIEW */}
          <div className="w-full lg:w-5/12 sticky top-24">
            <FeedbackForm />
          </div>

        </div>
      </div>
    </section>
  );
}
