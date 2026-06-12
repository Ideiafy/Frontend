import React, { useState } from "react";
import Images from "../assets/images";
import "../styles/conta.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";
import { useNavigate } from "react-router-dom";
import Card from "../pages/componentes/card";

// ── Ícones ────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

export default function UserProfile({ userId = 1 }) {
  const [tema, setTema]         = useState("escuro");
  const [activeTab, setActiveTab] = useState("posts");
  const navigate                = useNavigate();

  const toggleTema = () => setTema(p => p === "escuro" ? "claro" : "escuro");
  const temaClass  = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  const userData = {
    id: userId,
    name: "Lucas Alves",
    username: "@lucasalves",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Criando soluções que fazem a diferença no mundo digital.",
    avatar: Images.PhotoCard || "/default-avatar.jpg",
    joinDate: "Março 2022",
    isOnline: true,
    verified: true,
    location: "São Paulo, BR",
    website: "lucasalves.dev",
    stats: { posts: 124, followers: 2847, following: 892 },
  };

  const userPosts = [
    {
      id: 1,
      media: [{ url: Images.DeskCard, alt: "Projeto" }],
    },
    {
      id: 2,
      media: [{ url: Images.Banner2, alt: "Design" }, { url: Images.Banner1, alt: "Process" }],
    },
    { id: 3, media: [] },
  ];

  const mediaItems = userPosts
    .filter(p => p.media?.length > 0)
    .flatMap(p => p.media.map((m, i) => ({ id: `${p.id}-${i}`, ...m })));

  return (
    <div id="UserProfile" className={temaClass}>
      <MobileHeader tema={tema} toggleTema={toggleTema} title="Perfil" disableAutoHide={true} />
      <Sidebar tema={tema} toggleTema={toggleTema} activeItem="account" />

      <main className="up-main">
        <div className="up-wrap">

          {/* ── Header estilo GitHub ── */}
          <header className="up-header">
            {/* Coluna esquerda: avatar */}
            <div className="up-avatar-col">
              <div className="up-avatar-ring">
                <img src={userData.avatar} alt={userData.name} className="up-avatar" />
                {userData.isOnline && <span className="up-online-dot" />}
              </div>
            </div>

            {/* Coluna direita: infos */}
            <div className="up-info-col">
              <div className="up-name-row">
                <h1 className="up-name">{userData.name}</h1>
                {userData.verified && (
                  <span className="up-verified" title="Verificado">
                    <VerifiedIcon />
                  </span>
                )}
                <span className="up-username">{userData.username}</span>
              </div>

              <p className="up-bio">{userData.bio}</p>

              <div className="up-meta-row">
                <span className="up-meta-item">
                  <CalendarIcon />
                  Entrou em {userData.joinDate}
                </span>
                {userData.location && (
                  <span className="up-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {userData.location}
                  </span>
                )}
                {userData.website && (
                  <span className="up-meta-item up-meta-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    {userData.website}
                  </span>
                )}
              </div>

              <div className="up-stats-row">
                <div className="up-stat">
                  <span className="up-stat-num">{userData.stats.posts}</span>
                  <span className="up-stat-lbl">posts</span>
                </div>
                <div className="up-stat-divider" />
                <div className="up-stat">
                  <span className="up-stat-num">{userData.stats.followers.toLocaleString()}</span>
                  <span className="up-stat-lbl">seguidores</span>
                </div>
                <div className="up-stat-divider" />
                <div className="up-stat">
                  <span className="up-stat-num">{userData.stats.following}</span>
                  <span className="up-stat-lbl">seguindo</span>
                </div>
              </div>
            </div>

            {/* Botão editar (canto superior direito) */}
            <button
              className="up-edit-btn"
              onClick={() => navigate("/configuracoes")}
            >
              <EditIcon />
              Editar perfil
            </button>
          </header>

          {/* ── Divisor ── */}
          <div className="up-divider" />

          {/* ── Abas ── */}
          <div className="up-tabs">
            <button
              className={`up-tab ${activeTab === "posts" ? "up-tab--active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              <ListIcon />
              Posts
            </button>
            <button
              className={`up-tab ${activeTab === "media" ? "up-tab--active" : ""}`}
              onClick={() => setActiveTab("media")}
            >
              <GridIcon />
              Mídia
            </button>
          </div>

          {/* ── Conteúdo ── */}
          <div className="up-content">
            {activeTab === "posts" && (
              <div className="up-posts">
                <Card />
              </div>
            )}

            {activeTab === "media" && (
              <div className="up-media-grid">
                {mediaItems.length > 0 ? (
                  mediaItems.map(m => (
                    <div key={m.id} className="up-media-item">
                      <img src={m.url} alt={m.alt} />
                      <div className="up-media-overlay" />
                    </div>
                  ))
                ) : (
                  <div className="up-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p>Nenhuma mídia ainda</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}