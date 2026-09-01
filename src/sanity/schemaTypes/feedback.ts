export const feedback = {
  name: 'feedback',
  title: 'Kritik & Saran',
  type: 'document',
  fields: [
    {
      name: 'rating',
      title: 'Rating Bintang',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'message',
      title: 'Pesan (Kritik/Saran)',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isApproved',
      title: 'Tampilkan di Website?',
      type: 'boolean',
      description: 'Matikan (hapus centang) jika pesan ini tidak layak/pantas ditampilkan di halaman depan website.',
      initialValue: true,
    },
    {
      name: 'createdAt',
      title: 'Tanggal Dikirim',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }
  ],
  preview: {
    select: {
      title: 'message',
      rating: 'rating',
      isApproved: 'isApproved',
    },
    prepare(selection: any) {
      const { title, rating, isApproved } = selection;
      return {
        title: title ? (title.length > 50 ? title.substring(0, 50) + '...' : title) : 'Tanpa Pesan',
        subtitle: `⭐ ${rating}/5 | ${isApproved ? '✅ Ditampilkan' : '❌ Disembunyikan'}`,
      }
    }
  },
}
