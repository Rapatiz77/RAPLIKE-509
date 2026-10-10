import Link from "next/link";

// ✏️ Modifie seulement ces 3 lignes :
const EMAIL = "TON-EMAIL@exemple.com";
const OWNER = "TON NOM OU NOM DE TON ENTREPRISE";
const COUNTRY = "TON PAYS";

export const metadata = { title: "Politique de confidentialité - RAPLIKE 509" };

const DATA = {
  "title": "Politique de confidentialité",
  "updated": "Dernière mise à jour : 10 octobre 2026",
  "sections": [
    {
      "h": "1. Qui est responsable de tes données",
      "p": [
        "{OWNER} ({COUNTRY}) gère RAPLIKE 509 et décide comment tes données sont utilisées. Contact : {EMAIL}."
      ]
    },
    {
      "h": "2. Les données que nous collectons",
      "p": [
        "Compte : adresse e-mail et mot de passe (le mot de passe est géré de façon sécurisée par notre service d'authentification, nous ne le voyons pas).",
        "Profil : nom d'artiste, bio, photo de profil, langue choisie.",
        "Contenu : titres audio, pochettes, likes et commentaires que tu publies.",
        "Technique : ton navigateur enregistre ta langue et ta session de connexion pour que le site fonctionne."
      ]
    },
    {
      "h": "3. Pourquoi nous les utilisons",
      "p": [
        "Pour créer ton compte, afficher ton profil et tes titres, permettre les likes et commentaires, assurer la sécurité du site et répondre à tes demandes.",
        "Nous ne vendons pas tes données personnelles."
      ]
    },
    {
      "h": "4. Ce qui est public",
      "p": [
        "Ton nom d'artiste, ta bio, ta photo, tes titres, tes pochettes et tes commentaires sont visibles par les visiteurs. Ton adresse e-mail n'est pas affichée publiquement."
      ]
    },
    {
      "h": "5. Services que nous utilisons",
      "p": [
        "Supabase : base de données, connexion et stockage des fichiers. Vercel : hébergement du site. Ces prestataires traitent des données pour notre compte et peuvent les stocker hors de ton pays.",
        "Les lecteurs radio et télévision intégrés (par exemple radio.co ou YouTube) appartiennent à des tiers : ils peuvent utiliser leurs propres cookies et leur propre politique de confidentialité."
      ]
    },
    {
      "h": "6. Durée de conservation",
      "p": [
        "Nous gardons tes données tant que ton compte existe. Si tu demandes la suppression de ton compte, nous supprimons ton profil et tes contenus, sauf ce que la loi nous oblige à conserver."
      ]
    },
    {
      "h": "7. Tes droits",
      "p": [
        "Tu peux demander l'accès à tes données, leur correction, leur suppression, ou t'opposer à leur usage. Écris-nous à {EMAIL}, et nous répondons dans un délai raisonnable."
      ]
    },
    {
      "h": "8. Sécurité",
      "p": [
        "Nous utilisons des connexions chiffrées (HTTPS) et des règles d'accès sur notre base de données. Aucun système n'est parfait : choisis un mot de passe fort et unique."
      ]
    },
    {
      "h": "9. Mineurs",
      "p": [
        "Le service est réservé aux personnes de 13 ans et plus. Si tu penses qu'un enfant plus jeune a créé un compte, écris-nous et nous le supprimerons."
      ]
    },
    {
      "h": "10. Modifications",
      "p": [
        "Nous pouvons modifier cette politique. La date de mise à jour est indiquée en haut de la page."
      ]
    }
  ]
};

const fill = (s) => s.replace("{EMAIL}", EMAIL).replace("{OWNER}", OWNER).replace("{COUNTRY}", COUNTRY);

export default function Page() {
  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "24px 18px 80px", color: "#f4f4f8", fontFamily: "system-ui,sans-serif", lineHeight: 1.6, background: "#05050af2", minHeight: "100vh" }}>
      <Link href="/" style={{ color: "#ef2b3a", fontWeight: 700, textDecoration: "none" }}>{"← RAPLIKE 509"}</Link>
      <h1 style={{ fontSize: 28, margin: "18px 0 4px" }}>{DATA.title}</h1>
      <p style={{ color: "#9a9ab3", marginTop: 0 }}>{DATA.updated}</p>
      {DATA.sections.map((s, i) => (
        <section key={i}>
          <h2 style={{ fontSize: 19, borderLeft: "4px solid #e11129", paddingLeft: 10, marginTop: 28 }}>{s.h}</h2>
          {s.p.map((x, j) => <p key={j} style={{ margin: "8px 0", color: "#dcdce8" }}>{fill(x)}</p>)}
        </section>
      ))}
    </main>
  );
}
