    export const herobanner = {
    name: 'heroBanner',
    title: 'Hero Banner (Iklan Atas)',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Judul Internal Banner',
        type: 'string',
        description: 'Contoh: Banner Kemerdekaan, Promo Sembako (Hanya untuk penamaan admin)',
        },
        {
        name: 'image',
        title: 'Gambar Banner',
        type: 'image',
        options: {
            hotspot: true, // Wajib ada biar admin bisa atur fokus gambar versi HP/Desktop
        }
        },
        {
        name: 'link',
        title: 'Link Tujuan (Opsional)',
        type: 'url',
        description: 'Kalau pengunjung ngeklik gambar ini, mau diarahkan ke mana? (Kosongkan jika tidak perlu)',
        },
        {
        name: 'isActive',
        title: 'Tampilkan Banner di Halaman Depan?',
        type: 'boolean',
        description: 'Nyalakan (hijau) agar banner ini masuk ke dalam slider/carousel halaman utama.',
        initialValue: true, // Otomatis nyala saat pertama kali dibikin
        }
    ],
    preview: {
        select: {
        title: 'title',
        isActive: 'isActive',
        media: 'image',
        },
        prepare(selection: { title: string; isActive: boolean; media: unknown }) {
        const { title, isActive, media } = selection
        
        return {
            title: title,
            subtitle: isActive ? '✅ Sedang Tayang' : '❌ Disembunyikan',
            media: media,
        }
        }
    }
    }