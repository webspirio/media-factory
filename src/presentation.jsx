import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, Target, Zap, Users, BarChart3, Calendar, MessageCircle, Globe, TrendingUp, Shield, CheckCircle, ArrowRight, ArrowDown, Layers, Bot, ShoppingBag, Mail, Clock, DollarSign, AlertTriangle, Star, Eye, Send, Filter, Video, Image, Sparkles, Settings, PhoneCall, Search, UserCheck, Lock, Rocket, Repeat, Maximize2, Minimize2 } from "lucide-react";
import FunnelDiagram from "./funnel.jsx";
import wsLogo from "./ws-logo.svg";

const A = "#6366f1";
const AL = "#818cf8";
const BG = "#0f172a";
const C1 = "#1e293b";
const C2 = "#334155";
const T1 = "#f8fafc";
const T2 = "#94a3b8";
const OK = "#22c55e";
const WR = "#f59e0b";
const ER = "#ef4444";
const CY = "#22d3ee";
const PK = "#f472b6";
const GR = "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)";

function H({ icon: Icon, color, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: T1, margin: 0, lineHeight: 1.2 }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, color: T2, margin: "3px 0 0" }}>{sub}</p>}
      </div>
    </div>
  );
}

function Card({ children, style = {}, border }) {
  return <div style={{ background: C1, borderRadius: 14, padding: 18, border: border || `1px solid ${C2}`, ...style }}>{children}</div>;
}

function Tag({ children, color = T2, bg }) {
  return <span style={{ fontSize: 11, fontWeight: 600, color, background: bg || `${color}15`, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{children}</span>;
}

function Check({ children, color = OK, size = 11 }) {
  return <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginTop: 5 }}><CheckCircle size={size} color={color} style={{ marginTop: 1, flexShrink: 0 }} /><span style={{ color: T2, fontSize: 12, lineHeight: 1.5 }}>{children}</span></div>;
}

