"use client";
import { useState, useEffect } from "react";

const L = {
  fr: { watch: "Regarder RAPLIKE TV", stop: "Arrêter la TV", empty: "La programmation de RAPLIKE TV arrive bientôt.", ext: "Autres chaînes", open: "Regarder", close: "Fermer" },
  en: { watch: "Watch RAPLIKE TV", stop: "Stop TV", empty: "RAPLIKE TV programming is coming soon.", ext: "Other channels", open: "Watch", close: "Close" },
  ht: { watch: "Gade RAPLIKE TV", stop: "Kanpe TV a", empty: "Pwogram RAPLIKE TV ap vini talè konsa.", ext: "Lòt chèn", open: "Gade", close: "Fèmen" },
  es: { watch: "Ver RAPLIKE TV", stop: "Detener la TV", empty: "La programación de RAPLIKE TV llega pronto.", ext: "Otros canales", open: "Ver", close: "Cerrar" },
};

const fmt = (s) => Math.floor((s || 0) / 60) + ":" + String(Math.floor((s || 0) % 60)).padStart(2, "0");
const okId = (s) => /^[A-Za-z0-9_-]{11}$/.test(s || "");

// Chaîne virtuelle : la playlist tourne en boucle, au même endroit pour tous les spectateurs
function tvNow(list) {
  const total = list.reduce((s, x) => s + (x.duration_seconds || 0), 0);
  if (!list.length || total <= 0) return null;
  let p = (Date.now() / 1000) % total;
  for (let i = 0; i < list.length; i++) {
    const d = list[i].duration_seconds || 0;
    if (p < d) return { i, off: Math.floor(p), next: (i + 1) % list.length };
    p -= d;
  }
  return { i: 0, off: 0, next: 1 % list.length };
}

export default function RaplikeTV({ supabase, tvs, t, lang, frameSrc }) {
  const x = { ...L.fr, ...(L[lang] || {}) };
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [on, setOn] = useState(false);
  const [now, setNow] = useState(null);
  const [frame, setFrame] = useState(null);
  const [ext, setExt] = useState(null);

  useEffect(() => {
    supabase.from("tv_playlist")
      .select("id,title,artist,youtube_id,duration_seconds,position")
      .order("position", { ascending: true })
      .then(({ data }) => {
        setList((data || []).filter((v) => okId(v.youtube_id) && v.duration_seconds > 0));
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!on || !list.length) return;
    const tick = () => {
      const n = tvNow(list);
      if (!n) return;
      setNow(n);
      setFrame((f) => (f && f.i === n.i ? f : { i: n.i, start: n.off }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [on, list]);

  function watch() { setExt(null); setOn(true); }
  function stop() { setOn(false); setFrame(null); setNow(null); }
  function openExt(id) { stop(); setExt(id); }

  const cur = now ? list[now.i] : null;
  const nxt = now ? list[now.next] : null;
  const pct = cur && cur.duration_seconds ? (now.off / cur.duration_seconds) * 100 : 0;

  return (<>
    <h2 className="st2">{t.tv}</h2>

    <div className={"rp" + (on ? " on" : "")}>
      <div className="rtop">
        <span className="tag">RAPLIKE TV</span>
        {on && <span className="liveb"><i />{t.live}</span>}
      </div>

      {!loaded ? null : list.length === 0 ? (
        <p className="sub" style={{ margin: "16px 0 0" }}>{x.empty}</p>
      ) : (<>
        {on && frame ? (
          <iframe
            key={frame.i}
            className="vid"
            src={"https://www.youtube.com/embed/" + encodeURIComponent(list[frame.i].youtube_id) + "?autoplay=1&playsinline=1&rel=0&modestbranding=1&start=" + frame.start}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : null}

        <div className="rnow" style={{ marginTop: 14 }}>
          {on && cur
            ? (<><b>{cur.title}</b><small>{cur.artist || "RAPLIKE TV"}</small></>)
            : (<><b>{x.watch}</b><small>{t.tune}</small></>)}
        </div>

        {on && cur && (<>
          <div className="bar"><i style={{ width: pct + "%" }} /></div>
          <div className="rtimes"><span>{fmt(now.off)}</span><span>{fmt(cur.duration_seconds)}</span></div>
          {nxt && <p className="sub" style={{ margin: "10px 0 0" }}>{t.nextP} : {nxt.title}{nxt.artist ? " · " + nxt.artist : ""}</p>}
        </>)}

        <button className="bigplay" onClick={on ? stop : watch} aria-label={on ? x.stop : x.watch} style={{ fontSize: 28 }}>
          {on ? "❚❚" : "▶"}
        </button>
      </>)}
    </div>

    {tvs.length > 0 && <h3 className="ptitle" style={{ margin: "22px 0 12px" }}>{x.ext}</h3>}
    {tvs.map((s) => {
      const open = ext === s.id;
      const isFrame = (s.stream_url || "").startsWith("iframe:") || (s.stream_url || "").includes("embed");
      return (
        <div className="stn" key={s.id}>
          <div className="liveb"><i />{t.live}</div>
          <strong>{s.name}</strong>
          {open && (isFrame
            ? (frameSrc(s.stream_url) ? <iframe className="vid" src={frameSrc(s.stream_url)} allow="autoplay; fullscreen" allowFullScreen /> : null)
            : <video className="vid" controls autoPlay playsInline src={s.stream_url} />)}
          <button className="outl small" style={{ display: "block" }} onClick={() => (open ? setExt(null) : openExt(s.id))}>
            {open ? x.close : x.open}
          </button>
        </div>
      );
    })}
  </>);
}
