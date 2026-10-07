"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const T = {
  fr: { tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", login: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", pub: "Publier", me: "Profil", latest: "Derniers titres", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", mine: "titres publiés", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue", bio: "Ta bio", photo: "Photo de profil", cover: "Pochette (optionnelle)", saved: "Profil enregistré !" },
  en: { tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", login: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", pub: "Post", me: "Profile", latest: "Latest tracks", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", mine: "tracks published", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language", bio: "Your bio", photo: "Profile photo", cover: "Cover (optional)", saved: "Profile saved!" },
  ht: { tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", login: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", pub: "Pibliye", me: "Pwofil", latest: "Dènye mizik yo", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", mine: "mizik pibliye", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang", bio: "Bio ou", photo: "Foto pwofil", cover: "Kouvèti (opsyonèl)", saved: "Pwofil la anrejistre !" },
  es: { tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", login: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", pub: "Publicar", me: "Perfil", latest: "Últimos temas", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", mine: "temas publicados", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma", bio: "Tu bio", photo: "Foto de perfil", cover: "Portada (opcional)", saved: "¡Perfil guardado!" },
};
const LANGS = [["en", "English"], ["fr", "Français"], ["ht", "Kreyòl"], ["es", "Español"]];
const COVERS = ["#1f5cff,#07070c", "#e8262f,#07070c", "#1f5cff,#e8262f"];

const css = `
body{margin:0;background:#07070c;color:#f2f2f7;font-family:system-ui,sans-serif;background-image:radial-gradient(60% 40% at 90% 100%,#e8262f33,transparent),radial-gradient(60% 40% at 0% 0%,#1f5cff33,transparent);background-attachment:fixed}
.w{max-width:480px;margin:0 auto;padding:24px 20px 100px}
h1{font-size:40px;font-weight:800;margin:0 0 6px}
h1 b{background:linear-gradient(90deg,#1f5cff,#e8262f);-webkit-background-clip:text;background-clip:text;color:transparent}
h2{font-size:22px}
.sub{color:#9a9ab3;margin:0 0 24px}
input,textarea{display:block;width:100%;box-sizing:border-box;padding:14px;margin-top:12px;border-radius:12px;border:1px solid #24243a;background:#12121c;color:#fff;font-size:16px;font-family:inherit}
textarea{min-height:90px}
label{display:block;margin-top:14px;color:#9a9ab3;font-size:14px}
.btn{display:block;width:100%;padding:14px;margin-top:12px;border:0;border-radius:12px;background:linear-gradient(90deg,#1f5cff,#e8262f);color:#fff;font-weight:700;font-size:16px;cursor:pointer}
.alt{background:#12121c;border:1px solid #24243a}
.lang button{display:block;width:100%;padding:16px;margin-top:10px;border-radius:12px;border:1px solid #24243a;background:#12121c;color:#fff;font-size:17px;text-align:left}
.card{background:#12121c;border:1px solid #24243a;border-radius:14px;margin-bottom:14px;overflow:hidden}
.cover{height:130px;display:flex;align-items:flex-end;padding:12px;font-size:24px;font-weight:800;text-shadow:0 2px 8px #000}
.info{padding:12px 14px}
.who{display:flex;align-items:center;gap:8px;color:#9a9ab3;margin-bottom:8px}
.sm{width:26px;height:26px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff}
audio{width:100%}
.nav{position:fixed;left:0;right:0;bottom:0;display:flex;background:#0d0d16f2;border-top:1px solid #24243a;padding-bottom:env(safe-area-inset-bottom,0px)}
.nav button{flex:1;padding:16px 0;background:none;border:0;color:#9a9ab3;font-size:15px}
.nav .on{color:#fff;font-weight:700;border-top:2px solid #e8262f}
.avatar{width:100px;height:100px;border-radius:50%;object-fit:cover;background:linear-gradient(135deg,#1f5cff,#e8262f);display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;margin:10px auto}
.msg{color:#9a9ab3;min-height:20px}
`;

function Avatar({ p, big }) {
  if (p?.avatar_url) return <img className={big ? "avatar" : "sm"} src={p.avatar_url} alt="" />;
  const l = (p?.username || "?")[0].toUpperCase();
  return <div className={big ? "avatar" : "sm"}>{l}</div>;
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
  const t = T[lang || "fr"];

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

  const mine = tracks.filter((x) => x.artist_id === user.id).length;

  return (
    <div className="w">{Style}{Logo}
      {tab === "home" && (<>
        <h2>{t.latest}</h2>
        {tracks.length === 0 && <p className="sub">{t.none}</p>}
        {tracks.map((x, i) => (
          <div className="card" key={x.id}>
            <div className="cover" style={x.cover_url
              ? { backgroundImage: "url(" + x.cover_url + ")", backgroundSize: "cover", backgroundPosition: "center" }
              : { background: "linear-gradient(135deg," + COVERS[i % 3] + ")" }}>{x.title}</div>
            <div className="info">
              <div className="who"><Avatar p={x.profiles} />{x.profiles?.username}</div>
              <audio controls src={x.audio_url} />
            </div>
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
        {[["home", t.home], ["pub", t.pub], ["me", t.me]].map(([k, n]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => { setTab(k); setMsg(""); }}>{n}</button>
        ))}
      </nav>
    </div>
  );
}
