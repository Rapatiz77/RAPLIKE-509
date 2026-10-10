import AnimatedBackground from "../components/AnimatedBackground";

export const metadata = {
  title: "RAPLIKE 509",
  manifest: "/manifest.webmanifest",
  description: "La plateforme des artistes haïtiens et de la diaspora",
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
