"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const T = {
  fr: { plat: "PLATEFORME RAP HAÏTIEN", tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", login: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", radio: "Radio", tv: "TV", me: "Profil", pub: "Publier", latest: "Derniers titres", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", mine: "titres publiés", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)", saved: "Profil enregistré !", search: "Rechercher un artiste ou un titre...", write: "Écrire un commentaire...", post: "Envoyer", nocom: "Aucun commentaire", nostat: "Aucune station pour l'instant.", live: "EN DIRECT", now: "EN CE MOMENT", st: "Stations radio", fav: "Ajouter aux favoris" },
  en: { plat: "HAITIAN RAP PLATFORM", tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", login: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", radio: "Radio", tv: "TV", me: "Profile", pub: "Post", latest: "Latest tracks", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", mine: "tracks published", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)", saved: "Profile saved!", search: "Search an artist or track...", write: "Write a comment...", post: "Send", nocom: "No comments", nostat: "No stations yet.", live: "LIVE", now: "NOW PLAYING", st: "Radio stations", fav: "Add to favorites" },
  ht: { plat: "PLATFÒM RAP AYISYEN", tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", login: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", radio: "Radyo", tv: "TV", me: "Pwofil", pub: "Pibliye", latest: "Dènye mizik yo", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", mine: "mizik pibliye", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)", saved: "Pwofil la anrejistre !", search: "Chèche yon atis oswa yon mizik...", write: "Ekri yon kòmantè...", post: "Voye", nocom: "Pa gen kòmantè", nostat: "Poko gen estasyon.", live: "AN DIRÈK", now: "KOUNYE A", st: "Estasyon radyo", fav: "Ajoute nan favori" },
  es: { plat: "PLATAFORMA RAP HAITIANO", tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", login: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", radio: "Radio", tv: "TV", me: "Perfil", pub: "Publicar", latest: "Últimos temas", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", mine: "temas publicados", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)", saved: "¡Perfil guardado!", search: "Buscar un artista o tema...", write: "Escribe un comentario...", post: "Enviar", nocom: "Sin comentarios", nostat: "Aún no hay estaciones.", live: "EN VIVO", now: "AHORA", st: "Estaciones de radio", fav: "Añadir a favoritos" },
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
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0",
};
function Icon({ n, s = 22, fill }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={P[n]} />
    </svg>
  );
}
function Avatar({ p, big }) {
  if (p?.avatar_url) return <img className={big ? "avatar" : "sm"} src={p.avatar_url} alt="" />;
  return <div className={big ? "avatar" : "sm"}>{(p?.username || "?")[0].toUpperCase()}</div>;
}
const fmt = (s) => Math.floor((s || 0) / 60) + ":" + String(Math.floor((s || 0) % 60)).padStart(2, "0");

