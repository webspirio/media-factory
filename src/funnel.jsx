import { useState, useMemo, useCallback } from "react";

// ─── palette ───
const BG = "#060b18";
const C1 = "#0d1424";
const C2 = "#162036";
const C3 = "#253352";
const T1 = "#f1f5f9";
const T2 = "#8e9fc0";
const T3 = "#4b5e80";

const P = {
  pink: "#ec4899", blue: "#3b82f6", slate: "#718eb5", cyan: "#06b6d4",
  purple: "#8b5cf6", orange: "#f59e0b", green: "#22c55e", red: "#ef4444",
  teal: "#14b8a6", lime: "#84cc16", rose: "#fb7185",
};

// ─── NODES ───
const NODES = {
  ig:   { x: 100, y: 60, w: 190, h: 64, label: "Instagram", sub: "Reels + Stories", icon: "📸", color: P.pink, row: 0 },
  fb:   { x: 385, y: 60, w: 190, h: 64, label: "Facebook", sub: "Reels + Messenger", icon: "📘", color: P.blue, row: 0 },
  tt:   { x: 670, y: 60, w: 190, h: 64, label: "TikTok · 23K", sub: "Reels + Ссылка в био", icon: "🎵", color: P.slate, row: 0 },

  "ig-comment": { x: 22,  y: 200, w: 145, h: 50, label: "Комментарий", sub: "«ИНФО» под Reels", icon: "💬", color: P.pink, row: 1 },
  "ig-story":   { x: 182, y: 200, w: 145, h: 50, label: "Story ответ", sub: "Стикер / опрос",  icon: "📱", color: P.rose, row: 1 },
  "ig-bio":     { x: 70,  y: 280, w: 130, h: 44, label: "Ссылка в био", sub: "", icon: "🔗", color: P.pink, row: 1 },
  "fb-comment": { x: 342, y: 200, w: 145, h: 50, label: "Комментарий", sub: "или Messenger",   icon: "💬", color: P.blue, row: 1 },
  "fb-bio":     { x: 502, y: 200, w: 130, h: 50, label: "Ссылка в био", sub: "", icon: "🔗", color: P.blue, row: 1 },
  "tt-bio":     { x: 672, y: 200, w: 185, h: 50, label: "Ссылка в био", sub: "Единственный путь в ЕС", icon: "🔗", color: P.slate, row: 1 },

  bot:    { x: 60,  y: 390, w: 340, h: 74, label: "GHL Бот в Direct", sub: "Авто-ответ · Определяет язык DE/RU · Квалифицирует", icon: "🤖", color: P.cyan, row: 2, glow: true },
  bridge: { x: 500, y: 390, w: 340, h: 74, label: "Мостовая страница", sub: "Собирает email + имя · DE и RU · Meta Pixel", icon: "🌐", color: P.purple, row: 2, glow: true },

  hot:  { x: 30,  y: 550, w: 175, h: 60, label: "Горячий", sub: "Хочет купить / записаться", icon: "🔥", color: P.red, row: 3 },
  warm: { x: 225, y: 550, w: 175, h: 60, label: "Тёплый", sub: "Интерес к продукту",        icon: "🌡️", color: P.orange, row: 3 },
  cold: { x: 420, y: 550, w: 175, h: 60, label: "Холодный", sub: "«Просто смотрю»",         icon: "❄️", color: P.blue, row: 3 },
  "bp-shop": { x: 620, y: 550, w: 140, h: 60, label: "Продукты", sub: "Хочу купить",         icon: "🛍️", color: P.green, row: 3 },
  "bp-biz":  { x: 775, y: 550, w: 140, h: 60, label: "Бизнес",   sub: "Стать партнёром",     icon: "💼", color: P.purple, row: 3 },

  calendar:    { x: 20,  y: 710, w: 180, h: 60, label: "Календарь", sub: "Запись на консультацию", icon: "📅", color: P.red, row: 4 },
  "email-prod":{ x: 215, y: 710, w: 175, h: 60, label: "Email: Продукты", sub: "Серия 7-14 дней",  icon: "📧", color: P.cyan, row: 4 },
  "email-biz": { x: 405, y: 710, w: 175, h: 60, label: "Email: Бизнес", sub: "Серия 10 дней",      icon: "📧", color: P.purple, row: 4 },
  "lr-shop":   { x: 598, y: 710, w: 170, h: 60, label: "LR Магазин", sub: "Партнёрская ссылка",    icon: "🛒", color: P.green, row: 4 },
  "lr-reg":    { x: 783, y: 710, w: 170, h: 60, label: "Регистрация LR", sub: "Новый партнёр",     icon: "🤝", color: P.purple, row: 4 },

  telegram: { x: 200, y: 860, w: 210, h: 56, label: "Telegram-бот", sub: "Акции · Контент · Напоминания", icon: "✈️", color: P.teal, row: 5 },
  retarget: { x: 440, y: 860, w: 210, h: 56, label: "Ретаргетинг", sub: "Meta Pixel реклама",            icon: "🎯", color: P.orange, row: 5 },

  consult: { x: 160, y: 1010, w: 290, h: 66, label: "Консультация", sub: "WhatsApp уведомление · Вся инфо о лиде", icon: "📞", color: P.green, row: 6, glow: true },
  client:  { x: 500, y: 1010, w: 290, h: 66, label: "Клиент / Партнёр", sub: "В CRM · Повторные продажи · Рефералы", icon: "⭐", color: P.lime, row: 6, glow: true },
};

