import React, { useState, useRef, useEffect } from "react";
import Images from "../assets/images";
import "../styles/feed.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";
import Card from "./componentes/card";

const PhotoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="m21 15-5-5L5 21"/>
  </svg>
);
const VideoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/>
  </svg>
);
const IdeaIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2z"/>
    <path d="M9 21h6M10 18h4"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const highlights = [
  { id: 0, label: "Adicionar", isAdd: true, avatar: Images.PhotoCard },
  { id: 1, label: "React",       avatar: Images.PhotoCard,              seen: false },
  { id: 2, label: "UI/UX",       avatar: Images.DeskCard || Images.PhotoCard, seen: false },
  { id: 3, label: "Open Source", avatar: Images.Banner1  || Images.PhotoCard, seen: true  },
  { id: 4, label: "Dev Tips",    avatar: Images.Banner2  || Images.PhotoCard, seen: true  },
  { id: 5, label: "Projetos",    avatar: Images.PhotoCard,              seen: false },
  { id: 6, label: "Web3",        avatar: Images.PhotoCard,              seen: true  },
];

export default function Feed() {
  const [tema, setTema]                 = useState("escuro");
  const [postText, setPostText]         = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeTab, setActiveTab]       = useState("recentes");
  const [alertMsg, setAlertMsg]         = useState(null);
  const [composeOpen, setComposeOpen]   = useState(false);
  const textareaRef = useRef(null);

  const toggleTema = () => setTema(p => p === "escuro" ? "claro" : "escuro");
  const temaClass  = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [postText, composeOpen]);

  // Trava o scroll do body quando o modal está aberto
  useEffect(() => {
    document.body.style.overflow = composeOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [composeOpen]);

  const showAlert = (msg) => { setAlertMsg(msg); setTimeout(() => setAlertMsg(null), 2800); };

  const closeCompose = () => {
    setComposeOpen(false);
    setPostText("");
    setSelectedFiles([]);
    setAlertMsg(null);
  };

  const handlePublish = () => {
    if (!postText.trim() && selectedFiles.length === 0) { showAlert("Adicione texto ou mídia."); return; }
    closeCompose();
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (selectedFiles.length > 0 || files.length > 1) { showAlert("Apenas 1 arquivo por post."); e.target.value = ""; return; }
    if (type === "video") {
      const ok = ["video/mp4","video/webm","video/ogg","video/quicktime","video/x-msvideo"];
      setSelectedFiles(files.filter(f => ok.includes(f.type)));
    } else { setSelectedFiles(files); }
    e.target.value = "";
  };

  const hasContent = postText.trim() || selectedFiles.length > 0;

  return (
    <div id="Feed" className={temaClass}>
      <MobileHeader tema={tema} toggleTema={toggleTema} title="Ideiafy" />
      <Sidebar tema={tema} toggleTema={toggleTema} />

      <main className="feed-main">
        <div className="feed-center">

          {/* Stories */}
          <section className="stories-bar">
            {highlights.map(h => h.isAdd ? (
              <div key={h.id} className="story-item">
                <div className="story-ring story-ring--add">
                  <img src={h.avatar} alt="Você" className="story-img" />
                  <span className="story-plus"><PlusIcon /></span>
                </div>
                <span className="story-name">Novo</span>
              </div>
            ) : (
              <div key={h.id} className="story-item">
                <div className={`story-ring ${h.seen ? "story-ring--seen" : "story-ring--new"}`}>
                  <img src={h.avatar} alt={h.label} className="story-img" />
                </div>
                <span className="story-name">{h.label}</span>
              </div>
            ))}
          </section>

          {/* Barra de criação compacta */}
          <section className="compose-bar" onClick={() => setComposeOpen(true)}>
            <img src={Images.PhotoCard} alt="Você" className="compose-bar-av" />
            <span className="compose-bar-text">No que você está trabalhando?</span>
            <div className="compose-bar-icons">
              <span className="compose-bar-icon"><PhotoIcon /></span>
              <span className="compose-bar-icon"><VideoIcon /></span>
              <span className="compose-bar-icon"><IdeaIcon /></span>
            </div>
          </section>

          {/* Tabs */}
          <nav className="feed-tabs">
            {[["recentes","Recentes"],["alta","Em alta"],["seguindo","Seguindo"]].map(([k,l]) => (
              <button key={k} className={`feed-tab ${activeTab===k?"feed-tab--on":""}`} onClick={() => setActiveTab(k)}>
                {l}
              </button>
            ))}
          </nav>

          {/* Posts */}
          <div className="feed-stream">
            <Card />
          </div>
        </div>
      </main>

      {/* Modal de criação de post */}
      {composeOpen && (
        <div className="compose-overlay" onClick={closeCompose}>
          <div className="compose-modal" onClick={e => e.stopPropagation()}>
            <header className="compose-modal-head">
              <span className="compose-modal-pill" />
              <h3>Criar publicação</h3>
              <button className="compose-modal-x" onClick={closeCompose}><CloseIcon /></button>
            </header>

            <div className="compose-modal-body">
              <div className="compose-row">
                <div className="compose-avatar-box">
                  <img src={Images.PhotoCard} alt="Você" className="compose-av" />
                  <span className="compose-dot" />
                </div>
                <textarea
                  ref={textareaRef}
                  value={postText}
                  onChange={e => setPostText(e.target.value)}
                  placeholder="No que você está trabalhando?"
                  className="compose-area"
                  rows={1}
                  autoFocus
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="compose-previews">
                  {selectedFiles.map((f, i) => (
                    <div key={i} className="compose-thumb">
                      {f.type.startsWith("image/")
                        ? <img src={URL.createObjectURL(f)} alt="" />
                        : <video src={URL.createObjectURL(f)} muted />}
                      <button onClick={() => setSelectedFiles(selectedFiles.filter((_,idx) => idx !== i))} className="compose-thumb-remove"><CloseIcon /></button>
                    </div>
                  ))}
                </div>
              )}

              {alertMsg && <div className="compose-inline-alert">{alertMsg}</div>}
            </div>

            <footer className="compose-footer">
              <div className="compose-tools">
                <label className="compose-tool-btn">
                  <input type="file" accept="image/*" onChange={e => handleFileChange(e,"image")} style={{display:"none"}} />
                  <PhotoIcon /><span>Foto</span>
                </label>
                <label className="compose-tool-btn">
                  <input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo" onChange={e => handleFileChange(e,"video")} style={{display:"none"}} />
                  <VideoIcon /><span>Vídeo</span>
                </label>
                <button className="compose-tool-btn">
                  <IdeaIcon /><span>Ideia</span>
                </button>
              </div>
              <button className={`compose-post-btn ${hasContent ? "compose-post-btn--active" : ""}`} onClick={handlePublish} disabled={!hasContent}>
                Publicar
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}