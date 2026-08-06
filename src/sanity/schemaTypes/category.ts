    export const category = {
    name: 'category',
    title: 'Kategori Berita',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Nama Kategori',
        type: 'string',
        },
        {
        name: 'slug',
        title: 'Slug (URL Unik)',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
        },
        },
    ],
    }