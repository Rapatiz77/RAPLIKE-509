export const metadata = { title: "RAPLIKE 509" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#07070c", color: "#f2f2f7", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
