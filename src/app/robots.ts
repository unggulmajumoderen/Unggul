import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://unggulmart.com'; // Ganti dengan domain asli jika sudah live

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'], // Cegah bot mengindeks dashboard admin Sanity
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
