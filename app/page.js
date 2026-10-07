"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const T = {
  fr: { tag: "La musique haïtienne, le rap haïtien.", email: "E-mail", pass: "Mot de passe", login: "Se connecter", signup: "Créer un compte", name: "Choisis ton nom d'artiste", save: "Enregistrer", home: "Accueil", pub: "Publier", me: "Profil", latest: "Derniers titres", none: "Aucun titre pour l'instant.", title: "Titre", send: "Publier le titre", out: "Quitter", mine: "titres publiés", ok: "Titre publié !", need: "Ajoute un titre et un fichier audio.", wait: "Envoi en cours...", lang: "Langue" },
  en: { tag: "Haitian music, Haitian rap.", email: "Email", pass: "Password", login: "Log in", signup: "Sign up", name: "Choose your artist name", save: "Save", home: "Home", pub: "Post", me: "Profile", latest: "Latest tracks", none: "No tracks yet.", title: "Title", send: "Publish track", out: "Log out", mine: "tracks published", ok: "Track published!", need: "Add a title and an audio file.", wait: "Uploading...", lang: "Language" },
  ht: { tag: "Mizik ayisyen, rap ayisyen.", email: "Imèl", pass: "Modpas", login: "Konekte", signup: "Kreye yon kont", name: "Chwazi non atis ou", save: "Anrejistre", home: "Akèy", pub: "Pibliye", me: "Pwofil", latest: "Dènye mizik yo", none: "Poko gen mizik.", title: "Tit", send: "Pibliye mizik la", out: "Soti", mine: "mizik pibliye", ok: "Mizik la pibliye !", need: "Mete yon tit ak yon fichye odyo.", wait: "N ap voye...", lang: "Lang" },
  es: { tag: "Música haitiana, rap haitiano.", email: "Correo", pass: "Contraseña", login: "Iniciar sesión", signup: "Crear cuenta", name: "Elige tu nombre artístico", save: "Guardar", home: "Inicio", pub: "Publicar", me: "Perfil", latest: "Últimos temas", none: "Aún no hay temas.", title: "Título", send: "Publicar tema", out: "Salir", mine: "temas publicados", ok: "¡Tema publicado!", need: "Añade un título y un archivo de audio.", wait: "Subiendo...", lang: "Idioma" },
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
input{display:block;width:100%;box-sizing:border-box;padding:14px;margin-top:12px;border-radius:12px;border:1px solid #24243a;background:#12121c;color:#fff;font-size:16px}
.btn{display:block;width:100%;padding:14px;margin-top:12px;border:0;border-radius:12px;background:linear-gradient(90deg,#1f5cff,#e8262f);color:#fff;font-weight:700;font-size:16px;cursor:pointer}
.alt{background:#12121c;border:1px solid #24243a}
.lang button{display:block;width:100%;padding:16px;margin-top:10px;border-radius:12px;border:1px solid #24243a;background:#12121c;color:#fff;font-size:17px;text-align:left}
.card{background:#12121c;border:1px solid #24243a;border-radius:14px;margin-bottom:14px;overflow:hidden}
.cover{height:130px;display:flex;align-items:flex-end;padding:12px;font-size:24px;font-weight:800}
.info{padding:12px 14px}
.info small{color:#9a9ab3;display:block;margin-bottom:8px}
audio{width:100%}
.nav{position:fixed;left:0;right:0;bottom:0;display:flex;background:#0d0d16f2;border-top:1px solid #24243a;padding-bottom:env(safe-area-inset-bottom,0px)}
.nav button{flex:1;padding:16px 0;background:none;border:0;color:#9a9ab3;font-size:15px}
.nav .on{color:#fff;font-weight:700;border-top:2px solid #e8262f}
.avatar{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#1f5cff,#e8262f);display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:800;margin:10px auto}
.msg{color:#9a9ab3;min-height:20px}
`;

export default function Home() {
  const [lang, setLang] = useState(null);
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(undefined);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [tracks, setTracks] = useState([]);
  const t = T[lang || "fr"];

  async function loadTracks() {
    const { data } = await supabase.from("tracks")
      .select("id,title,audio_url,artist_id,profiles(username)")
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
    supabase.from("profiles").select("username").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  function pick(l) { setLang(l); try { localStorage.setItem("lang", l); } catch (e) {} }
  async function signUp() { const { error } = await supabase.auth.signUp({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function logIn() { const { error } = await supabase.auth.signInWithPassword({ email, password: pass }); setMsg(error ? error.message : ""); }
  async function createProfile() {
    const { error } = await supabase.from("profiles").insert({ id: user.id, username });
    if (error) setMsg(error.message); else { setMsg(""); setProfile({ username }); }
  }
  async function upload() {
    if (!file || !title) { setMsg(t.need); return; }
    setBusy(true); setMsg(t.wait);
    const path = user.id + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const up = await supabase.storage.from("audio").upload(path, file);
    if (up.error) { setMsg(up.error.message); setBusy(false); return; }
    const { data } = supabase.storage.from("audio").getPublicUrl(path);
    const ins = await supabase.from("tracks").insert({ artist_id: user.id, title, audio_url: data.publicUrl });
    setBusy(false);
    if (ins.error) { setMsg(ins.error.message); return; }
    setMsg(t.ok); setTitle(""); setFile(null); loadTracks(); setTab("home");
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
            <div className="cover" style={{ background: "linear-gradient(135deg," + COVERS[i % 3] + ")" }}>{x.title}</div>
            <div className="info"><small>{x.profiles?.username}</small><audio controls src={x.audio_url} /></div>
          </div>
        ))}
      </>)}
      {tab === "pub" && (<>
        <h2>{t.pub}</h2>
        <input placeholder={t.title} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        <button className="btn" onClick={upload} disabled={busy}>{t.send}</button>
        <p className="msg">{msg}</p>
      </>)}
      {tab === "me" && (<>
        <div className="avatar">{(profile?.username || "?")[0].toUpperCase()}</div>
        <h2 style={{ textAlign: "center", margin: 0 }}>{profile?.username}</h2>
        <p className="sub" style={{ textAlign: "center" }}>{mine} {t.mine}</p>
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
