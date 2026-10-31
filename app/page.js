"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const HERO_IMG = "";
// Lien pour contacter l'équipe et activer le premium (ex : "https://wa.me/509XXXXXXXX"). Laisse vide pour masquer le bouton.
const PREMIUM_LINK = "";
// Prix du premium (modifie ces deux lignes pour changer les prix affichés)
const PRICE_MONTH = "4,99 $";
const PRICE_YEAR = "39 $";
// Paiement en Haïti (MonCash / Natcash) : prix en gourdes et numéros à compléter
const PRICE_MONTH_HTG = "650 gourdes";
const PRICE_YEAR_HTG = "5 000 gourdes";
const MONCASH_NUMBER = "";
const NATCASH_NUMBER = "";

const T = {
  fr: { tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", loginBtn: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", artists: "Artistes", music: "Musique", videos: "Vidéos", radio: "Radio", tv: "TV", me: "Profil", pub: "Publier", loginTop: "LOGIN", hero: "La plateforme des artistes haïtiens et de la diaspora", slogan: "ÉCOUTE · REGARDE · PARTAGE · SOUTIENS", radioSub: "Écoute en direct", tvSub: "Chaînes & Émissions", musSub: "Écoute les titres", vidSub: "Regarde & Partage", artistsSub: "Découvre les artistes du moment", seeArtists: "Voir tous les artistes", featured: "ARTISTE À LA UNE", seeProfile: "Voir le profil", posts: "Derniers posts", seePosts: "Voir plus de posts", gallery: "Galerie des artistes", gallerySub: "Photos, pochettes, backstage...", noPhoto: "Aucune photo pour l'instant.", showcase: "Les artistes en vedette", showcaseSub: "Les visages de RAPLIKE 509", soon: "Bientôt disponible", tracksN: "titres", back: "Retour", noBio: "Pas encore de bio.", noArtists: "Aucun artiste pour l'instant.", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)", saved: "Profil enregistré !", search: "Rechercher un artiste ou un titre...", write: "Écrire un commentaire...", post: "Envoyer", nocom: "Aucun commentaire", nostat: "Aucune station pour l'instant.", live: "EN DIRECT", novid: "Aucune vidéo pour l'instant.", listen: "Écouter la radio", stopR: "Arrêter la radio", nowP: "En ce moment", nextP: "Ensuite", noRadio: "La playlist de la radio est vide pour l'instant.", tune: "Touche pour écouter", bad: "Fichier refusé : audio 30 Mo max, image 5 Mo max (JPG, PNG ou WebP).", weak: "Mot de passe trop court : 8 caractères minimum.", badName: "Le nom doit avoir entre 2 et 30 caractères.", unread: "titre(s) illisible(s) ignoré(s)", aboutTitle: "À propos de RAPLIKE 509", owner: "Propriétaire du site et de l'application", notif: "Notifications", notifNone: "Aucune notification.", nTrack: "Nouveau titre", nLike: "a aimé ton titre", nComment: "Nouveau commentaire", nArtist: "Nouvel artiste", nAnn: "ANNONCE", aboutP1: "RAPLIKE 509 est la plateforme de la musique haïtienne et du rap haïtien (rap kreyòl). Écoute les titres des artistes haïtiens et de la diaspora, regarde leurs clips, découvre leurs profils et partage ta musique.", aboutP2: "Sur RAPLIKE 509, tu retrouves aussi RAPLIKE 509 Radio, des stations de radio en direct et des chaînes de télévision haïtiennes. Crée ton compte gratuitement pour publier tes titres, liker et commenter.",
    prem: "Premium", premGo: "Devenir premium", premTitle: "RAPLIKE 509 Premium", premSub: "Plus de visibilité pour ta musique.", premB1: "Ta musique en rotation sur RAPLIKE 509 Radio, 24h/24", premB2: "Tes vidéos YouTube sur le site", premB3: "Une bannière pour promouvoir tes événements", premB4: "Une page Activités qui montre ce que tu fais", premB5: "Badge premium et mise en avant « À la une »", premPay: "Le paiement par carte arrive bientôt. Contacte-nous pour activer ton compte premium.", premContact: "Nous contacter", haiti: "Je suis en Haïti", diaspora: "Je suis dans la diaspora", hStep1: "Envoie le montant par MonCash ou Natcash au numéro ci-dessous.", hStep2: "Envoie la capture du paiement et ton nom d'artiste sur WhatsApp.", hStep3: "Ton compte premium est activé après vérification.", hDur: "Mensuel = 30 jours, annuel = 1 an.", cardSoon: "Paiement par carte : bientôt disponible.", perMonth: "par mois", perYear: "par an", yearSave: "≈ 2 mois offerts", priceFrom: "À partir de", premYou: "Tu es premium ★", premPromo: "Ta musique sur la radio, tes vidéos et tes événements mis en avant.",
    activities: "Activités", events: "Événements à venir", noEvents: "Aucun événement pour l'instant.", seeAct: "Voir les activités", more: "Plus d'infos", del: "Supprimer", premSpace: "Espace premium", askRadio: "Demander la radio", rPending: "En attente de validation", rOk: "À l'antenne", rNo: "Refusé", rSent: "Demande envoyée !", rLen: "Le titre doit durer entre 30 secondes et 15 minutes.", rTitle: "Mes titres pour la radio", noTracks: "Aucun titre.",
    addVideo: "Ajouter une vidéo", vTitle: "Titre de la vidéo", vLink: "Lien YouTube", vBad: "Un titre et un lien YouTube valide sont requis.", vOk: "Vidéo ajoutée !", myVideos: "Mes vidéos",
    addEvent: "Ajouter un événement", evTitle: "Nom de l'événement", evPlace: "Lieu", evDate: "Date et heure", evLink: "Lien https:// (optionnel)", evDesc: "Description (optionnelle)", evBad: "Un nom, une date valide et un lien en https:// (ou vide) sont requis.", evOk: "Événement ajouté !", myEvents: "Mes événements", premVideos: "Vidéos des artistes premium", premTracks: "Titres des artistes premium",
    payCard: "Payer par carte", payWait: "Redirection vers le paiement...", payOk: "Merci ! Paiement reçu. Ton compte premium s'active dans quelques secondes.", payCancel: "Paiement annulé.", payErr: "Erreur de paiement. Réessaie." },
  en: { tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", loginBtn: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", artists: "Artists", music: "Music", videos: "Videos", me: "Profile", pub: "Post", hero: "The platform for Haitian artists and the diaspora", slogan: "LISTEN · WATCH · SHARE · SUPPORT", radioSub: "Listen live", tvSub: "Channels & Shows", musSub: "Listen to tracks", vidSub: "Watch & Share", artistsSub: "Discover artists of the moment", seeArtists: "See all artists", featured: "FEATURED ARTIST", seeProfile: "View profile", posts: "Latest posts", seePosts: "See more posts", gallery: "Artist gallery", gallerySub: "Photos, covers, backstage...", noPhoto: "No photos yet.", showcase: "Featured artists", showcaseSub: "The faces of RAPLIKE 509", soon: "Coming soon", tracksN: "tracks", back: "Back", noBio: "No bio yet.", noArtists: "No artists yet.", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)", saved: "Profile saved!", search: "Search an artist or track...", write: "Write a comment...", post: "Send", nocom: "No comments", nostat: "No stations yet.", live: "LIVE", novid: "No videos yet.", listen: "Listen to the radio", stopR: "Stop the radio", nowP: "Now playing", nextP: "Up next", noRadio: "The radio playlist is empty for now.", tune: "Tap to listen", bad: "File refused: audio 30 MB max, image 5 MB max (JPG, PNG or WebP).", weak: "Password too short: 8 characters minimum.", badName: "The name must be 2 to 30 characters.", aboutTitle: "About RAPLIKE 509", owner: "Owner of the website and the app", notif: "Notifications", notifNone: "No notifications.", nTrack: "New track", nLike: "liked your track", nComment: "New comment", nArtist: "New artist", nAnn: "NEWS", aboutP1: "RAPLIKE 509 is the platform for Haitian music and Haitian rap (Kreyòl rap). Listen to tracks from Haitian artists and the diaspora, watch their videos, discover their profiles and share your music.", aboutP2: "You will also find RAPLIKE 509 Radio, live radio stations and Haitian TV channels. Create a free account to publish your tracks, like and comment.",
    prem: "Premium", premGo: "Go premium", premTitle: "RAPLIKE 509 Premium", premSub: "More visibility for your music.", premB1: "Your music in rotation on RAPLIKE 509 Radio, 24/7", premB2: "Your YouTube videos on the site", premB3: "A banner to promote your events", premB4: "An Activities page showing what you are up to", premB5: "Premium badge and “Featured artist” spotlight", premPay: "Card payment is coming soon. Contact us to activate your premium account.", premContact: "Contact us", haiti: "I am in Haiti", diaspora: "I am in the diaspora", hStep1: "Send the amount by MonCash or Natcash to the number below.", hStep2: "Send the payment screenshot and your artist name on WhatsApp.", hStep3: "Your premium account is activated after verification.", hDur: "Monthly = 30 days, yearly = 1 year.", cardSoon: "Card payment: coming soon.", perMonth: "per month", perYear: "per year", yearSave: "≈ 2 months free", priceFrom: "From", premYou: "You are premium ★", premPromo: "Your music on the radio, your videos and your events in the spotlight.",
    activities: "Activities", events: "Upcoming events", noEvents: "No events yet.", seeAct: "See activities", more: "More info", del: "Delete", premSpace: "Premium space", askRadio: "Request radio", rPending: "Waiting for approval", rOk: "On air", rNo: "Declined", rSent: "Request sent!", rLen: "The track must last between 30 seconds and 15 minutes.", rTitle: "My tracks for the radio", noTracks: "No tracks.",
    addVideo: "Add a video", vTitle: "Video title", vLink: "YouTube link", vBad: "A title and a valid YouTube link are required.", vOk: "Video added!", myVideos: "My videos",
    addEvent: "Add an event", evTitle: "Event name", evPlace: "Place", evDate: "Date and time", evLink: "https:// link (optional)", evDesc: "Description (optional)", evBad: "A name, a valid date and an https:// link (or none) are required.", evOk: "Event added!", myEvents: "My events", premVideos: "Premium artists' videos", premTracks: "Premium artists' tracks",
    payCard: "Pay by card", payWait: "Redirecting to payment...", payOk: "Thank you! Payment received. Your premium account will activate in a few seconds.", payCancel: "Payment cancelled.", payErr: "Payment error. Please try again." },
  ht: { tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", loginBtn: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", artists: "Atis", music: "Mizik", videos: "Videyo", radio: "Radyo", me: "Pwofil", pub: "Pibliye", hero: "Platfòm atis ayisyen yo ak dyaspora a", slogan: "KOUTE · GADE · PATAJE · SIPÒTE", radioSub: "Koute an dirèk", tvSub: "Chèn ak Emisyon", musSub: "Koute mizik yo", vidSub: "Gade ak Pataje", artistsSub: "Dekouvri atis moman an", seeArtists: "Wè tout atis yo", featured: "ATIS NAN VITRIN", seeProfile: "Wè pwofil la", posts: "Dènye piblikasyon", showcase: "Atis ki an vedèt", showcaseSub: "Vizaj RAPLIKE 509", soon: "Talè konsa", tracksN: "mizik", back: "Retounen", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)", saved: "Pwofil la anrejistre !", search: "Chèche yon atis oswa yon mizik...", write: "Ekri yon kòmantè...", post: "Voye", nocom: "Pa gen kòmantè", nostat: "Poko gen estasyon.", live: "AN DIRÈK", novid: "Poko gen videyo.", listen: "Koute radyo a", stopR: "Kanpe radyo a", nowP: "Kounye a", nextP: "Apre sa", noRadio: "Playlist radyo a vid pou kounye a.", tune: "Peze pou koute", aboutTitle: "Sou RAPLIKE 509", owner: "Pwopriyetè sit la ak aplikasyon an", notif: "Notifikasyon", notifNone: "Pa gen notifikasyon.", nTrack: "Nouvo mizik", nLike: "renmen mizik ou", nComment: "Nouvo kòmantè", nArtist: "Nouvo atis", nAnn: "ANONS", aboutP1: "RAPLIKE 509 se platfòm mizik ayisyen ak rap ayisyen (rap kreyòl). Koute mizik atis ayisyen yo ak dyaspora a, gade klip yo, dekouvri pwofil yo epi pataje mizik ou.", aboutP2: "Ou ap jwenn tou RAPLIKE 509 Radio, estasyon radyo an dirèk ak chèn televizyon ayisyen. Kreye yon kont gratis pou pibliye mizik ou, renmen ak kòmante mizik yo.",
    prem: "Premium", perMonth: "pa mwa", perYear: "pa ane", priceFrom: "Depi", premGo: "Vin premium", premTitle: "RAPLIKE 509 Premium", activities: "Aktivite", events: "Evènman k ap vini", noEvents: "Poko gen evènman.", seeAct: "Wè aktivite yo", premSpace: "Espas premium", addVideo: "Ajoute yon videyo", addEvent: "Ajoute yon evènman", del: "Efase" },
  es: { tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", loginBtn: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", artists: "Artistas", music: "Música", videos: "Videos", me: "Perfil", pub: "Publicar", hero: "La plataforma de los artistas haitianos y la diáspora", slogan: "ESCUCHA · MIRA · COMPARTE · APOYA", radioSub: "Escucha en vivo", tvSub: "Canales y Programas", musSub: "Escucha los temas", vidSub: "Mira y Comparte", artistsSub: "Descubre los artistas del momento", seeArtists: "Ver todos los artistas", featured: "ARTISTA DESTACADO", seeProfile: "Ver perfil", posts: "Últimas publicaciones", showcase: "Artistas destacados", showcaseSub: "Los rostros de RAPLIKE 509", soon: "Próximamente", tracksN: "temas", back: "Volver", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)", saved: "¡Perfil guardado!", search: "Buscar un artista o tema...", write: "Escribe un comentario...", post: "Enviar", nocom: "Sin comentarios", nostat: "Aún no hay estaciones.", live: "EN VIVO", novid: "Aún no hay videos.", listen: "Escuchar la radio", stopR: "Detener la radio", nowP: "Ahora suena", nextP: "A continuación", noRadio: "La lista de la radio está vacía por ahora.", tune: "Toca para escuchar", aboutTitle: "Sobre RAPLIKE 509", owner: "Propietario del sitio y de la aplicación", notif: "Notificaciones", notifNone: "Sin notificaciones.", nTrack: "Nuevo tema", nLike: "dio me gusta a tu tema", nComment: "Nuevo comentario", nArtist: "Nuevo artista", nAnn: "ANUNCIO", aboutP1: "RAPLIKE 509 es la plataforma de la música haitiana y el rap haitiano (rap kreyòl). Escucha temas de artistas haitianos y de la diáspora, mira sus videos, descubre sus perfiles y comparte tu música.", aboutP2: "También encontrarás RAPLIKE 509 Radio, emisoras de radio en vivo y canales de televisión haitianos. Crea una cuenta gratis para publicar tus temas, dar me gusta y comentar.",
    prem: "Premium", perMonth: "al mes", perYear: "al año", priceFrom: "Desde", premGo: "Hazte premium", premTitle: "RAPLIKE 509 Premium", activities: "Actividades", events: "Próximos eventos", noEvents: "Aún no hay eventos.", seeAct: "Ver actividades", premSpace: "Espacio premium", addVideo: "Añadir un video", addEvent: "Añadir un evento", del: "Eliminar" },
};
const LANGS = [["en", "English"], ["fr", "Français"], ["ht", "Kreyòl"], ["es", "Español"]];
const COVERS = ["#1f5cff,#07070c", "#e8262f,#07070c", "#1f5cff,#e8262f"];

