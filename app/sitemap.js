export default function sitemap() {
  const base = 'https://raplike-509.vercel.app';
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
