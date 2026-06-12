import React, { useState, useRef, useEffect } from "react";
import Images from "../assets/images";
import "../styles/messages.css";
import Sidebar from "./componentes/sidebar";
import MobileHeader from "./componentes/mobileHeader";

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

const CONVERSATIONS = [
  {
    id: 1,
    name: "Ana Souza",
    avatar: Images.PhotoCard,
    lastMessage: "Adorei o seu último projeto! Como você fez aquela animação?",
    time: "agora",
    unread: 2,
    online: true,
    messages: [
      { id: 1, from: "them", text: "Oi! Vi seu post sobre React Hooks, ficou incrível!", time: "14:02" },
      { id: 2, from: "me",   text: "Valeu! Levei uns dias pra entender bem o useCallback.", time: "14:05" },
      { id: 3, from: "them", text: "Adorei o seu último projeto! Como você fez aquela animação?", time: "14:10" },
    ],
  },
  {
    id: 2,
    name: "Carlos Dev",
    avatar: Images.PhotoCard,
    lastMessage: "Manda o repositório quando puder 🙌",
    time: "5min",
    unread: 0,
    online: true,
    messages: [
      { id: 1, from: "me",   text: "Cara, tô finalizando o projeto de open source.", time: "ontem" },
      { id: 2, from: "them", text: "Que massa! Do que se trata?", time: "ontem" },
      { id: 3, from: "me",   text: "Uma lib de componentes com tema escuro nativo.", time: "ontem" },
      { id: 4, from: "them", text: "Manda o repositório quando puder 🙌", time: "ontem" },
    ],
  },
  {
    id: 3,
    name: "Julia UI",
    avatar: Images.PhotoCard,
    lastMessage: "Você viu o Figma que compartilhei?",
    time: "1h",
    unread: 1,
    online: false,
    messages: [
      { id: 1, from: "them", text: "Oi! Precisava de uma opinião sobre o design system.", time: "13:00" },
      { id: 2, from: "me",   text: "Claro, manda ver!", time: "13:02" },
      { id: 3, from: "them", text: "Você viu o Figma que compartilhei?", time: "13:45" },
    ],
  },
  {
    id: 4,
    name: "Pedro Back",
    avatar: Images.PhotoCard,
    lastMessage: "Resolvemos o bug de autenticação 🎉",
    time: "3h",
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: "them", text: "Aquele endpoint tá me dando trabalho...", time: "10:20" },
      { id: 2, from: "me",   text: "Qual o erro que aparece?", time: "10:22" },
      { id: 3, from: "them", text: "JWT expirando antes da hora.", time: "10:25" },
      { id: 4, from: "me",   text: "Verifica o `expiresIn` na config do servidor.", time: "10:27" },
      { id: 5, from: "them", text: "Resolvemos o bug de autenticação 🎉", time: "10:50" },
    ],
  },
  {
    id: 5,
    name: "Mariana Full",
    avatar: Images.PhotoCard,
    lastMessage: "Bora fazer um colab no projeto?",
    time: "ontem",
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: "them", text: "Vi que você domina Next.js!", time: "ontem" },
      { id: 2, from: "me",   text: "Uso bastante sim, especialmente o App Router.", time: "ontem" },
      { id: 3, from: "them", text: "Bora fazer um colab no projeto?", time: "ontem" },
    ],
  },
];

