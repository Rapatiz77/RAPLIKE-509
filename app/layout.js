import AnimatedBackground from "../components/AnimatedBackground";

export const metadata = {
  metadataBase: new URL("https://raplike-509.vercel.app"),
  title: {
    default: "RAPLIKE 509 | Rap haïtien, radio, TV et clips",
    template: "%s | RAPLIKE 509",
  },
  manifest: "/manifest.webmanifest",
  description:
    "RAPLIKE 509 : la plateforme des artistes haïtiens et de la diaspora. Écoute du rap haïtien, radio, TV, clips vidéo et infos sur les artistes.",
  keywords: [
    "rap haïtien",
    "musique haïtienne",
    "rap kreyòl",
    "radio haïtienne",
    "artistes haïtiens",
    "RAPLIKE 509",
  ],
  alternates: { canonical: "/" },
  verification: {
    google: "1FS20txJ0S7rtxJgDly-YQzP0qwcibYNzLqhWb1o6Jg",
  },
  openGraph: {
    title: "RAPLIKE 509",
    description: "La plateforme des artistes haïtiens et de la diaspora",
    url: "https://raplike-509.vercel.app",
    siteName: "RAPLIKE 509",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: { capable: true, title: "RAPLIKE 509", statusBarStyle: "black-translucent" },
};

export const viewport = { themeColor: "#05050a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#07070c", color: "#f2f2f7", fontFamily: "system-ui, sans-serif" }}>
        <AnimatedBackground />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}",
          }}
        />
      </body>
    </html>
  );
}
