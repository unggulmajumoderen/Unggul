    export const location = {
    name: 'location',
    title: 'Lokasi Cabang/Toko',
    type: 'document',
    fields: [
        {
        name: 'name',
        title: 'Nama Toko / Lokasi',
        type: 'string',
        },
        {
        name: 'description',
        title: 'Deskripsi Singkat',
        type: 'text', // Pakai 'text' biar kotaknya lebih luas buat ngetik deskripsi
        },
        {
        name: 'image',
        title: 'Foto Toko/Lokasi',
        type: 'image',
        options: {
            hotspot: true, // Biar admin bisa nge-crop bagian foto yang paling bagus
        }
        },
        {
        name: 'mapsUrl',
        title: 'URL Google Maps',
        type: 'url',
        description: 'Copy-paste link Google Maps lokasi ini ke sini.',
        }
    ],
    preview: {
        select: {
        title: 'name',
        subtitle: 'description',
        media: 'image',
        },
    },
    }