export default function Messages() {
  const [tema, setTema]               = useState("escuro");
  const [activeConv, setActiveConv]   = useState(null);
  const [search, setSearch]           = useState("");
  const [inputText, setInputText]     = useState("");
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [mobileView, setMobileView]   = useState("list"); // "list" | "chat"
  const messagesEndRef = useRef(null);

  const toggleTema = () => setTema(p => p === "escuro" ? "claro" : "escuro");
  const temaClass  = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv, conversations]);

  const openConv = (conv) => {
    setActiveConv(conv.id);
    setConversations(prev =>
      prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)
    );
    setMobileView("chat");
  };

  const goBackToList = () => {
    setMobileView("list");
    setActiveConv(null);
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeConv) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2,"0") + ":" + now.getMinutes().toString().padStart(2,"0");
    setConversations(prev =>
      prev.map(c => c.id === activeConv
        ? {
            ...c,
            lastMessage: inputText.trim(),
            time: "agora",
            messages: [...c.messages, { id: Date.now(), from: "me", text: inputText.trim(), time }],
          }
        : c
      )
    );
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const currentConv = conversations.find(c => c.id === activeConv);

  return (
    <div id="Messages" className={temaClass}>
      <MobileHeader
  tema={tema}
  toggleTema={toggleTema}
  title="Mensagens"
  disableAutoHide={true}
    className={mobileView === "chat" ? "msgs-mobile-header--hidden" : ""}
/>
      <Sidebar tema={tema} toggleTema={toggleTema} activeItem="messages" />

      <main className="msgs-main">
        <div className={`msgs-layout ${mobileView === "chat" ? "msgs-layout--chat-open" : ""}`}>

          {/* ── Painel esquerdo: lista de conversas ── */}
          <aside className="msgs-sidebar">
            <div className="msgs-sidebar-head">
              <h2 className="msgs-title">Mensagens</h2>
              <div className="msgs-search-wrap">
                <span className="msgs-search-icon"><SearchIcon /></span>
                <input
                  type="text"
                  className="msgs-search"
                  placeholder="Buscar conversa..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            <ul className="msgs-conv-list">
              {filtered.length === 0 && (
                <li className="msgs-empty">Nenhuma conversa encontrada.</li>
              )}
              {filtered.map(conv => (
                <li
                  key={conv.id}
                  className={`msgs-conv-item ${activeConv === conv.id ? "msgs-conv-item--active" : ""}`}
                  onClick={() => openConv(conv)}
                >
                  <div className="msgs-conv-av-wrap">
                    <img src={conv.avatar} alt={conv.name} className="msgs-conv-av" />
                    {conv.online && <span className="msgs-online-dot" />}
                  </div>
                  <div className="msgs-conv-info">
                    <div className="msgs-conv-top">
                      <span className="msgs-conv-name">{conv.name}</span>
                      <span className="msgs-conv-time">{conv.time}</span>
                    </div>
                    <div className="msgs-conv-bottom">
                      <span className="msgs-conv-preview">{conv.lastMessage}</span>
                      {conv.unread > 0 && (
                        <span className="msgs-conv-badge">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Painel direito: janela de chat ── */}
          <section className="msgs-chat">
            {!currentConv ? (
              <div className="msgs-chat-empty">
                <div className="msgs-chat-empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <p className="msgs-chat-empty-text">Selecione uma conversa para começar</p>
              </div>
            ) : (
              <>
                {/* Header do chat */}
                <header className="msgs-chat-header">
                  <button className="msgs-back-btn" onClick={goBackToList} aria-label="Voltar">
                    <ArrowLeftIcon />
                  </button>
                  <div className="msgs-chat-av-wrap">
                    <img src={currentConv.avatar} alt={currentConv.name} className="msgs-chat-av" />
                    {currentConv.online && <span className="msgs-online-dot msgs-online-dot--sm" />}
                  </div>
                  <div className="msgs-chat-info">
                    <span className="msgs-chat-name">{currentConv.name}</span>
                    <span className="msgs-chat-status">
                      {currentConv.online ? "Online agora" : "Offline"}
                    </span>
                  </div>
                  <button className="msgs-more-btn" aria-label="Mais opções">
                    <MoreIcon />
                  </button>
                </header>

                {/* Mensagens */}
                <div className="msgs-bubbles">
                  {currentConv.messages.map((msg, idx) => {
                    const isMe = msg.from === "me";
                    const prevMsg = currentConv.messages[idx - 1];
                    const grouped = prevMsg && prevMsg.from === msg.from;
                    return (
                      <div
                        key={msg.id}
                        className={`msgs-bubble-row ${isMe ? "msgs-bubble-row--me" : ""} ${grouped ? "msgs-bubble-row--grouped" : ""}`}
                      >
                        {!isMe && !grouped && (
                          <img src={currentConv.avatar} alt={currentConv.name} className="msgs-bubble-av" />
                        )}
                        {!isMe && grouped && <span className="msgs-bubble-av-spacer" />}
                        <div className={`msgs-bubble ${isMe ? "msgs-bubble--me" : "msgs-bubble--them"}`}>
                          <span className="msgs-bubble-text">{msg.text}</span>
                          <span className="msgs-bubble-time">{msg.time}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input de mensagem */}
                <footer className="msgs-input-bar">
                  <textarea
                    className="msgs-input"
                    placeholder="Escreva uma mensagem..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                  <button
                    className={`msgs-send-btn ${inputText.trim() ? "msgs-send-btn--active" : ""}`}
                    onClick={sendMessage}
                    disabled={!inputText.trim()}
                    aria-label="Enviar mensagem"
                  >
                    <SendIcon />
                  </button>
                </footer>
              </>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}