// ─── EDGES ───
const EDGES = [
  { from: "ig", to: "ig-comment", color: P.pink },
  { from: "ig", to: "ig-story",   color: P.rose },
  { from: "ig", to: "ig-bio",     color: P.pink },
  { from: "fb", to: "fb-comment", color: P.blue },
  { from: "fb", to: "fb-bio",     color: P.blue },
  { from: "tt", to: "tt-bio",     color: P.slate },
  { from: "ig-comment", to: "bot", color: P.cyan, label: "авто" },
  { from: "ig-story",   to: "bot", color: P.cyan, label: "авто" },
  { from: "fb-comment", to: "bot", color: P.cyan, label: "авто" },
  { from: "ig-bio", to: "bridge",  color: P.purple },
  { from: "fb-bio", to: "bridge",  color: P.purple },
  { from: "tt-bio", to: "bridge",  color: P.purple },
  { from: "bot", to: "hot",  color: P.red,    label: "цена? запись?" },
  { from: "bot", to: "warm", color: P.orange, label: "интерес" },
  { from: "bot", to: "cold", color: P.blue,   label: "просто смотрю" },
  { from: "bot", to: "bridge", color: P.purple, dashed: true, label: "ссылка" },
  { from: "bridge", to: "bp-shop", color: P.green },
  { from: "bridge", to: "bp-biz",  color: P.purple },
  { from: "hot", to: "calendar", color: P.red },
  { from: "warm", to: "email-prod", color: P.orange },
  { from: "warm", to: "lr-shop",    color: P.orange, dashed: true, label: "если готов" },
  { from: "cold", to: "email-prod", color: P.blue },
  { from: "cold", to: "email-biz",  color: P.blue },
  { from: "bp-shop", to: "lr-shop", color: P.green },
  { from: "bp-biz",  to: "lr-reg",  color: P.purple },
  { from: "bp-biz",  to: "email-biz", color: P.purple, dashed: true },
  { from: "email-prod", to: "telegram", color: P.teal },
  { from: "email-biz",  to: "telegram", color: P.teal },
  { from: "email-prod", to: "retarget", color: P.orange, dashed: true },
  { from: "telegram", to: "calendar", color: P.teal, dashed: true, label: "прогрелся" },
  { from: "telegram", to: "bridge",   color: P.teal, dashed: true },
  { from: "retarget", to: "bridge",   color: P.orange, dashed: true },
  { from: "calendar", to: "consult", color: P.green },
  { from: "consult",  to: "client",  color: P.lime },
  { from: "lr-shop",  to: "client",  color: P.green },
  { from: "lr-reg",   to: "client",  color: P.purple },
];

