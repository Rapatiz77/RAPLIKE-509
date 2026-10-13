export default function manifest() {
  return {
    name: "RAPLIKE 509",
    short_name: "RAPLIKE 509",
    description: "La plateforme des artistes haïtiens et de la diaspora",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#05050a",
    theme_color: "#05050a",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
