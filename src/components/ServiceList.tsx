"use client";

import { useState } from "react";

export default function ServiceList({ services }: { services: any[] }) {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  if (!services || services.length === 0) {
    return (
      <div className="bg-white rounded-[32px] shadow-xl p-16 text-center border border-gray-100 max-w-2xl mx-auto mt-10">
        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Layanan Belum Tersedia</h3>
        <p className="text-gray-500">Silakan tambahkan data layanan melalui dashboard CMS Sanity terlebih dahulu agar tampil di sini.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((item: any) => (
          <div 
            key={item._id} 
            onClick={() => setSelectedService(item)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-2"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover block group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
              {/* Overlay gradient untuk efek estetik */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating icon */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-3 line-clamp-1">{item.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed flex-1">
                {item.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-gray-100 w-full flex justify-center items-center text-sm font-bold text-green-600 group-hover:text-green-800 transition-colors">
                Lihat Detail Layanan
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-56 md:h-72 shrink-0 bg-gray-100">
              {selectedService.imageUrl ? (
                <img src={selectedService.imageUrl} alt={selectedService.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <h2 className="absolute bottom-6 left-6 right-6 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {selectedService.title}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h4 className="text-sm font-bold text-green-600 uppercase tracking-wider mb-3">Deskripsi Lengkap</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8 md:text-lg">
                {selectedService.description}
              </p>

              {/* Social Links */}
              {(selectedService.instagram || selectedService.whatsapp) && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Hubungi & Ikuti Kami</h4>
                  
                  {selectedService.instagram && (
                    <a 
                      href={selectedService.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center w-full p-4 rounded-2xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100 transition-colors group"
                    >
                      <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-3 rounded-xl text-white mr-4 shadow-md group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-pink-500 font-bold uppercase tracking-wider mb-0.5">Instagram</div>
                        <div className="font-bold text-gray-900 md:text-lg">Lihat Profil Instagram</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  )}

                  {selectedService.whatsapp && (
                    <a 
                      href={`https://wa.me/${selectedService.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center w-full p-4 rounded-2xl border border-green-200 bg-green-50/50 hover:bg-green-100 transition-colors group"
                    >
                      <div className="bg-[#25D366] p-3 rounded-xl text-white mr-4 shadow-md group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">WhatsApp</div>
                        <div className="font-bold text-gray-900 md:text-lg">Kirim Pesan Sekarang</div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