// ─── Prebuilt journeys ───
const JOURNEYS = [
  { id: "hot", label: "⚡ Быстрая продажа", color: P.red,
    desc: "Reels → Комментарий → Бот → «Хочу записаться» → Календарь → Консультация → Клиент",
    nodes: ["ig", "fb", "ig-comment", "ig-story", "fb-comment", "bot", "hot", "calendar", "consult", "client"],
    edges: [0,1,3,6,7,8,12,18,32,33] },
  { id: "product", label: "🛍️ Покупка продукта", color: P.orange,
    desc: "Любая платформа → Бот или ссылка в био → Мостовая страница → LR Магазин → Клиент",
    nodes: ["ig","fb","tt","ig-comment","ig-bio","fb-comment","fb-bio","tt-bio","bot","bridge","warm","bp-shop","lr-shop","client"],
    edges: [0,2,3,4,5,6,8,9,10,11,13,15,16,19,20,23,34] },
  { id: "partner", label: "🤝 Партнёрство", color: P.purple,
    desc: "Контент про бизнес → Бот или страница → Email-серия «Бизнес» → Регистрация LR → Партнёр",
    nodes: ["ig","fb","tt","ig-comment","fb-comment","fb-bio","tt-bio","bot","bridge","warm","bp-biz","email-biz","lr-reg","client"],
    edges: [0,3,4,5,6,8,10,11,13,15,17,19,22,24,25,35] },
  { id: "cold", label: "❄️ Прогрев холодного", color: P.blue,
    desc: "«Просто смотрю» → Email + Telegram прогрев 14-30 дней → Возврат → Покупка или запись",
    nodes: ["ig","fb","ig-comment","ig-story","fb-comment","bot","cold","email-prod","email-biz","telegram","retarget","bridge","calendar","consult","client"],
    edges: [0,1,3,6,7,8,14,21,22,26,27,28,29,30,31,32,33] },
  { id: "tiktok", label: "🎵 TikTok путь", color: P.slate,
    desc: "23K подписчиков → Ссылка в био → Мостовая страница → Продукт или бизнес → Конверсия",
    nodes: ["tt","tt-bio","bridge","bp-shop","bp-biz","lr-shop","lr-reg","email-biz","client"],
    edges: [5,11,16,17,23,24,25,34,35] },
];

// ─── adjacency (forward only) ───
const FWD = {};
EDGES.forEach((e, i) => {
  if (!FWD[e.from]) FWD[e.from] = [];
  FWD[e.from].push({ to: e.to, idx: i });
});

// ─── geometry ───
function cx(n) { return n.x + n.w / 2; }
function bot_(n) { return n.y + n.h; }
function top_(n) { return n.y; }

function edgePath(fromId, toId) {
  const f = NODES[fromId], t = NODES[toId];
  if (!f || !t) return "";
  const fx = cx(f), fy = bot_(f), tx = cx(t), ty = top_(t);
  if (fy > ty + 20) {
    const loopX = Math.max(fx, tx) + 90;
    return `M${fx},${fy} C${loopX},${fy + 50} ${loopX},${ty - 50} ${tx},${ty}`;
  }
  if (Math.abs(fx - tx) < 30) return `M${fx},${fy} L${tx},${ty}`;
  const cp = Math.max((ty - fy) * 0.45, 24);
  return `M${fx},${fy} C${fx},${fy + cp} ${tx},${ty - cp} ${tx},${ty}`;
}

function midPt(fromId, toId) {
  const f = NODES[fromId], t = NODES[toId];
  if (!f || !t) return [0, 0];
  return [(cx(f) + cx(t)) / 2, (bot_(f) + top_(t)) / 2];
}

