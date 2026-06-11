import React, { useState} from "react";
import Sidebar from "./componentes/sidebar";
import Images from '../assets/images';
import { useNavigate } from "react-router-dom";
import "../styles/configuracoes.css";
import MobileHeader from "./componentes/mobileHeader";


export default function MinhaContaPage() {
  const [tema, setTema] = useState("escuro");

  const [activeTab, setActiveTab] = useState("pessoais");
  const [avatarPreview, setAvatarPreview] = useState({
  isOpen: false,
  imageUrl: null,
  file: null
});
const [confirmationModal, setConfirmationModal] = useState({
  isOpen: false,
  type: '', // 'logout', 'deactivate', 'delete'
  title: '',
  message: '',
  confirmText: '',
  onConfirm: null
});
  const navigate = useNavigate();

  // Estados do usuário
  const [userProfile, setUserProfile] = useState({
    name: "Lucas Alves",
    email: "lucas@exemplo.com",
    username: "lucasalves",
    bio: "Designer e desenvolvedor apaixonado por criar experiências incríveis.",
    joinDate: "Janeiro 2024",
    avatar:
  localStorage.getItem("userAvatar") ||
  Images.PhotoCard ||
  "/default-avatar.jpg",
  });

const [user] = useState({
  name: "Lucas Alves",
  username: "lucasalves",
  avatar: Images.PhotoCard
});
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    username: userProfile.username,
    bio: userProfile.bio,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

    // async function fetchUserData(token)
    // {
    //   const response = await logged(token)
    //   setUser(response.data)
    // }

    //   useEffect(() => {
    //     const token = findToken()

    //     if(!token)
    //     {
    //       navigate('/login');
    //     }
    //     fetchUserData(token)
    //   },[])



  const toggleTema = () => {
    setTema(prev => prev === "escuro" ? "claro" : "escuro");
  };



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione apenas arquivos de imagem (JPG, PNG, GIF, WEBP)');
      return;
    }
    
    // Validar tamanho do arquivo (5MB máximo)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      alert('O arquivo deve ter no máximo 5MB');
      return;
    }
    
    // Criar preview da imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview({
        isOpen: true,
        imageUrl: e.target.result,
        file: file
      });
    };
    
    reader.onerror = () => {
      alert('Erro ao carregar a imagem');
    };
    
    reader.readAsDataURL(file);
  }
  
  // Limpar o input para permitir selecionar a mesma imagem novamente
  event.target.value = '';
};


//   async function handleLogout () {
//   if (window.confirm("Tem certeza que deseja sair da sua conta?")) {
//     // Aqui você implementa a lógica de logout
//     const token = findToken();
//     const response = await logout(token);

//     if(response.status == 200)
//     {
//       console.log("Logout realizado");
//       localStorage.clear();
//       return navigate('/login');
//     }
    
    
//     // Exemplo: limpar localStorage, redirecionar, etc.
//   }
// };

const handleLogout = () => {
  setConfirmationModal({
    isOpen: true,
    type: 'logout',
    title: 'Sair da Conta',
    message: 'Tem certeza que deseja sair da sua conta?',
    confirmText: 'Sair',
    onConfirm: () => {
      console.log("Logout realizado");
      localStorage.clear();
      navigate('/login');

      setConfirmationModal({
        isOpen: false,
        type: '',
        title: '',
        message: '',
        confirmText: '',
        onConfirm: null
      });
    }
  });
};

const handleSaveProfile = () => {
  setUserProfile(prev => ({
    ...prev,
    name: formData.name,
    username: formData.username,
    bio: formData.bio
    // Remover: location: formData.location
  }));
  console.log("Profile saved:", formData);
};

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Senhas não coincidem");
      return;
    }
    console.log("Password changed");
  };

const confirmAvatarChange = () => {
  localStorage.setItem(
    "userAvatar",
    avatarPreview.imageUrl
  );

  setUserProfile(prev => ({
    ...prev,
    avatar: avatarPreview.imageUrl
  }));

  setAvatarPreview({
    isOpen: false,
    imageUrl: null,
    file: null
  });
};
const cancelAvatarChange = () => {
  setAvatarPreview({
    isOpen: false,
    imageUrl: null,
    file: null
  });
};

const handleDeactivateAccount = () => {
  setConfirmationModal({
    isOpen: true,
    type: 'deactivate',
    title: 'Desativar Conta',
    message: 'Sua conta será temporariamente desativada. Você poderá reativá-la fazendo login novamente. Tem certeza que deseja continuar?',
    confirmText: 'Desativar',
    onConfirm: async () => {
      try {
        // Aqui você implementaria a lógica de desativação
        console.log("Conta desativada");
        // const response = await deactivateAccount(token);
        alert("Conta desativada com sucesso!");
      } catch (error) {
        console.error("Erro ao desativar conta:", error);
        alert("Erro ao desativar conta. Tente novamente.");
      } finally {
        setConfirmationModal({ isOpen: false, type: '', title: '', message: '', confirmText: '', onConfirm: null });
      }
    }
  });
};