const css = `
*{box-sizing:border-box}
body{margin:0;background:#07070c;color:#f4f4f8;font-family:system-ui,-apple-system,sans-serif;background-image:radial-gradient(70% 40% at 100% 100%,#e8262f26,transparent),radial-gradient(70% 40% at 0% 0%,#1f5cff26,transparent);background-attachment:fixed}
.w{max-width:480px;margin:0 auto;padding:0 16px 130px}
.pad{padding-top:48px}
.top{display:flex;justify-content:space-between;align-items:center;padding:16px 0 8px}
h1{font-size:28px;font-weight:800;font-style:italic;letter-spacing:-.8px;margin:0}
h1 b{background:linear-gradient(90deg,#3b82f6,#a855f7,#ef4444);-webkit-background-clip:text;background-clip:text;color:transparent}
.plat{font-size:11px;letter-spacing:2px;color:#8a8aa3;margin-top:2px}
.bell{width:46px;height:46px;border-radius:14px;border:1px solid #ffffff22;background:#ffffff0a;color:#fff;display:flex;align-items:center;justify-content:center}
h2{font-size:17px;font-weight:800;letter-spacing:.5px;margin:22px 0 12px;text-transform:uppercase}
.sub{color:#9a9ab3;margin:0 0 20px;font-size:14px}
input,textarea{display:block;width:100%;padding:14px 16px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:16px;font-family:inherit}
textarea{min-height:90px}
label{display:block;margin-top:14px;color:#9a9ab3;font-size:13px}
.btn{display:block;width:100%;padding:15px;margin-top:14px;border:0;border-radius:14px;background:linear-gradient(90deg,#2f6bff,#a855f7,#ef4444);color:#fff;font-weight:700;font-size:16px;box-shadow:0 6px 24px #a855f740}
.btn:disabled{opacity:.6}
.alt{background:#ffffff0a;border:1px solid #ffffff18;box-shadow:none}
.lang button{display:block;width:100%;padding:17px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:17px;text-align:left}
.liveb{color:#ef4444;font-size:12px;font-weight:800;letter-spacing:1px;display:flex;align-items:center;gap:6px}
.liveb i{width:8px;height:8px;border-radius:50%;background:#ef4444;animation:p 1.4s infinite}
@keyframes p{50%{opacity:.3}}
.ring{width:250px;height:250px;margin:14px auto;padding:5px;border-radius:50%;background:conic-gradient(#3b82f6,#a855f7,#ef4444,#3b82f6);box-shadow:0 0 50px #a855f755}
.disc{width:100%;height:100%;border-radius:50%;background:repeating-radial-gradient(#0a0a0a 0 2px,#181818 3px 4px);display:flex;align-items:center;justify-content:center}
.spin{animation:spin 6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.lab{width:42%;aspect-ratio:1;border-radius:50%;background:#000 center/cover;border:2px solid #ffffff22;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;font-style:italic;text-align:center}
.np{text-align:center}
.np small{letter-spacing:3px;color:#9a9ab3;font-size:12px}
.np h3{font-size:26px;margin:4px 0}
.np span{color:#c084fc;font-weight:700;letter-spacing:2px;font-size:13px;text-transform:uppercase}
.bar{height:5px;border-radius:5px;background:#ffffff1f;margin:14px 8px 6px;overflow:hidden}
.bar i{display:block;height:100%;background:linear-gradient(90deg,#3b82f6,#a855f7,#ef4444)}
.times{display:flex;justify-content:center;gap:10px;color:#9a9ab3;font-size:13px}
.ctl{display:flex;align-items:center;justify-content:center;gap:22px;margin:16px 0 8px}
.ctl button{width:54px;height:54px;border-radius:50%;border:1px solid #ffffff22;background:#ffffff0a;color:#fff;display:flex;align-items:center;justify-content:center}
.ctl .main{width:76px;height:76px;border:0;background:linear-gradient(135deg,#2f6bff,#a855f7,#ef4444);box-shadow:0 6px 28px #a855f77a}
.favb{display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:0;color:#c084fc;font-size:14px;margin:0 auto}
.favb.liked{color:#ef4444}
.hs{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
.sc{flex:0 0 190px;background:#ffffff08;border:1px solid #ffffff1c;border-radius:16px;padding:14px;color:#fff;text-align:left}
.sc strong{display:block;margin-top:8px}
.row{background:#ffffff08;border:1px solid #ffffff14;border-radius:16px;padding:12px;margin-bottom:10px}
.rh{display:flex;align-items:center;gap:12px}
.th{width:52px;height:52px;border-radius:12px;background:#222 center/cover;flex:0 0 52px}
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
.sm{width:32px;height:32px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
.st{background:#ffffff08;border:1px solid #ffffff14;border-radius:18px;padding:16px;margin-bottom:14px}
audio{width:100%}
.vid{width:100%;aspect-ratio:16/9;border:0;border-radius:12px;margin-top:10px;background:#000}
.avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;margin:10px auto;box-shadow:0 0 0 3px #a855f7}
.msg{color:#9a9ab3;min-height:20px;font-size:14px;margin-top:8px}
.nav{position:fixed;left:12px;right:12px;bottom:calc(10px + env(safe-area-inset-bottom,0px));display:flex;align-items:flex-end;background:#0c0c14f2;backdrop-filter:blur(20px);border:1px solid #ffffff1c;border-radius:26px;padding:8px 4px;z-index:50;max-width:456px;margin:0 auto}
.nav button{flex:1;background:none;border:0;color:#6e6e86;font-size:11px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0}
.nav .on{color:#fff}
.nav .on svg{color:#c084fc}
.nav .mid span{width:54px;height:54px;border-radius:50%;margin-top:-30px;background:linear-gradient(135deg,#2f6bff,#a855f7,#ef4444);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 6px 24px #a855f766}
`;

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
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [openC, setOpenC] = useState({});
  const [draft, setDraft] = useState({});
  const [cur, setCur] = useState(0);
  const [loaded, setLoaded] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [pr, setPr] = useState({ t: 0, d: 0 });
  const aRef = useRef(null);
  const t = T[lang || "fr"];

  async function loadTracks() {
    const { data } = await supabase.from("tracks")
      .select("id,title,audio_url,cover_url,artist_id,profiles!artist_id(username,avatar_url)")
      .order("created_at", { ascending: false });
    setTracks(data || []);
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
    loadTracks(); loadLikes(); loadComments(); loadStations();
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
      setMsg(t.ok); setTitle(""); setFile(null); setCoverFile(null); await loadTracks(); setTab("home");
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  }

  const likeCount = (id) => likes.filter((l) => l.track_id === id).length;
  const isLiked = (id) => likes.some((l) => l.track_id === id && l.user_id === user?.id);
  async function toggleLike(id) {
    if (isLiked(id)) {
      setLikes(likes.filter((l) => !(l.track_id === id && l.user_id === user.id)));
      await supabase.from("likes").delete().eq("track_id", id).eq("user_id", user.id);
    } else {
      setLikes([...likes, { track_id: id, user_id: user.id }]);
      await supabase.from("likes").insert({ track_id: id, user_id: user.id });
    }
  }
  async function addComment(id) {
    const body = (draft[id] || "").trim();
    if (!body) return;
    setDraft({ ...draft, [id]: "" });
    await supabase.from("comments").insert({ track_id: id, user_id: user.id, body });
    loadComments();
  }

  function load(i) {
    const a = aRef.current;
    if (!a || !tracks[i]) return;
    setCur(i); setLoaded(i); a.src = tracks[i].audio_url; a.play().catch(() => {});
  }
  function toggle() {
    const a = aRef.current;
    if (!a || !tracks.length) return;
    if (loaded !== cur) load(cur); else if (a.paused) a.play().catch(() => {}); else a.pause();
  }
  const step = (d) => { if (tracks.length) load((cur + d + tracks.length) % tracks.length); };
  function seek(e) {
    const a = aRef.current;
    if (!a || !a.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  }

  const Logo = (
    <div>
      <h1>RAP<b>LIKE</b> 509</h1>
    </div>
  );
  const Style = <style>{css}</style>;
  const mine = tracks.filter((x) => x.artist_id === user?.id).length;
  const q = search.trim().toLowerCase();
  const shown = tracks.filter((x) => !q || (x.title || "").toLowerCase().includes(q) || (x.profiles?.username || "").toLowerCase().includes(q));
  const c = tracks[cur];
  const radios = stations.filter((s) => s.kind === "radio");

  if (!lang) return (
    <div className="w pad">{Style}<h1 style={{ fontSize: 42 }}>RAP<b>LIKE</b> 509</h1><p className="sub">{T.fr.tag}</p>
      <div className="lang">{LANGS.map(([k, n]) => <button key={k} onClick={() => pick(k)}>{n}</button>)}</div>
    </div>
  );

  if (!user) return (
    <div className="w pad">{Style}<h1 style={{ fontSize: 42 }}>RAP<b>LIKE</b> 509</h1><p className="sub">{t.tag}</p>
      <input type="email" placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder={t.pass} value={pass} onChange={(e) => setPass(e.target.value)} />
      <button className="btn" onClick={logIn}>{t.login}</button>
      <button className="btn alt" onClick={signUp}>{t.signup}</button>
      <p className="msg">{msg}</p>
      <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
    </div>
  );

  if (profile === null) return (
    <div className="w pad">{Style}{Logo}<h2>{t.name}</h2>
      <input placeholder={t.name} value={username} onChange={(e) => setUsername(e.target.value)} />
      <button className="btn" onClick={createProfile}>{t.save}</button>
      <p className="msg">{msg}</p>
    </div>
  );

  const nav = [["home", t.home, "home"], ["radio", t.radio, "radio"], ["pub", t.pub, "plus"], ["tv", t.tv, "tv"], ["me", t.me, "user"]];

  return (
    <div className="w">{Style}
      <audio ref={aRef}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPr({ t: e.target.currentTime, d: e.target.duration || 0 })}
        onEnded={() => step(1)} />

      <div className="top">
        <div>{Logo}<div className="plat">{t.plat}</div></div>
        <button className="bell" aria-label="Notifications"><Icon n="bell" /></button>
      </div>

      {tab === "home" && (<>
        <div className="liveb" style={{ marginTop: 14 }}><i />{t.now}</div>
        <div className="ring"><div className={"disc" + (playing ? " spin" : "")}>
          <div className="lab" style={c?.cover_url ? { backgroundImage: "url(" + c.cover_url + ")" } : {}}>{!c?.cover_url && <>RAPLIKE<br />509</>}</div>
        </div></div>

        {c ? (
          <div className="np">
            <small>{t.now}</small>
            <h3>{c.title}</h3>
            <span>{c.profiles?.username}</span>
            <div className="bar" onClick={seek}><i style={{ width: (pr.d ? (pr.t / pr.d) * 100 : 0) + "%" }} /></div>
            <div className="times"><span>{fmt(pr.t)}</span>|<span>{fmt(pr.d)}</span></div>
            <div className="ctl">
              <button onClick={() => step(-1)} aria-label="Prev"><Icon n="prev" s={22} fill /></button>
              <button className="main" onClick={toggle} aria-label="Play"><Icon n={playing && loaded === cur ? "pause" : "play"} s={30} fill /></button>
              <button onClick={() => step(1)} aria-label="Next"><Icon n="next" s={22} fill /></button>
            </div>
            <button className={"favb" + (isLiked(c.id) ? " liked" : "")} onClick={() => toggleLike(c.id)}>
              <Icon n="heart" s={20} fill={isLiked(c.id)} />{t.fav}
            </button>
          </div>
        ) : <p className="sub" style={{ textAlign: "center" }}>{t.none}</p>}

        <h2>{t.st}</h2>
        {radios.length === 0 && <p className="sub">{t.nostat}</p>}
        <div className="hs">
          {radios.map((s) => (
            <button className="sc" key={s.id} onClick={() => setTab("radio")}>
              <span className="liveb"><i />{t.live}</span>
              <strong>{s.name}</strong>
            </button>
          ))}
        </div>

        <h2>{t.latest}</h2>
        <input placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginTop: 0, marginBottom: 14 }} />
        {shown.map((x, i) => {
          const idx = tracks.indexOf(x);
          const cs = comments.filter((cm) => cm.track_id === x.id);
          return (
            <div className="row" key={x.id}>
              <div className="rh">
                <div className="th" style={x.cover_url ? { backgroundImage: "url(" + x.cover_url + ")" } : { background: "linear-gradient(135deg," + COVERS[i % 3] + ")" }} />
                <div className="rt"><b>{x.title}</b><small>{x.profiles?.username}</small></div>
                <button className="pl" onClick={() => load(idx)} aria-label="Play"><Icon n={playing && loaded === idx ? "pause" : "play"} s={18} fill /></button>
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
        })}
      </>)}

      {tab === "radio" && (<>
        <h2>{t.radio}</h2>
        {radios.length === 0 && <p className="sub">{t.nostat}</p>}
        {radios.map((s) => (
          <div className="st" key={s.id}>
            <div className="liveb"><i />{t.live}</div>
            <strong>{s.name}</strong>
            <audio controls src={s.stream_url} preload="none" style={{ marginTop: 10 }} />
          </div>
        ))}
      </>)}

      {tab === "tv" && (<>
        <h2>{t.tv}</h2>
        {stations.filter((s) => s.kind === "tv").length === 0 && <p className="sub">{t.nostat}</p>}
        {stations.filter((s) => s.kind === "tv").map((s) => (
          <div className="st" key={s.id}>
            <div className="liveb"><i />{t.live}</div>
            <strong>{s.name}</strong>
            {s.stream_url.includes("embed")
              ? <iframe className="vid" src={s.stream_url} allow="autoplay; fullscreen" allowFullScreen />
              : <video className="vid" controls playsInline src={s.stream_url} />}
          </div>
        ))}
      </>)}

      {tab === "pub" && (<>
        <h2>{t.pub}</h2>
        <input placeholder={t.title} value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Audio</label>
        <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        <label>{t.cover}</label>
        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0] || null)} />
        <button className="btn" onClick={upload} disabled={busy}>{t.send}</button>
        <p className="msg">{msg}</p>
      </>)}

      {tab === "me" && (<>
        <Avatar p={profile} big />
        <h2 style={{ textAlign: "center", margin: 0 }}>{profile?.username}</h2>
        <p className="sub" style={{ textAlign: "center" }}>{mine} {t.mine}</p>
        <label>{t.photo}</label>
        <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0] || null)} />
        <label>{t.bio}</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        <button className="btn" onClick={saveProfile} disabled={busy}>{t.save}</button>
        <p className="msg">{msg}</p>
        <button className="btn alt" onClick={() => setLang(null)}>{t.lang}</button>
        <button className="btn alt" onClick={() => supabase.auth.signOut()}>{t.out}</button>
      </>)}

      <nav className="nav">
        {nav.map(([k, n, ic]) => (
          <button key={k} className={(tab === k ? "on " : "") + (k === "pub" ? "mid" : "")} onClick={() => { setTab(k); setMsg(""); }}>
            {k === "pub" ? <span><Icon n={ic} s={26} /></span> : <><Icon n={ic} />{n}</>}
          </button>
        ))}
      </nav>
    </div>
  );
}