const ROWS = [
  { y: 38,  label: "ТОЧКИ ВХОДА", lineY: 148 },
  { y: 178, label: "ТРИГГЕРЫ", lineY: 348 },
  { y: 368, label: "ОБРАБОТКА", lineY: 508 },
  { y: 528, label: "КВАЛИФИКАЦИЯ", lineY: 658 },
  { y: 688, label: "ДЕЙСТВИЯ", lineY: 822 },
  { y: 838, label: "ПРОГРЕВ", lineY: 968 },
  { y: 988, label: "КОНВЕРСИЯ", lineY: null },
];

const DIM = 0.25;      // dimmed but visible
const FAINT = 0.12;    // edges when dimmed

export default function FunnelDiagram({ compact = false }) {
  // path = array of selected node IDs building the user's journey
  const [path, setPath] = useState([]);
  // preset journey mode
  const [preset, setPreset] = useState(null);

  // what nodes are direct next-steps from the last node in path?
  const nextSteps = useMemo(() => {
    if (preset || path.length === 0) return null;
    const last = path[path.length - 1];
    const targets = (FWD[last] || []).map(e => e.to);
    return new Set(targets);
  }, [path, preset]);

  // all edges along the current path
  const pathEdgeIdxs = useMemo(() => {
    if (path.length < 2) return new Set();
    const s = new Set();
    for (let i = 0; i < path.length - 1; i++) {
      EDGES.forEach((e, idx) => {
        if (e.from === path[i] && e.to === path[i + 1]) s.add(idx);
      });
    }
    return s;
  }, [path]);

  // next-step edge indices (from last node)
  const nextEdgeIdxs = useMemo(() => {
    if (!nextSteps || path.length === 0) return new Set();
    const last = path[path.length - 1];
    const s = new Set();
    EDGES.forEach((e, idx) => {
      if (e.from === last && nextSteps.has(e.to)) s.add(idx);
    });
    return s;
  }, [nextSteps, path]);

  const pathSet = useMemo(() => new Set(path), [path]);

  // ─── click handler ───
  const onNodeClick = useCallback((id) => {
    if (preset) return; // ignore clicks in preset mode

    // if clicking the last node again, go back one step
    if (path.length > 0 && path[path.length - 1] === id) {
      setPath(p => p.slice(0, -1));
      return;
    }

    // if empty path, only allow row-0 nodes (entry points)
    if (path.length === 0) {
      if (NODES[id].row === 0) setPath([id]);
      return;
    }

    // if it's a valid next step, add it
    if (nextSteps && nextSteps.has(id)) {
      setPath(p => [...p, id]);
    }
  }, [path, nextSteps, preset]);

  const reset = () => { setPath([]); setPreset(null); };

  const selectPreset = (j) => {
    if (preset === j.id) { reset(); return; }
    setPath([]);
    setPreset(j.id);
  };

  // ─── visibility logic ───
  const getNodeOpacity = (id) => {
    // preset mode
    if (preset) {
      const j = JOURNEYS.find(j => j.id === preset);
      return j.nodes.includes(id) ? 1 : DIM;
    }
    // no selection yet — everything visible
    if (path.length === 0) return 1;
    // in path
    if (pathSet.has(id)) return 1;
    // next step
    if (nextSteps && nextSteps.has(id)) return 1;
    return DIM;
  };

  const getEdgeState = (idx) => {
    // preset mode
    if (preset) {
      const j = JOURNEYS.find(j => j.id === preset);
      if (j.edges.includes(idx)) return "preset";
      return "dim";
    }
    if (path.length === 0) return "default";
    if (pathEdgeIdxs.has(idx)) return "active";
    if (nextEdgeIdxs.has(idx)) return "next";
    return "dim";
  };

  const isNodeClickable = (id) => {
    if (preset) return false;
    if (path.length === 0) return NODES[id].row === 0;
    if (path[path.length - 1] === id) return true; // click to undo
    return nextSteps && nextSteps.has(id);
  };

  const W = 960, H = 1100;
  const activePreset = preset ? JOURNEYS.find(j => j.id === preset) : null;

  return (
    <div style={{
      width: "100%", maxWidth: compact ? "100%" : 1000, margin: "0 auto",
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: BG, borderRadius: compact ? 0 : 20,
      border: compact ? "none" : `1px solid ${C3}`,
      boxShadow: compact ? "none" : "0 40px 120px rgba(0,0,0,0.7)",
      overflow: "hidden", userSelect: "none",
    }}>

      {/* ── Header ── */}
      <div style={{ padding: compact ? "12px 16px 8px" : "24px 32px 12px", background: `linear-gradient(180deg, ${C2} 0%, ${BG} 100%)` }}>
        <h2 style={{ color: T1, fontSize: compact ? 18 : 24, fontWeight: 800, margin: "0 0 4px" }}>Путь лида через систему</h2>
        <p style={{ color: T2, fontSize: compact ? 11 : 13, margin: 0 }}>
          {path.length === 0 && !preset && "Выберите точку входа (Instagram, Facebook или TikTok) и стройте путь шаг за шагом."}
          {path.length > 0 && !preset && (
            <>
              Путь: {path.map(id => NODES[id].label).join(" → ")}
              {nextSteps && nextSteps.size > 0 && " → ..."}
              {nextSteps && nextSteps.size === 0 && " ✅"}
            </>
          )}
          {preset && activePreset && activePreset.desc}
          {(path.length > 0 || preset) && (
            <span onClick={reset} style={{ marginLeft: 12, color: P.cyan, cursor: "pointer", fontWeight: 600, borderBottom: `1px dashed ${P.cyan}` }}>
              ✕ Сбросить
            </span>
          )}
        </p>
      </div>

      {/* ── Journey presets ── */}
      <div style={{
        display: "flex", gap: compact ? 6 : 8, padding: compact ? "8px 16px 10px" : "10px 32px 12px",
        overflowX: "auto", background: C1, borderBottom: `1px solid ${C2}`,
      }}>
        <span style={{ color: T3, fontSize: compact ? 10 : 11, fontWeight: 600, alignSelf: "center", marginRight: 4, whiteSpace: "nowrap" }}>Готовые маршруты:</span>
        {JOURNEYS.map(j => (
          <button key={j.id} onClick={() => selectPreset(j)} style={{
            padding: compact ? "8px 14px" : "6px 14px", borderRadius: 10, border: `1.5px solid ${preset === j.id ? j.color : "transparent"}`,
            cursor: "pointer", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
            background: preset === j.id ? `${j.color}20` : C2,
            color: preset === j.id ? j.color : T2,
            boxShadow: preset === j.id ? `0 2px 16px ${j.color}25` : "none",
            transition: "all 0.25s",
          }}>{j.label}</button>
        ))}
      </div>

      {/* ── Breadcrumb (step-by-step path) ── */}
      {path.length > 0 && !preset && (
        <div style={{
          display: "flex", alignItems: "center", gap: 4, padding: compact ? "8px 16px" : "8px 32px",
          background: `${P.cyan}06`, borderBottom: `1px solid ${P.cyan}12`,
          overflowX: "auto",
        }}>
          {path.map((id, i) => {
            const n = NODES[id];
            const isLast = i === path.length - 1;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  onClick={() => setPath(path.slice(0, i + 1))}
                  style={{
                    padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer",
                    background: isLast ? `${n.color}25` : `${n.color}10`,
                    color: n.color,
                    border: isLast ? `1.5px solid ${n.color}` : `1px solid ${n.color}30`,
                    transition: "all 0.2s",
                  }}
                >
                  {n.icon} {n.label}
                </span>
                {!isLast && <span style={{ color: T3, fontSize: 14 }}>→</span>}
              </div>
            );
          })}
          {nextSteps && nextSteps.size > 0 && (
            <>
              <span style={{ color: T3, fontSize: 14 }}>→</span>
              <span style={{ color: T3, fontSize: 11, fontStyle: "italic" }}>выберите следующий шаг...</span>
            </>
          )}
          {nextSteps && nextSteps.size === 0 && (
            <>
              <span style={{ color: T3, fontSize: 14, marginLeft: 4 }}>→</span>
              <span style={{ color: P.green, fontSize: 11, fontWeight: 700 }}>✅ Конверсия!</span>
            </>
          )}
        </div>
      )}

      {/* ── SVG Diagram ── */}
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: compact ? "none" : 800, padding: "0 4px", WebkitOverflowScrolling: "touch" }}>
        <svg width={compact ? "100%" : W} height={compact ? undefined : H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin meet" role="img" aria-label="Диаграмма воронки продаж" style={{ display: "block", margin: "0 auto" }}>
          <defs>
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-e" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {Object.entries(P).map(([k, v]) => (
              <marker key={k} id={`a-${k}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={v} />
              </marker>
            ))}
            <marker id="a-lime" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={P.lime} />
            </marker>
            <marker id="a-dim" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill={T3} opacity="0.4" />
            </marker>
          </defs>

          {/* Row separators */}
          {ROWS.map((r, i) => (
            <g key={i}>
              <text x={16} y={r.y + 12} fontSize={9} fill={T3} fontWeight="700" letterSpacing="0.14em" opacity={0.65}>{r.label}</text>
              {r.lineY && <line x1={16} y1={r.lineY} x2={W - 16} y2={r.lineY} stroke={C2} strokeWidth={1} strokeDasharray="3,6" opacity={0.4} />}
            </g>
          ))}

          {/* ── Edges ── */}
          {EDGES.map((e, i) => {
            const state = getEdgeState(i);
            const path_ = edgePath(e.from, e.to);
            const cName = Object.entries(P).find(([, v]) => v === e.color)?.[0] || "dim";
            const [lx, ly] = e.label ? midPt(e.from, e.to) : [0, 0];

            let stroke = e.color;
            let sw = 1.5;
            let opacity = 0.6;
            let marker = `url(#a-${cName})`;
            let showGlow = false;
            let showLabel = true;

            if (state === "active") { sw = 3; opacity = 0.9; showGlow = true; }
            else if (state === "next") { sw = 2.5; opacity = 0.85; showGlow = true; }
            else if (state === "preset") {
              stroke = activePreset.color; sw = 2.5; opacity = 0.8; showGlow = true;
              const pcName = Object.entries(P).find(([, v]) => v === activePreset.color)?.[0];
              marker = `url(#a-${pcName})`;
            }
            else if (state === "dim") { stroke = T3; sw = 1; opacity = FAINT; marker = "url(#a-dim)"; showLabel = false; }

            return (
              <g key={i} style={{ transition: "opacity 0.35s" }}>
                {showGlow && (
                  <path d={path_} fill="none" stroke={stroke} strokeWidth={sw + 5} opacity={0.08} filter="url(#glow-e)" />
                )}
                <path d={path_} fill="none" stroke={stroke} strokeWidth={sw}
                  strokeDasharray={e.dashed ? "7,5" : "none"} markerEnd={marker} opacity={opacity} />
                {e.label && showLabel && (
                  <g>
                    <rect x={lx - e.label.length * 3.2 - 8} y={ly - 9} width={e.label.length * 6.4 + 16} height={18} rx={5}
                      fill={BG} stroke={stroke} strokeWidth={0.6} opacity={0.92} />
                    <text x={lx} y={ly + 3} fontSize={9} fill={stroke} textAnchor="middle" fontWeight="600">{e.label}</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* ── Nodes ── */}
          {Object.entries(NODES).map(([id, n]) => {
            const op = getNodeOpacity(id);
            const clickable = isNodeClickable(id);
            const inPath = pathSet.has(id);
            const isLast = path.length > 0 && path[path.length - 1] === id;
            const isNext = nextSteps && nextSteps.has(id);
            const small = n.row === 1 || n.row === 3;
            const presetLit = preset && activePreset && activePreset.nodes.includes(id);

            return (
              <g key={id}
                style={{ cursor: clickable ? "pointer" : "default", transition: "opacity 0.35s" }}
                opacity={op}
                onClick={() => clickable && onNodeClick(id)}
              >
                {/* pulsing ring on last selected */}
                {isLast && !preset && (
                  <rect x={n.x - 5} y={n.y - 5} width={n.w + 10} height={n.h + 10} rx={18}
                    fill="none" stroke={n.color} strokeWidth={2.5} opacity={0.7}>
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
                  </rect>
                )}
                {/* "click me" ring on next steps */}
                {isNext && !preset && (
                  <rect x={n.x - 3} y={n.y - 3} width={n.w + 6} height={n.h + 6} rx={16}
                    fill="none" stroke={n.color} strokeWidth={1.5} strokeDasharray="4,3" opacity={0.6}>
                    <animate attributeName="strokeDashoffset" values="0;14" dur="1.2s" repeatCount="indefinite" />
                  </rect>
                )}
                {/* glow for important / preset nodes */}
                {((n.glow && op > DIM) || presetLit) && (
                  <rect x={n.x - 6} y={n.y - 6} width={n.w + 12} height={n.h + 12} rx={20}
                    fill={preset ? activePreset.color : n.color} opacity={0.05} filter="url(#glow)" />
                )}
                {/* card */}
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={14}
                  fill={C1} stroke={presetLit ? activePreset.color : n.color}
                  strokeWidth={inPath || presetLit ? 2 : 1.3} />
                {/* color fill */}
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={14}
                  fill={presetLit ? activePreset.color : n.color}
                  opacity={isLast ? 0.15 : inPath ? 0.1 : presetLit ? 0.08 : 0.04} />
                {/* icon */}
                <text x={n.x + (small ? 10 : 16)} y={n.y + (n.sub ? (small ? 26 : 29) : n.h / 2 + 6)}
                  fontSize={small ? 15 : 18}>{n.icon}</text>
                {/* label */}
                <text x={n.x + (small ? 32 : 42)} y={n.y + (n.sub ? (small ? 22 : 25) : n.h / 2 + 5)}
                  fontSize={small ? 12 : 14} fontWeight="700" fill={T1}>{n.label}</text>
                {/* sub */}
                {n.sub && (
                  <text x={n.x + (small ? 32 : 42)} y={n.y + (small ? 37 : 42)}
                    fontSize={small ? 9.5 : 10.5} fill={T2}>{n.sub}</text>
                )}
              </g>
            );
          })}

        </svg>
      </div>

      {/* ── Bottom ── */}
      <div style={{ padding: compact ? "10px 12px 14px" : "14px 24px 18px", background: C1, borderTop: `1px solid ${C2}` }}>
        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr 1fr" : "1fr 1fr 1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "⚡ Быстрая продажа", path: "Reels → Бот → Календарь → Вы", time: "1-2 мин", color: P.red },
            { label: "🛍️ Покупка", path: "Любая платф. → Страница → Магазин", time: "5-10 мин", color: P.orange },
            { label: "🤝 Партнёрство", path: "Бот / Страница → Email → LR", time: "7-14 дней", color: P.purple },
            { label: "❄️ Прогрев", path: "Email + Telegram → Возврат", time: "14-30 дней", color: P.blue },
            { label: "🎵 TikTok", path: "Bio → Мостовая → Любой путь", time: "5-15 мин", color: P.slate },
          ].map((p, i) => (
            <div key={i} style={{
              background: `${p.color}08`, borderRadius: 10, padding: "10px 12px",
              border: `1px solid ${p.color}18`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 3 }}>{p.label}</div>
              <div style={{ fontSize: 10, color: T2, lineHeight: 1.4 }}>{p.path}</div>
              <div style={{ fontSize: 10, color: p.color, fontWeight: 600, marginTop: 4 }}>{p.time}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 10, textAlign: "center", padding: "8px 16px",
          background: `${P.green}06`, borderRadius: 10, border: `1px solid ${P.green}15`,
        }}>
          <span style={{ fontSize: 11, color: P.green, fontWeight: 600 }}>
            Каждый лид попадает в CRM. Ни один контакт не теряется — все прогреваются и конвертируются автоматически.
          </span>
        </div>
      </div>
    </div>
  );
}