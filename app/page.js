"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const T = {
  fr: {
    tag: "La musique haïtienne, le rap haïtien.",
    email: "E-mail", pass: "Mot de passe", login: "Se connecter", signup: "Créer un compte",
    name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", pub: "Publier",
    me: "Profil", radio: "Radio", tv: "TV", latest: "Derniers titres", none: "Aucun titre pour l'instant.",
    title: "Titre", send: "Publier le titre", out: "Quitter", mine: "titres publiés",
    ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...",
    lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)",
    saved: "Profil enregistré !", live: "EN DIRECT", stations: "Stations radio", playlists: "Playlists",
    clips: "Clips", lives: "Lives", interviews: "Interviews", all: "Tous", search: "Rechercher un artiste ou un titre...",
    comments: "Commentaires", writeComment: "Écrire un commentaire...", sendComment: "Envoyer", noComments: "Aucun commentaire",
    like: "J'aime"
  },
  en: {
    tag: "Haitian music, Haitian rap.",
    email: "Email", pass: "Password", login: "Log in", signup: "Sign up",
    name: "Choose your artist name", save: "Save", home: "Home", pub: "Post",
    me: "Profile", radio: "Radio", tv: "TV", latest: "Latest tracks", none: "No tracks yet.",
    title: "Title", send: "Publish track", out: "Log out", mine: "tracks published",
    ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...",
    lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)",
    saved: "Profile saved!", live: "LIVE", stations: "Radio stations", playlists: "Playlists",
    clips: "Clips", lives: "Lives", interviews: "Interviews", all: "All", search: "Search an artist or track...",
    comments: "Comments", writeComment: "Write a comment...", sendComment: "Send", noComments: "No comments",
    like: "Like"
  },
  ht: {
    tag: "Mizik ayisyen, rap ayisyen.",
    email: "Imèl", pass: "Modpas", login: "Konekte", signup: "Kreye yon kont",
    name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", pub: "Pibliye",
    me: "Pwofil", radio: "Radio", tv: "TV", latest: "Dènye mizik yo", none: "Poko gen mizik.",
    title: "Tit", send: "Pibliye mizik la", out: "Soti", mine: "mizik pibliye",
    ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...",
    lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)",
    saved: "Pwofil la anrejistre !", live: "AN DIRÈK", stations: "Estasyon radyo", playlists: "Playlist",
    clips: "Klip", lives: "Live", interviews: "Entèvyou", all: "Tout", search: "Chèche yon atis oswa yon mizik...",
    comments: "Kòmantè", writeComment: "Ekri yon kòmantè...", sendComment: "Voye", noComments: "Pa gen kòmantè",
    like: "Renmen"
  },
  es: {
    tag: "Música haitiana, rap haitiano.",
    email: "Correo", pass: "Contraseña", login: "Iniciar sesión", signup: "Crear cuenta",
    name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", pub: "Publicar",
    me: "Perfil", radio: "Radio", tv: "TV", latest: "Últimos temas", none: "Aún no hay temas.",
    title: "Título", send: "Publicar tema", out: "Salir", mine: "temas publicados",
    ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...",
    lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)",
    saved: "¡Perfil guardado!", live: "EN VIVO", stations: "Estaciones de radio", playlists: "Playlists",
    clips: "Clips", lives: "Lives", interviews: "Entrevistas", all: "Todos", search: "Buscar un artista o tema...",
    comments: "Comentarios", writeComment: "Escribe un comentario...", sendComment: "Enviar", noComments: "Sin comentarios",
    like: "Me gusta"
  },
};

const LANGS = [["en", "English"], ["fr", "Français"], ["ht", "Kreyòl"], ["es", "Español"]];
const COVERS = ["#1f5cff,#07070c", "#e8262f,#07070c", "#1f5cff,#e8262f"];

