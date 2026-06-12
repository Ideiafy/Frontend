import React, { useState } from "react";
import "../styles/notifications.css";
import Images from "../assets/images";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";

// ── Ícones ────────────────────────────────────────────────
const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const FollowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const MessageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

const SystemIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

// ── Dados mock ────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    user: { name: "Ana Souza", avatar: Images.PhotoCard },
    content: "curtiu seu projeto <strong>Design System v2</strong>",
    time: "agora",
    read: false,
    link: "/projeto/1",
  },
  {
    id: 2,
    type: "comment",
    user: { name: "Carlos Dev", avatar: Images.PhotoCard },
    content: "comentou: <em>\"Ficou incrível, adorei a paleta de cores!\"</em>",
    time: "5min",
    read: false,
    link: "/projeto/1",
  },
  {
    id: 3,
    type: "follow",
    user: { name: "Julia UI", avatar: Images.PhotoCard },
    content: "começou a te seguir",
    time: "1h",
    read: false,
    link: "/perfil/julia",
  },
  {
    id: 4,
    type: "message",
    user: { name: "Pedro Back", avatar: Images.PhotoCard },
    content: "te enviou uma mensagem",
    time: "3h",
    read: true,
    link: "/messages",
  },
  {
    id: 5,
    type: "like",
    user: { name: "Mariana Full", avatar: Images.PhotoCard },
    content: "curtiu seu comentário em <strong>React Hooks 101</strong>",
    time: "5h",
    read: true,
    link: "/post/2",
  },
  {
    id: 6,
    type: "system",
    user: null,
    content: "Seu projeto <strong>Ideafy App</strong> foi destaque na semana",
    time: "ontem",
    read: true,
    link: "/projeto/2",
  },
  {
    id: 7,
    type: "comment",
    user: { name: "Ana Souza", avatar: Images.PhotoCard },
    content: "respondeu seu comentário: <em>\"Obrigada! Usei o Figma com Auto Layout.\"</em>",
    time: "ontem",
    read: true,
    link: "/post/3",
  },
  {
    id: 8,
    type: "follow",
    user: { name: "Lucas Mobile", avatar: Images.PhotoCard },
    content: "começou a te seguir",
    time: "2 dias",
    read: true,
    link: "/perfil/lucas",
  },
  {
    id: 9,
    type: "system",
    user: null,
    content: "Nova versão disponível — confira as novidades da v2.4",
    time: "3 dias",
    read: true,
    link: "/novidades",
  },
  {
    id: 10,
    type: "message",
    user: { name: "Julia UI", avatar: Images.PhotoCard },
    content: "te enviou uma mensagem",
    time: "4 dias",
    read: true,
    link: "/messages",
  },
];

// ── Helpers ───────────────────────────────────────────────
const TYPE_META = {
  like:    { icon: <HeartIcon />,   label: "Curtida",   color: "notif-icon--like"    },
  comment: { icon: <CommentIcon />, label: "Comentário", color: "notif-icon--comment" },
  follow:  { icon: <FollowIcon />,  label: "Seguidor",  color: "notif-icon--follow"  },
  message: { icon: <MessageIcon />, label: "Mensagem",  color: "notif-icon--message" },
  system:  { icon: <SystemIcon />,  label: "Sistema",   color: "notif-icon--system"  },
};

function groupByDate(list) {
  const groups = {};
  list.forEach(n => {
    const key =
      n.time === "agora" || n.time === "5min" || n.time === "1h" || n.time === "3h" || n.time === "5h"
        ? "Hoje"
        : n.time === "ontem"
        ? "Ontem"
        : "Anteriores";
    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  });
  return groups;
}

// ── Componente ────────────────────────────────────────────
export default function Notifications() {
  const [tema, setTema]           = useState("escuro");
  const [tab, setTab]             = useState("all");   // "all" | "unread"
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const toggleTema = () => setTema(p => p === "escuro" ? "claro" : "escuro");
  const temaClass  = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  const visible = tab === "unread"
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const deleteNotif = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClick = (notif) => {
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    // navegação: trocar por router.push(notif.link) se usar React Router
    console.log("Navegar para:", notif.link);
  };

  const grouped = groupByDate(visible);
  const groupOrder = ["Hoje", "Ontem", "Anteriores"];

  return (
    <div id="Notifications" className={temaClass}>
      <MobileHeader
        tema={tema}
        toggleTema={toggleTema}
        title="Notificações"
        disableAutoHide={true}
      />
      <Sidebar tema={tema} toggleTema={toggleTema} activeItem="notifications" />

      <main className="notif-main">
        <div className="notif-container">

          {/* ── Cabeçalho ── */}
          <header className="notif-header">
            <div className="notif-header-top">
              <h1 className="notif-title">
                Notificações
                {unreadCount > 0 && (
                  <span className="notif-count-badge">{unreadCount}</span>
                )}
              </h1>
            </div>

            {/* Abas */}
            <div className="notif-tabs">
              <button
                className={`notif-tab ${tab === "all" ? "notif-tab--active" : ""}`}
                onClick={() => setTab("all")}
              >
                Todas
              </button>
              <button
                className={`notif-tab ${tab === "unread" ? "notif-tab--active" : ""}`}
                onClick={() => setTab("unread")}
              >
                Não lidas
                {unreadCount > 0 && (
                  <span className="notif-tab-badge">{unreadCount}</span>
                )}
              </button>
            </div>
          </header>

          {/* ── Lista ── */}
          <div className="notif-list">
            {visible.length === 0 ? (
              <div className="notif-empty">
                <div className="notif-empty-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <p className="notif-empty-text">
                  {tab === "unread" ? "Nenhuma notificação não lida" : "Nenhuma notificação"}
                </p>
              </div>
            ) : (
              groupOrder.map(group => {
                if (!grouped[group] || grouped[group].length === 0) return null;
                return (
                  <section key={group} className="notif-group">
                    <h2 className="notif-group-label">{group}</h2>
                    <ul className="notif-group-list">
                      {grouped[group].map(notif => {
                        const meta = TYPE_META[notif.type];
                        return (
                          <li
                            key={notif.id}
                            className={`notif-item ${!notif.read ? "notif-item--unread" : ""}`}
                            onClick={() => handleClick(notif)}
                          >
                            {/* Avatar ou ícone de sistema */}
                            <div className="notif-av-wrap">
                              {notif.user ? (
                                <>
                                  <img
                                    src={notif.user.avatar}
                                    alt={notif.user.name}
                                    className="notif-av"
                                  />
                                  <span className={`notif-type-icon ${meta.color}`}>
                                    {meta.icon}
                                  </span>
                                </>
                              ) : (
                                <span className={`notif-system-icon ${meta.color}`}>
                                  {meta.icon}
                                </span>
                              )}
                            </div>

                            {/* Conteúdo */}
                            <div className="notif-body">
                              <p className="notif-text">
                                {notif.user && (
                                  <span className="notif-username">{notif.user.name} </span>
                                )}
                                <span
                                  dangerouslySetInnerHTML={{ __html: notif.content }}
                                />
                              </p>
                              <span className="notif-time">{notif.time}</span>
                            </div>

                            {/* Indicador não lida + delete */}
                            <div className="notif-actions">
                              {!notif.read && <span className="notif-unread-dot" />}
                              <button
                                className="notif-delete-btn"
                                onClick={(e) => deleteNotif(notif.id, e)}
                                aria-label="Remover notificação"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })
            )}
          </div>

        </div>
      </main>
    </div>
  );
}