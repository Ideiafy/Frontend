import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Images from '../assets/images';
import '../styles/inicio.css';

// ── Ícones ──────────────────────────────────────────────────────────────────
const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
    </svg>
);

const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

// ── Dados das features ───────────────────────────────────────────────────────
const features = [
    {
        step: "01",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 00-4 12.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A7 7 0 0012 2z" />
                <path d="M9 21h6M10 18h4" />
            </svg>
        ),
        titulo: "Publique sua ideia",
        texto: "Descreva seu projeto em texto, imagens ou protótipos. Defina o que você já tem, o que precisa e quem está buscando para colaborar.",
        tag: "Para criadores",
        detalhe: "Sem barreiras técnicas — qualquer pessoa pode publicar.",
    },
    {
        step: "02",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="4" />
                <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
                <path d="M16 3.13a4 4 0 010 7.75M22 21v-2a4 4 0 00-3-3.87" />
            </svg>
        ),
        titulo: "Encontre colaboradores",
        texto: "A comunidade vê, apoia e propõe colaboração. Você escolhe quem entra no projeto e define como as contribuições são feitas.",
        tag: "Para colaboradores",
        detalhe: "Filtre por área, habilidade ou tipo de contribuição.",
    },
    {
        step: "03",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10M18 20V4M6 20v-4" />
            </svg>
        ),
        titulo: "Itere e cresça",
        texto: "Receba feedback direto da comunidade, refine sua ideia e acompanhe o crescimento do projeto com métricas simples e claras.",
        tag: "Para todos",
        detalhe: "Do rascunho ao lançamento, tudo em um lugar.",
    },
];

// ── Textos rotativos do hero ─────────────────────────────────────────────────
const textos = [
    "No ideiafy, suas ideias encontram o espaço perfeito para crescer.",
    "Conecte-se com pessoas que podem colaborar, apoiar e transformar seu projeto em realidade.",
    "Transforme inspiração em ação: compartilhe, colabore e inove com o ideiafy.",
    "Junte-se à comunidade ideiafy e descubra o poder de criar junto."
];

