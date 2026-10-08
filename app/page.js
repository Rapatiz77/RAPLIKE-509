"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const T = {
  fr: { tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", login: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", radio: "Radio", tv: "TV", me: "Profil", pub: "Publier", latest: "Derniers titres", top: "À la une", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", mine: "titres publiés", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)", saved: "Profil enregistré !", search: "Rechercher un artiste ou un titre...", comments: "Commentaires", write: "Écrire un commentaire...", post: "Envoyer", nocom: "Aucun commentaire", nostat: "Aucune station pour l'instant.", live: "EN DIRECT" },
  en: { tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", login: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", radio: "Radio", tv: "TV", me: "Profile", pub: "Post", latest: "Latest tracks", top: "Featured", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", mine: "tracks published", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)", saved: "Profile saved!", search: "Search an artist or track...", comments: "Comments", write: "Write a comment...", post: "Send", nocom: "No comments", nostat: "No stations yet.", live: "LIVE" },
  ht: { tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", login: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", radio: "Radyo", tv: "TV", me: "Pwofil", pub: "Pibliye", latest: "Dènye mizik yo", top: "Nan vitrin", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", mine: "mizik pibliye", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)", saved: "Pwofil la anrejistre !", search: "Chèche yon atis oswa yon mizik...", comments: "Kòmantè", write: "Ekri yon kòmantè...", post: "Voye", nocom: "Pa gen kòmantè", nostat: "Poko gen estasyon.", live: "AN DIRÈK" },
  es: { tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", login: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", radio: "Radio", tv: "TV", me: "Perfil", pub: "Publicar", latest: "Últimos temas", top: "Destacado", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", mine: "temas publicados", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)", saved: "¡Perfil guardado!", search: "Buscar un artista o tema...", comments: "Comentarios", write: "Escribe un comentario...", post: "Enviar", nocom: "Sin comentarios", nostat: "Aún no hay estaciones.", live: "EN VIVO" },
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

