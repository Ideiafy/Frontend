import React, { useState } from "react";
import "../../styles/card.css";
import { useNavigate } from "react-router-dom";
import Images from "./../../assets/images";



export default function Card({ showFollowButton = false, additionalPosts = [] }) {
  const [activeTab, setActiveTab] = useState("posts");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    postId: null,
  });
  const [comments, setComments] = useState({});
  const inputRef = useRef(null);

  const [lightboxImage, setLightboxImage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const UserConta=() =>{
    navigate('/UserConta');
  }

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  // Mock data do usuário
  const userData = {
    name: "Lucas Alves",
    username: "@lucasalves",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Criando soluções que fazem a diferença no mundo digital.",
    avatar: Images.PhotoCard || "/default-avatar.jpg",
    coverImage: Images.Banner3 || "/default-cover.jpg",
    joinDate: "Março 2022",
    isOnline: true,
    verified: true,
    stats: {
      posts: 124,
      followers: 2847,
      following: 892,
    },
  };

  const userPosts = [
    {
      id: 1,
      author: userData,
      content:
        "Acabei de finalizar um projeto incrível usando React e Node.js! A sensação de ver tudo funcionando perfeitamente é indescritível. 🚀",
      media: [
        {
          type: "image",
          url: Images.DeskCard || "/default-post.jpg",
          alt: "Projeto finalizado",
        },
      ],
      likes: 45,
      comments: 12,
      time: "2h",
      isLiked: false,
    },
    {
      id: 2,
      author: userData,
      content:
        "Compartilhando algumas dicas de UI/UX que aprendi esta semana. O design é muito mais do que apenas fazer algo bonito - é sobre criar experiências memoráveis!",
      media: [
        {
          type: "image",
          url: Images.Banner2,
          alt: "UI/UX Design",
        },
        {
          type: "image",
          url: Images.Banner1,
          alt: "Design Process",
        },
      ],
      likes: 78,
      comments: 23,
      time: "1d",
      isLiked: true,
    },
    {
      id: 3,
      author: userData,
      content:
        "Hoje foi dia de contribuir com open source! Nada melhor do que retribuir para a comunidade que tanto me ensinou.",
      media: [],
      likes: 32,
      comments: 8,
      time: "3d",
      isLiked: false,
    },
  ];

  const allPosts = [...additionalPosts, ...userPosts];

  // Ícones SVG
  const TrashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
  </svg>
);

const MoreIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);
  const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const CommentIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  // Função para curtir posts
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

