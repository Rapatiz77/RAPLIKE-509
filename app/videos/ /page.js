"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    supabase
      .from("videos")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setVideos(data || []);
        if (data?.length) setCurrent(data[0]);
      });
  }, []);

  return (
    <main style={{ padding: 16, maxWidth: 900, margin: "0 auto", color: "#fff" }}>
      <h1 style={{ color: "#e11d2e" }}>Vidéos</h1>

      {current && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${current.youtube_id}`}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                border: "2px solid #1d4ed8", borderRadius: 12,
              }}
            />
          </div>
          <h3>{current.title}</h3>
          <p style={{ opacity: 0.7 }}>{current.artist}</p>
        </div>
      )}

      <div style={{ display: "grid", gap: 12,
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
        {videos.map((v) => (
          <div key={v.id} onClick={() => setCurrent(v)}
            style={{ cursor: "pointer", background: "#111", borderRadius: 10,
              overflow: "hidden", border: "1px solid #333" }}>
            <img
              src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
              alt={v.title} style={{ width: "100%", display: "block" }} />
            <div style={{ padding: 8, fontSize: 14 }}>{v.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