const css = `
  *{box-sizing:border-box}
  body{margin:0;background:#07070c;color:#f2f2f7;font-family:system-ui,-apple-system,sans-serif;
    background-image:radial-gradient(60% 40% at 90% 100%,#e8262f22,transparent),radial-gradient(60% 40% at 0% 0%,#1f5cff22,transparent);
    background-attachment:fixed}
  .w{max-width:480px;margin:0 auto;padding:20px 16px 110px}
  h1{font-size:32px;font-weight:800;margin:0 0 4px;letter-spacing:-.5px}
  h1 b{background:linear-gradient(90deg,#1f5cff,#a855f7,#e8262f);-webkit-background-clip:text;background-clip:text;color:transparent}
  h2{font-size:20px;font-weight:700;margin:0 0 16px}
  .sub{color:#9a9ab3;margin:0 0 20px;font-size:14px}
  input,textarea{display:block;width:100%;padding:14px 16px;margin-top:10px;border-radius:14px;
    border:1px solid #24243a;background:rgba(18,18,28,.8);color:#fff;font-size:16px;font-family:inherit;backdrop-filter:blur(8px)}
  textarea{min-height:90px;resize:vertical}
  label{display:block;margin-top:14px;color:#9a9ab3;font-size:13px;font-weight:500}
  .btn{display:block;width:100%;padding:15px;margin-top:14px;border:0;border-radius:14px;
    background:linear-gradient(90deg,#1f5cff,#a855f7,#e8262f);color:#fff;font-weight:700;font-size:16px;cursor:pointer;
    box-shadow:0 4px 20px rgba(168,85,247,.25);transition:transform .15s}
  .btn:active{transform:scale(.98)}
  .btn:disabled{opacity:.6;cursor:not-allowed}
  .alt{background:rgba(18,18,28,.8);border:1px solid #24243a;box-shadow:none}
  .lang button{display:block;width:100%;padding:16px;margin-top:10px;border-radius:14px;
    border:1px solid #24243a;background:rgba(18,18,28,.8);color:#fff;font-size:16px;text-align:left;backdrop-filter:blur(8px)}
  .card{background:rgba(18,18,28,.7);border:1px solid #24243a;border-radius:18px;margin-bottom:14px;overflow:hidden;backdrop-filter:blur(12px)}
  .cover{height:140px;display:flex;align-items:flex-end;padding:14px;font-size:22px;font-weight:800;text-shadow:0 2px 12px #000}
  .info{padding:14px}
  .who{display:flex;align-items:center;gap:10px;color:#9a9ab3;margin-bottom:10px;font-size:14px}
  .sm{width:32px;height:32px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);
    display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
  audio{width:100%;margin-top:4px;border-radius:8px}
  .actions{display:flex;gap:18px;margin-top:12px;align-items:center}
  .actions button{background:none;border:0;color:#9a9ab3;font-size:13px;display:flex;align-items:center;gap:6px;cursor:pointer;padding:0}
  .actions button.liked{color:#e8262f}
  .actions button:hover{color:#fff}
  .nav{position:fixed;left:0;right:0;bottom:0;display:flex;background:rgba(10,10,18,.92);
    border-top:1px solid #24243a;padding:8px 0 calc(8px + env(safe-area-inset-bottom,0px));backdrop-filter:blur(20px);z-index:50}
  .nav button{flex:1;padding:8px 0;background:none;border:0;color:#6b6b80;font-size:11px;font-weight:500;display:flex;flex-direction:column;align-items:center;gap:3px}
  .nav .on{color:#fff}
  .nav .on svg{color:#a855f7}
  .nav .center{position:relative;top:-18px}
  .nav .center span{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#1f5cff,#a855f7,#e8262f);
    display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(168,85,247,.4)}
  .avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);
    display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;margin:10px auto;border:3px solid transparent;
    box-shadow:0 0 0 3px #a855f7}
  .msg{color:#9a9ab3;min-height:20px;font-size:14px;margin-top:8px}
  .station,.vcard{background:rgba(18,18,28,.7);border:1px solid #24243a;border-radius:16px;padding:14px;margin-bottom:12px;backdrop-filter:blur(10px)}
  .live-dot{display:inline-block;width:8px;height:8px;background:#e8262f;border-radius:50%;margin-right:6px;animation:pulse 1.5s infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .chip{display:inline-block;padding:6px 14px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid #24243a;
    font-size:13px;margin-right:8px;margin-bottom:8px;cursor:pointer}
  .chip.on{background:linear-gradient(90deg,#1f5cff33,#e8262f33);border-color:#a855f7;color:#fff}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .vthumb{aspect-ratio:16/10;border-radius:12px;background:#12121c;display:flex;align-items:center;justify-content:center;
    font-size:28px;position:relative;overflow:hidden}
  .vthumb span{position:absolute;bottom:6px;right:8px;font-size:11px;background:rgba(0,0,0,.7);padding:2px 6px;border-radius:4px}
  .search-box{margin-bottom:16px}
  .comments-box{margin-top:12px;padding-top:12px;border-top:1px solid #24243a}
  .comment{padding:8px 0;font-size:13px;border-bottom:1px solid #1a1a28}
  .comment strong{color:#a855f7;margin-right:6px}
  .comment-input{display:flex;gap:8px;margin-top:10px}
  .comment-input input{flex:1;margin-top:0}
  .comment-input button{padding:10px 16px;border:0;border-radius:12px;background:linear-gradient(90deg,#1f5cff,#e8262f);color:#fff;font-weight:600;cursor:pointer;white-space:nowrap}
`;

