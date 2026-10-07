"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Home() {
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

  async function loadTracks() {
    const { data } = await supabase
      .from("tracks")
      .select("id,title,audio_url,profiles(username)")
      .order("created_at", { ascending: false });
    setTracks(data || []);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: l } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    loadTracks();
    return () => l.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setProfile(undefined); return; }
    supabase.from("profiles").select("username").eq("id", user.id).maybeSingle()
      .then(({ data }) => setProfile(data));
  }, [user]);

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setMsg(error ? error.message : "Vérifie ton e-mail pour confirmer ton compte.");
  }
  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setMsg(error ? error.message : "");
  }
  async function createProfile() {
    const { error } = await supabase.from("profiles").insert({ id: user.id, username });
    if (error) setMsg("Nom indisponible ou invalide.");
    else { setMsg(""); setProfile({ username }); }
  }
  async function upload() {
    if (!file || !title) { setMsg("Ajoute un titre et un fichier audio."); return; }
    setBusy(true); setMsg("Envoi en cours...");
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = user.id + "/" + Date.now() + "-" + safe;
    const up = await supabase.storage.from("audio").upload(path, file);
    if (up.error) { setMsg(up.error.message); setBusy(false); return; }
    const { data } = supabase.storage.from("audio").getPublicUrl(path);
    const ins = await supabase.from("tracks").insert({ artist_id: user.id, title, audio_url: data.publicUrl });
    setBusy(false);
    if (ins.error) { setMsg(ins.error.message); return; }
    setMsg("Titre publié !"); setTitle(""); setFile(null); loadTracks();
  }

  const input = { display: "block", width: "100%", padding: 14, marginTop: 12, borderRadius: 12, border: "1px solid #24243a", background: "#12121c", color: "#fff", boxSizing: "border-box" };
  const btn = { ...input, border: 0, background: "linear-gradient(90deg,#1f5cff,#e8262f)", fontWeight: 700, cursor: "pointer" };
  const alt = { ...btn, background: "#12121c", border: "1px solid #24243a" };

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 20 }}>
      <h1>RAPLIKE 509</h1>

      {!user && (
        <section>
          <input style={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={input} type="password" placeholder="Mot de passe" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button style={btn} onClick={logIn}>Se connecter</button>
          <button style={alt} onClick={signUp}>Créer un compte</button>
        </section>
      )}

      {user && profile === null && (
        <section>
          <h2>Choisis ton nom d'artiste</h2>
          <input style={input} placeholder="Nom d'artiste" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button style={btn} onClick={createProfile}>Enregistrer</button>
        </section>
      )}

      {user && profile && (
        <section>
          <p>
            Connecté : <strong>{profile.username}</strong>{" "}
            <button onClick={() => supabase.auth.signOut()}>Quitter</button>
          </p>
          <h2>Publier un titre</h2>
          <input style={input} placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input style={input} type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          <button style={btn} onClick={upload} disabled={busy}>Publier</button>
        </section>
      )}

      <p>{msg}</p>

      <h2>Derniers titres</h2>
      {tracks.length === 0 && <p>Aucun titre pour l'instant.</p>}
      {tracks.map((t) => (
        <div key={t.id} style={{ background: "#12121c", borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <strong>{t.title}</strong>
          <div style={{ color: "#9a9ab3" }}>{t.profiles?.username}</div>
          <audio controls src={t.audio_url} style={{ width: "100%", marginTop: 8 }} />
        </div>
      ))}
    </main>
  );
}
