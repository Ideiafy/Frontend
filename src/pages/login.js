import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../assets/images";
import "../styles/login.css";

export default function Login() {
  const [tema, setTema] = useState("escuro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const navigate = useNavigate();

  const toggleTema = () => setTema((prev) => (prev === "escuro" ? "claro" : "escuro"));

  const showAlertMessage = (message, type = "error", duration = 4000) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlertMessage("Por favor, preencha todos os campos.", "warning");
      return;
    }
    if (!email.includes("@")) {
      showAlertMessage("Por favor, insira um email válido.", "error");
      return;
    }

    try {
      console.log("Login attempt:", { email, password });

      if (email !== "admin@teste.com" || password !== "123456") {
        throw new Error("Email ou senha incorretos");
      }

      showAlertMessage("Login realizado com sucesso! Redirecionando...", "success", 2000);
      setTimeout(() => navigate("/feed"), 2000);
    } catch (error) {
      showAlertMessage(error.message || "Erro ao fazer login. Tente novamente.", "error");
    }
  };

  const handleSocialLogin = (provider) => {
    // console.log(`Login with ${provider}`);
  };

  const handleGoBack = () => navigate("/");
  const handleGoToRegister = () => navigate("/cadastro");

  // ── Ícones ──────────────────────────────────────────────────────────────
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

  const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );

  const AlertMessage = () => (
    <div className={`alertOverlay ${showAlert ? "show" : ""}`}>
      <div className={`alertMessage ${alertType}`}>
        <div className="alertIcon">
          {alertType === "error" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {alertType === "success" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
          )}
          {alertType === "warning" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
        </div>
        <span className="alertText">{alertMessage}</span>
        <button className="alertClose" onClick={() => setShowAlert(false)} aria-label="Fechar alerta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );

  const temaClass = tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege";

  return (
    <div id="Login" className={temaClass}>
      <AlertMessage />

      {/* Fundo decorativo */}
      <div className="bg-decor" aria-hidden="true">
        <div className="grid-overlay" />
      </div>

      {/* Topbar */}
      <header className="auth-topbar">
        <button onClick={handleGoBack} className="button btn-ghost auth-back" aria-label="Voltar para página inicial">
          <ArrowLeftIcon />
          <span>Voltar</span>
        </button>

        <div className="auth-logo">
          <img src={Images.Logo} alt="Logo Ideiafy" className="auth-logo-img" />
          <span className="auth-logo-text">
            <span className={tema === "escuro" ? "claro-color" : "escuro-color"}>Ideia</span>
            <span className="fy">fy</span>
          </span>
        </div>

        <button
          className="temaIcon"
          onClick={toggleTema}
          aria-label={tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro"}
          title={tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
          {tema === "escuro" ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* Conteúdo */}
      <div className="auth-wrapper">
        {/* Form */}
        <div className="auth-content fade-in">
          <div className="auth-badge">
            <span className="badge-dot" aria-hidden="true" />
            Bem-vindo de volta
          </div>

          <h1 className="auth-title">
            Entre na sua <span className="gradient-text">conta</span>
          </h1>
          <p className="auth-subtitle">
            Suas ideias têm o poder de transformar o mundo. Acesse e continue construindo.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="email" className="inputLabel">Email</label>
              <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teste@gmail.com"
                  className="loginInput"
                  required
                />
              </div>
            </div>

            <div className="inputGroup">
              <label htmlFor="password" className="inputLabel">Senha</label>
              <div className="inputWrapper">
                <svg className="inputIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="loginInput"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="passwordToggle"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button type="submit" className="button btn-primary btn-lg auth-submit">
              Entrar
            </button>

            <div className="divider">
              <span className="dividerText">ou continue com</span>
            </div>

            <div className="socialButtons">
              <button type="button" onClick={() => handleSocialLogin("google")} className="socialButton" aria-label="Entrar com Google">
                <GoogleIcon />
              </button>
              <button type="button" onClick={() => handleSocialLogin("linkedin")} className="socialButton" aria-label="Entrar com LinkedIn">
                <LinkedInIcon />
              </button>
              <button type="button" onClick={() => handleSocialLogin("github")} className="socialButton githubButton" aria-label="Entrar com GitHub">
                <GitHubIcon />
              </button>
            </div>

            <div className="registerLink">
              <p className="registerText">
                Não tem uma conta?
                <button type="button" onClick={handleGoToRegister} className="registerButton">
                  Cadastre-se aqui
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Visual */}
        <div className="auth-visual fade-in">
          <div className="window">
            <div className="window-bar">
              <span className="window-dot dot-red" aria-hidden="true" />
              <span className="window-dot dot-yellow" aria-hidden="true" />
              <span className="window-dot dot-green" aria-hidden="true" />
              <span className="window-path">sessao.json</span>
            </div>
            <div className="window-body">
              <pre><code>
<span className="code-key">{"{"}</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"usuario"</span><span className="code-punct">: </span><span className="code-string">"@marina.dev"</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"projetos_ativos"</span><span className="code-punct">: </span><span className="code-number">3</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"colaboracoes"</span><span className="code-punct">: </span><span className="code-number">12</span><span className="code-punct">,</span>{"\n"}
<span className="code-indent">  </span><span className="code-prop">"status"</span><span className="code-punct">: </span><span className="code-string">"online"</span>{"\n"}
<span className="code-key">{"}"}</span>
              </code></pre>
              <div className="window-cursor-line">
                <span className="window-prompt">$</span>
                <span className="typing-text">ideiafy login --continuar</span>
                <span className="cursor-blink" aria-hidden="true">▌</span>
              </div>
            </div>
          </div>

          <div className="auth-feature-card">
            <div className="auth-feature-top">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
                  <path d="M16 3.13a4 4 0 010 7.75M22 21v-2a4 4 0 00-3-3.87" />
                </svg>
              </div>
              <span className="feature-tag">Comunidade ativa</span>
            </div>
            <p className="auth-feature-text">
              Mais de uma centena de criadores trocando ideias, feedbacks e colaborações todos os dias.
            </p>
          </div>

          <div className="glow-ring" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}