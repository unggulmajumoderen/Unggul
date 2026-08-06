    export const news = {
    name: 'news',
    title: 'Berita & Kegiatan',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Judul Berita',
        type: 'string',
        },
        {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
        },
        {
        name: 'category',
        title: 'Kategori',
        type: 'reference',
        to: [{ type: 'category' }], // INI KUNCINYA: Menghubungkan ke menu Kategori Berita!
        },
        {
        name: 'date',
        title: 'Tanggal',
        type: 'date',
        },
        {
        name: 'content',
        title: 'Isi Artikel',
        type: 'array',
        of: [{ type: 'block' }],
        },
        {
        name: 'gallery',
        title: 'Galeri Foto',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
            layout: 'grid',
        },
        },
    ],
    preview: {
        select: {
        title: 'title',
        subtitle: 'category.title', // Nanti di list dashboard bakal nampilin nama kategorinya di bawah judul
        media: 'gallery.0',
        },
    },
    }