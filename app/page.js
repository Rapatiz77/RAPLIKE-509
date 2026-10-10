"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const HERO_IMG = "";

const T = {
  fr: { tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", loginBtn: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", artists: "Artistes", music: "Musique", videos: "Vidéos", radio: "Radio", tv: "TV", me: "Profil", pub: "Publier", loginTop: "LOGIN", hero: "La plateforme des artistes haïtiens et de la diaspora", slogan: "ÉCOUTE · REGARDE · PARTAGE · SOUTIENS", radioSub: "Écoute en direct", tvSub: "Chaînes & Émissions", musSub: "Écoute les titres", vidSub: "Regarde & Partage", artistsSub: "Découvre les artistes du moment", seeArtists: "Voir tous les artistes", featured: "ARTISTE À LA UNE", seeProfile: "Voir le profil", posts: "Derniers posts", seePosts: "Voir plus de posts", gallery: "Galerie des artistes", gallerySub: "Photos, pochettes, backstage...", noPhoto: "Aucune photo pour l'instant.", soon: "Bientôt disponible", tracksN: "titres", back: "Retour", noBio: "Pas encore de bio.", noArtists: "Aucun artiste pour l'instant.", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)", saved: "Profil enregistré !", search: "Rechercher un artiste ou un titre...", write: "Écrire un commentaire...", post: "Envoyer", nocom: "Aucun commentaire", nostat: "Aucune station pour l'instant.", live: "EN DIRECT" },
  en: { tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", loginBtn: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", artists: "Artists", music: "Music", videos: "Videos", me: "Profile", pub: "Post", hero: "The platform for Haitian artists and the diaspora", slogan: "LISTEN · WATCH · SHARE · SUPPORT", radioSub: "Listen live", tvSub: "Channels & Shows", musSub: "Listen to tracks", vidSub: "Watch & Share", artistsSub: "Discover artists of the moment", seeArtists: "See all artists", featured: "FEATURED ARTIST", seeProfile: "View profile", posts: "Latest posts", seePosts: "See more posts", gallery: "Artist gallery", gallerySub: "Photos, covers, backstage...", noPhoto: "No photos yet.", soon: "Coming soon", tracksN: "tracks", back: "Back", noBio: "No bio yet.", noArtists: "No artists yet.", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)", saved: "Profile saved!", search: "Search an artist or track...", write: "Write a comment...", post: "Send", nocom: "No comments", nostat: "No stations yet.", live: "LIVE" },
  ht: { tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", loginBtn: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", artists: "Atis", music: "Mizik", videos: "Videyo", radio: "Radyo", me: "Pwofil", pub: "Pibliye", hero: "Platfòm atis ayisyen yo ak dyaspora a", slogan: "KOUTE · GADE · PATAJE · SIPÒTE", radioSub: "Koute an dirèk", tvSub: "Chèn ak Emisyon", musSub: "Koute mizik yo", vidSub: "Gade ak Pataje", artistsSub: "Dekouvri atis moman an", seeArtists: "Wè tout atis yo", featured: "ATIS NAN VITRIN", seeProfile: "Wè pwofil la", posts: "Dènye piblikasyon", soon: "Talè konsa", tracksN: "mizik", back: "Retounen", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)", saved: "Pwofil la anrejistre !", search: "Chèche yon atis oswa yon mizik...", write: "Ekri yon kòmantè...", post: "Voye", nocom: "Pa gen kòmantè", nostat: "Poko gen estasyon.", live: "AN DIRÈK" },
  es: { tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", loginBtn: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", artists: "Artistas", music: "Música", videos: "Videos", me: "Perfil", pub: "Publicar", hero: "La plataforma de los artistas haitianos y la diáspora", slogan: "ESCUCHA · MIRA · COMPARTE · APOYA", radioSub: "Escucha en vivo", tvSub: "Canales y Programas", musSub: "Escucha los temas", vidSub: "Mira y Comparte", artistsSub: "Descubre los artistas del momento", seeArtists: "Ver todos los artistas", featured: "ARTISTA DESTACADO", seeProfile: "Ver perfil", posts: "Últimas publicaciones", soon: "Próximamente", tracksN: "temas", back: "Volver", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)", saved: "¡Perfil guardado!", search: "Buscar un artista o tema...", write: "Escribe un comentario...", post: "Enviar", nocom: "Sin comentarios", nostat: "Aún no hay estaciones.", live: "EN VIVO" },
};
const LANGS = [["en", "English"], ["fr", "Français"], ["ht", "Kreyòl"], ["es", "Español"]];
const COVERS = ["#1f5cff,#07070c", "#e8262f,#07070c", "#1f5cff,#e8262f"];

