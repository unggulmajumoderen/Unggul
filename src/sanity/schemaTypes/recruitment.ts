    export const recruitment = {
    name: 'recruitment',
    title: 'Rekrutmen Pekerja',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Posisi / Nama Lowongan',
        type: 'string',
        description: 'Contoh: Staff IT, Kasir, atau Manager Operasional',
        },
        {
        name: 'slug',
        title: 'Slug URL',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
        },
        {
        name: 'poster',
        title: 'Gambar Poster Lowongan',
        type: 'image',
        options: {
            hotspot: true, 
        }
        },
        {
        name: 'description',
        title: 'Deskripsi Pekerjaan & Persyaratan',
        type: 'array',
        of: [{ type: 'block' }], 
        },
        {
        name: 'startDate',
        title: 'Tanggal Mulai Pendaftaran',
        type: 'date',
        options: {
            dateFormat: 'YYYY-MM-DD',
        }
        },
        {
        name: 'endDate',
        title: 'Tanggal Akhir Pendaftaran',
        type: 'date',
        options: {
            dateFormat: 'YYYY-MM-DD',
        }
        },
        {
        name: 'whatsappNumber',
        title: 'Nomor WhatsApp (Untuk melamar)',
        type: 'string',
        description: 'Contoh: 6285348302778 (Gunakan 62 sebagai ganti 0)',
        }
    ],
    preview: {
        select: {
        title: 'title',
        startDate: 'startDate',
        endDate: 'endDate',
        media: 'poster',
        },
        prepare(selection: Record<string, any>) {
        const { title, startDate, endDate, media } = selection
        
        // Logika biar tampilannya rapi di dashboard: "Tgl Mulai sampai Tgl Akhir"
        const subtitle = (startDate && endDate) 
            ? `${startDate} s/d ${endDate}` 
            : (endDate ? `Batas Akhir: ${endDate}` : 'Periode belum ditentukan')

        return {
            title: title,
            subtitle: subtitle,
            media: media,
        }
        }
    }
    }