// ── Componente principal ─────────────────────────────────────────────────────
export default function Inicio() {
    const [tema, setTema] = useState("escuro");
    const [scrolled, setScrolled] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const textIntervalRef = useRef(null);
    const navigate = useNavigate();

    const toggleTema = () => setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));

    const resetTextInterval = useCallback(() => {
        if (textIntervalRef.current) clearInterval(textIntervalRef.current);
        textIntervalRef.current = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % textos.length);
        }, 6000);
    }, []);

    useEffect(() => {
        resetTextInterval();
        return () => clearInterval(textIntervalRef.current);
    }, [resetTextInterval]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleContinuar = () => navigate("/login");
    const handleExplorar  = () => navigate("/login");

    const temaClass = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

    return (
        <div id="Inicio" className={temaClass}>

            {/* ── Fundo decorativo ─────────────────────────────── */}
            <div className="bg-decor" aria-hidden="true">
                <div className="grid-overlay" />
            </div>

            {/* ── Navbar ───────────────────────────────────────── */}
            <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
                <div className="navbar-content">
                    <div className="nav-logo">
                        <img src={Images.Logo} alt="Logo Ideiafy" className="nav-logo-img" />
                        <span className="nav-logo-text">
                            <span className={tema === "escuro" ? "claro-color" : "escuro-color"}>Ideia</span>
                            <span className="fy">fy</span>
                        </span>
                    </div>

                    <nav className="nav-links" aria-label="Menu principal">
                        <a href="#sobre"         className="nav-link">Sobre</a>
                        <a href="#como-funciona" className="nav-link">Como funciona</a>
                        <a href="#comunidade"    className="nav-link">Comunidade</a>
                    </nav>

                    <div className="nav-actions">
                        <button
                            className="temaIcon"
                            onClick={toggleTema}
                            aria-label={tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro"}
                        >
                            {tema === "escuro" ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <button onClick={handleContinuar} className="button btn-primary nav-cta">
                            Entrar
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="hero">
                <div className="hero-content fade-in">
                    <div className="hero-badge">
                        <span className="badge-dot" aria-hidden="true" />
                        Novo: comunidade aberta para colaborações
                    </div>

                    <h1 className="hero-title">
                        Onde boas ideias
                        <br />
                        encontram <span className="gradient-text">as pessoas certas</span>
                    </h1>

                    <div className="hero-subtitle" aria-live="polite">
                        {textos.map((texto, index) => (
                            <p
                                key={index}
                                className={`texto-slide ${index === currentTextIndex ? "ativo" : ""}`}
                            >
                                {texto}
                            </p>
                        ))}
                    </div>

                    <div className="hero-actions">
                        <button onClick={handleContinuar} className="button btn-primary btn-lg">
                            Começar agora
                            <ArrowIcon />
                        </button>
                        <button onClick={handleExplorar} className="button btn-ghost btn-lg">
                            Explorar ideias
                        </button>
                    </div>
                </div>

                {/* Janela de código */}
                <div className="hero-visual fade-in">
                    <div className="window">
                        <div className="window-bar">
                            <span className="window-dot dot-red"   aria-hidden="true" />
                            <span className="window-dot dot-yellow" aria-hidden="true" />
                            <span className="window-dot dot-green"  aria-hidden="true" />
                            <span className="window-path">ideia.json</span>
                        </div>
                        <div className="window-body">
                            <pre><code>
<span className="code-key">{"{"}</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"titulo"</span><span className="code-punct">: </span><span className="code-string">"App de caronas universitárias"</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"autor"</span><span className="code-punct">: </span><span className="code-string">"@marina.dev"</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"tags"</span><span className="code-punct">: </span><span className="code-punct">[</span><span className="code-string">"mobilidade"</span><span className="code-punct">, </span><span className="code-string">"campus"</span><span className="code-punct">],</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"apoios"</span><span className="code-punct">: </span><span className="code-number">42</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"colaboradores"</span><span className="code-punct">: </span><span className="code-number">3</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"status"</span><span className="code-punct">: </span><span className="code-string">"em colaboração"</span>{"\n"}
<span className="code-key">{"}"}</span>
                            </code></pre>
                            <div className="window-cursor-line">
                                <span className="window-prompt">$</span>
                                <span className="typing-text">ideiafy publish --novo</span>
                                <span className="cursor-blink" aria-hidden="true">▌</span>
                            </div>
                        </div>
                    </div>
                    <div className="glow-ring" aria-hidden="true" />
                </div>
            </section>

            {/* ── Como funciona ────────────────────────────────── */}
            <section id="como-funciona" className="features">
                <div className="section-header">
                    <span className="section-eyebrow">Como funciona</span>
                    <h2 className="section-title">Do rascunho à colaboração em três etapas</h2>
                    <p className="section-desc">
                        O ideiafy foi construído para remover atrito entre ter uma ideia e encontrar as pessoas certas para realizá-la.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((f, i) => (
                        <div
                            className="feature-card"
                            key={i}
                            style={{ animationDelay: `${i * 0.12}s` }}
                        >
                            <div className="feature-card-top">
                                <div className="feature-step">{f.step}</div>
                                <div className="feature-icon">{f.icon}</div>
                            </div>
                            <span className="feature-tag">{f.tag}</span>
                            <h3 className="feature-title">{f.titulo}</h3>
                            <p className="feature-text">{f.texto}</p>
                            <div className="feature-detalhe">
                                <span className="detalhe-dot" aria-hidden="true" />
                                {f.detalhe}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Barra de progresso visual */}
                <div className="features-footer">
                    <div className="progress-track">
                        <div className="progress-fill" />
                    </div>
                    <p className="features-footer-text">Cada etapa foi pensada para criadores de qualquer nível de experiência.</p>
                </div>
            </section>

            {/* ── CTA final ────────────────────────────────────── */}
            <section id="comunidade" className="cta-final">
                <div className="cta-card">
                    <div className="cta-glow" aria-hidden="true" />
                    <h2 className="cta-title">Sua próxima grande ideia começa aqui</h2>
                    <p className="cta-text">
                        Crie sua conta gratuitamente e faça parte de uma comunidade que transforma ideias em realidade.
                    </p>
                    <button onClick={handleContinuar} className="button btn-primary btn-lg">
                        Criar minha conta
                        <ArrowIcon />
                    </button>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────── */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className={tema === "escuro" ? "claro-color" : "escuro-color"}>Ideia</span>
                        <span className="fy">fy</span>
                    </div>
                    <p className="footer-text">© {new Date().getFullYear()} Ideiafy. Feito para quem cria.</p>
                </div>
            </footer>
        </div>
    );
}