const openCommentModal = (postId) => {
  setCommentModal({ isOpen: true, postId });
};

  // Componente MediaGallery
  const MediaGallery = ({ media, postId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    if (!media || media.length === 0) return null;

    const nextMedia = () => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const minSwipeDistance = 50;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && media.length > 1) {
        nextMedia();
      }
      if (isRightSwipe && media.length > 1) {
        prevMedia();
      }
    };

    const currentMedia = media[currentIndex];

    return (
      <div
        className="userProfile-postImageContainer"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="mediaWrapper"
          onClick={() => setLightboxImage({ media, currentIndex })}
        >
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt}
              className="postImage"
              draggable={false}
            />
          ) : (
            <video
              src={currentMedia.url}
              className="userProfile-postVideo"
              controls
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {media.length > 1 && (
          <>
            <button className="userProfile-mediaPrev" onClick={prevMedia}>
              <ChevronLeftIcon />
            </button>
            <button className="userProfile-mediaNext" onClick={nextMedia}>
              <ChevronRightIcon />
            </button>
            <div className="userProfile-mediaIndicators">
              {media.map((_, index) => (
                <div
                  key={index}
                  className={`userProfile-mediaIndicator ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Componente Lightbox
  const Lightbox = () => {
    const [currentIndex, setCurrentIndex] = useState(
      lightboxImage?.currentIndex || 0
    );
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    if (!lightboxImage) return null;

    const { media } = lightboxImage;

    const nextMedia = () => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prevMedia = () => {
      setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const minSwipeDistance = 50;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && media.length > 1) {
        nextMedia();
      }
      if (isRightSwipe && media.length > 1) {
        prevMedia();
      }
    };

    const currentMedia = media[currentIndex];

    return (
      <div
        className="userProfile-lightbox"
        onClick={() => setLightboxImage(null)}
      >
        <div
          className="userProfile-lightboxContent"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="userProfile-lightboxClose"
            onClick={() => setLightboxImage(null)}
          >
            <CloseIcon />
          </button>

          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt}
              className="userProfile-lightboxImage"
              draggable={false}
            />
          ) : (
            <video
              src={currentMedia.url}
              className="userProfile-lightboxVideo"
              controls
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
          )}

          {media.length > 1 && (
            <>
              <button className="userProfile-lightboxPrev" onClick={prevMedia}>
                <ChevronLeftIcon />
              </button>
              <button className="userProfile-lightboxNext" onClick={nextMedia}>
                <ChevronRightIcon />
              </button>
              <div className="userProfile-lightboxIndicators">
                {media.map((_, index) => (
                  <div
                    key={index}
                    className={`userProfile-lightboxIndicator ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Componente Modal de Comentários
  const CommentModal = () => {
    const [commentText, setCommentText] = useState("");

    const inputRef = useRef(null);

    const { isOpen } = commentModal;

    useEffect(() => {
      if (isOpen) {
        setCommentText("");
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [isOpen]);

    if (!commentModal.isOpen) return null;

    const currentPost = allPosts.find((p) => p.id === commentModal.postId);
    const postComments = comments[commentModal.postId] || [];

    const addComment = () => {
      const text = commentText.trim();
      if (!text) return;

      const comment = {
        id: Date.now(),
        text,
        author: "Você",
        avatar: Images.PhotoCard || "/default-avatar.jpg",
        time: "agora",
      };

      setComments((prev) => ({
        ...prev,
        [commentModal.postId]: [...(prev[commentModal.postId] || []), comment],
      }));

      setCommentText(""); // limpa o textarea
      inputRef.current?.focus(); // mantém foco
    };

    return (
      <div
        className="userProfile-commentModal"
        onClick={() => setCommentModal({ isOpen: false, postId: null })}
      >
        <div
          className="userProfile-commentModalContent"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="userProfile-commentModalHeader">
            <h3>Comentários</h3>
            <button
              className="userProfile-commentModalClose"
              onClick={() => setCommentModal({ isOpen: false, postId: null })}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="userProfile-commentModalBody">
            <div className="userProfile-originalPost">
              <div className="userProfile-postHeader">
                <div className="userProfile-postUserAvatar" onClick={UserConta}>
                  <img
                    src={currentPost?.author.avatar}
                    alt={currentPost?.author.name}
                  />
                  {currentPost?.author.isOnline && (
                    <div className="userProfile-onlineStatus"></div>
                  )}
                </div>
                <div className="userProfile-postUserInfo">
                  <h4 className="userProfile-postUserName">
                    {currentPost?.author.name}
                  </h4>
                  <span className="userProfile-postTime">
                    {currentPost?.time}
                  </span>
                </div>
                {showFollowButton && (
                  <button
                    className={`userProfile-followBtn ${
                      isFollowing ? "following" : ""
                    }`}
                    onClick={toggleFollow}
                  >
                    {isFollowing ? <UserCheckIcon /> : <UserPlusIcon />}
                    <span>{isFollowing ? "Seguindo" : "Seguir"}</span>
                  </button>
                )}
              </div>
              <p className="userProfile-postText">{currentPost?.content}</p>
            </div>

            <div className="userProfile-commentsList">
              {postComments.length === 0 ? (
                <div className="userProfile-noComments">
                  <p>Seja o primeiro a comentar!</p>
                </div>
              ) : (
                postComments.map((comment) => (
                  <div key={comment.id} className="userProfile-commentItem">
                    <div className="userProfile-commentAvatar">
                      <img src={comment.avatar} alt={comment.author} />
                    </div>
                    <div className="userProfile-commentContent">
                      <div className="userProfile-commentHeader">
                        <h5 className="userProfile-commentAuthor">
                          {comment.author}
                        </h5>
                        <span className="userProfile-commentTime">
                          {comment.time}
                        </span>
                      </div>
                      <p className="userProfile-commentText">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="userProfile-addComment">
              <div className="userProfile-userAvatar">
                <img
                  src={Images.PhotoCard || "/default-avatar.jpg"}
                  alt="Seu avatar"
                />
              </div>

              <div className="userProfile-commentInputContainer">
                <textarea
                  ref={inputRef}
                  placeholder="Escreva um comentário..."
                  className="userProfile-commentInput"
                  rows={1}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addComment();
                    }
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button
                  className="userProfile-sendComment"
                  onClick={addComment}
                  disabled={!commentText.trim()}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Return do componente principal
  return (
    <>
      <div className="userProfile-tabContent">
        {activeTab === "posts" && (
          <div className="userProfile-postsContent">
            {allPosts.map((post) => (
  <article key={post.id} className="userProfile-postCard">
                <div className="userProfile-postHeader">
                  <div className="userProfile-postUserAvatar" onClick={UserConta}>
                    <img src={post.author.avatar} alt={post.author.name} />
                    {post.author.isOnline && (
                      <div className="userProfile-onlineStatus"></div>
                    )}
                  </div>
                  <div className="userProfile-postUserInfo">
                    <h4 className="userProfile-postUserName">
                      {post.author.name}
                    </h4>
                    <span className="userProfile-postTime">{post.time}</span>
                  </div>
                  {showFollowButton && (
                  <button
                    className={`userProfile-followBtn ${
                      isFollowing ? "following" : ""
                    }`}
                    onClick={toggleFollow}
                  >
                    {isFollowing ? <UserCheckIcon /> : <UserPlusIcon />}
                    <span>{isFollowing ? "Seguindo" : "Seguir"}</span>
                  </button>
                )}
                </div>

          <p className="userProfile-postText">{post.description}</p>

          {post.media_path && (
            post.media_type === "image" ? (
              <img src={post.media_path} alt={post.title} className="postImage" />
            ) : (
               <img src="./../../assets/images/banner1.jpg" alt={post.title} className="postImage" />
              //<video src={post.media_path} className="userProfile-postVideo" controls />
            )
          )}

                <div className="userProfile-postActions">
                  <button
                    className={`userProfile-actionBtn userProfile-like ${
                      likedPosts.has(post.id) ? "liked" : ""
                    }`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <HeartIcon />
                    <span className="userProfile-actionCount">
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button
                    className="userProfile-actionBtn userProfile-comment"
                    onClick={() => openCommentModal(post.id)}
                  >
                    <CommentIcon />
                    <span className="userProfile-actionCount">
                      {(comments[post.id] || []).length || post.comments}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === "media" && (
          <div className="userProfile-mediaGrid">
            {userPosts
              .filter((post) => post.media.length > 0)
              .map((post) =>
                post.media.map((media, index) => (
                  <div
                    key={`${post.id}-${index}`}
                    className="userProfile-mediaItem"
                    onClick={() =>
                      setLightboxImage({
                        media: post.media,
                        currentIndex: index,
                      })
                    }
                  >
                    <img src={media.url} alt={media.alt} />
                  </div>
                ))
              )}
          </div>
        )}
      </div>

      {/* Modais */}
      <Lightbox />
      <CommentModal />
    </>
  );
}
