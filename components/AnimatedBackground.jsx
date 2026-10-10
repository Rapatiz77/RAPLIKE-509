"use client";
import { useEffect, useRef, useState } from "react";

const ROUGE = [255, 42, 61], BLEU = [42, 107, 255];
const rng = (s) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

function Fond() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, dpr, tris, aretes, statique, raf, to;

    const construire = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const r = rng(509), cell = W < 600 ? 110 : 150;
      const cols = Math.ceil(W / cell) + 2, rows = Math.ceil(H / cell) + 2;
      const pts = [];
      for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++)
        pts.push([(i - 0.5) * cell + (r() - 0.5) * cell * 0.7, (j - 0.5) * cell + (r() - 0.5) * cell * 0.7]);
      const id = (i, j) => j * (cols + 1) + i;
      tris = []; aretes = []; const vu = {};
      const arete = (a, b) => { const k = a < b ? a + "-" + b : b + "-" + a;
        if (!vu[k]) { vu[k] = 1; aretes.push({ a: pts[a], b: pts[b], ph: r() * 6.283 }); } };
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const p = id(i, j), q = id(i + 1, j), s = id(i, j + 1), t = id(i + 1, j + 1);
        (r() < 0.5 ? [[p, q, t], [p, t, s]] : [[p, q, s], [q, t, s]]).forEach((tr) => {
          tris.push({ v: tr.map((n) => pts[n]), l: 5 + r() * 9 });
          arete(tr[0], tr[1]); arete(tr[1], tr[2]); arete(tr[2], tr[0]); });
      }
      statique = document.createElement("canvas");
      statique.width = cv.width; statique.height = cv.height;
      const c = statique.getContext("2d"); c.scale(dpr, dpr);
      c.fillStyle = "#050507"; c.fillRect(0, 0, W, H);
      tris.forEach((t) => { const [a, b, d] = t.v;
        const g = c.createLinearGradient(a[0], a[1], d[0], d[1]);
        g.addColorStop(0, `hsl(225 8% ${t.l + 4}%)`); g.addColorStop(1, `hsl(225 10% ${t.l - 3}%)`);
        c.fillStyle = g; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.lineTo(...d); c.closePath(); c.fill(); });
      c.strokeStyle = "#000"; c.lineWidth = 5; c.lineJoin = "round";
      aretes.forEach((e) => { c.beginPath(); c.moveTo(...e.a); c.lineTo(...e.b); c.stroke(); });
    };

    const dessiner = (ms) => {
      const t = ms / 1000;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(statique, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      for (const e of aretes) {
        const mx = (e.a[0] + e.b[0]) / 2, my = (e.a[1] + e.b[1]) / 2;
        const v = 0.5 + 0.5 * Math.sin(t * 0.9 - (mx + my) * 0.004 + e.ph), I = v ** 6;
        if (I < 0.06) continue;
        const m = 0.5 + 0.5 * Math.sin(t * 0.22 + mx * 0.0022 - my * 0.0015);
        const col = ROUGE.map((x, n) => Math.round(x + (BLEU[n] - x) * m)).join(",");
        ctx.beginPath(); ctx.moveTo(...e.a); ctx.lineTo(...e.b);
        ctx.strokeStyle = `rgba(${col},${0.18 * I})`; ctx.lineWidth = 9; ctx.stroke();
        ctx.strokeStyle = `rgba(${col},${Math.min(1, I * 1.1)})`; ctx.lineWidth = 1.8; ctx.stroke();
      }
    };
    const boucle = (ms) => { dessiner(ms); raf = requestAnimationFrame(boucle); };
    const demarrer = () => { cancelAnimationFrame(raf); construire();
      if (calme) dessiner(2500); else raf = requestAnimationFrame(boucle); };
    const onResize = () => { clearTimeout(to); to = setTimeout(demarrer, 150); };
    const onVis = () => { if (calme) return;
      if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(boucle); };

    demarrer();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); clearTimeout(to);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <>
      <style>{`.page{background:transparent !important}`}</style>
      <canvas ref={ref} aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -2, display: "block" }} />
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(0,0,0,.15) 0%, rgba(0,0,0,.65) 100%)" }} />
    </>
  );
}

// Affiché sur tous les onglets SAUF l'accueil (l'onglet est lu dans <body data-tab>)
export default function AnimatedBackground() {
  const [actif, setActif] = useState(false);
  useEffect(() => {
    const maj = () => {
      const tab = document.body.dataset.tab;
      setActif(!!tab && tab !== "home");
    };
    maj();
    const obs = new MutationObserver(maj);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-tab"] });
    return () => obs.disconnect();
  }, []);
  return actif ? <Fond /> : null;
}