// ---- Sécurité : limites et vérifications ----
const AUDIO_MAX = 30 * 1024 * 1024;
const IMG_MAX = 5 * 1024 * 1024;
const IMG_TYPES = ["image/jpeg", "image/png", "image/webp"];
const okAudio = (f) => !!f && f.size <= AUDIO_MAX && (f.type || "").startsWith("audio/");
const okImage = (f) => !!f && f.size <= IMG_MAX && IMG_TYPES.includes(f.type);
// URL d'image sûre pour un style CSS (https seulement, sans guillemets)
const cssUrl = (u) => (typeof u === "string" && /^https:\/\//i.test(u) ? 'url("' + u.replace(/["\\\n\r]/g, "") + '")' : "none");
// Source d'iframe sûre (https seulement), avec ou sans le préfixe "iframe:"
const frameSrc = (u) => {
  const s = (u || "").replace(/^iframe:/, "");
  return /^https:\/\//i.test(s) ? s : "";
};
// Identifiant YouTube (11 caractères) à partir d'un lien ou d'un identifiant
const ytId = (u) => {
  const s = (u || "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
};
// Durée d'un fichier audio en secondes (lue dans le navigateur)
function audioDuration(url) {
  return new Promise((resolve, reject) => {
    const a = new Audio();
    a.preload = "metadata";
    a.onloadedmetadata = () => resolve(Math.round(a.duration));
    a.onerror = () => reject(new Error("audio"));
    a.src = url;
  });
}

const P = {
  home: "M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  radio: "M12 14a2 2 0 100-4 2 2 0 000 4zM16.2 7.8a6 6 0 010 8.4M7.8 16.2a6 6 0 010-8.4M19 5a10 10 0 010 14M5 19A10 10 0 015 5",
  tv: "M4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zM17 2l-5 5-5-5",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z",
  chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  play: "M7 4l13 8-13 8z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z",
  prev: "M19 20L9 12l10-8zM5 4v16",
  next: "M5 4l10 8-10 8zM19 4v16",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  video: "M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zM10 9l5 3-5 3z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};
function Icon({ n, s = 22, fill }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={P[n]} />
    </svg>
  );
}
function Avatar({ p, size }) {
  const c = size === "big" ? "avatar" : size === "md" ? "md" : "sm";
  if (p?.avatar_url && /^https:\/\//i.test(p.avatar_url)) return <img className={c} src={p.avatar_url} alt="" />;
  return <div className={c}>{(p?.username || "?")[0].toUpperCase()}</div>;
}
// Badge premium
function PB({ p, full }) {
  if (!p?.is_premium) return null;
  return <span className="pb" title="Premium">{full ? "★ PREMIUM" : "★"}</span>;
}
// Égaliseur animé (barres qui bougent quand "on" est vrai)
function Eq({ on, sm }) {
  return (
    <div className={"eq" + (on ? " on" : "") + (sm ? " sm" : "")}>
      {Array.from({ length: 28 }).map((_, k) => (
        <i key={k} style={{ animationDuration: (0.6 + ((k * 37) % 70) / 100) + "s", animationDelay: ((-((k * 53) % 100)) / 100) + "s" }} />
      ))}
    </div>
  );
}
const fmt = (s) => Math.floor((s || 0) / 60) + ":" + String(Math.floor((s || 0) % 60)).padStart(2, "0");
function ago(d, lang) {
  if (!d) return "";
  try {
    const s = (Date.now() - new Date(d).getTime()) / 1000;
    const r = new Intl.RelativeTimeFormat(lang === "ht" ? "fr" : lang, { numeric: "auto" });
    if (s < 3600) return r.format(-Math.max(1, Math.floor(s / 60)), "minute");
    if (s < 86400) return r.format(-Math.floor(s / 3600), "hour");
    return r.format(-Math.floor(s / 86400), "day");
  } catch (e) { return ""; }
}

// Radio virtuelle en ordre aléatoire : le mélange change à chaque cycle de la playlist,
// mais il est le même pour tous les auditeurs (il dépend seulement de l'heure).
function seeded(seed) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(n, cycle) {
  const a = Array.from({ length: n }, (_, i) => i);
  if (n <= 2) return a;
  const r = seeded(cycle * 2654435761 + 12345);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
// Ordre d'un cycle : évite que le même titre passe deux fois de suite à la jonction
function orderFor(n, cycle) {
  const a = shuffled(n, cycle);
  if (n > 2 && cycle > 0) {
    const prevLast = shuffled(n, cycle - 1)[n - 1];
    if (a[0] === prevLast) { const tmp = a[0]; a[0] = a[1]; a[1] = tmp; }
  }
  return a;
}
// Le jingle (ligne avec is_jingle = true) passe après chaque groupe de 3 musiques.
function radioNow(list, bad = []) {
  const dur = (i) => list[i].duration_seconds || 0;
  const jIdx = list.findIndex((x) => x.is_jingle);
  const songs = list.map((_, i) => i).filter((i) => !list[i].is_jingle && !bad.includes(i));
  const songsTotal = songs.reduce((s, i) => s + dur(i), 0);
  if (!songs.length || songsTotal <= 0) return null;
  const withJ = jIdx >= 0 && !bad.includes(jIdx) && dur(jIdx) > 0;
  const nJ = withJ ? Math.floor(songs.length / 3) : 0;
  const total = songsTotal + (withJ ? nJ * dur(jIdx) : 0);
  const nowSec = Date.now() / 1000;
  const cycle = Math.floor(nowSec / total);
  let p = nowSec % total;
  // Sépare les titres d'un même artiste pour qu'ils ne se suivent pas
  const art = (i) => (list[i].artist || "").trim().toLowerCase();
  const spread = (o) => {
    const a = o.slice();
    for (let k = 1; k < a.length; k++) {
      if (art(a[k]) && art(a[k]) === art(a[k - 1])) {
        for (let j = k + 1; j < a.length; j++) {
          if (art(a[j]) !== art(a[k - 1])) {
            const tmp = a[k]; a[k] = a[j]; a[j] = tmp;
            break;
          }
        }
      }
    }
    return a;
  };
  const build = (c) => {
    const o = spread(orderFor(songs.length, c).map((k) => songs[k]));
    if (!withJ) return o;
    const seq = [];
    o.forEach((s, k) => {
      seq.push(s);
      if ((k + 1) % 3 === 0) seq.push(jIdx);
    });
    return seq;
  };
  const seq = build(cycle);
  for (let k = 0; k < seq.length; k++) {
    const d = dur(seq[k]);
    if (p < d) {
      const next = k + 1 < seq.length ? seq[k + 1] : build(cycle + 1)[0];
      return { i: seq[k], off: p, next };
    }
    p -= d;
  }
  return { i: seq[0], off: 0, next: seq[1 % seq.length] };
}

const css = `
*{box-sizing:border-box}
body{margin:0;background:#020207;color:#f4f4f8;font-family:system-ui,-apple-system,sans-serif}
button{font-family:inherit;cursor:pointer}
.page{max-width:1200px;margin:8px auto;min-height:calc(100vh - 16px);border:2px solid #2b5bff;border-radius:22px;box-shadow:0 0 26px #2b5bff88,inset 0 0 26px #2b5bff2e;background:radial-gradient(60% 30% at 100% 0%,#e1112922,transparent),radial-gradient(60% 30% at 0% 0%,#2b5bff22,transparent),#05050a;padding:0 14px 180px}
.pad{padding-top:48px}
.nav-top{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #e1112955;gap:12px}
.logo{font-style:italic;font-weight:900;font-size:26px;letter-spacing:-1px;cursor:pointer;white-space:nowrap;margin:0}
.logo span{color:#ef2b3a}
.foot{text-align:center;margin:34px 0 8px;font-size:13px;color:#9a9ab3}
.foot a,.legal a{color:#ef2b3a;text-decoration:none}
.foot b{color:#fff;letter-spacing:1px}
.owner{margin-bottom:8px;color:#c9c9dc}
.bellb{position:relative;width:44px;height:44px;border-radius:12px;border:2px solid #e11129;background:#7a0a1844;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;flex:0 0 44px}
.bdot{position:absolute;top:-8px;right:-8px;min-width:20px;height:20px;border-radius:10px;background:#e11129;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 5px}
.bellp{position:fixed;top:74px;left:12px;right:12px;margin:0 auto;max-width:440px;max-height:65vh;overflow-y:auto;background:#0c0c14;border:1px solid #e1112988;border-radius:16px;padding:12px;z-index:90;box-shadow:0 10px 40px #000c}
.nit{display:block;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid #ffffff12;color:#fff;padding:10px 6px;border-radius:8px}
.nit.un{background:#e1112916}
.nit b{display:block;font-size:14px}
.nit small{display:block;color:#9a9ab3;font-size:12px;margin-top:2px}
.nit i{font-style:normal;background:#e11129;font-size:10px;padding:2px 6px;border-radius:5px;margin-right:6px;font-weight:800}
.legal{text-align:center;color:#9a9ab3;font-size:12px;margin:14px 0 0}
.logoimg{height:48px;width:auto;display:block;cursor:pointer}
.links{display:none}
.right{display:flex;gap:8px;align-items:center}
.pubb{display:none}
.loginb{border:2px solid #e11129;background:#7a0a1844;color:#fff;border-radius:12px;padding:10px 16px;font-weight:700;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hero{margin-top:14px;border-radius:16px;min-height:240px;padding:26px 16px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0a1f7a88,#05050a 45%,#8a0f1f88) center/cover;border:1px solid #ffffff14}
.crown{font-size:34px}
.big{font-size:52px;font-weight:900;font-style:italic;letter-spacing:-2px;line-height:1;text-shadow:0 4px 24px #000}
.big span{color:#ef2b3a}
.heroimg{width:100%;max-width:520px;height:auto}
.tagl{font-style:italic;font-weight:400;font-size:18px;margin:12px 0 8px;max-width:520px}
.slog{letter-spacing:4px;font-size:11px;color:#b9b9cc}
.quick{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
.qc{display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #e11129;border-radius:14px;background:#0008;color:#fff;text-align:left}
.qc b{display:block;font-size:16px;letter-spacing:.5px;text-transform:uppercase}
.qc small{color:#b9b9cc}
.cols{display:grid;gap:14px}
.panel{border:1px solid #e1112955;border-radius:16px;padding:14px;background:#ffffff05;margin-bottom:14px}
.ptitle{margin:0 0 4px;font-size:20px;letter-spacing:.5px;text-transform:uppercase;border-left:4px solid #e11129;padding-left:10px}
.about p{color:#c9c9dc;line-height:1.6;font-size:15px;margin:10px 0 0}
.artgrid{display:grid;gap:14px}
.arow{display:flex;align-items:center;gap:12px;width:100%;background:none;border:0;color:#fff;padding:8px 0;text-align:left}
.arow small{display:block;color:#9a9ab3}
.outl{display:block;border:2px solid #e11129;border-radius:12px;background:#0006;color:#fff;font-weight:700;padding:11px 16px;margin-top:12px}
.outl.small{display:inline-block;margin-top:8px}
a.outl{text-decoration:none}
.feat{position:relative;min-height:260px;border-radius:14px;border:1px solid #e1112966;background:linear-gradient(135deg,#1f3fff55,#e1112955) center/cover;display:flex;align-items:flex-end;padding:18px}
.ft{padding-bottom:14px;padding-left:34px}
.ft h2{margin:6px 0;font-size:34px;font-style:italic}
.ft p{margin:0;color:#e0e0ee}
.tag{display:inline-block;background:#e11129;color:#fff;font-size:11px;font-weight:800;letter-spacing:1px;padding:5px 10px;border-radius:6px}
.arr{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:1px solid #fff4;background:#0009;color:#fff;font-size:22px}
.arr.l{left:8px}.arr.r{right:8px}
.dots{position:absolute;bottom:8px;left:0;right:0;display:flex;justify-content:center;gap:8px}
.dots i{width:9px;height:9px;border-radius:50%;background:#ffffff44}
.dots i.on{background:#e11129}
.fade{position:relative;height:340px;border-radius:16px;overflow:hidden;border:1px solid #e1112966;background:#0a0a14;margin-top:12px}
.fs{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity 1.3s ease-in-out;background-size:cover;background-position:center;display:flex;align-items:flex-end;padding:20px;pointer-events:none}
.fs.on{opacity:1;pointer-events:auto}
.fcap{position:relative;z-index:2;padding-bottom:18px}
.fcap h3{margin:8px 0 0;font-size:30px;font-style:italic;text-shadow:0 2px 14px #000}
.fcap small{display:block;color:#e0e0ee;margin-top:2px}
.fdots{position:absolute;bottom:10px;left:0;right:0;display:flex;justify-content:center;gap:8px;z-index:3}
.fdots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:#ffffff55}
.fdots button.on{background:#e11129}
.post{display:flex;align-items:center;gap:12px;width:100%;background:none;border:0;border-bottom:1px solid #ffffff12;color:#fff;padding:10px 0;text-align:left}
.pt{flex:1;min-width:0}
.pt b,.pt small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pt small{color:#9a9ab3;font-size:12px}
.hc{display:flex;align-items:center;gap:5px;color:#b9b9cc;font-size:13px}
.th{width:54px;height:54px;border-radius:10px;background:#222 center/cover;flex:0 0 54px;border:1px solid #e1112966}
.gal{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px}
.gal i{flex:0 0 140px;height:140px;border-radius:10px;background:#222 center/cover;border:1px solid #e1112966}
.agrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px}
.acard{background:#ffffff08;border:1px solid #e1112955;border-radius:14px;padding:16px 10px;color:#fff;text-align:center}
.acard b{display:block;margin-top:8px}
.acard small{color:#9a9ab3}
.vcard{padding:8px 8px 12px}
.vcard img{width:100%;display:block;border-radius:10px;aspect-ratio:16/9;object-fit:cover}
h2.st2{font-size:20px;text-transform:uppercase;letter-spacing:.5px;margin:18px 0 12px}
.sub{color:#9a9ab3;margin:0 0 16px;font-size:14px}
input,textarea{display:block;width:100%;padding:14px 16px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:16px;font-family:inherit}
textarea{min-height:90px}
label{display:block;margin-top:14px;color:#9a9ab3;font-size:13px}
.btn{display:block;width:100%;padding:15px;margin-top:14px;border:0;border-radius:14px;background:linear-gradient(90deg,#2f6bff,#a855f7,#ef4444);color:#fff;font-weight:700;font-size:16px}
.btn:disabled{opacity:.6}
.alt{background:#ffffff0a;border:1px solid #ffffff18}
.form{max-width:420px;margin:30px auto}
.lang button{display:block;width:100%;padding:17px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:17px;text-align:left}
.row{background:#ffffff08;border:1px solid #ffffff14;border-radius:16px;padding:12px;margin-bottom:10px}
.rh{display:flex;align-items:center;gap:12px}
.rt{flex:1;min-width:0}
.rt b,.rt small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rt small{color:#9a9ab3}
.pl{width:42px;height:42px;border-radius:50%;border:0;background:linear-gradient(135deg,#2f6bff,#ef4444);color:#fff;display:flex;align-items:center;justify-content:center}
.act{display:flex;gap:20px;margin-top:10px}
.act button{background:none;border:0;color:#9a9ab3;font-size:14px;display:flex;align-items:center;gap:6px;padding:0}
.act .liked{color:#ef4444}
.cbox{margin-top:10px;padding-top:10px;border-top:1px solid #ffffff14}
.cm{padding:6px 0;font-size:14px}
.cm b{color:#c084fc;margin-right:6px}
.crow{display:flex;gap:8px;margin-top:8px}
.crow input{margin-top:0;flex:1}
.crow button{border:0;border-radius:12px;padding:0 16px;background:linear-gradient(90deg,#2f6bff,#ef4444);color:#fff;font-weight:600}
.sm,.md{border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:inline-flex;align-items:center;justify-content:center;font-weight:800;color:#fff;flex:0 0 auto}
.sm{width:32px;height:32px;font-size:13px}
.md{width:48px;height:48px;font-size:18px;border:2px solid #e11129}
.avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:800;margin:10px auto;box-shadow:0 0 0 3px #e11129}
.stn{background:#ffffff08;border:1px solid #ffffff14;border-radius:18px;padding:16px;margin-bottom:14px}
.liveb{color:#ef4444;font-size:12px;font-weight:800;letter-spacing:1px;display:flex;align-items:center;gap:6px;margin-bottom:6px}
.liveb i{width:8px;height:8px;border-radius:50%;background:#ef4444;animation:p 1.4s infinite}
@keyframes p{50%{opacity:.3}}
audio{width:100%}
.vid{width:100%;aspect-ratio:16/9;border:0;border-radius:12px;margin-top:10px;background:#000}
.msg{color:#9a9ab3;min-height:20px;font-size:14px;margin-top:8px}
.rp{position:relative;border-radius:22px;padding:18px;margin-bottom:16px;background:radial-gradient(80% 60% at 0% 0%,#2b5bff40,transparent),radial-gradient(80% 60% at 100% 100%,#e1112940,transparent),#0a0a14;border:1px solid #2b5bff88;box-shadow:0 0 24px #2b5bff44}
.rp.on{border-color:#e11129aa;box-shadow:0 0 30px #e1112966,0 0 30px #2b5bff44}
.rtop{display:flex;align-items:center;justify-content:space-between;gap:10px}
.eq{display:flex;align-items:flex-end;justify-content:center;gap:3px;height:76px;margin:16px 0 12px}
.eq.sm{height:42px;margin:12px 0 10px}
.eq i{flex:1;max-width:9px;min-width:3px;height:100%;border-radius:4px;background:linear-gradient(180deg,#e11129,#2f6bff);transform-origin:bottom;transform:scaleY(.12);opacity:.45}
.eq.on i{animation:eqb 1s ease-in-out infinite;opacity:1;box-shadow:0 0 8px #e1112988}
@keyframes eqb{0%,100%{transform:scaleY(.12)}50%{transform:scaleY(1)}}
.rctl{display:flex;align-items:center;gap:14px}
.bigplay{width:68px;height:68px;border-radius:50%;border:0;background:linear-gradient(135deg,#2f6bff,#a855f7,#ef4444);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 22px #ef444477;flex:0 0 68px}
.bigplay:active{transform:scale(.94)}
.rctl .rt b{font-size:17px}
.rtimes{display:flex;justify-content:space-between;color:#9a9ab3;font-size:12px;margin-top:6px}
.mini{position:fixed;left:0;right:0;margin:0 auto;bottom:92px;max-width:640px;width:calc(100% - 28px);display:flex;align-items:center;gap:10px;background:#0c0c14f5;backdrop-filter:blur(16px);border:1px solid #e1112988;border-radius:16px;padding:10px;z-index:60}
.mt{flex:1;min-width:0}
.mt b,.mt small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mt small{color:#9a9ab3;font-size:12px}
.bar{height:5px;border-radius:5px;background:#ffffff1f;margin-top:6px;overflow:hidden}
.bar i{display:block;height:100%;background:linear-gradient(90deg,#3b82f6,#e11129)}
.mini button{width:40px;height:40px;border-radius:50%;border:1px solid #fff3;background:#ffffff0d;color:#fff;display:flex;align-items:center;justify-content:center;flex:0 0 40px}
.mini .mp{background:linear-gradient(135deg,#2f6bff,#e11129);border:0}
.bot{position:fixed;left:12px;right:12px;bottom:calc(10px + env(safe-area-inset-bottom,0px));display:flex;align-items:flex-end;background:#0c0c14f2;backdrop-filter:blur(20px);border:1px solid #ffffff1c;border-radius:26px;padding:8px 4px;z-index:50;max-width:456px;margin:0 auto}
.bot button{flex:1;background:none;border:0;color:#6e6e86;font-size:11px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0}
.bot .on{color:#fff}
.bot .on svg{color:#ef4444}
.bot .mid span{width:54px;height:54px;border-radius:50%;margin-top:-30px;background:linear-gradient(135deg,#2f6bff,#a855f7,#ef4444);display:flex;align-items:center;justify-content:center;color:#fff}
.pb{display:inline-flex;align-items:center;background:linear-gradient(90deg,#f5c542,#e8a317);color:#1a1200;font-size:10px;font-weight:900;letter-spacing:.5px;padding:2px 6px;border-radius:6px;margin-left:6px;vertical-align:middle;white-space:nowrap}
.gold{border-color:#f5c54266;background:linear-gradient(135deg,#f5c54210,#e1112910)}
.ev{display:flex;gap:12px;align-items:flex-start;border:1px solid #f5c54255;border-radius:14px;padding:12px;background:linear-gradient(135deg,#f5c54212,#e1112912);margin-top:10px}
.evd{flex:0 0 58px;text-align:center;background:#e11129;border-radius:10px;padding:6px 0;line-height:1.1}
.evd b{display:block;font-size:22px}
.evd small{font-size:11px;text-transform:uppercase}
.evi{flex:1;min-width:0}
.evi b{display:block;font-size:16px}
.evi small{display:block;color:#9a9ab3;margin-top:3px;font-size:13px}
.lnk{background:none;border:0;color:#ef4444;font-size:13px;padding:0;margin-top:8px;text-decoration:underline}
.ben{margin:10px 0 0;padding:0;list-style:none}
.ben li{padding:9px 0 9px 28px;position:relative;border-bottom:1px solid #ffffff10;color:#e0e0ee}
.ben li:before{content:"★";position:absolute;left:4px;color:#f5c542}
.chip{display:inline-block;font-size:12px;font-weight:700;padding:5px 10px;border-radius:8px;background:#ffffff12;color:#c9c9dc}
.chip.ok{background:#16a34a33;color:#86efac}
.chip.no{background:#ef444433;color:#fca5a5}
.mrow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid #ffffff12}
.mrow b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
.sbtn{border:1px solid #e11129;background:#0006;color:#fff;border-radius:10px;padding:8px 12px;font-weight:700;font-size:13px}
.sbtn:disabled{opacity:.5}
.prices{display:flex;gap:10px;margin-top:16px}
.pcard{flex:1;text-align:center;border:1px solid #f5c54255;border-radius:14px;padding:14px 8px;background:#ffffff08}
.pcard.best{border:2px solid #f5c542;background:linear-gradient(135deg,#f5c54220,#e1112918)}
.pcard b{display:block;font-size:26px;color:#fff}
.pcard small{display:block;color:#c9c9dc;margin-top:2px}
.pcard i{display:block;font-style:normal;color:#f5c542;font-size:12px;font-weight:700;margin-top:6px}
@media(min-width:900px){
  .page{padding:0 24px 120px;margin:14px auto}
  .links{display:flex;gap:4px}
  .links button{background:none;border:0;color:#d5d5e6;padding:10px 12px;font-size:15px;border-bottom:2px solid transparent;display:flex;align-items:center;gap:6px}
  .links .on{color:#fff;border-bottom-color:#e11129}
  .pubb{display:block;border:2px solid #e11129;background:#0006;color:#fff;border-radius:12px;padding:10px 14px;font-weight:700}
  .bot{display:none}
  .mini{bottom:16px}
  .hero{min-height:340px}
  .big{font-size:96px}
  .heroimg{max-width:760px}
  .tagl{font-size:24px}
  .quick{grid-template-columns:repeat(4,1fr)}
  .cols{grid-template-columns:2fr 1fr}
  .artgrid{grid-template-columns:230px 1fr}
  .fade{height:480px}
  .fcap h3{font-size:44px}
}
`;

export default function Home() {
  const [lang, setLang] = useState(null);
  const [tab, setTab] = useState("home");
  const [artistId, setArtistId] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(undefined);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [stations, setStations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [curV, setCurV] = useState(null);
  const [search, setSearch] = useState("");
  const [openC, setOpenC] = useState({});
  const [draft, setDraft] = useState({});
  const [slide, setSlide] = useState(0);
  const [fi, setFi] = useState(0);
  const [cur, setCur] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [pr, setPr] = useState({ t: 0, d: 0 });
  const [rList, setRList] = useState([]);
  const [rOn, setROn] = useState(false);
  const [rInfo, setRInfo] = useState({ i: 0, off: 0 });
  const [activeSt, setActiveSt] = useState(null);
  const [bad, setBad] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [anns, setAnns] = useState([]);
  const [bellOpen, setBellOpen] = useState(false);
  const [annSeen, setAnnSeen] = useState(0);
  // Premium
  const [events, setEvents] = useState([]);
  const [reqs, setReqs] = useState([]);
  const [pMsg, setPMsg] = useState("");
  const [vTitle, setVTitle] = useState("");
  const [vUrl, setVUrl] = useState("");
  const [evTitle, setEvTitle] = useState("");
  const [evPlace, setEvPlace] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evLink, setEvLink] = useState("");
  const [evDesc, setEvDesc] = useState("");
  // Paiement par carte (Stripe)
  const [payMsg, setPayMsg] = useState("");
  const [payState, setPayState] = useState("");
  const aRef = useRef(null);
  const rRef = useRef(null);
  const rIdx = useRef(-1);
  const t = { ...T.fr, ...T[lang || "fr"] };
  useEffect(() => { document.body.dataset.tab = artistId ? "artiste" : tab; }, [tab, artistId]);
  async function loadTracks() {
    const { data } = await supabase.from("tracks")
      .select("id,title,audio_url,cover_url,artist_id,created_at,profiles!artist_id(username,avatar_url,is_premium)")
      .order("created_at", { ascending: false });
    setTracks(data || []);
  }
  async function loadProfiles() {
    const { data } = await supabase.from("profiles").select("id,username,bio,avatar_url,is_premium").order("created_at", { ascending: false });
    setProfiles(data || []);
  }
  async function loadLikes() {
    const { data } = await supabase.from("likes").select("track_id,user_id");
    setLikes(data || []);
  }
  async function loadComments() {
    const { data } = await supabase.from("comments")
      .select("id,track_id,body,profiles!user_id(username)")
      .order("created_at", { ascending: true });
    setComments(data || []);
  }
  async function loadStations() {
    const { data } = await supabase.from("stations").select("id,kind,name,stream_url").order("created_at", { ascending: true });
    setStations(data || []);
  }
  async function loadVideos() {
    const { data } = await supabase.from("videos").select("*");
    setVideos(data || []);
    if (data && data.length) setCurV((c) => c || data[0]);
  }
  async function loadEvents() {
    const { data } = await supabase.from("events")
      .select("id,user_id,title,description,place,starts_at,link")
      .order("starts_at", { ascending: true });
    setEvents(data || []);
  }
  async function loadReqs() {
    const { data } = await supabase.from("radio_requests").select("track_id,status");
    setReqs(data || []);
  }
  async function loadRadio() {
    const { data } = await supabase.from("radio_playlist")
      .select("*")
      .order("position", { ascending: true });
    setRList(data || []);
  }
  async function loadNotifs() {
    const { data } = await supabase.from("notifications")
      .select("id,kind,title,body,track_id,is_read,created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    setNotifs(data || []);
  }
  async function loadAnns() {
    const { data } = await supabase.from("announcements")
      .select("id,title,body,created_at")
      .order("created_at", { ascending: false })
      .limit(10);
    setAnns(data || []);
  }
  async function markRead() {
    if (!user) return;
    const now = Date.now();
    try { localStorage.setItem("annSeen", String(now)); } catch (e) {}
    setAnnSeen(now);
    if (notifs.some((n) => !n.is_read)) {
      setNotifs((l) => l.map((n) => ({ ...n, is_read: true })));
      await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    }
  }
  function toggleBell() {
    if (bellOpen) { markRead(); setBellOpen(false); }
    else { loadNotifs(); loadAnns(); setBellOpen(true); }
  }

  // Radio virtuelle : synchronise le lecteur avec l'heure
  function syncRadio() {
    const n = radioNow(rList, bad);
    const a = rRef.current;
    if (!n || !a) return;
    setRInfo(n);
    if (rIdx.current !== n.i) {
      rIdx.current = n.i;
      a.src = rList[n.i].audio_url;
      a.dataset.off = String(n.off);
      a.load();
      a.play().catch(() => {});
    } else if (a.duration && !a.seeking && Math.abs(a.currentTime - n.off) > 4) {
      a.currentTime = n.off;
      if (a.paused) a.play().catch(() => {});
    } else if (a.paused && a.duration) {
      a.play().catch(() => {});
    }
  }
  function startRadio() {
    if (!rList.length) return;
    const m = aRef.current;
    if (m) m.pause();
    setActiveSt(null);
    rIdx.current = -1;
    syncRadio();
    setROn(true);
  }
  function stopRadio() {
    const a = rRef.current;
    if (a) { a.pause(); a.removeAttribute("src"); a.load(); }
    rIdx.current = -1;
    setROn(false);
  }
  // Station externe : une seule à la fois, chargée seulement quand on appuie
  function startStation(id) {
    stopRadio();
    const m = aRef.current;
    if (m) m.pause();
    setActiveSt(id);
  }

  useEffect(() => {
    try { const l = localStorage.getItem("lang"); if (l && T[l]) setLang(l); } catch (e) {}
    let seen = Date.now();
    try {
      const v = parseInt(localStorage.getItem("annSeen") || "", 10);
      if (v) seen = v; else localStorage.setItem("annSeen", String(seen));
    } catch (e) {}
    setAnnSeen(seen);
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: s } = supabase.auth.onAuthStateChange((_e, x) => setUser(x?.user ?? null));
    loadTracks(); loadProfiles(); loadLikes(); loadComments(); loadStations(); loadVideos(); loadRadio(); loadAnns(); loadEvents();
    return () => s.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!rOn) return;
    const id = setInterval(syncRadio, 1000);
    return () => clearInterval(id);
  }, [rOn, rList, bad]);

  useEffect(() => {
    if (!user) { setProfile(undefined); return; }
    supabase.from("profiles").select("username,bio,avatar_url,is_premium").eq("id", user.id).maybeSingle()
      .then(({ data }) => { setProfile(data); setBio(data?.bio || ""); });
  }, [user]);

  useEffect(() => { if (user && tab === "login") setTab("home"); }, [user, tab]);

  // Demandes de rotation radio de l'utilisateur
  useEffect(() => {
    if (!user) { setReqs([]); return; }
    loadReqs();
  }, [user]);

  // Retour de Stripe : ?premium=ok ou ?premium=annule dans l'adresse
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("premium");
    if (!q) return;
    window.history.replaceState({}, "", window.location.pathname);
    setPayState(q === "ok" ? "ok" : "cancel");
    setTab("premium");
  }, []);

  // Après un paiement réussi : vérifie toutes les 3 secondes que le premium est activé
  useEffect(() => {
    if (payState !== "ok" || !user) return;
    let n = 0;
    const id = setInterval(async () => {
      n++;
      const { data } = await supabase.from("profiles").select("username,bio,avatar_url,is_premium").eq("id", user.id).maybeSingle();
      if (data) setProfile(data);
      if ((data && data.is_premium) || n >= 10) clearInterval(id);
    }, 3000);
    return () => clearInterval(id);
  }, [payState, user]);

  // Notifications : chargement et rafraîchissement toutes les 60 secondes
  useEffect(() => {
    if (!user) { setNotifs([]); setBellOpen(false); return; }
    loadNotifs();
    const id = setInterval(() => { loadNotifs(); loadAnns(); }, 60000);
    return () => clearInterval(id);
  }, [user]);

  // Artiste à la une : les artistes premium d'abord
  useEffect(() => {
    const n = profiles.filter((p) => p.is_premium).length || profiles.length;
    if (n < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % n), 5000);
    return () => clearInterval(id);
  }, [profiles]);

  // Diaporama en fondu des photos d'artistes
  useEffect(() => {
    const n = profiles.filter((p) => p.avatar_url).length;
    if (n < 2) return;
    const id = setInterval(() => setFi((s) => s + 1), 4000);
    return () => clearInterval(id);
  }, [profiles]);

  function go(k) {
    if (bellOpen) { markRead(); setBellOpen(false); }
    if (k !== "radio") setActiveSt(null);
    if (k === "activities") loadEvents();
    setPMsg("");
    setTab(k); setMsg(""); if (typeof window !== "undefined") window.scrollTo(0, 0);
  }
  function openArtist(id) { setArtistId(id); go("artist"); }
  function pick(l) { setLang(l); try { localStorage.setItem("lang", l); } catch (e) {} }
  async function signUp() {
    if (pass.length < 8) { setMsg(t.weak); return; }
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setMsg(error ? error.message : "");
  }
  async function logIn() { const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function createProfile() {
    const name = username.trim();
    if (name.length < 2 || name.length > 30) { setMsg(t.badName); return; }
    const { error } = await supabase.from("profiles").insert({ id: user.id, username: name });
    if (error) setMsg(error.message); else { setMsg(""); setProfile({ username: name }); loadProfiles(); }
  }
  async function uploadImage(f) {
    if (!okImage(f)) throw new Error(t.bad);
    const path = user.id + "/" + Date.now() + "-" + f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const up = await supabase.storage.from("images").upload(path, f);
    if (up.error) throw up.error;
    return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
  }
  async function saveProfile() {
    setBusy(true); setMsg(t.wait);
    try {
      const upd = { bio: (bio || "").slice(0, 500) };
      if (avatarFile) upd.avatar_url = await uploadImage(avatarFile);
      const { error } = await supabase.from("profiles").update(upd).eq("id", user.id);
      if (error) throw error;
      setProfile({ ...profile, ...upd }); setAvatarFile(null); setMsg(t.saved); loadTracks(); loadProfiles();
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }
  async function upload() {
    const ttl = title.trim().slice(0, 120);
    if (!file || !ttl) { setMsg(t.need); return; }
    if (!okAudio(file)) { setMsg(t.bad); return; }
    setBusy(true); setMsg(t.wait);
    try {
      const path = user.id + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const up = await supabase.storage.from("audio").upload(path, file);
      if (up.error) throw up.error;
      const audio_url = supabase.storage.from("audio").getPublicUrl(path).data.publicUrl;
      const cover_url = coverFile ? await uploadImage(coverFile) : null;
      const ins = await supabase.from("tracks").insert({ artist_id: user.id, title: ttl, audio_url, cover_url });
      if (ins.error) throw ins.error;
      setMsg(t.ok); setTitle(""); setFile(null); setCoverFile(null); await loadTracks(); go("music");
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }

  // ---- Paiement par carte (Stripe) ----
  async function payCard(plan) {
    if (!user) { go("login"); return; }
    setBusy(true);
    setPayState("");
    setPayMsg(t.payWait);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session && data.session.access_token;
      if (!token) throw new Error(t.payErr);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ plan }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error(j.error || t.payErr);
      window.location.href = j.url;
      return;
    } catch (e) {
      setPayMsg(e.message || t.payErr);
    }
    setBusy(false);
  }

  // ---- Espace premium : vidéos, événements, demande de radio ----
  async function addVideo() {
    const id = ytId(vUrl);
    const ttl = vTitle.trim().slice(0, 120);
    if (!id || ttl.length < 2) { setPMsg(t.vBad); return; }
    setBusy(true); setPMsg(t.wait);
    const { error } = await supabase.from("videos").insert({ title: ttl, artist: profile?.username || "", youtube_id: id, user_id: user.id });
    if (error) setPMsg(error.message);
    else { setVTitle(""); setVUrl(""); setPMsg(t.vOk); await loadVideos(); }
    setBusy(false);
  }
  async function deleteVideo(v) {
    await supabase.from("videos").delete().eq("youtube_id", v.youtube_id).eq("user_id", user.id);
    if (curV && curV.youtube_id === v.youtube_id) setCurV(null);
    await loadVideos();
  }
  async function addEvent() {
    const ttl = evTitle.trim().slice(0, 120);
    const d = new Date(evDate);
    const link = evLink.trim();
    if (ttl.length < 2 || !evDate || isNaN(d.getTime()) || (link && !/^https:\/\//i.test(link))) { setPMsg(t.evBad); return; }
    setBusy(true); setPMsg(t.wait);
    const { error } = await supabase.from("events").insert({
      user_id: user.id,
      title: ttl,
      description: evDesc.trim().slice(0, 500) || null,
      place: evPlace.trim().slice(0, 120) || null,
      starts_at: d.toISOString(),
      link: link || null,
    });
    if (error) setPMsg(error.message);
    else { setEvTitle(""); setEvPlace(""); setEvDate(""); setEvLink(""); setEvDesc(""); setPMsg(t.evOk); await loadEvents(); }
    setBusy(false);
  }
  async function deleteEvent(id) {
    await supabase.from("events").delete().eq("id", id).eq("user_id", user.id);
    await loadEvents();
  }
  async function requestRadio(x) {
    setBusy(true); setPMsg(t.wait);
    try {
      const d = await audioDuration(x.audio_url);
      if (!d || d < 30 || d > 900) throw new Error(t.rLen);
      const { error } = await supabase.from("radio_requests").insert({ user_id: user.id, track_id: x.id, duration_seconds: d });
      if (error) throw error;
      setPMsg(t.rSent); await loadReqs();
    } catch (e) { setPMsg(e.message || String(e)); }
    setBusy(false);
  }

  const likeCount = (id) => likes.filter((l) => l.track_id === id).length;
  const isLiked = (id) => likes.some((l) => l.track_id === id && l.user_id === user?.id);
  async function toggleLike(id) {
    if (!user) { go("login"); return; }
    if (isLiked(id)) {
      setLikes(likes.filter((l) => !(l.track_id === id && l.user_id === user.id)));
      await supabase.from("likes").delete().eq("track_id", id).eq("user_id", user.id);
    } else {
      setLikes([...likes, { track_id: id, user_id: user.id }]);
      await supabase.from("likes").insert({ track_id: id, user_id: user.id });
    }
  }
  async function addComment(id) {
    if (!user) { go("login"); return; }
    const body = (draft[id] || "").trim().slice(0, 500);
    if (!body) return;
    setDraft({ ...draft, [id]: "" });
    await supabase.from("comments").insert({ track_id: id, user_id: user.id, body });
    loadComments();
  }

  function load(i) {
    const a = aRef.current;
    if (!a || !tracks[i]) return;
    setCur(i); a.src = tracks[i].audio_url; a.play().catch(() => {});
  }
  function toggle() {
    const a = aRef.current;
    if (!a || cur < 0) return;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  }
  function step(d) { if (tracks.length) load(((cur < 0 ? 0 : cur) + d + tracks.length) % tracks.length); }
  function seek(e) {
    const a = aRef.current;
    if (!a || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  }

  const count = (id) => tracks.filter((x) => x.artist_id === id).length;
  const thumb = (x, i) => x.cover_url ? { backgroundImage: cssUrl(x.cover_url) }
    : x.profiles?.avatar_url ? { backgroundImage: cssUrl(x.profiles.avatar_url) }
    : { background: "linear-gradient(135deg," + COVERS[i % 3] + ")" };
  const Style = <style>{css}</style>;
  const q = search.trim().toLowerCase();
  const shown = tracks.filter((x) => !q || (x.title || "").toLowerCase().includes(q) || (x.profiles?.username || "").toLowerCase().includes(q));
  const radios = stations.filter((s) => s.kind === "radio");
  const tvs = stations.filter((s) => s.kind === "tv");
  const gal = [...tracks.filter((x) => x.cover_url).map((x) => x.cover_url), ...profiles.filter((p) => p.avatar_url).map((p) => p.avatar_url)].slice(0, 12);
  // Les artistes premium passent en premier
  const prems = profiles.filter((p) => p.is_premium);
  const sortedProfiles = [...prems, ...profiles.filter((p) => !p.is_premium)];
  const featList = prems.length ? prems : profiles;
  const fp = featList.length ? featList[slide % featList.length] : null;
  const withPhoto = profiles.filter((p) => p.avatar_url);
  const fadeList = [...withPhoto.filter((p) => p.is_premium), ...withPhoto.filter((p) => !p.is_premium)];
  const fIdx = fadeList.length ? fi % fadeList.length : 0;
  const curT = cur >= 0 ? tracks[cur] : null;
  const showLogin = !user && (tab === "login" || tab === "pub" || tab === "me");
  const rNow = rList[rInfo.i] || null;
  const rNext = rList.length ? rList[rInfo.next ?? ((rInfo.i + 1) % rList.length)] : null;
  const nItems = [
    ...anns.map((a) => ({ k: "ann", id: "a" + a.id, title: a.title, body: a.body, at: a.created_at, un: new Date(a.created_at).getTime() > annSeen })),
    ...notifs.map((n) => ({ k: n.kind, id: n.id, title: n.title, body: n.body, at: n.created_at, un: !n.is_read })),
  ].sort((x, y) => new Date(y.at) - new Date(x.at)).slice(0, 30);
  const unread = user ? nItems.filter((x) => x.un).length : 0;
  const isPrem = !!profile?.is_premium;
  const upcoming = events.filter((e) => new Date(e.starts_at).getTime() > Date.now() - 6 * 3600 * 1000);
  const premVideos = videos.filter((v) => v.user_id).slice(-6).reverse();
  const premTracks = tracks.filter((x) => x.profiles?.is_premium).slice(0, 6);
  const reqStatus = (id) => (reqs.find((r) => r.track_id === id) || {}).status;
  const payNote = payMsg || (payState === "ok" ? t.payOk : payState === "cancel" ? t.payCancel : "");

  function renderRow(x, i) {
    const idx = tracks.indexOf(x);
    const cs = comments.filter((cm) => cm.track_id === x.id);
    const isCur = curT?.id === x.id;
    return (
      <div className="row" key={x.id}>
        <div className="rh">
          <div className="th" style={thumb(x, i)} />
          <div className="rt"><b>{x.title}</b><small>{x.profiles?.username}<PB p={x.profiles} /></small></div>
          <button className="pl" onClick={() => (isCur ? toggle() : load(idx))}><Icon n={isCur && playing ? "pause" : "play"} s={18} fill /></button>
        </div>
        <div className="act">
          <button className={isLiked(x.id) ? "liked" : ""} onClick={() => toggleLike(x.id)}><Icon n="heart" s={20} fill={isLiked(x.id)} />{likeCount(x.id) || ""}</button>
          <button onClick={() => setOpenC({ ...openC, [x.id]: !openC[x.id] })}><Icon n="chat" s={20} />{cs.length || ""}</button>
        </div>
        {openC[x.id] && (
          <div className="cbox">
            {cs.length === 0 && <p className="sub" style={{ margin: 0 }}>{t.nocom}</p>}
            {cs.map((cm) => <div className="cm" key={cm.id}><b>{cm.profiles?.username}</b>{cm.body}</div>)}
            <div className="crow">
              <input placeholder={t.write} maxLength={500} value={draft[x.id] || ""} onChange={(e) => setDraft({ ...draft, [x.id]: e.target.value })} />
              <button onClick={() => addComment(x.id)}>{t.post}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderEvent(e) {
    const d = new Date(e.starts_at);
    const org = profiles.find((p) => p.id === e.user_id);
    const loc = lang === "ht" ? "fr" : (lang || "fr");
    let day = "", mon = "", hm = "";
    try {
      day = d.toLocaleDateString(loc, { day: "2-digit" });
      mon = d.toLocaleDateString(loc, { month: "short" });
      hm = d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
    } catch (er) {}
    return (
      <div className="ev" key={e.id}>
        <div className="evd"><b>{day}</b><small>{mon}</small></div>
        <div className="evi">
          <b>{e.title}</b>
          <small>{hm}{e.place ? " · " + e.place : ""}</small>
          {org && <small>{org.username}<PB p={org} /></small>}
          {e.description ? <small style={{ color: "#c9c9dc" }}>{e.description}</small> : null}
          {e.link && /^https:\/\//i.test(e.link) && <a className="outl small" href={e.link} target="_blank" rel="noopener noreferrer">{t.more} →</a>}
          {user?.id === e.user_id && <div><button className="lnk" onClick={() => deleteEvent(e.id)}>{t.del}</button></div>}
        </div>
      </div>
    );
  }

  if (!lang) return (
    <div className="page pad">{Style}<h1 className="logo" style={{ fontSize: 42 }}>RAPLIKE <span>509</span></h1><p className="sub">{T.fr.tag}</p>
      <div className="lang">{LANGS.map(([k, n]) => <button key={k} onClick={() => pick(k)}>{n}</button>)}</div>
      <section className="about">
        <h2 className="st2">{T.fr.aboutTitle}</h2>
        <p>{T.fr.aboutP1}</p>
        <p>{T.fr.aboutP2}</p>
      </section>
    </div>
  );

  if (user && profile === null) return (
    <div className="page pad">{Style}<h1 className="logo">RAPLIKE <span>509</span></h1>
      <div className="form"><h2 className="st2">{t.name}</h2>
        <input placeholder={t.name} maxLength={30} value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className="btn" onClick={createProfile}>{t.save}</button>
        <p className="msg">{msg}</p>
      </div>
    </div>
  );

  const links = [["home", t.home, "home"], ["artists", t.artists, "users"], ["music", t.music, "music"], ["videos", t.videos, "video"], ["radio", t.radio, "radio"], ["tv", t.tv, "tv"], ["activities", t.activities, "star"]];
  const bot = [["home", t.home, "home"], ["artists", t.artists, "users"], ["pub", t.pub, "plus"], ["radio", t.radio, "radio"], ["me", t.me, "user"]];

  return (
    <div className="page">{Style}
      <audio ref={aRef}
        onPlay={() => { setPlaying(true); if (rOn) stopRadio(); setActiveSt(null); }} onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPr({ t: e.target.currentTime, d: e.target.duration || 0 })}
        onEnded={() => step(1)} />
      <audio ref={rRef} preload="auto"
        onError={() => {
          const i = rIdx.current;
          if (i < 0) return;
          rIdx.current = -1;
          setBad((b) => (b.includes(i) ? b : [...b, i]));
        }}
        onLoadedMetadata={(e) => {
          const o = parseFloat(e.target.dataset.off || "0");
          if (o > 0 && o < (e.target.duration || 0)) e.target.currentTime = o;
        }}
        onEnded={syncRadio} />

      <header className="nav-top">
        <img src="/logo-raplike.webp" alt="RAPLIKE 509" className="logoimg" onClick={() => go("home")} />
        <nav className="links">
          {links.map(([k, n, ic]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => go(k)}><Icon n={ic} s={18} />{n}</button>)}
        </nav>
        <div className="right">
          <button className="pubb" onClick={() => go("pub")}>+ {t.pub}</button>
          {user && (
            <button className="bellb" onClick={toggleBell} aria-label={t.notif}>
              <Icon n="bell" s={20} />
              {unread > 0 && <span className="bdot">{unread > 9 ? "9+" : unread}</span>}
            </button>
          )}
          <button className="loginb" onClick={() => go(user ? "me" : "login")}>{user ? (profile?.username || t.me) : t.loginTop}</button>
        </div>
      </header>

      {user && bellOpen && (
        <div className="bellp">
          <h3 className="ptitle" style={{ marginBottom: 8 }}>{t.notif}</h3>
          {nItems.length === 0 && <p className="sub">{t.notifNone}</p>}
          {nItems.map((x) => {
            const main = x.k === "like" ? (x.body || "") + " " + t.nLike
              : x.k === "comment" ? t.nComment + " : " + (x.title || "")
              : x.k === "track" ? t.nTrack + " : " + (x.title || "")
              : x.k === "artist" ? t.nArtist + " : " + (x.title || "")
              : x.title;
            const sub = x.k === "like" ? x.title : x.k === "artist" ? "" : x.body;
            const dest = x.k === "artist" ? "artists" : x.k === "ann" ? null : "music";
            return (
              <button className={"nit" + (x.un ? " un" : "")} key={x.id} onClick={() => dest && go(dest)}>
                <b>{x.k === "ann" && <i>{t.nAnn}</i>}{main}</b>
                {sub ? <small>{sub}</small> : null}
                <small>{ago(x.at, lang)}</small>
              </button>
            );
          })}
        </div>
      )}

      {showLogin && (
        <div className="form">
          <h2 className="st2">{t.loginBtn}</h2>
          <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder={t.pass} value={pass} onChange={(e) => setPass(e.target.value)} />
          <button className="btn" onClick={logIn}>{t.loginBtn}</button>
          <button className="btn alt" onClick={signUp}>{t.signup}</button>
          <p className="legal">{"En créant un compte, tu acceptes les "}<Link href="/conditions">{"Conditions"}</Link>{" et la "}<Link href="/confidentialite">{"Politique de confidentialité"}</Link>{"."}</p>
          <p className="msg">{msg}</p>
          <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
        </div>
      )}

      {!showLogin && tab === "home" && (<>
        <section className="hero" style={HERO_IMG ? { backgroundImage: "linear-gradient(#0007,#000b)," + cssUrl(HERO_IMG) } : {}}>
          <img src="/logo-raplike.webp" alt="RAPLIKE 509" className="heroimg" />
          <h1 className="tagl">{t.hero}</h1>
          <div className="slog">{t.slogan}</div>
        </section>

        <div className="quick">
          {[["radio", "radio", t.radio, t.radioSub], ["tv", "tv", t.tv, t.tvSub], ["music", "music", t.music, t.musSub], ["videos", "video", t.videos, t.vidSub]].map(([k, ic, n, s]) => (
            <button className="qc" key={k} onClick={() => go(k)}><Icon n={ic} s={34} /><span><b>{n}</b><small>{s}</small></span></button>
          ))}
        </div>

        {upcoming.length > 0 && (
          <section className="panel gold">
            <h3 className="ptitle">{t.events}</h3>
            {upcoming.slice(0, 2).map((e) => renderEvent(e))}
            <button className="outl" onClick={() => go("activities")}>{t.seeAct} →</button>
          </section>
        )}

        {fadeList.length > 0 && (
          <section className="panel">
            <h3 className="ptitle">{t.showcase}</h3>
            <p className="sub" style={{ marginTop: 6, marginBottom: 0 }}>{t.showcaseSub}</p>
            <div className="fade">
              {fadeList.map((p, i) => (
                <div
                  key={p.id}
                  className={"fs" + (i === fIdx ? " on" : "")}
                  style={{ backgroundImage: "linear-gradient(0deg,#000c,#0000 55%)," + cssUrl(p.avatar_url) }}
                >
                  <div className="fcap">
                    <span className="tag">{t.featured}</span>
                    <h3>{p.username}<PB p={p} full /></h3>
                    <small>{count(p.id)} {t.tracksN}</small>
                    <button className="outl small" onClick={() => openArtist(p.id)}>{t.seeProfile} →</button>
                  </div>
                </div>
              ))}
              {fadeList.length > 1 && (
                <div className="fdots">
                  {fadeList.map((p, i) => (
                    <button key={p.id} className={i === fIdx ? "on" : ""} onClick={() => setFi(i)} aria-label={p.username} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <div className="cols">
          <section className="panel">
            <div className="artgrid">
              <div>
                <h3 className="ptitle">{t.artists}</h3>
                <p className="sub" style={{ marginTop: 6 }}>{t.artistsSub}</p>
                {profiles.length === 0 && <p className="sub">{t.noArtists}</p>}
                {sortedProfiles.slice(0, 4).map((p) => (
                  <button className="arow" key={p.id} onClick={() => openArtist(p.id)}>
                    <Avatar p={p} size="md" /><span><b>{p.username}<PB p={p} /></b><small>{count(p.id)} {t.tracksN}</small></span>
                  </button>
                ))}
                <button className="outl" onClick={() => go("artists")}>{t.seeArtists} →</button>
              </div>
              <div className="feat" style={fp?.avatar_url ? { backgroundImage: "linear-gradient(90deg,#000d,#0004)," + cssUrl(fp.avatar_url) } : {}}>
                {fp && (<>
                  <button className="arr l" onClick={() => setSlide((slide - 1 + featList.length) % featList.length)}>‹</button>
                  <div className="ft">
                    <span className="tag">{t.featured}</span>
                    <h2>{fp.username}<PB p={fp} full /></h2>
                    <p>{(fp.bio || t.noBio).slice(0, 70)}</p>
                    <button className="outl small" onClick={() => openArtist(fp.id)}>{t.seeProfile} →</button>
                  </div>
                  <button className="arr r" onClick={() => setSlide((slide + 1) % featList.length)}>›</button>
                  <div className="dots">{featList.slice(0, 6).map((_, i) => <i key={i} className={i === slide % featList.length ? "on" : ""} />)}</div>
                </>)}
              </div>
            </div>
          </section>

          <aside className="panel">
            <h3 className="ptitle">{t.posts}</h3>
            {tracks.length === 0 && <p className="sub" style={{ marginTop: 10 }}>{t.none}</p>}
            {tracks.slice(0, 4).map((x, i) => (
              <button className="post" key={x.id} onClick={() => load(tracks.indexOf(x))}>
                <div className="th" style={thumb(x, i)} />
                <span className="pt"><b>{x.title}</b><small>{x.profiles?.username}<PB p={x.profiles} /></small><small>{ago(x.created_at, lang)}</small></span>
                <span className="hc"><Icon n="heart" s={16} />{likeCount(x.id)}</span>
              </button>
            ))}
            <button className="outl" onClick={() => go("music")}>{t.seePosts} →</button>
          </aside>
        </div>

        <section className="panel">
          <h3 className="ptitle">{t.gallery}</h3>
          <p className="sub" style={{ marginTop: 6 }}>{t.gallerySub}</p>
          {gal.length === 0 && <p className="sub">{t.noPhoto}</p>}
          <div className="gal">{gal.map((u, i) => <i key={i} style={{ backgroundImage: cssUrl(u) }} />)}</div>
        </section>

        {!isPrem && (
          <section className="panel gold">
            <h3 className="ptitle">★ {t.prem}</h3>
            <p className="sub" style={{ marginTop: 8, marginBottom: 0 }}>{t.premPromo}</p>
            <p style={{ margin: "8px 0 0", color: "#f5c542", fontWeight: 700 }}>{t.priceFrom} {PRICE_MONTH} {t.perMonth}</p>
            <button className="outl" onClick={() => go("premium")}>{t.premGo} →</button>
          </section>
        )}

        <section className="panel about">
          <h2 className="ptitle">{t.aboutTitle}</h2>
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
        </section>
      </>)}

      {!showLogin && tab === "artists" && (<>
        <h2 className="st2">{t.artists}</h2>
        {profiles.length === 0 && <p className="sub">{t.noArtists}</p>}
        <div className="agrid">
          {sortedProfiles.map((p) => (
            <button className="acard" key={p.id} onClick={() => openArtist(p.id)}>
              <Avatar p={p} size="big" /><b>{p.username}<PB p={p} /></b><small>{count(p.id)} {t.tracksN}</small>
            </button>
          ))}
        </div>
      </>)}

      {!showLogin && tab === "artist" && (() => {
        const p = profiles.find((x) => x.id === artistId);
        if (!p) return <p className="sub" style={{ marginTop: 20 }}>{t.noArtists}</p>;
        const list = tracks.filter((x) => x.artist_id === p.id);
        return (<>
          <button className="outl small" onClick={() => go("artists")} style={{ marginTop: 16 }}>← {t.back}</button>
          <div style={{ textAlign: "center" }}>
            <Avatar p={p} size="big" />
            <h2 className="st2" style={{ margin: "8px 0" }}>{p.username}<PB p={p} full /></h2>
            <p className="sub">{p.bio || t.noBio}</p>
            <p className="sub">{list.length} {t.tracksN}</p>
          </div>
          {list.map((x, i) => renderRow(x, i))}
        </>);
      })()}

      {!showLogin && tab === "music" && (<>
        <h2 className="st2">{t.music}</h2>
        <input placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginTop: 0, marginBottom: 14 }} />
        {shown.length === 0 && <p className="sub">{t.none}</p>}
        {shown.map((x, i) => renderRow(x, i))}
      </>)}

      {!showLogin && tab === "videos" && (<>
        <h2 className="st2">{t.videos}</h2>
        {videos.length === 0 && <p className="sub">{t.novid}</p>}
        {curV && (
          <div className="stn">
            <iframe className="vid" src={"https://www.youtube.com/embed/" + encodeURIComponent(curV.youtube_id)} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            <strong style={{ display: "block", marginTop: 10 }}>{curV.title}</strong>
            <small style={{ color: "#9a9ab3" }}>{curV.artist}</small>
          </div>
        )}
        <div className="agrid">
          {videos.map((v) => (
            <button className="acard vcard" key={v.youtube_id} onClick={() => { setCurV(v); if (typeof window !== "undefined") window.scrollTo(0, 0); }}>
              <img src={"https://img.youtube.com/vi/" + encodeURIComponent(v.youtube_id) + "/mqdefault.jpg"} alt="" />
              <b>{v.title}</b><small>{v.artist}</small>
            </button>
          ))}
        </div>
      </>)}

      {!showLogin && tab === "activities" && (<>
        <h2 className="st2">★ {t.activities}</h2>
        <section className="panel gold">
          <h3 className="ptitle">{t.events}</h3>
          {upcoming.length === 0 && <p className="sub" style={{ marginTop: 10 }}>{t.noEvents}</p>}
          {upcoming.map((e) => renderEvent(e))}
        </section>
        <section className="panel">
          <h3 className="ptitle">{t.premVideos}</h3>
          {premVideos.length === 0 && <p className="sub" style={{ marginTop: 10 }}>{t.novid}</p>}
          <div className="agrid" style={{ marginTop: 10 }}>
            {premVideos.map((v) => (
              <button className="acard vcard" key={v.youtube_id} onClick={() => { setCurV(v); go("videos"); }}>
                <img src={"https://img.youtube.com/vi/" + encodeURIComponent(v.youtube_id) + "/mqdefault.jpg"} alt="" />
                <b>{v.title}</b><small>{v.artist}</small>
              </button>
            ))}
          </div>
        </section>
        <section className="panel">
          <h3 className="ptitle">{t.premTracks}</h3>
          {premTracks.length === 0 && <p className="sub" style={{ marginTop: 10 }}>{t.none}</p>}
          <div style={{ marginTop: 10 }}>{premTracks.map((x, i) => renderRow(x, i))}</div>
        </section>
        {!isPrem && <button className="outl" onClick={() => go("premium")}>★ {t.premGo} →</button>}
      </>)}

      {!showLogin && tab === "premium" && (
        <div className="form">
          <section className="panel gold" style={{ textAlign: "center" }}>
            <span className="pb" style={{ margin: 0 }}>★ PREMIUM</span>
            <h2 className="st2" style={{ margin: "12px 0 4px" }}>{t.premTitle}</h2>
            <p className="sub" style={{ marginBottom: 0 }}>{t.premSub}</p>
          </section>
          <ul className="ben">
            <li>{t.premB1}</li>
            <li>{t.premB2}</li>
            <li>{t.premB3}</li>
            <li>{t.premB4}</li>
            <li>{t.premB5}</li>
          </ul>
          {isPrem
            ? <p className="msg" style={{ color: "#f5c542", fontWeight: 700, marginTop: 16 }}>{t.premYou}</p>
            : (<>
              <section className="panel gold" style={{ marginTop: 16 }}>
                <h3 className="ptitle">🇭🇹 {t.haiti}</h3>
                <div className="prices">
                  <div className="pcard"><b>{PRICE_MONTH_HTG}</b><small>{t.perMonth}</small></div>
                  <div className="pcard best"><b>{PRICE_YEAR_HTG}</b><small>{t.perYear}</small><i>{t.yearSave}</i></div>
                </div>
                <ul className="ben">
                  <li>{t.hStep1}</li>
                  <li>{t.hStep2}</li>
                  <li>{t.hStep3}</li>
                </ul>
                {(MONCASH_NUMBER || NATCASH_NUMBER) && (
                  <div className="mrow" style={{ display: "block" }}>
                    {MONCASH_NUMBER && <b style={{ maxWidth: "none" }}>MonCash : {MONCASH_NUMBER}</b>}
                    {NATCASH_NUMBER && <b style={{ maxWidth: "none" }}>Natcash : {NATCASH_NUMBER}</b>}
                  </div>
                )}
                <p className="sub" style={{ marginTop: 10 }}>{t.hDur}</p>
                {PREMIUM_LINK && /^https:\/\//i.test(PREMIUM_LINK) && <a className="btn" style={{ textAlign: "center", textDecoration: "none" }} href={PREMIUM_LINK} target="_blank" rel="noopener noreferrer">{t.premContact} (WhatsApp)</a>}
              </section>
              <section className="panel gold">
                <h3 className="ptitle">🌍 {t.diaspora}</h3>
                <div className="prices">
                  <div className="pcard"><b>{PRICE_MONTH}</b><small>{t.perMonth}</small></div>
                  <div className="pcard best"><b>{PRICE_YEAR}</b><small>{t.perYear}</small><i>{t.yearSave}</i></div>
                </div>
                <button className="btn" onClick={() => payCard("month")} disabled={busy}>{t.payCard} · {PRICE_MONTH} {t.perMonth}</button>
                <button className="btn" onClick={() => payCard("year")} disabled={busy}>{t.payCard} · {PRICE_YEAR} {t.perYear}</button>
              </section>
            </>)}
          {payNote ? <p className="msg" style={{ textAlign: "center" }}>{payNote}</p> : null}
          {!user && <button className="btn alt" onClick={() => go("login")}>{t.loginBtn}</button>}
          {isPrem && <button className="btn alt" onClick={() => go("me")}>{t.premSpace}</button>}
        </div>
      )}

      {!showLogin && tab === "radio" && (<>
        <h2 className="st2">{t.radio}</h2>

        <div className={"rp" + (rOn ? " on" : "")}>
          <div className="rtop">
            <span className="tag">RAPLIKE 509 RADIO</span>
            {rOn && <span className="liveb" style={{ margin: 0 }}><i />{t.live}</span>}
          </div>
          <Eq on={rOn} />
          {rList.length === 0 ? (
            <p className="sub" style={{ margin: 0 }}>{t.noRadio}</p>
          ) : (<>
            <div className="rctl">
              <button className="bigplay" onClick={rOn ? stopRadio : startRadio} aria-label="Radio"><Icon n={rOn ? "pause" : "play"} s={30} fill /></button>
              <div className="rt">
                {rOn && rNow
                  ? (<><b>{rNow.title}</b><small>{rNow.artist}</small></>)
                  : (<><b>{t.listen}</b><small>{t.tune}</small></>)}
              </div>
            </div>
            {rOn && rNow && (<>
              <div className="bar"><i style={{ width: (rNow.duration_seconds ? (rInfo.off / rNow.duration_seconds) * 100 : 0) + "%" }} /></div>
              <div className="rtimes"><span>{fmt(rInfo.off)}</span><span>{fmt(rNow.duration_seconds)}</span></div>
              {rNext && <p className="sub" style={{ margin: "8px 0 0" }}>{t.nextP} : {rNext.title}</p>}
            </>)}
          </>)}
          {bad.length > 0 && <p className="sub" style={{ margin: "10px 0 0" }}>{bad.length} {t.unread}</p>}
        </div>

        {radios.length === 0 && <p className="sub">{t.nostat}</p>}
        {radios.map((s) => {
          const on = activeSt === s.id;
          return (
            <div className={"rp" + (on ? " on" : "")} key={s.id}>
              <div className="rtop">
                <span className="sub" style={{ margin: 0 }}>{t.radio}</span>
                {on && <span className="liveb" style={{ margin: 0 }}><i />{t.live}</span>}
              </div>
              <Eq on={on} sm />
              <div className="rctl">
                <button className="bigplay" onClick={() => (on ? setActiveSt(null) : startStation(s.id))} aria-label={s.name}><Icon n={on ? "pause" : "play"} s={30} fill /></button>
                <div className="rt"><b>{s.name}</b><small>{on ? t.live : t.tune}</small></div>
              </div>
              {on && (s.stream_url.startsWith("iframe:")
                ? (frameSrc(s.stream_url) ? <iframe src={frameSrc(s.stream_url)} allow="autoplay" style={{ width: "100%", height: 170, border: 0, marginTop: 12, borderRadius: 12 }} /> : null)
                : <audio controls autoPlay src={s.stream_url} style={{ marginTop: 12 }} />)}
            </div>
          );
        })}
      </>)}

      {!showLogin && tab === "tv" && (<>
        <h2 className="st2">{t.tv}</h2>
        {tvs.length === 0 && <p className="sub">{t.nostat}</p>}
        {tvs.map((s) => (
          <div className="stn" key={s.id}>
            <div className="liveb"><i />{t.live}</div>
            <strong>{s.name}</strong>
            {s.stream_url.startsWith("iframe:") || s.stream_url.includes("embed")
              ? (frameSrc(s.stream_url) ? <iframe className="vid" src={frameSrc(s.stream_url)} allow="autoplay; fullscreen" allowFullScreen /> : null)
              : <video className="vid" controls playsInline src={s.stream_url} />}
          </div>
        ))}
      </>)}

      {user && tab === "pub" && (
        <div className="form">
          <h2 className="st2">{t.pub}</h2>
          <input placeholder={t.title} maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Audio</label>
          <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          <label>{t.cover}</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setCoverFile(e.target.files[0] || null)} />
          <button className="btn" onClick={upload} disabled={busy}>{t.send}</button>
          <p className="msg">{msg}</p>
        </div>
      )}

      {user && tab === "me" && (
        <div className="form">
          <Avatar p={profile} size="big" />
          <h2 className="st2" style={{ textAlign: "center", margin: 0 }}>{profile?.username}<PB p={profile} full /></h2>
          <p className="sub" style={{ textAlign: "center" }}>{count(user.id)} {t.tracksN}</p>
          <label>{t.photo}</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setAvatarFile(e.target.files[0] || null)} />
          <label>{t.bio}</label>
          <textarea maxLength={500} value={bio} onChange={(e) => setBio(e.target.value)} />
          <button className="btn" onClick={saveProfile} disabled={busy}>{t.save}</button>
          <p className="msg">{msg}</p>

          {isPrem ? (
            <section className="panel gold" style={{ marginTop: 18 }}>
              <h3 className="ptitle">★ {t.premSpace}</h3>

              <h4 style={{ margin: "18px 0 4px" }}>{t.rTitle}</h4>
              {tracks.filter((x) => x.artist_id === user.id).length === 0 && <p className="sub">{t.noTracks}</p>}
              {tracks.filter((x) => x.artist_id === user.id).map((x) => {
                const st = reqStatus(x.id);
                return (
                  <div className="mrow" key={x.id}>
                    <b>{x.title}</b>
                    {st === "pending" ? <span className="chip">{t.rPending}</span>
                      : st === "approved" ? <span className="chip ok">{t.rOk}</span>
                      : st === "rejected" ? <span className="chip no">{t.rNo}</span>
                      : <button className="sbtn" onClick={() => requestRadio(x)} disabled={busy}>{t.askRadio}</button>}
                  </div>
                );
              })}

              <h4 style={{ margin: "22px 0 0" }}>{t.addVideo}</h4>
              <input placeholder={t.vTitle} maxLength={120} value={vTitle} onChange={(e) => setVTitle(e.target.value)} />
              <input placeholder={t.vLink} value={vUrl} onChange={(e) => setVUrl(e.target.value)} />
              <button className="btn" onClick={addVideo} disabled={busy}>{t.addVideo}</button>
              {videos.filter((v) => v.user_id === user.id).length > 0 && <h4 style={{ margin: "16px 0 0" }}>{t.myVideos}</h4>}
              {videos.filter((v) => v.user_id === user.id).map((v) => (
                <div className="mrow" key={v.youtube_id}>
                  <b>{v.title}</b>
                  <button className="lnk" style={{ marginTop: 0 }} onClick={() => deleteVideo(v)}>{t.del}</button>
                </div>
              ))}

              <h4 style={{ margin: "22px 0 0" }}>{t.addEvent}</h4>
              <input placeholder={t.evTitle} maxLength={120} value={evTitle} onChange={(e) => setEvTitle(e.target.value)} />
              <input placeholder={t.evPlace} maxLength={120} value={evPlace} onChange={(e) => setEvPlace(e.target.value)} />
              <label>{t.evDate}</label>
              <input type="datetime-local" value={evDate} onChange={(e) => setEvDate(e.target.value)} />
              <input placeholder={t.evLink} value={evLink} onChange={(e) => setEvLink(e.target.value)} />
              <textarea placeholder={t.evDesc} maxLength={500} value={evDesc} onChange={(e) => setEvDesc(e.target.value)} />
              <button className="btn" onClick={addEvent} disabled={busy}>{t.addEvent}</button>
              {events.filter((e) => e.user_id === user.id).length > 0 && <h4 style={{ margin: "16px 0 0" }}>{t.myEvents}</h4>}
              {events.filter((e) => e.user_id === user.id).map((e) => (
                <div className="mrow" key={e.id}>
                  <b>{e.title}</b>
                  <button className="lnk" style={{ marginTop: 0 }} onClick={() => deleteEvent(e.id)}>{t.del}</button>
                </div>
              ))}
              <p className="msg">{pMsg}</p>
            </section>
          ) : (
            <button className="btn alt" onClick={() => go("premium")}>★ {t.premGo}</button>
          )}

          <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
          <button className="btn alt" onClick={() => supabase.auth.signOut()}>{t.out}</button>
        </div>
      )}

      {curT && (
        <div className="mini">
          <div className="th" style={{ ...thumb(curT, 0), width: 44, height: 44, flex: "0 0 44px" }} />
          <div className="mt">
            <b>{curT.title}</b><small>{curT.profiles?.username} · {fmt(pr.t)} / {fmt(pr.d)}</small>
            <div className="bar" onClick={seek}><i style={{ width: (pr.d ? (pr.t / pr.d) * 100 : 0) + "%" }} /></div>
          </div>
          <button onClick={() => step(-1)} aria-label="Prev"><Icon n="prev" s={18} fill /></button>
          <button className="mp" onClick={toggle} aria-label="Play"><Icon n={playing ? "pause" : "play"} s={20} fill /></button>
          <button onClick={() => step(1)} aria-label="Next"><Icon n="next" s={18} fill /></button>
        </div>
      )}

      <footer className="foot"><div className="owner">{"© 2026 "}<b>KMIKZ RAPATIZ</b>{" · " + t.owner}</div><Link href="/conditions">{"Conditions d'utilisation"}</Link>{" · "}<Link href="/confidentialite">{"Confidentialité"}</Link></footer>

      <nav className="bot">
        {bot.map(([k, n, ic]) => (
          <button key={k} className={(tab === k ? "on " : "") + (k === "pub" ? "mid" : "")} onClick={() => go(k)}>
            {k === "pub" ? <span><Icon n={ic} s={26} /></span> : <><Icon n={ic} />{n}</>}
          </button>
        ))}
      </nav>
    </div>
  );
}
