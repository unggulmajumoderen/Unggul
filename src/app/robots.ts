import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://unggul-mart-ten.vercel.app'; // Ganti dengan domain custom jika nanti punya

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'], // Cegah bot mengindeks dashboard admin Sanity
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
