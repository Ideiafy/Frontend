import React, { useState } from "react";
import Sidebar from "./componentes/sidebar";
import Images from "../assets/images";
import { useNavigate } from "react-router-dom";
import "../styles/configuracoes.css";
import MobileHeader from "./componentes/mobileHeader";

// ── Ícones ────────────────────────────────────────────────
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
);

const LogOutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// ── Seções da settings sidebar ────────────────────────────
const SECTIONS = [
  { id: "perfil",    label: "Perfil",    icon: <UserIcon />,     desc: "Informações pessoais" },
  { id: "seguranca", label: "Segurança", icon: <ShieldIcon />,   desc: "Senha e acesso" },
  { id: "conta",     label: "Conta",     icon: <SettingsIcon />, desc: "Dados e configurações" },
];

export default function MinhaContaPage() {
  const [tema, setTema]           = useState("escuro");
  const [activeSection, setActiveSection] = useState("perfil");
  const [avatarPreview, setAvatarPreview] = useState({ isOpen: false, imageUrl: null });
  const [confirmModal, setConfirmModal]   = useState({ isOpen: false, type: "", title: "", message: "", confirmText: "", onConfirm: null });
  const navigate = useNavigate();

  const [userProfile] = useState({
    name: "Lucas Alves",
    username: "lucasalves",
    joinDate: "Janeiro 2024",
    avatar: Images.PhotoCard,
    bio: "Designer e desenvolvedor apaixonado por criar experiências incríveis.",
  });

  const [formData, setFormData] = useState({
    name: "Lucas Alves",
    username: "lucasalves",
    bio: "Designer e desenvolvedor apaixonado por criar experiências incríveis.",
    email: "lucas@exemplo.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const toggleTema = () => setTema(p => p === "escuro" ? "claro" : "escuro");
  const temaClass  = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  const handleInput = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Máximo 5MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview({ isOpen: true, imageUrl: ev.target.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const confirmAvatar = () => {
    localStorage.setItem("userAvatar", avatarPreview.imageUrl);
    setAvatarPreview({ isOpen: false, imageUrl: null });
  };

  const openConfirm = (type, title, message, confirmText, onConfirm) =>
    setConfirmModal({ isOpen: true, type, title, message, confirmText, onConfirm });

  const closeConfirm = () =>
    setConfirmModal({ isOpen: false, type: "", title: "", message: "", confirmText: "", onConfirm: null });

  const handleLogout = () =>
    openConfirm("logout", "Sair da conta", "Tem certeza que deseja sair da sua conta?", "Sair", () => {
      localStorage.clear(); navigate("/login"); closeConfirm();
    });

  const handleDeactivate = () =>
    openConfirm("warn", "Desativar conta", "Sua conta será temporariamente desativada. Você poderá reativá-la fazendo login novamente.", "Desativar", () => {
      console.log("conta desativada"); closeConfirm();
    });

  const handleDelete = () =>
    openConfirm("danger", "Excluir conta", "Todos os seus dados serão permanentemente removidos e não poderão ser recuperados.", "Excluir permanentemente", () => {
      localStorage.clear(); navigate("/"); closeConfirm();
    });

  // ── Seções de conteúdo ─────────────────────────────────
  const renderContent = () => {
    switch (activeSection) {

      case "perfil": return (
        <div className="cfg-section">
          <div className="cfg-section-head">
            <h2 className="cfg-section-title">Perfil</h2>
            <p className="cfg-section-desc">Gerencie suas informações públicas</p>
          </div>

          {/* Avatar */}
          <div className="cfg-card">
            <div className="cfg-card-label">Foto de perfil</div>
            <div className="cfg-avatar-row">
              <div className="cfg-avatar-wrap">
                <img src={userProfile.avatar} alt={userProfile.name} className="cfg-avatar" />
                <label className="cfg-avatar-btn" title="Alterar foto">
                  <CameraIcon />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                </label>
              </div>
              <div className="cfg-avatar-info">
                <p className="cfg-avatar-name">{userProfile.name}</p>
                <p className="cfg-avatar-meta">
                  <CalendarIcon /> Entrou em {userProfile.joinDate}
                </p>
                <p className="cfg-avatar-hint">JPG, PNG ou WEBP · máx 5 MB</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="cfg-card">
            <div className="cfg-card-label">Informações básicas</div>
            <div className="cfg-field-grid">
              <div className="cfg-field">
                <label className="cfg-label">Nome completo</label>
                <input className="cfg-input" type="text" value={formData.name}
                  onChange={e => handleInput("name", e.target.value)} placeholder="Seu nome" />
              </div>
              <div className="cfg-field">
                <label className="cfg-label">Nome de usuário</label>
                <div className="cfg-input-prefix-wrap">
                  <span className="cfg-input-prefix">@</span>
                  <input className="cfg-input cfg-input--prefix" type="text" value={formData.username}
                    onChange={e => handleInput("username", e.target.value)} placeholder="username" />
                </div>
              </div>
            </div>
            <div className="cfg-field">
              <label className="cfg-label">Bio</label>
              <textarea className="cfg-textarea" rows={3} value={formData.bio}
                onChange={e => handleInput("bio", e.target.value)}
                placeholder="Conte um pouco sobre você..." />
              <span className="cfg-field-hint">{formData.bio.length}/160 caracteres</span>
            </div>
          </div>

          <div className="cfg-footer-actions">
            <button className="cfg-btn cfg-btn--primary" onClick={() => console.log("saved", formData)}>
              <CheckIcon /> Salvar alterações
            </button>
          </div>
        </div>
      );

      case "seguranca": return (
        <div className="cfg-section">
          <div className="cfg-section-head">
            <h2 className="cfg-section-title">Segurança</h2>
            <p className="cfg-section-desc">Mantenha sua conta protegida</p>
          </div>

          <div className="cfg-card">
            <div className="cfg-card-label">Alterar senha</div>
            <div className="cfg-field">
              <label className="cfg-label">Senha atual</label>
              <input className="cfg-input" type="password" value={formData.currentPassword}
                onChange={e => handleInput("currentPassword", e.target.value)}
                placeholder="••••••••" />
            </div>
            <div className="cfg-field-grid">
              <div className="cfg-field">
                <label className="cfg-label">Nova senha</label>
                <input className="cfg-input" type="password" value={formData.newPassword}
                  onChange={e => handleInput("newPassword", e.target.value)}
                  placeholder="••••••••" />
              </div>
              <div className="cfg-field">
                <label className="cfg-label">Confirmar nova senha</label>
                <input className="cfg-input" type="password" value={formData.confirmPassword}
                  onChange={e => handleInput("confirmPassword", e.target.value)}
                  placeholder="••••••••" />
              </div>
            </div>
          </div>

          <div className="cfg-footer-actions">
            <button className="cfg-btn cfg-btn--primary" onClick={() => {
              if (formData.newPassword !== formData.confirmPassword) { alert("Senhas não coincidem"); return; }
              console.log("password changed");
            }}>
              <CheckIcon /> Alterar senha
            </button>
          </div>
        </div>
      );

      case "conta": return (
        <div className="cfg-section">
          <div className="cfg-section-head">
            <h2 className="cfg-section-title">Conta</h2>
            <p className="cfg-section-desc">Gerencie dados e ações da sua conta</p>
          </div>

          {/* Ações normais */}
          <div className="cfg-card">
            <div className="cfg-card-label">Dados</div>
            <div className="cfg-action-row">
              <div className="cfg-action-info">
                <span className="cfg-action-title">Exportar dados</span>
                <span className="cfg-action-desc">Baixe uma cópia completa dos seus dados</span>
              </div>
              <button className="cfg-btn cfg-btn--ghost">Exportar</button>
            </div>
          </div>

          <div className="cfg-card">
            <div className="cfg-card-label">Sessão</div>
            <div className="cfg-action-row">
              <div className="cfg-action-info">
                <span className="cfg-action-title">Desativar conta</span>
                <span className="cfg-action-desc">Desative temporariamente — reative fazendo login</span>
              </div>
              <button className="cfg-btn cfg-btn--ghost" onClick={handleDeactivate}>Desativar</button>
            </div>
            <div className="cfg-divider" />
            <div className="cfg-action-row">
              <div className="cfg-action-info">
                <span className="cfg-action-title">Sair da conta</span>
                <span className="cfg-action-desc">Desconecte-se desta sessão</span>
              </div>
              <button className="cfg-btn cfg-btn--ghost cfg-btn--logout" onClick={handleLogout}>
                <LogOutIcon /> Sair
              </button>
            </div>
          </div>

          {/* Zona de perigo */}
          <div className="cfg-card cfg-card--danger">
            <div className="cfg-card-label cfg-card-label--danger">Zona de perigo</div>
            <div className="cfg-action-row">
              <div className="cfg-action-info">
                <span className="cfg-action-title">Excluir conta</span>
                <span className="cfg-action-desc">Remove permanentemente sua conta e todos os dados</span>
              </div>
              <button className="cfg-btn cfg-btn--danger" onClick={handleDelete}>
                <TrashIcon /> Excluir
              </button>
            </div>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div id="Configuracoes" className={temaClass}>
      <MobileHeader tema={tema} toggleTema={toggleTema} title="Configurações" disableAutoHide={true} />
      <Sidebar tema={tema} toggleTema={toggleTema} activeItem="settings" />

      <main className="cfg-main">
        <div className="cfg-layout">

          {/* ── Settings sidebar ── */}
          <aside className="cfg-nav">
            <p className="cfg-nav-heading">Configurações</p>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`cfg-nav-item ${activeSection === s.id ? "cfg-nav-item--active" : ""}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className="cfg-nav-icon">{s.icon}</span>
                <span className="cfg-nav-label">{s.label}</span>
              </button>
            ))}
          </aside>

          {/* ── Conteúdo ── */}
          <div className="cfg-content">
            {renderContent()}
          </div>

        </div>
      </main>

      {/* ── Modal avatar preview ── */}
      {avatarPreview.isOpen && (
        <div className="cfg-modal-overlay" onClick={() => setAvatarPreview({ isOpen: false, imageUrl: null })}>
          <div className="cfg-modal" onClick={e => e.stopPropagation()}>
            <div className="cfg-modal-head">
              <span>Confirmar foto de perfil</span>
              <button className="cfg-modal-close" onClick={() => setAvatarPreview({ isOpen: false, imageUrl: null })}><XIcon /></button>
            </div>
            <div className="cfg-modal-body">
              <img src={avatarPreview.imageUrl} alt="preview" className="cfg-modal-avatar-preview" />
              <p className="cfg-modal-hint">Esta será sua nova foto de perfil.</p>
            </div>
            <div className="cfg-modal-foot">
              <button className="cfg-btn cfg-btn--ghost" onClick={() => setAvatarPreview({ isOpen: false, imageUrl: null })}>
                <XIcon /> Cancelar
              </button>
              <button className="cfg-btn cfg-btn--primary" onClick={confirmAvatar}>
                <CheckIcon /> Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal confirmação ── */}
      {confirmModal.isOpen && (
        <div className="cfg-modal-overlay" onClick={closeConfirm}>
          <div className="cfg-modal" onClick={e => e.stopPropagation()}>
            <div className="cfg-modal-head">
              <span>{confirmModal.title}</span>
              <button className="cfg-modal-close" onClick={closeConfirm}><XIcon /></button>
            </div>
            <div className="cfg-modal-body">
              <p className="cfg-modal-message">{confirmModal.message}</p>
              {confirmModal.type === "danger" && (
                <div className="cfg-modal-warning">Esta ação não pode ser desfeita.</div>
              )}
            </div>
            <div className="cfg-modal-foot">
              <button className="cfg-btn cfg-btn--ghost" onClick={closeConfirm}>
                <XIcon /> Cancelar
              </button>
              <button
                className={`cfg-btn ${confirmModal.type === "danger" ? "cfg-btn--danger" : "cfg-btn--primary"}`}
                onClick={confirmModal.onConfirm}
              >
                <CheckIcon /> {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}