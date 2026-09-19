import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://unggulmart.com'; // Menggunakan domain custom baru

  // Fetch data dari Sanity untuk halaman dinamis
  const dynamicRoutes = await client.fetch(`{
    "berita": *[_type == "news" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt },
    "event": *[_type == "event" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt },
    "promo": *[_type == "promotion" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt },
    "karir": *[_type == "recruitment" && !(_id in path("drafts.**"))] { "slug": slug.current, _updatedAt }
  }`);

  // Halaman Statis
  const staticRoutes = [
    '',
    '/tentang',
    '/visi-budaya',
    '/budaya-perusahaan',
    '/layanan',
    '/program',
    '/lokasi',
    '/promo',
    '/karir',
    '/berita',
    '/event',
    '/search'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Map halaman Berita
  const beritaRoutes = (dynamicRoutes.berita || []).map((item: any) => ({
    url: `${baseUrl}/berita/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Map halaman Event
  const eventRoutes = (dynamicRoutes.event || []).map((item: any) => ({
    url: `${baseUrl}/event/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Map halaman Promo
  const promoRoutes = (dynamicRoutes.promo || []).map((item: any) => ({
    url: `${baseUrl}/promo/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Map halaman Karir
  const karirRoutes = (dynamicRoutes.karir || []).map((item: any) => ({
    url: `${baseUrl}/karir/${item.slug}`,
    lastModified: new Date(item._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...beritaRoutes,
    ...eventRoutes,
    ...promoRoutes,
    ...karirRoutes,
  ];
}