const handleDeleteAccount = () => {
  setConfirmationModal({
    isOpen: true,
    type: 'delete',
    title: 'Excluir Conta',
    message: 'ATENÇÃO: Esta ação é irreversível! Todos os seus dados serão permanentemente removidos e não poderão ser recuperados. Tem absoluta certeza que deseja excluir sua conta?',
    confirmText: 'Excluir Permanentemente',
    onConfirm: async () => {
      try {
        // Aqui você implementaria a lógica de exclusão
        console.log("Conta excluída");
        // const response = await deleteAccount(token);
        alert("Conta excluída com sucesso!");
        localStorage.clear();
        navigate('/');
      } catch (error) {
        console.error("Erro ao excluir conta:", error);
        alert("Erro ao excluir conta. Tente novamente.");
      } finally {
        setConfirmationModal({ isOpen: false, type: '', title: '', message: '', confirmText: '', onConfirm: null });
      }
    }
  });
};

const closeConfirmationModal = () => {
  setConfirmationModal({ 
    isOpen: false, 
    type: '', 
    title: '', 
    message: '', 
    confirmText: '', 
    onConfirm: null 
  });
};



  // Ícones SVG otimizados
  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );


  const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );

  const LogOutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
  const CameraPlaceholderIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
  const renderTabContent = () => {
    switch (activeTab) {
      case "pessoais":
        return (
          
          
          <div className="tab-content">
            <MobileHeader tema={tema} toggleTema={toggleTema} title="Ideafy" />
            <div className="content-header">
              <h2 className="content-title">Informações Pessoais</h2>
              <p className="content-description">Gerencie suas informações de perfil</p>
            </div>
            
            <div className="modern-form-card">
              <div className="form-row">
                <div className="modern-input-group">
                  <label className="modern-label">Nome Completo</label>
                  <input
                    type="text"
                    value={ user?.name || "Loading..."}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="modern-input"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                
                <div className="modern-input-group">
                  <label className="modern-label">Nome de Usuário</label>
                  <input
                    type="text"
                    value={ user?.username || "Loading..."}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="modern-input"
                    placeholder="@seuusername"
                  />
                </div>
              </div>
              
              
              <div className="modern-input-group">
                <label className="modern-label">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="modern-textarea"
                  placeholder="Conte um pouco sobre você..."
                  rows="4"
                />
              </div>
              
              
              <button onClick={handleSaveProfile} className="modern-save-btn">
                Salvar Alterações
              </button>
            </div>
          </div>
        );

      case "seguranca":
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Segurança</h2>
              <p className="content-description">Mantenha sua conta segura</p>
            </div>
            
            <div className="modern-form-card">
              <div className="modern-input-group">
                <label className="modern-label">Senha Atual</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                  className="modern-input"
                  placeholder="Digite sua senha atual"
                />
              </div>
              
              <div className="form-row">
                <div className="modern-input-group">
                  <label className="modern-label">Nova Senha</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className="modern-input"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                
                <div className="modern-input-group">
                  <label className="modern-label">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="modern-input"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </div>
              
              <button onClick={handleChangePassword} className="modern-save-btn">
                Alterar Senha
              </button>
            </div>
          </div>
        );

      case "conta":
        return (
          <div className="tab-content">
            <div className="content-header">
              <h2 className="content-title">Configurações da Conta</h2>
              <p className="content-description">Gerencie dados e configurações avançadas</p>
            </div>
            
            <div className="modern-form-card">
              <div className="action-list">
                <div className="modern-action-item">
                  <div className="action-content">
                    <h4 className="action-title">Exportar Dados</h4>
                    <p className="action-desc">Baixe uma cópia completa dos seus dados</p>
                  </div>
                  <button className="modern-action-btn secondary">Exportar</button>
                </div>
                
                <div className="modern-action-item">
  <div className="action-content">
    <h4 className="action-title">Desativar Conta</h4>
    <p className="action-desc">Temporariamente desative sua conta</p>
  </div>
  <button onClick={handleDeactivateAccount} className="modern-action-btn secondary">
    Desativar
  </button>
</div>

<div className="modern-action-item">
  <div className="action-content">
    <h4 className="action-title">Sair da Conta</h4>
    <p className="action-desc">Desconecte-se da sua conta atual</p>
  </div>
  <button onClick={handleLogout} className="modern-action-btn logout">
    <LogOutIcon />
    Sair
  </button>
</div>

<div className="modern-action-item danger">
  <div className="action-content">
    <h4 className="action-title">Excluir Conta</h4>
    <p className="action-desc">Remova permanentemente sua conta</p>
  </div>
  <button onClick={handleDeleteAccount} className="modern-action-btn danger">
    Excluir
  </button>
</div>


              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

const tabs = [
  { id: "pessoais", label: "Perfil", icon: <UserIcon /> },
  { id: "seguranca", label: "Segurança", icon: <ShieldIcon /> },
  { id: "conta", label: "Conta", icon: <SettingsIcon /> }
];


  return (
    <div className={`minha-conta-container ${tema === "escuro" ? "escuro-fundo-cinza" : "claro-fundo-bege"}`}>
      <Sidebar 
        tema={tema}
        toggleTema={toggleTema}
        onSearchModal={() => {}}
        activeItem={'settings'}
      />
      
      <main className="modern-main">
        <div className="modern-content">
          {/* Header do Perfil Moderno */}
          <div className="modern-profile-header">
            <div className="profile-hero">
              <div className="profile-avatar-section">
                <div className="modern-avatar-container">
                  {user?.avatar ? (
    <img
      src={user.avatar}
      alt={user?.name || "Loading..."}
      className="modern-avatar"
      onError={(e) => {
        // Se a imagem falhar, esconde a img e mostra o ícone
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'flex';
      }}
    />
  ) : null}
  
  <div 
    className={`modern-avatar-placeholder ${!user?.avatar ? 'show' : ''}`}
    style={{ display: !user?.avatar ? 'flex' : 'none' }}
  >
    <CameraPlaceholderIcon />
  </div>
                  <label className="modern-avatar-edit">
                    <CameraIcon />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      hidden
                    />
                  </label>
                </div>
              </div>
              
              <div className="profile-details">
                <h1 className="modern-profile-name">{ user?.name || "Loading..."}</h1>
                <p className="modern-profile-username">@{ user?.username || "Loading..."}</p>
                <p className="modern-profile-bio">{ user?.name || "Loading..."}</p>
                
                <div className="profile-stats">
                  <div className="stat-item">
                    <CalendarIcon />
                    <span>Entrou em {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Moderna */}
          <div className="modern-tabs-container">
            <nav className="modern-tab-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`modern-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-text">{tab.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="modern-tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Confirmação de Avatar */}
{avatarPreview.isOpen && (
  <div className="avatar-preview-modal">
    <div className="avatar-preview-backdrop" onClick={cancelAvatarChange}></div>
    <div className="avatar-preview-content">
      <div className="avatar-preview-header">
        <h3>Confirmar nova foto de perfil</h3>
        <button onClick={cancelAvatarChange} className="avatar-preview-close">
          <XIcon />
        </button>
      </div>
      
      <div className="avatar-preview-body">
        <div className="avatar-preview-comparison">
          <div className="avatar-preview-section">
            <span className="avatar-preview-label">Atual</span>
            <div className="avatar-preview-current">
              {(user?.avatar || userProfile?.avatar) ? (
                <img 
                  src={user?.avatar || userProfile?.avatar} 
                  alt="Avatar atual"
                  className="avatar-preview-image"
                />
              ) : (
                <div className="avatar-preview-placeholder">
                  <CameraIcon />
                </div>
              )}
            </div>
          </div>
          
          <div className="avatar-preview-arrow">→</div>
          
          <div className="avatar-preview-section">
            <span className="avatar-preview-label">Nova</span>
            <div className="avatar-preview-new">
              <img 
                src={avatarPreview.imageUrl} 
                alt="Nova foto de perfil"
                className="avatar-preview-image"
              />
            </div>
          </div>
        </div>
        
        <p className="avatar-preview-description">
          Esta será sua nova foto de perfil. Deseja confirmar a alteração?
        </p>
      </div>
      
      <div className="avatar-preview-actions">
        <button onClick={cancelAvatarChange} className="avatar-preview-btn cancel">
          <XIcon />
          Cancelar
        </button>
        <button onClick={confirmAvatarChange} className="avatar-preview-btn confirm">
          <CheckIcon />
          Confirmar
        </button>
      </div>
    </div>
  </div>
)}
{confirmationModal.isOpen && (
  <div className="confirmation-modal">
    <div className="confirmation-backdrop" onClick={closeConfirmationModal}></div>
    <div className="confirmation-content">
      <div className="confirmation-header">
        <h3 className="confirmation-title">{confirmationModal.title}</h3>
        <button onClick={closeConfirmationModal} className="confirmation-close">
          <XIcon />
        </button>
      </div>
      
      <div className="confirmation-body">
        <div className="confirmation-icon">
          {confirmationModal.type === 'logout' && <LogOutIcon />}
          {confirmationModal.type === 'deactivate' && <ShieldIcon />}
          {confirmationModal.type === 'delete' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          )}
        </div>
        
        <p className="confirmation-message">{confirmationModal.message}</p>
        
        {confirmationModal.type === 'delete' && (
          <div className="confirmation-warning">
            <strong>Esta ação não pode ser desfeita!</strong>
          </div>
        )}
      </div>
      
      <div className="confirmation-actions">
        <button onClick={closeConfirmationModal} className="confirmation-btn cancel">
          <XIcon />
          Cancelar
        </button>
        <button 
          onClick={confirmationModal.onConfirm} 
          className={`confirmation-btn confirm ${confirmationModal.type}`}
        >
          <CheckIcon />
          {confirmationModal.confirmText}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}