function Avatar({ p, big }) {
  if (p?.avatar_url) return <img className={big ? "avatar" : "sm"} src={p.avatar_url} alt="" />;
  const l = (p?.username || "?")[0].toUpperCase();
  return <div className={big ? "avatar" : "sm"}>{l}</div>;
}

function Icon({ name, size = 22 }) {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    radio: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    tv: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    heart: <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    comment: <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  };
  return icons[name] || null;
}

export default function Home() {
  const [lang, setLang] = useState(null);
  const [tab, setTab] = useState("home");
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
  const [tvFilter, setTvFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const t = T[lang || "fr"];

  // Load likes & comments from localStorage
  useEffect(() => {
    try {
      const l = localStorage.getItem("raplike_likes");
      const c = localStorage.getItem("raplike_comments");
      if (l) setLikes(JSON.parse(l));
      if (c) setComments(JSON.parse(c));
    } catch (e) {}
  }, []);

  function saveLikes(next) {
    setLikes(next);
    try { localStorage.setItem("raplike_likes", JSON.stringify(next)); } catch (e) {}
  }
  function saveComments(next) {
    setComments(next);
    try { localStorage.setItem("raplike_comments", JSON.stringify(next)); } catch (e) {}
  }

  function toggleLike(trackId) {
    if (!user) return;
    const key = trackId + "_" + user.id;
    const next = { ...likes };
    if (next[key]) delete next[key];
    else next[key] = true;
    saveLikes(next);
  }

  function getLikeCount(trackId) {
    return Object.keys(likes).filter(k => k.startsWith(trackId + "_")).length;
  }

  function isLiked(trackId) {
    return user ? !!likes[trackId + "_" + user.id] : false;
  }

  function addComment(trackId) {
    if (!user || !newComment[trackId]?.trim()) return;
    const list = comments[trackId] || [];
    const next = {
      ...comments,
      [trackId]: [...list, { user: profile?.username || "User", text: newComment[trackId].trim(), at: Date.now() }]
    };
    saveComments(next);
    setNewComment({ ...newComment, [trackId]: "" });
  }

  async function loadTracks() {
    const { data } = await supabase.from("tracks")
      .select("id,title,audio_url,cover_url,artist_id,profiles(username,avatar_url)")
      .order("created_at", { ascending: false });
    setTracks(data || []);
  }

  useEffect(() => {
    try { const l = localStorage.getItem("lang"); if (l && T[l]) setLang(l); } catch (e) {}
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: s } = supabase.auth.onAuthStateChange((_e, x) => setUser(x?.user ?? null));
    loadTracks();
    return () => s.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setProfile(undefined); return; }
    supabase.from("profiles").select("username,bio,avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => { setProfile(data); setBio(data?.bio || ""); });
  }, [user]);

  function pick(l) { setLang(l); try { localStorage.setItem("lang", l); } catch (e) {} }
  async function signUp() { const { error } = await supabase.auth.signUp({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function logIn() { const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function createProfile() {
    const { error } = await supabase.from("profiles").insert({ id: user.id, username });
    if (error) setMsg(error.message); else { setMsg(""); setProfile({ username }); }
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
      setProfile({ ...profile, ...upd }); setAvatarFile(null); setMsg(t.saved); loadTracks();
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
      setMsg(t.ok); setTitle(""); setFile(null); setCoverFile(null); loadTracks(); setTab("home");
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }

  const Logo = <h1>RAP<b>LIKE</b> 509</h1>;
  const Style = <style>{css}</style>;
  const mine = tracks.filter((x) => x.artist_id === user?.id).length;

  const filteredTracks = tracks.filter(x => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (x.title || "").toLowerCase().includes(q) || (x.profiles?.username || "").toLowerCase().includes(q);
  });

  if (!lang) return (
    <div className="w">{Style}{Logo}<p className="sub">{T.fr.tag}</p>
      <div className="lang">{LANGS.map(([k, n]) => <button key={k} onClick={() => pick(k)}>{n}</button>)}</div>
    </div>
  );

  if (!user) return (
    <div className="w">{Style}{Logo}<p className="sub">{t.tag}</p>
      <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder={t.pass} value={pass} onChange={(e) => setPass(e.target.value)} />
      <button className="btn" onClick={logIn}>{t.login}</button>
      <button className="btn alt" onClick={signUp}>{t.signup}</button>
      <p className="msg">{msg}</p>
      <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
    </div>
  );

  if (profile === null) return (
    <div className="w">{Style}{Logo}<h2>{t.name}</h2>
      <input placeholder={t.name} value={username} onChange={(e) => setUsername(e.target.value)} />
      <button className="btn" onClick={createProfile}>{t.save}</button>
      <p className="msg">{msg}</p>
    </div>
  );

  return (
    <div className="w">{Style}{Logo}

      {/* ===== ACCUEIL ===== */}
      {tab === "home" && (<>
        <div className="search-box">
          <input placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <h2>{t.latest}</h2>
        {filteredTracks.length === 0 && <p className="sub">{t.none}</p>}
        {filteredTracks.map((x, i) => (
          <div className="card" key={x.id}>
            <div className="cover" style={x.cover_url
              ? { backgroundImage: "url(" + x.cover_url + ")", backgroundSize: "cover", backgroundPosition: "center" }
              : { background: "linear-gradient(135deg," + COVERS[i % 3] + ")" }}>{x.title}</div>
            <div className="info">
              <div className="who"><Avatar p={x.profiles} />{x.profiles?.username}</div>
              <audio controls src={x.audio_url} />
              <div className="actions">
                <button className={isLiked(x.id) ? "liked" : ""} onClick={() => toggleLike(x.id)}>
                  <Icon name="heart" /> {getLikeCount(x.id) || ""}
                </button>
                <button onClick={() => setOpenComments({ ...openComments, [x.id]: !openComments[x.id] })}>
                  <Icon name="comment" /> {(comments[x.id] || []).length || ""}
                </button>
              </div>
              {openComments[x.id] && (
                <div className="comments-box">
                  <p style={{fontSize:13,fontWeight:600,margin:"0 0 8px"}}>{t.comments}</p>
                  {(comments[x.id] || []).length === 0 && <p className="sub" style={{fontSize:12}}>{t.noComments}</p>}
                  {(comments[x.id] || []).map((c, idx
