import React, { useState, useEffect } from "react";
import "../../styles/mobileHeader.css";

// Componente MobileHeader reutilizável
export default function MobileHeader({
  tema,
  toggleTema,
  title = "Ideafy",
  showBackButton = false,
  onBackClick,
  rightContent,
  className = "",
  disableAutoHide = false
}) {
  
  // Ícones SVG
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

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  );
  const [hidden, setHidden] = useState(false);

useEffect(() => {
  if (disableAutoHide) return;

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (
      currentScrollY > lastScrollY + 15 &&
      currentScrollY > 100
    ) {
      setHidden(true);
    } else if (
      currentScrollY < lastScrollY - 15
    ) {
      setHidden(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [disableAutoHide]);

  return (
    <div className={`mobileHeader ${hidden ? "hidden" : ""} ${className}`}>
      <div className="mobileHeaderContent">
        
        {/* Lado Esquerdo - Logo ou Botão de Voltar */}
        <div className="mobileHeaderLeft">
          {showBackButton ? (
            <button 
              className="mobileBackButton" 
              onClick={onBackClick}
              aria-label="Voltar"
            >
              <BackIcon />
            </button>
          ) : (
            <div className="mobileLogo">
              <span className="mobileLogoText">
                {title.includes("fy") ? (
                  <>
                    {title.replace("fy", "")}<span className="mobileLogoBlue">fy</span>
                  </>
                ) : (
                  title
                )}
              </span>
            </div>
          )}
        </div>

        {/* Centro - Título quando há botão de voltar */}
        {showBackButton && (
          <div className="mobileHeaderCenter">
            <h1 className="mobileHeaderTitle">{title}</h1>
          </div>
        )}

        {/* Lado Direito - Conteúdo customizado ou botão de tema */}
        <div className="mobileHeaderRight">
          {rightContent || (
            <button
              className="mobileTemaIcon"
              onClick={toggleTema}
              aria-label="Alternar tema"
              title={tema === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro"}
            >
              {tema === "escuro" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}