const css = `
*{box-sizing:border-box}
body{margin:0;background:#07070c;color:#f4f4f8;font-family:system-ui,-apple-system,sans-serif;background-image:radial-gradient(70% 40% at 100% 100%,#e8262f26,transparent),radial-gradient(70% 40% at 0% 0%,#1f5cff26,transparent);background-attachment:fixed}
.w{max-width:480px;margin:0 auto;padding:0 16px 120px}
.pad{padding-top:48px}
.top{position:sticky;top:0;z-index:20;margin:0 -16px 18px;padding:14px 16px;background:#07070ccc;backdrop-filter:blur(18px);border-bottom:1px solid #ffffff12}
h1{font-size:26px;font-weight:800;letter-spacing:-.8px;margin:0}
h1 b{background:linear-gradient(90deg,#3b82f6,#a855f7,#ef4444);-webkit-background-clip:text;background-clip:text;color:transparent}
h2{font-size:20px;font-weight:700;letter-spacing:-.3px;margin:0 0 14px}
.sub{color:#9a9ab3;margin:0 0 20px;font-size:14px}
input,textarea{display:block;width:100%;padding:14px 16px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:16px;font-family:inherit}
textarea{min-height:90px}
label{display:block;margin-top:14px;color:#9a9ab3;font-size:13px}
.btn{display:block;width:100%;padding:15px;margin-top:14px;border:0;border-radius:14px;background:linear-gradient(90deg,#2f6bff,#a855f7,#ef4444);color:#fff;font-weight:700;font-size:16px;box-shadow:0 6px 24px #a855f740}
.btn:active{transform:scale(.98)}
.btn:disabled{opacity:.6}
.alt{background:#ffffff0a;border:1px solid #ffffff18;box-shadow:none}
.lang button{display:block;width:100%;padding:17px;margin-top:10px;border-radius:14px;border:1px solid #ffffff18;background:#ffffff0a;color:#fff;font-size:17px;text-align:left}
.card{background:#ffffff08;border:1px solid #ffffff14;border-radius:20px;margin-bottom:16px;overflow:hidden;animation:up .4s ease both}
.card.big{border:1px solid #a855f766;box-shadow:0 10px 40px #a855f722}
@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.cover{height:150px;display:flex;align-items:flex-end;padding:14px;font-size:22px;font-weight:800;text-shadow:0 2px 12px #000}
.big .cover{height:230px;font-size:28px}
.tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:1px;color:#fff;background:#a855f7;padding:4px 10px;border-radius:20px;margin-bottom:8px}
.info{padding:14px}
.who{display:flex;align-items:center;gap:10px;color:#b4b4c8;margin-bottom:10px;font-size:14px}
.sm{width:32px;height:32px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
audio{width:100%}
.act{display:flex;gap:20px;margin-top:12px}
.act button{background:none;border:0;color:#9a9ab3;font-size:14px;display:flex;align-items:center;gap:6px;padding:0}
.act .liked{color:#ef4444}
.cbox{margin-top:12px;padding-top:12px;border-top:1px solid #ffffff14}
.cm{padding:8px 0;font-size:14px;border-bottom:1px solid #ffffff0c}
.cm b{color:#c084fc;margin-right:6px}
.crow{display:flex;gap:8px;margin-top:10px}
.crow input{margin-top:0;flex:1}
.crow button{border:0;border-radius:12px;padding:0 16px;background:linear-gradient(90deg,#2f6bff,#ef4444);color:#fff;font-weight:600}
.st{background:#ffffff08;border:1px solid #ffffff14;border-radius:18px;padding:16px;margin-bottom:14px}
.live{font-size:11px;font-weight:700;letter-spacing:1px;color:#ef4444;display:flex;align-items:center;gap:6px;margin-bottom:6px}
.live i{width:8px;height:8px;border-radius:50%;background:#ef4444;animation:p 1.4s infinite}
@keyframes p{50%{opacity:.3}}
.vid{width:100%;aspect-ratio:16/9;border:0;border-radius:12px;margin-top:10px;background:#000}
.avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;margin:10px auto;box-shadow:0 0 0 3px #a855f7}
.msg{color:#9a9ab3;min-height:20px;font-size:14px;margin-top:8px}
.nav{position:fixed;left:0;right:0;bottom:0;display:flex;align-items:flex-end;background:#0a0a12ee;backdrop-filter:blur(20px);border-top:1px solid #ffffff14;padding:8px 0 calc(8px + env(safe-area-inset-bottom,0px));z-index:50}
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

  const Logo = <h1>RAP<b>LIKE</b> 509</h1>;
  const Style = <style>{css}</style>;
  const mine = tracks.filter((x) => x.artist_id === user?.id).length;
  const q = search.trim().toLowerCase();
  const shown = tracks.filter((x) => !q || (x.title || "").toLowerCase().includes(q) || (x.profiles?.username || "").toLowerCase().includes(q));

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
    <div className="w pad">{Style}{Logo}<h2 style={{ marginTop: 24 }}>{t.name}</h2>
      <input placeholder={t.name} value={username} onChange={(e) => setUsername(e.target.value)} />
      <button className="btn" onClick={createProfile}>{t.save}</button>
      <p className="msg">{msg}</p>
    </div>
  );

  const nav = [["home", t.home, "home"], ["radio", t.radio, "radio"], ["pub", t.pub, "plus"], ["tv", t.tv, "tv"], ["me", t.me, "user"]];

  return (
    <div className="w">{Style}
      <div className="top">{Logo}</div>

      {tab === "home" && (<>
        <input placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginTop: 0, marginBottom: 18 }} />
        <h2>{q ? t.latest : t.top}</h2>
        {shown.length === 0 && <p className="sub">{t.none}</p>}
        {shown.map((x, i) => {
          const big = i === 0 && !q;
          const cs = comments.filter((c) => c.track_id === x.id);
          return (
            <div className={"card" + (big ? " big" : "")} key={x.id}>
              <div className="cover" style={{ background: x.cover_url
                ? "linear-gradient(transparent 40%,#000000b0),url(" + x.cover_url + ") center/cover"
                : "linear-gradient(135deg," + COVERS[i % 3] + ")" }}>
                <div>{big && <div className="tag">{t.top}</div>}<div>{x.title}</div></div>
              </div>
              <div className="info">
                <div className="who"><Avatar p={x.profiles} />{x.profiles?.username}</div>
                <audio controls src={x.audio_url} preload="none" />
                <div className="act">
                  <button className={isLiked(x.id) ? "liked" : ""} onClick={() => toggleLike(x.id)}><Icon n="heart" s={20} fill={isLiked(x.id)} />{likeCount(x.id) || ""}</button>
                  <button onClick={() => setOpenC({ ...openC, [x.id]: !openC[x.id] })}><Icon n="chat" s={20} />{cs.length || ""}</button>
                </div>
                {openC[x.id] && (
                  <div className="cbox">
                    {cs.length === 0 && <p className="sub" style={{ margin: 0 }}>{t.nocom}</p>}
                    {cs.map((c) => <div className="cm" key={c.id}><b>{c.profiles?.username}</b>{c.body}</div>)}
                    <div className="crow">
                      <input placeholder={t.write} value={draft[x.id] || ""} onChange={(e) => setDraft({ ...draft, [x.id]: e.target.value })} />
                      <button onClick={() => addComment(x.id)}>{t.post}</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </>)}

      {tab === "radio" && (<>
        <h2>{t.radio}</h2>
        {stations.filter((s) => s.kind === "radio").length === 0 && <p className="sub">{t.nostat}</p>}
        {stations.filter((s) => s.kind === "radio").map((s) => (
          <div className="st" key={s.id}>
            <div className="live"><i />{t.live}</div>
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
            <div className="live"><i />{t.live}</div>
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
