export const service = {
  name: 'service',
  title: 'Layanan',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nama Layanan',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Deskripsi Layanan',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Gambar Layanan',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan admin untuk crop gambar
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Aktif / Tampilkan',
      type: 'boolean',
      initialValue: true,
      description: 'Matikan jika layanan ini sedang tidak tersedia atau ingin disembunyikan.',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
}
