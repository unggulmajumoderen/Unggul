    export const promotion = {
    name: 'promotion',
    title: 'Promo & Diskon',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Nama / Judul Promo',
        type: 'string',
        description: 'Contoh: Diskon Kemerdekaan, Promo Akhir Tahun, dll',
        },
        {
        name: 'slug',
        title: 'Slug URL (Otomatis generate dari judul)',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
        },
        {
        name: 'image',
        title: 'Gambar Poster Promo',
        type: 'image',
        options: {
            hotspot: true, // Biar gambar bisa diatur fokus/crop-nya
        }
        },
        {
        name: 'description',
        title: 'Deskripsi & Syarat Ketentuan',
        type: 'array',
        of: [{ type: 'block' }], 
        },
        {
        name: 'startDate',
        title: 'Tanggal Mulai Promo',
        type: 'date',
        options: {
            dateFormat: 'YYYY-MM-DD',
        }
        },
        {
        name: 'endDate',
        title: 'Tanggal Berakhir Promo',
        type: 'date',
        options: {
            dateFormat: 'YYYY-MM-DD',
        }
        }
    ],
    preview: {
        select: {
        title: 'title',
        startDate: 'startDate',
        endDate: 'endDate',
        media: 'image',
        },
        prepare(selection: { title: string; startDate: string; endDate: string; media: unknown }) {
        const { title, startDate, endDate, media } = selection
        
        // Bikin teks otomatis untuk rentang waktu di list dashboard
        const subtitle = (startDate && endDate) 
            ? `Periode: ${startDate} s/d ${endDate}` 
            : (endDate ? `Berakhir: ${endDate}` : 'Periode belum ditentukan')

        return {
            title: title,
            subtitle: subtitle,
            media: media,
        }
        }
    }
    }