const slides = [
  // 0 — TITLE
  ({ mobile }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: mobile ? 20 : 40 }}>
      <div style={{ width: 90, height: 90, borderRadius: 22, background: GR, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, boxShadow: "0 20px 60px rgba(99,102,241,0.4)" }}>
        <Zap size={44} color="white" />
      </div>
      <h1 style={{ fontSize: mobile ? 24 : 38, fontWeight: 800, color: T1, margin: 0, lineHeight: 1.2 }}>
        Автоматическая воронка продаж
      </h1>
      <h2 style={{ fontSize: mobile ? 15 : 20, fontWeight: 400, color: AL, margin: "10px 0 0", letterSpacing: "0.03em" }}>
        LR Health & Beauty — Полная автоматизация
      </h2>
      <div style={{ width: 60, height: 3, background: GR, borderRadius: 2, margin: "28px 0" }} />
      <p style={{ fontSize: 15, color: T2, maxWidth: 520, lineHeight: 1.7 }}>
        Система, которая сама создает контент, сама общается с клиентами, сама фильтрует и записывает на консультацию — а вы работаете только с теми, кто готов купить.
      </p>
      <div style={{ marginTop: 36, display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { icon: Globe, label: "3 платформы" },
          { icon: Bot, label: "ИИ-контент" },
          { icon: Filter, label: "Авто-фильтрация" },
          { icon: Calendar, label: "Авто-запись" },
          { icon: MessageCircle, label: "WhatsApp уведомления" },
        ].map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, color: T2, fontSize: 12 }}>
            <it.icon size={15} color={AL} />{it.label}
          </div>
        ))}
      </div>
    </div>
  ),

  // 1 — CURRENT SITUATION
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={AlertTriangle} color={WR} title="Текущая ситуация" sub="Что сейчас не работает — и что уже есть" />
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12, flex: 1 }}>
        {[
          { label: "Instagram + Facebook", status: "Неактивны", desc: "Нет регулярного контента, нет обработки лидов, нет автоматизации. Потенциальные клиенты пишут — но никто не отвечает вовремя.", color: ER },
          { label: "TikTok — 23 000 подписчиков", status: "Есть база!", desc: "Активный аккаунт с аудиторией. Это серьёзный актив — но нет воронки, которая превращает просмотры в клиентов и продажи.", color: OK },
          { label: "Сайт + Landing page", status: "Не используется", desc: "Есть, но не подключён ни к одной воронке. Трафик не приходит, лиды не собираются.", color: WR },
          { label: "LR Партнёрский магазин", status: "Изолирован", desc: "Магазин работает, но никак не связан с соц. сетями. Клиенты не знают, как туда попасть.", color: WR },
          { label: "Регистрационная ссылка LR", status: "Не интегрирована", desc: "Ссылка для регистрации новых партнёров существует, но нигде не интегрирована в воронку.", color: WR },
          { label: "Мини-курс «Найди себя»", status: "Идея", desc: "Есть желание сделать, но пока не создан. Нет платформы для размещения.", color: T2 },
        ].map((it, i) => (
          <Card key={i} style={{ display: "flex", flexDirection: "column", gap: 6, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: T1, fontWeight: 600, fontSize: 13 }}>{it.label}</span>
              <Tag color={it.color}>{it.status}</Tag>
            </div>
            <span style={{ color: T2, fontSize: 11, lineHeight: 1.5 }}>{it.desc}</span>
          </Card>
        ))}
      </div>
      <div style={{ background: `${ER}10`, border: `1px solid ${ER}30`, borderRadius: 12, padding: "14px 18px", marginTop: 12 }}>
        <p style={{ color: T1, fontSize: 13, margin: 0 }}>
          <strong style={{ color: ER }}>Главная проблема:</strong> <span style={{ color: T2 }}>23K подписчиков в TikTok, магазин LR, регистрация — всё есть. Но нет автоматической воронки, которая ведёт человека от первого контакта до покупки. Всё требует вашего личного участия.</span>
        </p>
      </div>
    </div>
  ),

  // 2 — GOAL / VISION
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Target} color={OK} title="Цель проекта" sub="Что мы построим" />
      <Card style={{ padding: 24, background: `linear-gradient(135deg, ${C1} 0%, #1a2744 100%)` }} border={`1px solid ${A}30`}>
        <h3 style={{ color: AL, fontSize: 16, margin: "0 0 16px", fontWeight: 700 }}>Полностью автоматическая воронка «контент → продажа»</h3>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          {[
            { step: "1", icon: Video, title: "ИИ создаёт контент", desc: "15-25+ Reels в неделю генерируются и публикуются на Instagram, Facebook и TikTok. Каждый ролик — это приглашение написать вам." },
            { step: "2", icon: Bot, title: "Бот общается за вас", desc: "Умный бот в Direct автоматически отвечает на комментарии и Stories, задаёт вопросы, определяет — человек хочет купить продукт, стать партнёром или просто «поболтать»." },
            { step: "3", icon: Filter, title: "Автоматическая сортировка", desc: "Тех, кто «просто смотрит» — бот отправляет на email-воронку с полезным контентом. Тех, кто реально хочет — направляет к покупке или записи." },
            { step: "4", icon: Calendar, title: "Вы — только для VIP", desc: "Готовые к покупке клиенты сами записываются на консультацию через календарь. Вы получаете уведомление в WhatsApp и работаете только с ними." },
          ].map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 12 }}>
              <div style={{ minWidth: 36, height: 36, borderRadius: "50%", background: GR, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <it.icon size={18} color="white" />
              </div>
              <div>
                <div style={{ color: T1, fontWeight: 700, fontSize: 13 }}>{it.title}</div>
                <div style={{ color: T2, fontSize: 11, lineHeight: 1.6, marginTop: 4 }}>{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
        {[
          { icon: Clock, value: "90%", label: "Меньше ручной работы", color: AL },
          { icon: Globe, value: "3", label: "Платформы одновременно", color: CY },
          { icon: Users, value: "DE + RU", label: "Два языка", color: PK },
          { icon: Zap, value: "24/7", label: "Работает без вас", color: OK },
        ].map((it, i) => (
          <Card key={i} style={{ textAlign: "center", padding: 14 }}>
            <it.icon size={18} color={it.color} />
            <div style={{ color: it.color, fontSize: 24, fontWeight: 800, marginTop: 4 }}>{it.value}</div>
            <div style={{ color: T2, fontSize: 11, marginTop: 2 }}>{it.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ background: `${OK}10`, border: `1px solid ${OK}30`, borderRadius: 12, padding: "12px 18px", marginTop: 12 }}>
        <p style={{ color: T1, fontSize: 13, margin: 0 }}>
          <Star size={13} color={OK} style={{ verticalAlign: "middle", marginRight: 6 }} />
          <strong>Итог:</strong> <span style={{ color: T2 }}>Контент публикуется сам → Бот квалифицирует лидов → Горячие клиенты записываются в календарь → Вы консультируете только тех, кто готов платить.</span>
        </p>
      </div>
    </div>
  ),

  // 3 — HOW IT WORKS: OVERALL ARCHITECTURE
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Layers} color={AL} title="Как это работает" sub="Полная схема системы" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Layer 1 — Content */}
        <div style={{ background: "linear-gradient(90deg, #312e81, #3730a3)", borderRadius: 12, padding: "12px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Video size={15} color="#a5b4fc" />
            <span style={{ color: "#a5b4fc", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Уровень 1: Создание контента (ИИ)</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["InVideo AI — генерация видео из текста", "Opus Clip — нарезка из существующих видео", "Canva — Stories и графика", "Личные записи — тёплый контент"].map((t, i) => (
              <span key={i} style={{ color: "#e0e7ff", fontSize: 11, background: "rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: 16 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center" }}><ArrowDown size={16} color={T2} /></div>
        {/* Layer 2 — Platforms */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 8 }}>
          {[
            { name: "Instagram", feat: ["Reels + Stories", "Комментарий → Бот в Direct", "Story reply → Бот"], color: "#e11d48" },
            { name: "Facebook", feat: ["Авто-синхронизация с IG", "Messenger бот", "Расширение аудитории"], color: "#2563eb" },
            { name: "TikTok (23K)", feat: ["Кросс-постинг Reels", "Ссылка в био → лендинг", "Уже есть аудитория!"], color: "#64748b" },
          ].map((p, i) => (
            <Card key={i} style={{ padding: "10px 14px", borderTop: `3px solid ${p.color}` }}>
              <div style={{ color: T1, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{p.name}</div>
              {p.feat.map((f, j) => <div key={j} style={{ color: T2, fontSize: 10, display: "flex", gap: 5, marginTop: 2 }}><CheckCircle size={9} color={OK} />{f}</div>)}
            </Card>
          ))}
        </div>
        <div style={{ textAlign: "center" }}><ArrowDown size={16} color={T2} /></div>
        {/* Layer 3 — GHL */}
        <div style={{ background: "linear-gradient(90deg, #164e63, #155e75)", borderRadius: 12, padding: "12px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Bot size={15} color="#67e8f9" />
            <span style={{ color: "#67e8f9", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Уровень 2: GoHighLevel — Мозг системы</span>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Бот в Instagram Direct", "Определение языка (DE/RU)", "Скоринг лидов", "CRM-пайплайн", "Авто-маршрутизация", "Календарь записи", "Email-воронки", "WhatsApp уведомления"].map((t, i) => (
              <span key={i} style={{ color: "#cffafe", fontSize: 11 }}><CheckCircle size={9} color="#22d3ee" style={{ verticalAlign: "middle", marginRight: 3 }} />{t}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center" }}><ArrowDown size={16} color={T2} /></div>
        {/* Layer 4 — Destinations */}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 8 }}>
          {[
            { name: "LR Магазин", icon: ShoppingBag, desc: "Покупка продуктов через мостовую страницу", color: OK },
            { name: "Регистрация LR", icon: UserCheck, desc: "Новый партнёр по вашей ссылке", color: AL },
            { name: "Консультация", icon: Calendar, desc: "Запись в календарь → WhatsApp", color: WR },
          ].map((d, i) => (
            <Card key={i} style={{ padding: "10px 14px", border: `1px solid ${d.color}30` }}>
              <d.icon size={16} color={d.color} />
              <div style={{ color: T1, fontWeight: 700, fontSize: 12, marginTop: 4 }}>{d.name}</div>
              <div style={{ color: T2, fontSize: 10, marginTop: 2, lineHeight: 1.4 }}>{d.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ),

  // 4 — FUNNEL DIAGRAM (interactive)
  ({ mobile }) => (
    <div style={{ height: "100%", overflow: "auto", WebkitOverflowScrolling: "touch" }}>
      <FunnelDiagram compact={mobile} />
    </div>
  ),

  // 5 — GOHIGHLEVEL: THE BRAIN
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Settings} color={CY} title="GoHighLevel — Мозг системы" sub="Одна платформа вместо десяти отдельных сервисов" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: `${CY}08`, border: `1px solid ${CY}25`, borderRadius: 12, padding: "12px 18px" }}>
          <p style={{ color: T1, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: CY }}>Что это?</strong> <span style={{ color: T2 }}>GoHighLevel (GHL) — мощная платформа «всё в одном» для автоматизации маркетинга и продаж. Бот для Instagram/Facebook, CRM, календарь, email-маркетинг, WhatsApp, лендинги — всё внутри одной системы.</span>
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { icon: Bot, title: "Бот в Instagram/FB", desc: "Человек комментирует Reels или отвечает на Story → бот автоматически пишет в Direct, задаёт вопросы, определяет интерес. Работает 24/7.", color: PK, what: "Комментарии + Stories + DM" },
            { icon: MessageCircle, title: "WhatsApp интеграция", desc: "Все сообщения из WhatsApp видны в одном месте. Горячие лиды получают уведомления прямо в WhatsApp. Отвечайте из одного окна.", color: OK, what: "Встроено нативно" },
            { icon: Calendar, title: "Календарь записи", desc: "Клиент сам выбирает время для консультации. Автоматические напоминания по SMS и email. Синхронизация с Google Calendar.", color: WR, what: "Заменяет: Calendly" },
            { icon: Users, title: "CRM + Пайплайн", desc: "Каждый лид отслеживается: откуда пришёл, что его интересует, на каком этапе воронки. Полная картина в реальном времени.", color: AL, what: "Заменяет: Kommo/amoCRM" },
            { icon: Mail, title: "Email-маркетинг", desc: "Автоматические цепочки писем: приветствие, продуктовые серии, бизнес-возможности. Сегментация по языку (DE/RU) и интересам.", color: CY, what: "Заменяет: Systeme.io" },
            { icon: Globe, title: "Лендинги и формы", desc: "Встроенный конструктор страниц и форм. Можем использовать как дополнение к вашему сайту на Elementor для A/B-тестирования.", color: "#a855f7", what: "Заменяет: Zapier + доп. инструменты" },
          ].map((it, i) => (
            <Card key={i} style={{ padding: "14px 14px 10px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <it.icon size={16} color={it.color} />
                <span style={{ color: T1, fontWeight: 700, fontSize: 12 }}>{it.title}</span>
              </div>
              <span style={{ color: T2, fontSize: 11, lineHeight: 1.5, flex: 1 }}>{it.desc}</span>
              <span style={{ color: it.color, fontSize: 10, fontWeight: 600, marginTop: 8 }}>{it.what}</span>
            </Card>
          ))}
        </div>
        <Card style={{ padding: "12px 18px", background: `linear-gradient(90deg, ${C1}, #1a2744)` }} border={`1px solid ${A}30`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ color: T1, fontWeight: 700, fontSize: 13 }}>Было: 6 отдельных сервисов</span>
              <span style={{ color: T2, fontSize: 12, marginLeft: 8 }}>Calendly + Kommo + Systeme.io + Zapier + WhatsApp API + отд. бот</span>
            </div>
            <ArrowRight size={16} color={AL} />
            <div>
              <span style={{ color: OK, fontWeight: 700, fontSize: 13 }}>Стало: 1 платформа</span>
              <span style={{ color: T2, fontSize: 12, marginLeft: 8 }}>GoHighLevel — всё внутри</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),

  // 6 — BRIDGE PAGE
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Globe} color={CY} title="Мостовая страница (Bridge Page)" sub="Связующее звено между соц. сетями и LR" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: "12px 18px", background: `${WR}08` }} border={`1px solid ${WR}30`}>
          <p style={{ color: T1, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: WR }}>Зачем нужна?</strong> <span style={{ color: T2 }}>Система LR закрытая — нельзя напрямую подключить Instagram к магазину LR. Поэтому мы создаём вашу личную страницу-мост, которая стоит между соц. сетями и LR. Она собирает контакты (email, имя) ДО того, как человек попадает в магазин — так вы владеете базой клиентов.</span>
          </p>
        </Card>
        <Card style={{ padding: 20 }} border={`1px solid ${A}30`}>
          <h4 style={{ color: AL, fontSize: 13, margin: "0 0 14px", fontWeight: 700 }}>Путь клиента через мостовую страницу:</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
            {[
              { label: "Reels / TikTok", bg: "#e11d48" },
              { label: "Бот в Direct", bg: "#0891b2" },
              { label: "Мостовая страница", bg: A },
              { label: "Действие клиента", bg: OK },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: s.bg, color: "white", padding: "5px 12px", borderRadius: 16, fontSize: 11, fontWeight: 600 }}>{s.label}</span>
                {i < 3 && <ArrowRight size={14} color={T2} />}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            <div>
              <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>Страница собирает:</h5>
              <Check>Email адрес — вы владеете контактом</Check>
              <Check>Имя и язык (DE/RU)</Check>
              <Check>Тип интереса (продукт/партнёрство/консультация)</Check>
              <Check>UTM-метки для аналитики (откуда пришёл)</Check>
            </div>
            <div>
              <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>Затем направляет:</h5>
              {[
                { label: "Купить продукты", dest: "→ Ваш LR-магазин", color: OK },
                { label: "Стать партнёром", dest: "→ Регистрация LR", color: AL },
                { label: "Консультация", dest: "→ Запись в календарь", color: WR },
                { label: "Узнать больше", dest: "→ Email-воронка", color: CY },
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
                  <Tag color={it.color}>{it.label}</Tag>
                  <span style={{ color: T2, fontSize: 11 }}>{it.dest}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <Card style={{ padding: 14 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>Что мы делаем:</h5>
            <Check>Разрабатываем на вашем сайте (Elementor)</Check>
            <Check>Версия на немецком + русском</Check>
            <Check>Адаптация под мобильные (90% трафика)</Check>
            <Check>DSGVO / GDPR — всё по закону</Check>
            <Check>Meta Pixel для ретаргетинга</Check>
          </Card>
          <Card style={{ padding: 14 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>Почему это важно:</h5>
            <Check color={WR}>Без страницы — вы теряете контакты. Люди уходят в LR-магазин и вы не знаете, кто они</Check>
            <Check color={WR}>С мостовой страницей — вы собираете базу. Даже если человек не купил сейчас, вы можете написать ему позже</Check>
            <Check>Это ваш актив. Соц. сети могут заблокировать, а база email — всегда ваша</Check>
          </Card>
        </div>
      </div>
    </div>
  ),

  // 7 — BOT FLOW DETAILED (with Stories)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Bot} color={PK} title="Как работает бот" sub="Подробная схема автоматической переписки" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <Card style={{ padding: 16 }} border={`1px solid ${PK}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Eye size={14} color={PK} />
            <span style={{ color: PK, fontWeight: 700, fontSize: 12 }}>ШАГ 1: Привлечение внимания (Reels + Stories)</span>
          </div>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: T1 }}>Reels:</strong> Призыв в видео — <em style={{ color: AL }}>«Напишите ИНФО в комментариях»</em> или <em style={{ color: AL }}>«Kommentiere INFO für Details»</em>. Бот мгновенно реагирует на ключевое слово.
          </p>
          <p style={{ color: T2, fontSize: 12, margin: "6px 0 0", lineHeight: 1.6 }}>
            <strong style={{ color: T1 }}>Stories:</strong> Ежедневные Stories с опросами, стикерами, вопросами. Человек отвечает на Story → бот автоматически начинает диалог в Direct. Это самый «тёплый» канал — люди уже вовлечены.
          </p>
        </Card>
        <Card style={{ padding: 16 }} border={`1px solid ${CY}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Send size={14} color={CY} />
            <span style={{ color: CY, fontWeight: 700, fontSize: 12 }}>ШАГ 2: Бот пишет в Direct</span>
          </div>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Через 2-3 секунды бот отправляет личное сообщение: <em style={{ color: T1 }}>«Привет! Спасибо за интерес. Подскажите, что вас больше интересует?»</em> и предлагает кнопки выбора:
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {[
              { text: "Продукты для здоровья", color: OK },
              { text: "Бизнес-возможность", color: AL },
              { text: "Консультация", color: WR },
              { text: "Просто интересно", color: T2 },
            ].map((b, i) => (
              <span key={i} style={{ background: `${b.color}15`, color: b.color, padding: "6px 14px", borderRadius: 10, fontSize: 11, fontWeight: 600, border: `1px solid ${b.color}30` }}>{b.text}</span>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 16 }} border={`1px solid ${AL}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Filter size={14} color={AL} />
            <span style={{ color: AL, fontWeight: 700, fontSize: 12 }}>ШАГ 3: Квалификация и маршрутизация</span>
          </div>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Бот задаёт 2-3 уточняющих вопроса и определяет «температуру» лида:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
            {[
              { temp: "Холодный", desc: "«Просто смотрю» → email-воронка с полезным контентом. Бот прогревает автоматически.", color: "#3b82f6" },
              { temp: "Тёплый", desc: "Интересуется продуктом → ссылка на мостовую страницу + каталог + серия писем.", color: WR },
              { temp: "Горячий", desc: "Спрашивает цену/запись → сразу ссылка на календарь консультации.", color: ER },
            ].map((t, i) => (
              <div key={i} style={{ background: `${t.color}10`, borderRadius: 10, padding: 10, border: `1px solid ${t.color}20` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.color }}>{t.temp}</div>
                <div style={{ fontSize: 11, color: T2, marginTop: 4, lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 16 }} border={`1px solid ${OK}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <CheckCircle size={14} color={OK} />
            <span style={{ color: OK, fontWeight: 700, fontSize: 12 }}>ШАГ 4: Результат</span>
          </div>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Горячий лид записывается на консультацию → вы получаете <strong style={{ color: T1 }}>уведомление в WhatsApp</strong> с именем, интересом и временем записи. Холодные и тёплые лиды попадают в автоматическую email-воронку и прогреваются без вашего участия.
          </p>
        </Card>
      </div>
    </div>
  ),

  // 8 — AI CONTENT FACTORY (no Zebracat)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Video} color={PK} title="Фабрика ИИ-контента" sub="Как мы создаём 15-25+ Reels в неделю" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { name: "InVideo AI", icon: Sparkles, desc: "Вы пишете текст → ИИ создаёт готовое видео с озвучкой, музыкой и визуалом. Основной инструмент для генерации Reels на русском и немецком.", price: "$28-100/мес", features: ["Текст → полноценное видео", "Автоматическая озвучка", "50+ языков (DE + RU)", "Адаптация под Reels формат"], color: AL },
            { name: "Opus Clip", icon: Image, desc: "Берёт ваши существующие длинные видео и автоматически нарезает на короткие Reels. Находит самые «цепляющие» моменты.", price: "Бесплатно–$29/мес", features: ["Из длинного видео → 10 Reels", "ИИ находит лучшие моменты", "Автоматические субтитры", "Удаление водяных знаков"], color: OK },
            { name: "Canva", icon: Image, desc: "Создание визуальных Stories, карусельных постов и графики. Шаблоны для брендированного контента. Быстро и без дизайнера.", price: "Бесплатно–$15/мес", features: ["Stories с анимацией", "Карусели для Instagram", "Шаблоны по тематикам", "Брендированная графика"], color: PK },
          ].map((tool, i) => (
            <Card key={i} style={{ padding: 14, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <tool.icon size={16} color={tool.color} />
                <span style={{ color: T1, fontWeight: 700, fontSize: 13 }}>{tool.name}</span>
              </div>
              <p style={{ color: T2, fontSize: 11, lineHeight: 1.5, margin: "0 0 10px" }}>{tool.desc}</p>
              {tool.features.map((f, j) => <Check key={j}>{f}</Check>)}
              <div style={{ marginTop: "auto", paddingTop: 10 }}>
                <Tag color={tool.color}>{tool.price}</Tag>
              </div>
            </Card>
          ))}
        </div>
        <Card style={{ padding: 16 }}>
          <h4 style={{ color: T1, fontSize: 13, margin: "0 0 10px", fontWeight: 700 }}>Недельный цикл производства контента:</h4>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { s: "Пн-Вт", t: "Написание 5-7 скриптов", bg: "#312e81" },
              { s: "Ср", t: "ИИ генерирует варианты", bg: "#1e3a5f" },
              { s: "Чт", t: "Отбор лучших 15-25", bg: "#164e63" },
              { s: "Пт", t: "Ваше одобрение", bg: "#14532d" },
              { s: "Ежедневно", t: "Авто-публикация 2-4 шт.", bg: "#422006" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ background: s.bg, borderRadius: 8, padding: "6px 12px" }}>
                  <div style={{ color: WR, fontSize: 10, fontWeight: 700 }}>{s.s}</div>
                  <div style={{ color: T1, fontSize: 11 }}>{s.t}</div>
                </div>
                {i < 4 && <ArrowRight size={12} color={T2} />}
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <Card style={{ padding: 14 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>Темы контента:</h5>
            {["Личностный рост / «Найди себя»", "Здоровье и красота (Pflege & Gesundheit)", "Продукты LR — обзоры, отзывы", "Бизнес-возможности с LR", "Истории успеха клиентов/партнёров"].map((t, i) => (
              <div key={i} style={{ color: T2, fontSize: 11, marginTop: 4, display: "flex", gap: 5 }}><span style={{ color: AL }}>+</span>{t}</div>
            ))}
          </Card>
          <Card style={{ padding: 14 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>Ваше участие:</h5>
            <Check>Запись 2-3 личных видео в неделю (по телефону)</Check>
            <Check>Одобрение еженедельной пачки контента</Check>
            <Check>Всё остальное делаем мы + ИИ</Check>
            <div style={{ marginTop: 10, background: `${OK}10`, borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ color: OK, fontSize: 11, fontWeight: 600 }}>Совет: записывайте 5-10 видео за раз, мы распределим на 2 недели</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ),

  // 9 — EMAIL NURTURE + LEAD JOURNEY (NEW)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Mail} color={CY} title="Email-воронки и прогрев лидов" sub="Что происходит после первого контакта" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 8 }}>
          <Card style={{ padding: 14 }} border={`1px solid ${OK}30`}>
            <h4 style={{ color: OK, fontSize: 13, margin: "0 0 12px", fontWeight: 700 }}>Серия «Продукты LR»</h4>
            <p style={{ color: T2, fontSize: 11, margin: "0 0 10px", lineHeight: 1.5 }}>Для тех, кто интересуется продуктами здоровья и красоты:</p>
            {[
              { day: "День 1", text: "Приветствие + бесплатный гайд «5 привычек для здоровья»" },
              { day: "День 3", text: "Обзор топ-3 продуктов LR с отзывами клиентов" },
              { day: "День 5", text: "Видео-история: «Как это изменило мою жизнь»" },
              { day: "День 7", text: "Специальное предложение + ссылка на магазин" },
              { day: "День 14", text: "Напоминание + приглашение на консультацию" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <span style={{ color: OK, fontSize: 10, fontWeight: 700, minWidth: 48 }}>{s.day}</span>
                <span style={{ color: T2, fontSize: 11 }}>{s.text}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: 14 }} border={`1px solid ${AL}30`}>
            <h4 style={{ color: AL, fontSize: 13, margin: "0 0 12px", fontWeight: 700 }}>Серия «Бизнес-возможность»</h4>
            <p style={{ color: T2, fontSize: 11, margin: "0 0 10px", lineHeight: 1.5 }}>Для тех, кто хочет стать партнёром LR:</p>
            {[
              { day: "День 1", text: "Приветствие + PDF «Как начать бизнес с LR»" },
              { day: "День 3", text: "История партнёра: доход, путь, реальные цифры" },
              { day: "День 5", text: "Ответы на частые вопросы о партнёрстве" },
              { day: "День 7", text: "Видео «День из жизни партнёра LR»" },
              { day: "День 10", text: "Приглашение на бесплатную консультацию" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <span style={{ color: AL, fontSize: 10, fontWeight: 700, minWidth: 48 }}>{s.day}</span>
                <span style={{ color: T2, fontSize: 11 }}>{s.text}</span>
              </div>
            ))}
          </Card>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 16px", background: C1, borderRadius: 12, border: `1px solid ${C2}`, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <span style={{ color: T2, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", marginRight: 4 }}>Путь лида:</span>
          {[
            { label: "Reels", color: PK },
            { label: "Бот", color: CY },
            { label: "Квалификация", color: AL },
            { label: "Email", color: WR },
            { label: "Мост. стр.", color: A },
            { label: "Покупка", color: OK },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              <span style={{ background: `${s.color}20`, color: s.color, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 600, border: `1px solid ${s.color}30`, whiteSpace: "nowrap" }}>{s.label}</span>
              {i < 5 && <ArrowRight size={10} color={T2} />}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 8 }}>
          <Card style={{ padding: 12, background: `${WR}08` }} border={`1px solid ${WR}30`}>
            <h5 style={{ color: WR, fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>Если лид не купил сразу:</h5>
            <Check color={WR}>Попадает в «прогревающую» серию писем</Check>
            <Check color={WR}>Получает полезный контент раз в 3-5 дней</Check>
            <Check color={WR}>Через 30 дней — повторное предложение</Check>
            <Check color={WR}>Бот может напомнить через Instagram через 2 недели</Check>
          </Card>
          <Card style={{ padding: 12, background: `${OK}08` }} border={`1px solid ${OK}30`}>
            <h5 style={{ color: OK, fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>Всё на двух языках:</h5>
            <Check>Немецкая серия — для DE-аудитории</Check>
            <Check>Русская серия — для RU/UA-аудитории</Check>
            <Check>Язык определяется автоматически ботом</Check>
            <Check>Шаблоны готовим мы, вы только утверждаете</Check>
          </Card>
        </div>
      </div>
    </div>
  ),

  // 10 — CRM PIPELINE
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={BarChart3} color={AL} title="CRM: Отслеживание каждого клиента" sub="От первого касания до покупки" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: 18 }}>
          <h4 style={{ color: T1, fontSize: 13, margin: "0 0 14px", fontWeight: 700 }}>Воронка продаж — вы видите каждый этап:</h4>
          <div style={{ display: "flex", gap: 6, flexWrap: mobile ? "wrap" : "nowrap" }}>
            {[
              { stage: "Новый лид", count: "—", desc: "Написал в Direct / зашёл на страницу", color: T2, bg: C2 },
              { stage: "Вовлечён", count: "—", desc: "Ответил боту, задал вопрос", color: CY, bg: "#0c4a6e" },
              { stage: "Квалифицирован", count: "—", desc: "Продукт / бизнес / консультация", color: AL, bg: "#312e81" },
              { stage: "Записан", count: "—", desc: "Забронировал время в календаре", color: WR, bg: "#78350f" },
              { stage: "Клиент", count: "—", desc: "Купил / зарегистрировался", color: OK, bg: "#14532d" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ background: s.bg, borderRadius: 10, padding: "12px 6px", border: `1px solid ${s.color}25` }}>
                  <div style={{ color: s.color, fontSize: 20, fontWeight: 800 }}>{s.count}</div>
                  <div style={{ color: s.color, fontSize: 10, fontWeight: 600, marginTop: 2 }}>{s.stage}</div>
                  <div style={{ color: T2, fontSize: 9, marginTop: 4 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <Card style={{ padding: 16 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>Что видно в CRM для каждого лида:</h5>
            {[
              "Откуда пришёл (какой Reels, какая платформа)",
              "Язык общения (DE или RU)",
              "Что его интересует (продукт/бизнес/консультация)",
              "Вся переписка с ботом",
              "Посещал ли мостовую страницу",
              "Кликал ли на магазин LR",
              "Записался ли на консультацию",
              "Открывал ли email-письма",
            ].map((t, i) => <Check key={i}>{t}</Check>)}
          </Card>
          <Card style={{ padding: 16 }}>
            <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>Зачем это нужно:</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: Search, text: "Вы точно знаете, какие Reels приносят клиентов, а какие нет", color: CY },
                { icon: TrendingUp, text: "Видите, где воронка «теряет» людей и можно улучшить", color: OK },
                { icon: DollarSign, text: "Считаете реальный ROI: сколько потратили → сколько заработали", color: WR },
                { icon: Users, text: "Не теряете ни одного лида — все в системе, ничего не забыто", color: AL },
                { icon: PhoneCall, text: "Горячие лиды получают внимание первыми — приоритизация автоматическая", color: PK },
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <it.icon size={14} color={it.color} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span style={{ color: T2, fontSize: 11, lineHeight: 1.5 }}>{it.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  ),

  // 11 — BEFORE vs AFTER (NEW)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Repeat} color={AL} title="Ваш день: до и после" sub="Как изменится ваша ежедневная работа" />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: 18, borderTop: `3px solid ${ER}` }}>
          <h4 style={{ color: ER, fontSize: 14, margin: "0 0 16px", fontWeight: 700 }}>Сейчас (без системы)</h4>
          {[
            { time: "09:00", text: "Проверяете Instagram — 15 новых сообщений. Отвечаете вручную каждому.", icon: MessageCircle },
            { time: "10:30", text: "Пытаетесь снять Reels. Идей нет, сценария нет. Снимаете 1 видео за час.", icon: Video },
            { time: "12:00", text: "Кто-то спросил про продукт — ищете информацию, пишете длинный ответ.", icon: Search },
            { time: "14:00", text: "Человек хотел записаться — переписка туда-сюда, согласование времени.", icon: Calendar },
            { time: "16:00", text: "TikTok — 23K подписчиков, но как их конвертировать? Непонятно.", icon: Users },
            { time: "18:00", text: "Устали. 3 потенциальных клиента потеряны — не успели ответить.", icon: AlertTriangle },
          ].map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginTop: i === 0 ? 0 : 10, alignItems: "flex-start" }}>
              <span style={{ color: ER, fontSize: 10, fontWeight: 700, minWidth: 36 }}>{it.time}</span>
              <it.icon size={13} color={ER} style={{ marginTop: 2, flexShrink: 0, opacity: 0.6 }} />
              <span style={{ color: T2, fontSize: 11, lineHeight: 1.5 }}>{it.text}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, background: `${ER}10`, borderRadius: 8, padding: "8px 12px" }}>
            <span style={{ color: ER, fontSize: 11, fontWeight: 600 }}>Итог: 8+ часов, 1 видео, 0 записей в календарь</span>
          </div>
        </Card>
        <Card style={{ padding: 18, borderTop: `3px solid ${OK}` }}>
          <h4 style={{ color: OK, fontSize: 14, margin: "0 0 16px", fontWeight: 700 }}>После (с системой)</h4>
          {[
            { time: "09:00", text: "Открываете WhatsApp — 2 уведомления: «Новая запись на консультацию в 14:00 и 16:00».", icon: MessageCircle },
            { time: "09:15", text: "Проверяете CRM: 47 новых лидов за сутки, 12 ответили боту, 3 квалифицированы.", icon: BarChart3 },
            { time: "10:00", text: "Записываете 3 коротких видео по телефону (15 мин). Отправляете нам.", icon: Video },
            { time: "14:00", text: "Консультация с горячим клиентом. Он уже знает продукт — бот всё рассказал.", icon: Calendar },
            { time: "16:00", text: "Вторая консультация. Клиент из TikTok → мостовая страница → запись.", icon: Users },
            { time: "17:00", text: "Свободное время. Система работает. 3 Reels опубликованы автоматически.", icon: Zap },
          ].map((it, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginTop: i === 0 ? 0 : 10, alignItems: "flex-start" }}>
              <span style={{ color: OK, fontSize: 10, fontWeight: 700, minWidth: 36 }}>{it.time}</span>
              <it.icon size={13} color={OK} style={{ marginTop: 2, flexShrink: 0, opacity: 0.6 }} />
              <span style={{ color: T2, fontSize: 11, lineHeight: 1.5 }}>{it.text}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, background: `${OK}10`, borderRadius: 8, padding: "8px 12px" }}>
            <span style={{ color: OK, fontSize: 11, fontWeight: 600 }}>Итог: 2 часа работы, 2 консультации, система работает 24/7</span>
          </div>
        </Card>
      </div>
    </div>
  ),

  // 12 — TIMELINE
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Clock} color={WR} title="План реализации" sub="4 фазы за 12 недель" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          {
            phase: "Фаза 1", name: "Фундамент", weeks: "Недели 1-2",
            color: AL,
            tasks: [
              "Создание мостовой страницы (DE + RU)",
              "Настройка GoHighLevel: бот, CRM, календарь",
              "Подключение Instagram + Facebook + WhatsApp",
              "Тестирование: комментарий → бот → запись → уведомление",
            ],
            milestone: "Первая автоматическая запись на консультацию"
          },
          {
            phase: "Фаза 2", name: "Запуск контента", weeks: "Недели 3-5",
            color: CY,
            tasks: [
              "Настройка ИИ-инструментов (InVideo AI + Opus Clip)",
              "Создание шаблонов скриптов (5 DE + 5 RU)",
              "Переработка существующего контента из TikTok",
              "Выход на 2-4 Reels в день + ежедневные Stories",
            ],
            milestone: "Контент-конвейер: 15-25 Reels в неделю"
          },
          {
            phase: "Фаза 3", name: "Расширение", weeks: "Недели 6-8",
            color: OK,
            tasks: [
              "Запуск TikTok-воронки (ссылка в био → мостовая стр.)",
              "Email-воронки (4 серии: DE/RU × продукт/бизнес)",
              "WhatsApp/Telegram сообщество для тёплых лидов",
              "Оптимизация воронки по аналитике",
            ],
            milestone: "Мульти-платформенная воронка работает"
          },
          {
            phase: "Фаза 4", name: "Монетизация", weeks: "Недели 9-12",
            color: WR,
            tasks: [
              "Создание мини-курса «Найди себя»",
              "Интеграция курса в воронку продаж",
              "Instagram Shop (опционально)",
              "Запуск платной рекламы и ретаргетинга",
            ],
            milestone: "Первые продажи курса через автоворонку"
          },
        ].map((p, i) => (
          <Card key={i} style={{ padding: "12px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ minWidth: 80, textAlign: "center", paddingTop: 2 }}>
              <div style={{ color: p.color, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{p.phase}</div>
              <div style={{ color: T1, fontSize: 15, fontWeight: 800, marginTop: 2 }}>{p.name}</div>
              <div style={{ color: T2, fontSize: 10, marginTop: 4 }}>{p.weeks}</div>
            </div>
            <div style={{ width: 1, background: C2, alignSelf: "stretch" }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tasks.map((t, j) => (
                  <span key={j} style={{ color: T2, fontSize: 10, background: C2, padding: "3px 9px", borderRadius: 6 }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5 }}>
                <Star size={11} color={p.color} />
                <span style={{ color: p.color, fontSize: 11, fontWeight: 600 }}>{p.milestone}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),

  // 13 — BUDGET (no Zebracat, no ManyChat)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={DollarSign} color={OK} title="Инвестиции" sub="Стоимость инструментов по фазам" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <Card style={{ padding: 16 }} border={`1px solid ${A}30`}>
            <h4 style={{ color: AL, fontSize: 13, margin: "0 0 12px", fontWeight: 700 }}>Платформа (Фаза 1+)</h4>
            {[
              { tool: "GoHighLevel", role: "Бот, CRM, календарь, email, WhatsApp — всё в одном", price: "~$97/мес" },
              { tool: "Мостовая страница", role: "Разработка на Elementor (наше агентство)", price: "Отд. стоимость" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C2}` }}>
                <div><span style={{ color: T1, fontSize: 12, fontWeight: 600 }}>{t.tool}</span><br /><span style={{ color: T2, fontSize: 10 }}>{t.role}</span></div>
                <span style={{ color: OK, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{t.price}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: 16 }}>
            <h4 style={{ color: CY, fontSize: 13, margin: "0 0 12px", fontWeight: 700 }}>ИИ-контент (Фаза 2+)</h4>
            {[
              { tool: "InVideo AI", role: "Основной генератор видео из текста", price: "$28-100/мес" },
              { tool: "Opus Clip", role: "Нарезка существующих видео", price: "Бесп.–$29/мес" },
              { tool: "Canva", role: "Stories + графика + карусели", price: "Бесп.–$15/мес" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C2}` }}>
                <div><span style={{ color: T1, fontSize: 12, fontWeight: 600 }}>{t.tool}</span><br /><span style={{ color: T2, fontSize: 10 }}>{t.role}</span></div>
                <span style={{ color: CY, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{t.price}</span>
              </div>
            ))}
          </Card>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { phase: "Фаза 1", cost: "~$97", desc: "GoHighLevel + мостовая страница", color: AL },
            { phase: "Полная работа", cost: "$125-240", desc: "GHL + все ИИ-инструменты", color: WR },
            { phase: "Проект (все фазы)", cost: "~€6 000", desc: "Разработка + настройка + запуск", color: OK },
          ].map((b, i) => (
            <Card key={i} style={{ textAlign: "center", padding: 16, border: `1px solid ${b.color}30` }}>
              <div style={{ color: T2, fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>{b.phase}</div>
              <div style={{ color: b.color, fontSize: 24, fontWeight: 800, marginTop: 4 }}>{b.cost}</div>
              <div style={{ color: T2, fontSize: 10, marginTop: 2 }}>/месяц — {b.desc}</div>
            </Card>
          ))}
        </div>
        <Card style={{ padding: "14px 18px" }} border={`1px solid ${OK}30`}>
          <p style={{ color: T1, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: OK }}>~€6 000 — ориентировочная стоимость проекта</strong> <span style={{ color: T2 }}> за все 4 фазы. Оплата разбивается на несколько платежей для удобства. Это моя оценка на основе объёма работ. Финальная цена зависит от того, какие инструменты и решения мы выберем — может быть меньше или больше. После завершения проекта согласуем ежемесячную стоимость обслуживания.</span>
          </p>
        </Card>
        <Card style={{ padding: "14px 18px" }} border={`1px solid ${AL}30`}>
          <p style={{ color: T1, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: OK }}>Окупаемость:</strong> <span style={{ color: T2 }}>Одна продажа продуктов LR или регистрация нового партнёра покрывает месячные расходы на инструменты. При 3-5 консультациях в неделю система окупается многократно.</span>
          </p>
        </Card>
      </div>
    </div>
  ),

  // 14 — EXPECTED RESULTS (realistic, based on 23k TikTok)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={TrendingUp} color={OK} title="Ожидаемые результаты" sub="Реалистичный прогноз на 3 месяца (база: 23K TikTok)" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                {["Показатель", "Месяц 1", "Месяц 2", "Месяц 3"].map((h, i) => (
                  <th key={i} style={{ background: C1, color: i === 0 ? T1 : AL, fontSize: 12, fontWeight: 700, padding: "10px 14px", textAlign: i === 0 ? "left" : "center", borderBottom: `2px solid ${A}40` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { m: "Reels опубликовано / неделя", v: ["10-15", "15-20", "20-25"] },
                { m: "Переписок с ботом / неделя", v: ["20-40", "40-80", "80-150"] },
                { m: "Собрано email-контактов (нарастающий)", v: ["50-100", "150-300", "300-500"] },
                { m: "Визиты на мостовую страницу / нед.", v: ["30-60", "80-150", "150-300"] },
                { m: "Переходы в LR-магазин / неделя", v: ["10-20", "25-50", "50-100"] },
                { m: "Записей в календарь / неделя", v: ["1-2", "2-4", "3-6"] },
                { m: "Консультаций проведено / неделя", v: ["1-2", "2-3", "3-5"] },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px 14px", fontSize: 12, color: T1, fontWeight: 500, background: i % 2 === 0 ? C1 : "transparent", borderBottom: `1px solid ${C2}` }}>{row.m}</td>
                  {row.v.map((v, j) => (
                    <td key={j} style={{ padding: "8px 14px", fontSize: 13, color: j === 2 ? OK : T1, fontWeight: j === 2 ? 700 : 500, textAlign: "right", background: i % 2 === 0 ? C1 : "transparent", borderBottom: `1px solid ${C2}` }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: `${WR}08`, border: `1px solid ${WR}30`, borderRadius: 12, padding: "12px 18px" }}>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: WR }}>Важно:</strong> Цифры основаны на вашей существующей базе (23K TikTok) и средних показателях в нише велнес/здоровье. Результаты зависят от качества контента, регулярности публикаций и вовлечённости аудитории. Мы будем отслеживать реальные данные и корректировать стратегию каждые 2 недели.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Первый лид через бот", value: "Неделя 1-2", desc: "Как только бот и контент заработают", icon: Bot, color: CY },
            { label: "Первая запись", value: "Неделя 2-4", desc: "Первый клиент через автоворонку", icon: Calendar, color: AL },
            { label: "Стабильный поток", value: "Месяц 2-3", desc: "Регулярные записи без вашего участия", icon: TrendingUp, color: OK },
          ].map((m, i) => (
            <Card key={i} style={{ textAlign: "center", padding: 16, border: `1px solid ${m.color}30` }}>
              <m.icon size={20} color={m.color} />
              <div style={{ color: m.color, fontSize: 22, fontWeight: 800, marginTop: 6 }}>{m.value}</div>
              <div style={{ color: T1, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{m.label}</div>
              <div style={{ color: T2, fontSize: 11, marginTop: 2 }}>{m.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  ),

  // 15 — GDPR + RISKS (with US-servers note)
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 36, height: "100%", display: "flex", flexDirection: "column" }}>
      <H icon={Shield} color={WR} title="Безопасность и риски" sub="DSGVO, хранение данных и политики LR" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <Card style={{ padding: 16 }} border={`1px solid ${CY}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Lock size={14} color={CY} />
            <span style={{ color: CY, fontWeight: 700, fontSize: 13 }}>DSGVO / GDPR — Защита данных (Германия)</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
            {["Double Opt-In на все формы сбора email", "Cookie Consent баннер на мостовой странице", "Datenschutzerklärung (политика конфиденциальности)", "Бот сообщает, что он автоматический (требование Meta)", "Право на удаление данных по запросу", "Impressum на всех страницах (обязательно в DE)"].map((t, i) => <Check key={i}>{t}</Check>)}
          </div>
        </Card>
        <Card style={{ padding: 16, background: `${WR}06` }} border={`1px solid ${WR}30`}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Globe size={14} color={WR} />
            <span style={{ color: WR, fontWeight: 700, fontSize: 13 }}>GoHighLevel — серверы в США</span>
          </div>
          <p style={{ color: T2, fontSize: 12, margin: "0 0 8px", lineHeight: 1.6 }}>
            GHL хранит данные на серверах в США. Это <strong style={{ color: T1 }}>легально для Германии</strong> благодаря EU-US Data Privacy Framework (с июля 2023) и стандартным договорным оговоркам (SCCs).
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 8 }}>
            <div>
              <Check>Подписываем DPA (Data Processing Agreement) с GHL</Check>
              <Check>Указываем в Datenschutzerklärung, что данные обрабатываются в США</Check>
            </div>
            <div>
              <Check>Законное основание: согласие пользователя + SCCs</Check>
              <Check>Double Opt-In обеспечивает явное согласие</Check>
            </div>
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          {[
            { title: "Политика LR", items: ["Проверим Verhaltenskodex LR перед запуском", "Никаких обещаний дохода или медицинских заявлений", "Фокус на lifestyle/велнес позиционирование", "Корректное использование логотипов и названий LR"], color: WR },
            { title: "Защита аккаунта", items: ["Только официальные API (GHL подключается через Meta API)", "Не более 4 Reels в день (безопасный лимит Instagram)", "Бот ведёт себя естественно (задержки, вариации)", "Диверсификация: 3 платформы = защита от блокировки"], color: AL },
          ].map((s, i) => (
            <Card key={i} style={{ padding: 14 }}>
              <h5 style={{ color: s.color, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>{s.title}</h5>
              {s.items.map((t, j) => <Check key={j} color={s.color}>{t}</Check>)}
            </Card>
          ))}
        </div>
        <Card style={{ padding: 14 }}>
          <h5 style={{ color: T1, fontSize: 12, fontWeight: 700, margin: "0 0 8px" }}>TikTok в Европе — ограничения:</h5>
          <p style={{ color: T2, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
            Автоматизация DM в TikTok <strong style={{ color: ER }}>не работает в ЕС</strong> из-за GDPR и DSA. Решение: каждое TikTok видео содержит призыв <strong style={{ color: T1 }}>«Ссылка в био»</strong> → ведёт на мостовую страницу, где лид попадает в ту же воронку. С вашими 23K подписчиками это мощный канал трафика.
          </p>
        </Card>
      </div>
    </div>
  ),

  // 16 — NEXT STEPS CTA
  ({ mobile }) => (
    <div style={{ padding: mobile ? 20 : 40, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 18, background: GR, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 16px 48px rgba(99,102,241,0.4)" }}>
        <Rocket size={36} color="white" />
      </div>
      <h2 style={{ fontSize: mobile ? 22 : 30, fontWeight: 800, color: T1, margin: 0 }}>Готовы начать?</h2>
      <p style={{ fontSize: 14, color: T2, maxWidth: 480, lineHeight: 1.6, marginTop: 10 }}>
        Чтобы запустить Фазу 1, нам нужно от вас:
      </p>
      <div style={{ width: "100%", maxWidth: 520, marginTop: 28, textAlign: "left" }}>
        {[
          { n: "1", text: "Ссылка на ваш LR-магазин", desc: "Для интеграции в мостовую страницу" },
          { n: "2", text: "Регистрационная ссылка LR", desc: "Для направления новых партнёров" },
          { n: "3", text: "Доступ к Instagram + Facebook", desc: "Администраторский доступ для настройки бота и публикаций" },
          { n: "4", text: "Ваш существующий контент", desc: "Видео, фото, отзывы — для переработки через ИИ" },
          { n: "5", text: "Расписание консультаций", desc: "Дни и часы, когда вы доступны для звонков" },
          { n: "6", text: "Подтверждение бюджета", desc: "~$97/мес на GoHighLevel + $30-145/мес на ИИ-инструменты" },
        ].map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 14 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: "50%", background: i < 3 ? GR : C2, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>{it.n}</div>
            <div>
              <div style={{ color: T1, fontSize: 13, fontWeight: 600 }}>{it.text}</div>
              <div style={{ color: T2, fontSize: 11, marginTop: 1 }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, padding: "14px 32px", background: GR, borderRadius: 12, color: "white", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}>
        Построим вашу автоматическую машину продаж
      </div>
      <p style={{ color: T2, fontSize: 11, marginTop: 16 }}>Первые результаты — через 2 недели после старта</p>
    </div>
  ),
];

export default function Presentation() {
  const [cur, setCur] = useState(0);
  const [isFs, setIsFs] = useState(false);
  const [winW, setWinW] = useState(window.innerWidth);
  const [winH, setWinH] = useState(window.innerHeight);
  const mobile = winW <= 640;
  const touchStartX = useRef(null);
  const tot = slides.length;
  const S = slides[cur];

  useEffect(() => {
    const onResize = () => { setWinW(window.innerWidth); setWinH(window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setCur(c => Math.min(tot - 1, c + 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setCur(c => Math.max(0, c - 1)); }
      if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFs(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tot]);

  const toggleFs = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta < -50) setCur(c => Math.min(tot - 1, c + 1));
    if (delta > 50) setCur(c => Math.max(0, c - 1));
  };

  const full = mobile || isFs;
  const navH = 52;
  const contentH = full ? winH - navH : Math.min(winH - 120, 820);
  const waLink = "https://wa.me/4915124130699";

  return (
    <div style={{ width: "100%", maxWidth: full ? "100%" : 1280, margin: "0 auto", padding: full ? 0 : "20px 24px 0", boxSizing: "border-box", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: T1, userSelect: "none" }}>
      <div style={{ background: BG, borderRadius: full ? 0 : 16, overflow: "hidden", boxShadow: full ? "none" : "0 24px 80px rgba(0,0,0,0.5)", border: full ? "none" : `1px solid ${C2}`, position: "relative" }}>
        <div
          style={{ height: contentH, overflow: "auto" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={{ zoom: full ? 1 : 1.18 }}>
            <S mobile={mobile} />
          </div>
        </div>
        {/* Watermark */}
        <div style={{ position: "absolute", bottom: navH + 12, right: 16, display: "flex", alignItems: "center", gap: 6, opacity: 0.18, pointerEvents: "none", userSelect: "none" }}>
          <img src={wsLogo} alt="" style={{ width: 22, height: 22 }} />
          <span style={{ color: T1, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>Webspirio</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: mobile ? "8px 10px" : "10px 20px", background: C1, borderTop: `1px solid ${C2}`, height: navH, boxSizing: "border-box" }}>
          <button onClick={() => setCur(Math.max(0, cur - 1))} disabled={cur === 0} style={{ display: "flex", alignItems: "center", gap: 5, padding: mobile ? "8px 14px" : "7px 14px", borderRadius: 8, border: "none", background: cur === 0 ? "transparent" : C2, color: cur === 0 ? T2 : T1, cursor: cur === 0 ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 600 }}>
            <ChevronLeft size={15} /> {!mobile && "Назад"}
          </button>
          {mobile ? (
            <span style={{ color: T2, fontSize: 13, fontWeight: 600 }}>{cur + 1} / {tot}</span>
          ) : (
            <div style={{ display: "flex", gap: 5 }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 20 : 7, height: 7, borderRadius: 4, border: "none", background: i === cur ? A : C2, cursor: "pointer", padding: 0, transition: "width 0.3s ease" }} />
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, border: "none", background: "#25D366", color: "white", cursor: "pointer", padding: 0, textDecoration: "none" }} title="WhatsApp: +49 151 24130699">
              <PhoneCall size={15} />
            </a>
            <button onClick={toggleFs} aria-label={isFs ? "Выйти из полноэкранного" : "Полноэкранный режим"} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, border: "none", background: C2, color: T2, cursor: "pointer", padding: 0 }} title={isFs ? "Выйти из полноэкранного" : "Полноэкранный режим (F)"}>
              {isFs ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button onClick={() => setCur(Math.min(tot - 1, cur + 1))} disabled={cur === tot - 1} style={{ display: "flex", alignItems: "center", gap: 5, padding: mobile ? "8px 14px" : "7px 14px", borderRadius: 8, border: "none", background: cur === tot - 1 ? "transparent" : GR, color: cur === tot - 1 ? T2 : "white", cursor: cur === tot - 1 ? "not-allowed" : "pointer", fontSize: 12, fontWeight: 600, boxShadow: cur === tot - 1 ? "none" : "0 4px 16px rgba(99,102,241,0.3)" }}>
              {!mobile && "Далее"} <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
      {!full && (
        <div style={{ textAlign: "center", marginTop: 10, color: T2, fontSize: 11 }}>
          Слайд {cur + 1} из {tot} — используйте стрелки ← → или F для полноэкранного режима
        </div>
      )}
    </div>
  );
}