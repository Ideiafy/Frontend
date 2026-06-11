import React, { useState, useRef, useEffect } from "react";
import Images from "../assets/images";
import "../styles/feed.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";
import Card from "./componentes/card";
import { useNavigate } from "react-router-dom";

export default function Feed({ userId = 1 }) {
  const [tema, setTema] = useState("escuro");
  const [postText, setPostText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const textareaRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [feedPosts, setFeedPosts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showTextAlert, setShowTextAlert] = useState(false);

  const navigate = useNavigate();



 
 




  const toggleTema = () => {
    setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));
  };

  const handleNavigation = (item) => {
    setActiveNavItem(item);
  };


  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [postText]);

  const HeartIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const VideoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  );

  const PhotoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );

  const CommentIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );


  async function handlePublishPost() {
    console.log("Post criado:", postText);
    console.log("Arquivo:", selectedFiles);

    setPostText("");
    setSelectedFiles([]);
  };

  return (
    <div
      id="Feed"
      className={tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege"}
    >
      {/* Header Mobile */}
      <MobileHeader tema={tema} toggleTema={toggleTema} title="Ideafy" />

      {/* Sidebar */}
      <Sidebar
        tema={tema}
        toggleTema={toggleTema}
        activeItem={activeNavItem}
        onNavigate={handleNavigation}
      />

      <div className="create-post-container">

        <div className="create-post-card">
          {/* Header do post */}
          <div className="create-post-header">
            <img
             
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">Gustavo</span>
              <span className="visibility-text">Público</span>
            </div>
          </div>


          {/* Área de texto */}
          <div className="create-post-content">
            <textarea
              ref={textareaRef}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="No que você está pensando?"
              className="post-textarea"
              rows="1"
            />
          </div>

          {/* Preview de arquivos selecionados */}
          {selectedFiles.length > 0 && (
            <div className="media-preview">
              {selectedFiles.map((file, index) => (
                <div key={index} className="media-preview-item">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="preview-image"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="preview-image"
                      controls
                      muted
                    />
                  )}
                  <button
                    onClick={() => {
                      const newFiles = selectedFiles.filter((_, i) => i !== index);
                      setSelectedFiles(newFiles);
                    }}
                    className="remove-media-btn"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Barra de ações */}
          <div className="create-post-actions">
            <div className="media-options">
              <label className="media-option">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);

                    if (selectedFiles.length > 0 || files.length > 1) {
                      setShowAlert(true);
                      e.target.value = '';
                      return;
                    }

                    setSelectedFiles(files); // Remove o prev => [...prev, ...files]
                  }}
                  style={{ display: 'none' }}
                />
                <PhotoIcon />
                <span>Foto</span>
              </label>

              <label className="media-option">
                <input
                  type="file"
                  multiple
                  accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);

                    if (selectedFiles.length > 0 || files.length > 1) {
                      setShowAlert(true);
                      e.target.value = '';
                      return;
                    }

                    const supportedFiles = files.filter(file =>
                      file.type.startsWith('video/') &&
                      ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'].includes(file.type)
                    );

                    if (supportedFiles.length !== files.length) {
                      alert('Alguns arquivos não são suportados. Use MP4, WebM ou OGG.');
                    }

                    setSelectedFiles(supportedFiles);
                  }}
                  style={{ display: 'none' }}
                />
                <VideoIcon />
                <span>Vídeo</span>
              </label>
            </div>

            <button
              className={`post-button ${postText.trim() || selectedFiles.length > 0 ? 'active' : 'disabled'}`}
              onClick={handlePublishPost}
            >
              Publicar
            </button>
          </div>
        </div>
        {/* Alerta de limite de mídia */}
        {showAlert && (
          <div className="modern-alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="modern-alert-container" onClick={(e) => e.stopPropagation()}>
              <div className="modern-alert-content">
                <div className="alert-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="rgba(107, 123, 196, 0.1)" stroke="rgba(107, 123, 196, 1)" strokeWidth="2" />
                    <line x1="12" y1="16" x2="12" y2="12" stroke="rgba(107, 123, 196, 1)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="8" r="1" fill="rgba(107, 123, 196, 1)" />
                  </svg>
                </div>
                <div className="alert-text">
                  <h3>Limite de mídia atingido</h3>
                  <p>Por enquanto, você pode adicionar apenas 1 arquivo de mídia por post. Estamos trabalhando para melhorar essa funcionalidade!</p>
                </div>
                <button className="alert-close-btn" onClick={() => setShowAlert(false)}>
                  <CloseIcon />
                </button>
              </div>
              <div className="alert-progress-bar"></div>
            </div>
          </div>
        )}
        {/* Alerta de texto obrigatório */}
        {showTextAlert && (
          <div className="modern-alert-overlay" onClick={() => setShowTextAlert(false)}>
            <div className="modern-alert-container" onClick={(e) => e.stopPropagation()}>
              <div className="modern-alert-content">
                <div className="alert-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 1)" strokeWidth="2" />
                    <line x1="12" y1="16" x2="12" y2="12" stroke="rgba(239, 68, 68, 1)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="8" r="1" fill="rgba(239, 68, 68, 1)" />
                  </svg>
                </div>
                <div className="alert-text">
                  <h3>Texto obrigatório</h3>
                  <p>Você precisa escrever algo no seu post! Conte-nos o que você está pensando.</p>
                </div>
                <button className="alert-close-btn" onClick={() => setShowTextAlert(false)}>
                  <CloseIcon />
                </button>
              </div>
              <div className="alert-progress-bar-red"></div>
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <main className="mainContent">

        {/* Feed de posts */}

        <Card />
      </main>

    </div>
  );
}