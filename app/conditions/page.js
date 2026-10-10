import Link from "next/link";

// ✏️ Modifie seulement ces 3 lignes :
const EMAIL = "TON-EMAIL@exemple.com";
const OWNER = "TON NOM OU NOM DE TON ENTREPRISE";
const COUNTRY = "TON PAYS";

export const metadata = { title: "Conditions d'utilisation - RAPLIKE 509" };

const DATA = {
  "title": "Conditions d'utilisation",
  "updated": "Dernière mise à jour : 10 octobre 2026",
  "sections": [
    {
      "h": "1. Qui sommes-nous",
      "p": [
        "RAPLIKE 509 est une plateforme dédiée à la musique haïtienne et au rap haïtien : écoute de titres, profils d'artistes, radio et télévision. Le service est édité par {OWNER} ({COUNTRY}). Contact : {EMAIL}.",
        "En utilisant le site ou l'application, tu acceptes ces conditions. Si tu n'es pas d'accord, n'utilise pas le service."
      ]
    },
    {
      "h": "2. Ton compte",
      "p": [
        "Il faut avoir au moins 13 ans pour créer un compte. Les informations que tu donnes doivent être exactes.",
        "Tu es responsable de ton mot de passe et de ce qui est fait avec ton compte. Préviens-nous si tu penses qu'il a été piraté."
      ]
    },
    {
      "h": "3. Ce que tu publies",
      "p": [
        "Tu restes propriétaire de tes titres, pochettes, photos, textes et commentaires.",
        "En publiant, tu confirmes que tu détiens tous les droits nécessaires (musique, paroles, voix, beat, samples, images) ou que tu as l'autorisation des ayants droit. Tu confirmes que ton contenu ne viole les droits de personne.",
        "Tu nous accordes le droit gratuit, non exclusif, de stocker, diffuser, afficher et promouvoir ton contenu sur RAPLIKE 509 (site, application, réseaux sociaux de la plateforme), tant que ton contenu reste en ligne. Tu peux le supprimer à tout moment."
      ]
    },
    {
      "h": "4. Contenus interdits",
      "p": [
        "Il est interdit de publier : des titres piratés ou sans autorisation, des contenus haineux, discriminatoires ou menaçant des personnes, du harcèlement, des contenus sexuels impliquant des mineurs, des contenus violents ou illégaux, du spam, des arnaques ou des logiciels malveillants.",
        "Il est aussi interdit d'usurper l'identité d'un artiste ou d'une autre personne."
      ]
    },
    {
      "h": "5. Signalement et retrait",
      "p": [
        "Si tu penses qu'un contenu viole tes droits ou ces conditions, écris à {EMAIL} avec : le lien du contenu, ton nom, et la raison de ta demande (si c'est une question de droits d'auteur, précise l'œuvre concernée et prouve que tu en es le titulaire).",
        "Nous pouvons retirer un contenu sans préavis après un signalement. Nous pouvons suspendre ou supprimer le compte d'un utilisateur qui ne respecte pas ces conditions ou qui récidive."
      ]
    },
    {
      "h": "6. Radio, télévision et liens externes",
      "p": [
        "Les stations de radio et chaînes de télévision sont diffusées via les lecteurs officiels de leurs propriétaires. Elles appartiennent à leurs propriétaires respectifs, et nous ne sommes pas responsables de leur contenu ni de leur disponibilité."
      ]
    },
    {
      "h": "7. Disponibilité et responsabilité",
      "p": [
        "Le service est fourni tel quel, sans garantie de disponibilité continue. Des interruptions, bugs ou pertes de données peuvent arriver.",
        "Dans les limites permises par la loi, nous ne sommes pas responsables des contenus publiés par les utilisateurs ni des dommages indirects liés à l'utilisation du service."
      ]
    },
    {
      "h": "8. Offres payantes et publicité",
      "p": [
        "Nous pourrons ajouter dans le futur des offres payantes (mise en avant, abonnements, pourboires) ou de la publicité. Leurs conditions seront affichées avant tout paiement."
      ]
    },
    {
      "h": "9. Modifications et loi applicable",
      "p": [
        "Nous pouvons modifier ces conditions. La date de mise à jour est indiquée en haut de la page, et continuer à utiliser le service signifie que tu acceptes la nouvelle version.",
        "Ces conditions sont régies par la loi de : {COUNTRY}."
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