const P = {
  home: "M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  radio: "M12 14a2 2 0 100-4 2 2 0 000 4zM16.2 7.8a6 6 0 010 8.4M7.8 16.2a6 6 0 010-8.4M19 5a10 10 0 010 14M5 19A10 10 0 015 5",
  tv: "M4 7h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zM17 2l-5 5-5-5",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  plus: "M12 5v14M5 12h14",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z",
  chat: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  play: "M7 4l13 8-13 8z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z",
  prev: "M19 20L9 12l10-8zM5 4v16",
  next: "M5 4l10 8-10 8zM19 4v16",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
  video: "M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zM10 9l5 3-5 3z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
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
  if (p?.avatar_url) return <img className={c} src={p.avatar_url} alt="" />;
  return <div className={c}>{(p?.username || "?")[0].toUpperCase()}</div>;
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

const css = `
*{box-sizing:border-box}
body{margin:0;background:#020207;color:#f4f4f8;font-family:system-ui,-apple-system,sans-serif}
button{font-family:inherit;cursor:pointer}
.page{max-width:1200px;margin:8px auto;min-height:calc(100vh - 16px);border:2px solid #2b5bff;border-radius:22px;box-shadow:0 0 26px #2b5bff88,inset 0 0 26px #2b5bff2e;background:radial-gradient(60% 30% at 100% 0%,#e1112922,transparent),radial-gradient(60% 30% at 0% 0%,#2b5bff22,transparent),#05050a;padding:0 14px 180px}
.pad{padding-top:48px}
.nav-top{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #e1112955;gap:12px}
.logo{font-style:italic;font-weight:900;font-size:26px;letter-spacing:-1px;cursor:pointer;white-space:nowrap;margin:0}
.logo span{color:#ef2b3a}
.links{display:none}
.right{display:flex;gap:8px;align-items:center}
.pubb{display:none}
.loginb{border:2px solid #e11129;background:#7a0a1844;color:#fff;border-radius:12px;padding:10px 16px;font-weight:700;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hero{margin-top:14px;border-radius:16px;min-height:240px;padding:26px 16px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0a1f7a88,#05050a 45%,#8a0f1f88) center/cover;border:1px solid #ffffff14}
.crown{font-size:34px}
.big{font-size:52px;font-weight:900;font-style:italic;letter-spacing:-2px;line-height:1;text-shadow:0 4px 24px #000}
.big span{color:#ef2b3a}
.tagl{font-style:italic;font-size:18px;margin:12px 0 8px;max-width:520px}
.slog{letter-spacing:4px;font-size:11px;color:#b9b9cc}
.quick{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
.qc{display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #e11129;border-radius:14px;background:#0008;color:#fff;text-align:left}
.qc b{display:block;font-size:16px;letter-spacing:.5px;text-transform:uppercase}
.qc small{color:#b9b9cc}
.cols{display:grid;gap:14px}
.panel{border:1px solid #e1112955;border-radius:16px;padding:14px;background:#ffffff05;margin-bottom:14px}
.ptitle{margin:0 0 4px;font-size:20px;letter-spacing:.5px;text-transform:uppercase;border-left:4px solid #e11129;padding-left:10px}
.artgrid{display:grid;gap:14px}
.arow{display:flex;align-items:center;gap:12px;width:100%;background:none;border:0;color:#fff;padding:8px 0;text-align:left}
.arow small{display:block;color:#9a9ab3}
.outl{display:block;border:2px solid #e11129;border-radius:12px;background:#0006;color:#fff;font-weight:700;padding:11px 16px;margin-top:12px}
.outl.small{display:inline-block;margin-top:8px}
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
  .tagl{font-size:24px}
  .quick{grid-template-columns:repeat(4,1fr)}
  .cols{grid-template-columns:2fr 1fr}
  .artgrid{grid-template-columns:230px 1fr}
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
  const [search, setSearch] = useState("");
  const [openC, setOpenC] = useState({});
  const [draft, setDraft] = useState({});
  const [slide, setSlide] = useState(0);
  const [cur, setCur] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [pr, setPr] = useState({ t: 0, d: 0 });
  const aRef = useRef(null);
  const t = { ...T.fr, ...T[lang || "fr"] };
  const t = { ...T.fr, ...T[lang || "fr"] };
  useEffect(() => { document.body.dataset.tab = artistId ? "artiste" : tab; }, [tab, artistId]);
  async function loadTracks() {
    const { data } = await supabase.from("tracks")
      .select("id,title,audio_url,cover_url,artist_id,created_at,profiles!artist_id(username,avatar_url)")
      .order("created_at", { ascending: false });
    setTracks(data || []);
  }
  async function loadProfiles() {
    const { data } = await supabase.from("profiles").select("id,username,bio,avatar_url").order("created_at", { ascending: false });
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

  useEffect(() => {
    try { const l = localStorage.getItem("lang"); if (l && T[l]) setLang(l); } catch (e) {}
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: s } = supabase.auth.onAuthStateChange((_e, x) => setUser(x?.user ?? null));
    loadTracks(); loadProfiles(); loadLikes(); loadComments(); loadStations();
    return () => s.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setProfile(undefined); return; }
    supabase.from("profiles").select("username,bio,avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => { setProfile(data); setBio(data?.bio || ""); });
  }, [user]);

  useEffect(() => { if (user && tab === "login") setTab("home"); }, [user, tab]);

  useEffect(() => {
    if (profiles.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % profiles.length), 5000);
    return () => clearInterval(id);
  }, [profiles.length]);

  function go(k) { setTab(k); setMsg(""); if (typeof window !== "undefined") window.scrollTo(0, 0); }
  function openArtist(id) { setArtistId(id); go("artist"); }
  function pick(l) { setLang(l); try { localStorage.setItem("lang", l); } catch (e) {} }
  async function signUp() { const { error } = await supabase.auth.signUp({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function logIn() { const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function createProfile() {
    const { error } = await supabase.from("profiles").insert({ id: user.id, username });
    if (error) setMsg(error.message); else { setMsg(""); setProfile({ username }); loadProfiles(); }
  }
  async function uploadImage(f) {
    const path = user.id + "/" + Date.now() + "-" + f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const up = await supabase.storage.from("images").upload(path, f);
    if (up.error) throw up.error;
    return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
  }
  async function saveProfile() {
    setBusy(true); setMsg(t.wait);
    try {
      const upd = { bio };
      if (avatarFile) upd.avatar_url = await uploadImage(avatarFile);
      const { error } = await supabase.from("profiles").update(upd).eq("id", user.id);
      if (error) throw error;
      setProfile({ ...profile, ...upd }); setAvatarFile(null); setMsg(t.saved); loadTracks(); loadProfiles();
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }
  async function upload() {
    if (!file || !title) { setMsg(t.need); return; }
    setBusy(true); setMsg(t.wait);
    try {
      const path = user.id + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const up = await supabase.storage.from("audio").upload(path, file);
      if (up.error) throw up.error;
      const audio_url = supabase.storage.from("audio").getPublicUrl(path).data.publicUrl;
      const cover_url = coverFile ? await uploadImage(coverFile) : null;
      const ins = await supabase.from("tracks").insert({ artist_id: user.id, title, audio_url, cover_url });
      if (ins.error) throw ins.error;
      setMsg(t.ok); setTitle(""); setFile(null); setCoverFile(null); await loadTracks(); go("music");
    } catch (e) { setMsg(e.message); }
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
    const body = (draft[id] || "").trim();
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
  const thumb = (x, i) => x.cover_url ? { backgroundImage: "url(" + x.cover_url + ")" }
    : x.profiles?.avatar_url ? { backgroundImage: "url(" + x.profiles.avatar_url + ")" }
    : { background: "linear-gradient(135deg," + COVERS[i % 3] + ")" };
  const Style = <style>{css}</style>;
  const q = search.trim().toLowerCase();
  const shown = tracks.filter((x) => !q || (x.title || "").toLowerCase().includes(q) || (x.profiles?.username || "").toLowerCase().includes(q));
  const radios = stations.filter((s) => s.kind === "radio");
  const tvs = stations.filter((s) => s.kind === "tv");
  const gal = [...tracks.filter((x) => x.cover_url).map((x) => x.cover_url), ...profiles.filter((p) => p.avatar_url).map((p) => p.avatar_url)].slice(0, 12);
  const fp = profiles.length ? profiles[slide % profiles.length] : null;
  const curT = cur >= 0 ? tracks[cur] : null;
  const showLogin = !user && (tab === "login" || tab === "pub" || tab === "me");

  function renderRow(x, i) {
    const idx = tracks.indexOf(x);
    const cs = comments.filter((cm) => cm.track_id === x.id);
    const isCur = curT?.id === x.id;
    return (
      <div className="row" key={x.id}>
        <div className="rh">
          <div className="th" style={thumb(x, i)} />
          <div className="rt"><b>{x.title}</b><small>{x.profiles?.username}</small></div>
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
              <input placeholder={t.write} value={draft[x.id] || ""} onChange={(e) => setDraft({ ...draft, [x.id]: e.target.value })} />
              <button onClick={() => addComment(x.id)}>{t.post}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!lang) return (
    <div className="page pad">{Style}<h1 className="logo" style={{ fontSize: 42 }}>RAPLIKE <span>509</span></h1><p className="sub">{T.fr.tag}</p>
      <div className="lang">{LANGS.map(([k, n]) => <button key={k} onClick={() => pick(k)}>{n}</button>)}</div>
    </div>
  );

  if (user && profile === null) return (
    <div className="page pad">{Style}<h1 className="logo">RAPLIKE <span>509</span></h1>
      <div className="form"><h2 className="st2">{t.name}</h2>
        <input placeholder={t.name} value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className="btn" onClick={createProfile}>{t.save}</button>
        <p className="msg">{msg}</p>
      </div>
    </div>
  );

  const links = [["home", t.home, "home"], ["artists", t.artists, "users"], ["music", t.music, "music"], ["videos", t.videos, "video"], ["radio", t.radio, "radio"], ["tv", t.tv, "tv"]];
  const bot = [["home", t.home, "home"], ["artists", t.artists, "users"], ["pub", t.pub, "plus"], ["radio", t.radio, "radio"], ["me", t.me, "user"]];

  return (
    <div className="page">{Style}
      <audio ref={aRef}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPr({ t: e.target.currentTime, d: e.target.duration || 0 })}
        onEnded={() => step(1)} />

      <header className="nav-top">
        <h1 className="logo" onClick={() => go("home")}>RAPLIKE <span>509</span></h1>
        <nav className="links">
          {links.map(([k, n, ic]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => go(k)}><Icon n={ic} s={18} />{n}</button>)}
        </nav>
        <div className="right">
          <button className="pubb" onClick={() => go("pub")}>+ {t.pub}</button>
          <button className="loginb" onClick={() => go(user ? "me" : "login")}>{user ? (profile?.username || t.me) : t.loginTop}</button>
        </div>
      </header>

      {showLogin && (
        <div className="form">
          <h2 className="st2">{t.loginBtn}</h2>
          <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder={t.pass} value={pass} onChange={(e) => setPass(e.target.value)} />
          <button className="btn" onClick={logIn}>{t.loginBtn}</button>
          <button className="btn alt" onClick={signUp}>{t.signup}</button>
          <p className="msg">{msg}</p>
          <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
        </div>
      )}

      {!showLogin && tab === "home" && (<>
        <section className="hero" style={HERO_IMG ? { backgroundImage: "linear-gradient(#0007,#000b),url(" + HERO_IMG + ")" } : {}}>
          <div className="crown">👑</div>
          <div className="big">RAPLIKE <span>509</span></div>
          <p className="tagl">{t.hero}</p>
          <div className="slog">{t.slogan}</div>
        </section>

        <div className="quick">
          {[["radio", "radio", t.radio, t.radioSub], ["tv", "tv", t.tv, t.tvSub], ["music", "music", t.music, t.musSub], ["videos", "video", t.videos, t.vidSub]].map(([k, ic, n, s]) => (
            <button className="qc" key={k} onClick={() => go(k)}><Icon n={ic} s={34} /><span><b>{n}</b><small>{s}</small></span></button>
          ))}
        </div>

        <div className="cols">
          <section className="panel">
            <div className="artgrid">
              <div>
                <h3 className="ptitle">{t.artists}</h3>
                <p className="sub" style={{ marginTop: 6 }}>{t.artistsSub}</p>
                {profiles.length === 0 && <p className="sub">{t.noArtists}</p>}
                {profiles.slice(0, 4).map((p) => (
                  <button className="arow" key={p.id} onClick={() => openArtist(p.id)}>
                    <Avatar p={p} size="md" /><span><b>{p.username}</b><small>{count(p.id)} {t.tracksN}</small></span>
                  </button>
                ))}
                <button className="outl" onClick={() => go("artists")}>{t.seeArtists} →</button>
              </div>
              <div className="feat" style={fp?.avatar_url ? { backgroundImage: "linear-gradient(90deg,#000d,#0004),url(" + fp.avatar_url + ")" } : {}}>
                {fp && (<>
                  <button className="arr l" onClick={() => setSlide((slide - 1 + profiles.length) % profiles.length)}>‹</button>
                  <div className="ft">
                    <span className="tag">{t.featured}</span>
                    <h2>{fp.username}</h2>
                    <p>{(fp.bio || t.noBio).slice(0, 70)}</p>
                    <button className="outl small" onClick={() => openArtist(fp.id)}>{t.seeProfile} →</button>
                  </div>
                  <button className="arr r" onClick={() => setSlide((slide + 1) % profiles.length)}>›</button>
                  <div className="dots">{profiles.slice(0, 6).map((_, i) => <i key={i} className={i === slide % profiles.length ? "on" : ""} />)}</div>
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
                <span className="pt"><b>{x.title}</b><small>{x.profiles?.username}</small><small>{ago(x.created_at, lang)}</small></span>
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
          <div className="gal">{gal.map((u, i) => <i key={i} style={{ backgroundImage: "url(" + u + ")" }} />)}</div>
        </section>
      </>)}

      {!showLogin && tab === "artists" && (<>
        <h2 className="st2">{t.artists}</h2>
        {profiles.length === 0 && <p className="sub">{t.noArtists}</p>}
        <div className="agrid">
          {profiles.map((p) => (
            <button className="acard" key={p.id} onClick={() => openArtist(p.id)}>
              <Avatar p={p} size="big" /><b>{p.username}</b><small>{count(p.id)} {t.tracksN}</small>
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
            <h2 className="st2" style={{ margin: "8px 0" }}>{p.username}</h2>
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
        <p className="sub">{t.soon}</p>
      </>)}

      {!showLogin && tab === "radio" && (<>
        <h2 className="st2">{t.radio}</h2>
        {radios.length === 0 && <p className="sub">{t.nostat}</p>}
        {radios.map((s) => (
          <div className="stn" key={s.id}>
            <div className="liveb"><i />{t.live}</div>
            <strong>{s.name}</strong>
            {s.stream_url.startsWith("iframe:")
              ? <iframe src={s.stream_url.slice(7)} allow="autoplay" style={{ width: "100%", height: 170, border: 0, marginTop: 10 }} />
              : <audio controls src={s.stream_url} preload="none" style={{ marginTop: 10 }} />}
          </div>
        ))}
      </>)}

      {!showLogin && tab === "tv" && (<>
        <h2 className="st2">{t.tv}</h2>
        {tvs.length === 0 && <p className="sub">{t.nostat}</p>}
        {tvs.map((s) => (
          <div className="stn" key={s.id}>
            <div className="liveb"><i />{t.live}</div>
            <strong>{s.name}</strong>
            {s.stream_url.startsWith("iframe:")
              ? <iframe className="vid" src={s.stream_url.slice(7)} allow="autoplay; fullscreen" allowFullScreen />
              : s.stream_url.includes("embed")
                ? <iframe className="vid" src={s.stream_url} allow="autoplay; fullscreen" allowFullScreen />
                : <video className="vid" controls playsInline src={s.stream_url} />}
          </div>
        ))}
      </>)}

      {user && tab === "pub" && (
        <div className="form">
          <h2 className="st2">{t.pub}</h2>
          <input placeholder={t.title} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Audio</label>
          <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          <label>{t.cover}</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0] || null)} />
          <button className="btn" onClick={upload} disabled={busy}>{t.send}</button>
          <p className="msg">{msg}</p>
        </div>
      )}

      {user && tab === "me" && (
        <div className="form">
          <Avatar p={profile} size="big" />
          <h2 className="st2" style={{ textAlign: "center", margin: 0 }}>{profile?.username}</h2>
          <p className="sub" style={{ textAlign: "center" }}>{count(user.id)} {t.tracksN}</p>
          <label>{t.photo}</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0] || null)} />
          <label>{t.bio}</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          <button className="btn" onClick={saveProfile} disabled={busy}>{t.save}</button>
          <p className="msg">{msg}</p>
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
