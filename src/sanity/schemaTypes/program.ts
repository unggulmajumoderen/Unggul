export const program = {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nama Program',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka untuk menentukan urutan program di website (misal: 1, 2, 3). Semakin kecil angkanya, semakin di atas.',
      initialValue: 99,
    },
    {
      name: 'description',
      title: 'Deskripsi Program',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Gambar Utama Program',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Foto-foto Kegiatan',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Tambahkan beberapa foto dokumentasi kegiatan program ini.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
}
