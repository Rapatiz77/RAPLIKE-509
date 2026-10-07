"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: l } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    supabase.from("tracks").select("id,title,audio_url").order("created_at", { ascending: false })
      .then(({ data }) => setTracks(data || []));
    return () => l.subscription.unsubscribe();
  }, []);

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setMsg(error ? error.message : "Vérifie ton e-mail pour confirmer ton compte.");
  }
  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setMsg(error ? error.message : "");
  }

  const input = { display: "block", width: "100%", padding: 14, marginTop: 12, borderRadius: 12, border: "1px solid #24243a", background: "#12121c", color: "#fff", boxSizing: "border-box" };
  const btn = { ...input, border: 0, background: "linear-gradient(90deg,#1f5cff,#e8262f)", fontWeight: 700, cursor: "pointer" };

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 20 }}>
      <h1>RAPLIKE 509</h1>
      {!user ? (
        <section>
          <input style={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={input} type="password" placeholder="Mot de passe" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button style={btn} onClick={logIn}>Se connecter</button>
          <button style={{ ...btn, background: "#12121c", border: "1px solid #24243a" }} onClick={signUp}>Créer un compte</button>
          <p>{msg}</p>
        </section>
      ) : (
        <p>
          Connecté : {user.email}{" "}
          <button onClick={() => supabase.auth.signOut()}>Quitter</button>
        </p>
      )}
      <h2>Derniers titres</h2>
      {tracks.length === 0 && <p>Aucun titre pour l'instant.</p>}
      {tracks.map((t) => (
        <div key={t.id} style={{ background: "#12121c", borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <strong>{t.title}</strong>
          <audio controls src={t.audio_url} style={{ width: "100%", marginTop: 8 }} />
        </div>
      ))}
    </main>
  );
}
