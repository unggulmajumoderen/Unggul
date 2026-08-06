export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Event',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Tanggal Event',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    },
    {
      name: 'content',
      title: 'Isi Artikel Event',
      type: 'array', 
      of: [{ type: 'block' }] // Ini bakal jadi rich-text editor (bisa bold, italic, dll)
    },
    {
      name: 'gallery',
      title: 'Beberapa Foto Event (Galeri)',
      type: 'array',
      of: [{ type: 'image' }], // Ini ngizinin lu upload banyak foto sekaligus
      options: {
        layout: 'grid', // Tampilan fotonya nanti rapi berjejer
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'gallery.0' // Mengambil foto pertama dari galeri sebagai thumbnail
    }
  }
}