import Navbar from "@/components/Navbar";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default function VisiBudayaPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen font-sans selection:bg-green-200 selection:text-green-900 pb-0">
      <Navbar />

      {/* HERO SECTION DENGAN GRADIENT TRANSISI */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex items-center overflow-hidden bg-green-950">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="/unggul-antasari.jpeg"
            alt="Gedung Unggul Mart Antasari"
            fill
            className="object-cover object-center md:object-right opacity-80"
            priority
            unoptimized
          />
        </div>
        
        {/* Gradient Overlay: Deep green on left, fading out diagonally to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/95 to-transparent w-full md:w-3/4"></div>
        
        {/* Subtle patterned overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>

        <div className="container mx-auto px-6 relative z-10 mt-10 md:mt-0">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-300 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              Jati Diri Kami
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
              Visi & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Budaya Kerja.</span>
            </h1>
            <p className="text-green-50 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
              Membangun fondasi kuat berlandaskan nilai Islami untuk melayani masyarakat dan memberikan manfaat nyata bagi agama dan bangsa.
            </p>
          </div>
        </div>
        
        {/* Bottom curve decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.9,130.65,214.34,120,251,114.61,287.65,99.3,321.39,56.44Z" className="fill-[#f8fafc]"></path>
          </svg>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* VISI (Kiri) */}
            <div className="w-full lg:w-5/12">
              <div className="sticky top-32 bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-150"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Visi Kami</h2>
                </div>
                
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium relative z-10">
                  <span className="text-5xl text-green-300 absolute -top-4 -left-4 -z-10 font-serif">"</span>
                  Menjadi perusahaan retail terbesar di Berau yang bertakwa kepada Allah, mempunyai semangat juang Islami, sehingga dapat memenuhi kebutuhan hidup masyarakat serta bermanfaat bagi agama dan Kabupaten Berau.
                </p>
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <Image src="/logo1.png" alt="Logo Unggul" width={150} height={40} className="opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* MISI (Kanan) */}
            <div className="w-full lg:w-7/12 pt-4">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Misi <span className="text-green-700">Perusahaan</span></h2>
                <div className="w-24 h-1.5 bg-green-500 rounded-full"></div>
              </div>

              <div className="space-y-6">
                {[
                  { title: "SDM Islami", desc: "Mewujudkan SDM yang bertakwa dan takut kepada Allah." },
                  { title: "Belanja Nyaman", desc: "Menciptakan tempat berbelanja yang Islami dan nyaman." },
                  { title: "Pelayanan Sepenuh Hati", desc: "Mengutamakan kepuasan pelanggan dengan memberikan pelayanan yang sepenuh hati." },
                  { title: "Produk Variatif", desc: "Menyediakan produk yang variatif, terbaru dan berkualitas." },
                  { title: "Ekspansi Luas", desc: "Hadir di setiap kecamatan." }
                ].map((misi, idx) => (
                  <div key={idx} className="flex gap-6 p-6 md:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-green-100 group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center font-bold text-xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                        {idx + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{misi.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{misi.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BUDAYA KERJA SECTION */}
      <section className="py-24 md:py-32 relative bg-green-900 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white"></div>
          <div className="absolute bottom-10 -right-10 w-64 h-64 rounded-full border-[20px] border-white"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              5 Nilai Budaya Kerja
            </h2>
            <p className="text-xl text-green-100 font-medium opacity-90">
              Pondasi utama yang menjiwai setiap langkah dan pelayanan seluruh tim Unggul Mart.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Integrity",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                desc: "Sikap yang teguh mempertahankan prinsip, tidak mau korupsi, dan menjadi dasar yang melekat pada diri dan perusahaan sebagai nilai-nilai moral."
              },
              {
                title: "Loyality",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
                desc: "Kualitas kesetiaan atau kepatuhan seseorang kepada perusahaan yang ditunjukan dengan sikap dan tindakan."
              },
              {
                title: "Honesty & Openness",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03-8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                desc: "Menjunjung tinggi kejujuran, ketulusan, dan keterbukaan dengan tetap memperhatikan prinsip-prinsip kehati-hatian."
              },
              {
                title: "Respect",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>,
                desc: "Saling menghormati dan menghargai atas semua kinerja ataupun kontribusi yang sudah dilakukan."
              },
              {
                title: "Team Work",
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                desc: "Bekerja sama dan saling melengkapi serta berkomitmen untuk mecapai tujuan bersama secara efektif dan efisien."
              }
            ].map((item, idx) => (
              <div key={idx} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white hover:-translate-y-3 transition-all duration-500 group shadow-lg cursor-default">
                <div className="w-16 h-16 bg-green-800/50 group-hover:bg-green-100 text-white group-hover:text-green-600 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
                  <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gray-900 mb-4 transition-colors duration-300">{item.title}</h3>
                <p className="text-green-50 group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
