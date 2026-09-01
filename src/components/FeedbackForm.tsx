"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Mohon berikan rating bintang terlebih dahulu.");
      return;
    }
    if (!message.trim()) {
      alert("Mohon isi kotak kritik dan saran.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, message }),
      });

      if (!res.ok) throw new Error("Gagal mengirim");
      
      setStatus("success");
      setRating(0);
      setMessage("");
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10"></div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Tinggalkan Ulasan</h3>
      <p className="text-gray-500 mb-8 text-sm">Identitas Anda dirahasiakan (Anonim). Ulasan Anda membantu kami melayani lebih baik.</p>

      {status === "success" ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center animate-fade-in">
          <svg className="w-12 h-12 mb-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h4 className="font-bold text-lg">Terima Kasih!</h4>
          <p className="text-sm mt-1">Ulasan Anda telah berhasil dikirim dan akan direview oleh admin.</p>
          <button 
            onClick={() => setStatus("idle")} 
            className="mt-4 text-green-600 font-bold text-sm hover:underline"
          >
            Kirim Ulasan Lagi
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STAR RATING */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rating Pelayanan</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <svg 
                    className={`w-10 h-10 ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-200'} transition-colors duration-200`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Kritik & Saran</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ceritakan pengalaman Anda berbelanja di Unggul Mart..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none bg-gray-50 text-gray-800"
            ></textarea>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm font-medium">Gagal mengirim, pastikan Anda sedang online atau coba lagi nanti.</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:-translate-y-1 hover:shadow-green-600/30"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Mengirim...
              </>
            ) : (
              "Kirim Ulasan"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
