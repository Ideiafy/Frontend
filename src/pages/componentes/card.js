import React, { useState, useRef, useEffect } from "react";
import "../../styles/card.css";
import { useNavigate } from "react-router-dom";
import Images from "./../../assets/images";
import { ChevronLeft, ChevronRight, X, UserCheck, UserPlus, Bookmark, Share2 } from "lucide-react";

export default function Card({ showFollowButton = false, additionalPosts = [] }) {
  const [liked,    setLiked]    = useState(new Set());
  const [saved,    setSaved]    = useState(new Set());
  const [commentModal, setCM]   = useState({ open: false, id: null });
  const [comments, setComments] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [following, setFollowing] = useState(false);
  const [toast, setToast]       = useState(null);
  const navigate = useNavigate();

  const goProfile  = () => navigate("/UserConta");
  const togFollow  = () => setFollowing(p => !p);
  const openCM     = (id) => setCM({ open: true,  id });
  const closeCM    = ()   => setCM({ open: false, id: null });

  const userData = {
    name: "Lucas Alves", username: "@lucasalves",
    avatar: Images.PhotoCard || "/default-avatar.jpg",
    isOnline: true, role: "Full Stack Dev",
  };

  const posts = [
    { id: 1, author: userData,
      content: "Acabei de finalizar um projeto incrível usando React e Node.js! A sensação de ver tudo funcionando perfeitamente é indescritível 🚀",
      media: [{ type:"image", url: Images.DeskCard||Images.PhotoCard, alt:"Projeto" }],
      likes: 45, comments: 12, time: "2h", tag: "Projeto" },
    { id: 2, author: userData,
      content: "Compartilhando algumas dicas de UI/UX que aprendi essa semana. Design é muito mais do que fazer algo bonito — é sobre criar experiências memoráveis.",
      media: [
        { type:"image", url: Images.Banner2||Images.PhotoCard, alt:"UI/UX" },
        { type:"image", url: Images.Banner1||Images.PhotoCard, alt:"Design" },
      ],
      likes: 78, comments: 23, time: "1d", tag: "Design" },
    { id: 3, author: userData,
      content: "Hoje foi dia de contribuir com open source! Nada melhor do que retribuir para a comunidade que tanto me ensinou. Se você ainda não contribuiu, começa hoje! ✨",
      media: [], likes: 32, comments: 8, time: "3d", tag: "Open Source" },
  ];

  const all = [...additionalPosts, ...posts];

  const toggleLike  = (id) => setLiked(p  => { const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });
  const toggleSave  = (id) => setSaved(p  => { const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });
  const share = (id) => { setToast(id); setTimeout(()=>setToast(null),1800); };

  /* ── Galeria ─────────────────────────────────────────────── */
  const Gallery = ({ media }) => {
    const [idx, setIdx] = useState(0);
    const [ts,  setTs]  = useState(null);
    const [te,  setTe]  = useState(null);
    if (!media?.length) return null;

    const next = () => setIdx(p => (p+1)%media.length);
    const prev = () => setIdx(p => (p-1+media.length)%media.length);
    const onTS = e => { setTe(null); setTs(e.targetTouches[0].clientX); };
    const onTM = e => setTe(e.targetTouches[0].clientX);
    const onTE = () => {
      if (!ts||!te) return;
      const d = ts - te;
      if (d >  50 && media.length>1) next();
      if (d < -50 && media.length>1) prev();
    };

    const cur = media[idx];
    return (
      <div className="gallery" onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}>
        <div className="gallery-stage" onClick={() => setLightbox({ media, idx })}>
          {cur.type==="image"
            ? <img src={cur.url} alt={cur.alt} className="gallery-img" draggable={false}/>
            : <video src={cur.url} className="gallery-img" controls onClick={e=>e.stopPropagation()} onTouchStart={e=>e.stopPropagation()}/>
          }
          {media.length>1 && <span className="gallery-badge">{idx+1}/{media.length}</span>}
        </div>
        {media.length>1 && (
          <>
            <button className="gallery-nav gallery-nav--prev" onClick={prev}><ChevronLeft size={16}/></button>
            <button className="gallery-nav gallery-nav--next" onClick={next}><ChevronRight size={16}/></button>
            <div className="gallery-dots">
              {media.map((_,i) => <span key={i} className={`gallery-dot${i===idx?" gallery-dot--on":""}`} onClick={()=>setIdx(i)}/>)}
            </div>
          </>
        )}
      </div>
    );
  };

  /* ── Lightbox ────────────────────────────────────────────── */
  const Lightbox = () => {
    const [idx, setIdx] = useState(lightbox?.idx||0);
    useEffect(() => {
      const h = e => { if(e.key==="Escape") setLightbox(null); };
      window.addEventListener("keydown",h);
      return ()=>window.removeEventListener("keydown",h);
    },[]);
    if (!lightbox) return null;
    const { media } = lightbox;
    const cur = media[idx];
    const next = () => setIdx(p=>(p+1)%media.length);
    const prev = () => setIdx(p=>(p-1+media.length)%media.length);
    return (
      <div className="lb-overlay" onClick={()=>setLightbox(null)}>
        <div className="lb-box" onClick={e=>e.stopPropagation()}>
          <button className="lb-close" onClick={()=>setLightbox(null)}><X size={16}/></button>
          {cur.type==="image"
            ? <img src={cur.url} alt={cur.alt} className="lb-media" draggable={false}/>
            : <video src={cur.url} className="lb-media" controls/>}
          {media.length>1 && <>
            <button className="lb-nav lb-nav--prev" onClick={prev}><ChevronLeft size={18}/></button>
            <button className="lb-nav lb-nav--next" onClick={next}><ChevronRight size={18}/></button>
            <div className="lb-dots">
              {media.map((_,i)=><span key={i} className={`lb-dot${i===idx?" lb-dot--on":""}`} onClick={()=>setIdx(i)}/>)}
            </div>
          </>}
        </div>
      </div>
    );
  };

  /* ── Modal comentários ───────────────────────────────────── */
  const CModal = () => {
    const [txt, setTxt] = useState("");
    const ref = useRef(null);
    const { open, id } = commentModal;

    useEffect(()=>{ if(open){ setTxt(""); setTimeout(()=>ref.current?.focus(),60); } },[open]);
    if(!open) return null;

    const post     = all.find(p=>p.id===id);
    const list     = comments[id]||[];
    const addCmt   = () => {
      const t = txt.trim(); if(!t) return;
      setComments(p=>({...p,[id]:[...(p[id]||[]),{id:Date.now(),text:t,author:"Você",avatar:Images.PhotoCard,time:"agora"}]}));
      setTxt(""); ref.current?.focus();
    };

    return (
      <div className="cmodal-overlay" onClick={closeCM}>
        <div className="cmodal" onClick={e=>e.stopPropagation()} onPointerDown={e=>e.stopPropagation()}>
          <div className="cmodal-header">
            <span className="cmodal-pill"/>
            <h3>Comentários</h3>
            <button className="cmodal-x" onClick={closeCM}><X size={15}/></button>
          </div>

          {/* Post resumido */}
          <div className="cmodal-origin">
            <img src={post?.author.avatar} alt="" className="cmodal-origin-av"/>
            <div>
              <span className="cmodal-origin-name">{post?.author.name}</span>
              <p className="cmodal-origin-txt">{post?.content}</p>
            </div>
          </div>

          {/* Lista */}
          <div className="cmodal-list">
            {list.length===0
              ? <p className="cmodal-empty">Nenhum comentário ainda. Começa você! 💬</p>
              : list.map(c=>(
                  <div key={c.id} className="cmt-item">
                    <img src={c.avatar} alt={c.author} className="cmt-av"/>
                    <div className="cmt-bubble">
                      <div className="cmt-meta">
                        <span className="cmt-author">{c.author}</span>
                        <span className="cmt-time">{c.time}</span>
                      </div>
                      <p className="cmt-txt">{c.text}</p>
                    </div>
                  </div>
                ))
            }
          </div>

          {/* Input */}
          <div className="cmodal-input-row">
            <img src={Images.PhotoCard} alt="Você" className="cmodal-input-av"/>
            <div className="cmodal-input-shell">
              <textarea
                ref={ref} value={txt}
                onChange={e=>setTxt(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); addCmt(); } }}
                placeholder="Escreva um comentário..."
                className="cmodal-textarea"
                rows={1}
              />
              <button className="cmodal-send" onClick={addCmt} disabled={!txt.trim()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <>
      {all.map(post => {
        const isLiked  = liked.has(post.id);
        const isSaved  = saved.has(post.id);
        const cCount   = (comments[post.id]||[]).length || post.comments;

        return (
          <article key={post.id} className="pcard fade-in">
            {/* Header */}
            <div className="pcard-header">
              <div className="pcard-av-wrap" onClick={goProfile}>
                <img src={post.author.avatar} alt={post.author.name} className="pcard-av"/>
                {post.author.isOnline && <span className="pcard-dot"/>}
              </div>
              <div className="pcard-author" onClick={goProfile}>
                <div className="pcard-author-top">
                  <span className="pcard-name">{post.author.name}</span>
                  {post.tag && <span className="pcard-tag">{post.tag}</span>}
                </div>
                <div className="pcard-sub">
                  <span>{post.author.username}</span>
                  <span className="pcard-sep">·</span>
                  <span>{post.time}</span>
                </div>
              </div>
              {showFollowButton && (
                <button className={`pcard-follow ${following?"pcard-follow--on":""}`} onClick={togFollow}>
                  {following ? <UserCheck size={13}/> : <UserPlus size={13}/>}
                  <span>{following?"Seguindo":"Seguir"}</span>
                </button>
              )}
            </div>

            {/* Texto */}
            <p className="pcard-text">{post.content}</p>

            {/* Galeria */}
            <Gallery media={post.media}/>

            {/* Ações */}
            <div className="pcard-actions">
              <div className="pcard-actions-l">
                {/* Curtir */}
                <button className={`pcard-btn like-btn${isLiked?" like-btn--on":""}`} onClick={()=>toggleLike(post.id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24"
                    fill={isLiked?"currentColor":"none"}
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{post.likes+(isLiked?1:0)}</span>
                </button>

                {/* Comentar */}
                <button className="pcard-btn" onClick={()=>openCM(post.id)}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{cCount}</span>
                </button>

                {/* Compartilhar */}
                <button className={`pcard-btn share-btn${toast===post.id?" share-btn--on":""}`} onClick={()=>share(post.id)}>
                  <Share2 size={16}/>
                  {toast===post.id && <span className="share-toast">Copiado!</span>}
                </button>
              </div>

              {/* Salvar */}
              <button className={`pcard-btn save-btn${isSaved?" save-btn--on":""}`} onClick={()=>toggleSave(post.id)}>
                <Bookmark size={16} fill={isSaved?"currentColor":"none"}/>
              </button>
            </div>
          </article>
        );
      })}

      <Lightbox/>
      <CModal/>
    </>
  );
}