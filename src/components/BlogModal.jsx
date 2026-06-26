import { blogData } from '../data/blogData';

export default function BlogModal({ articleId, isOpen, onClose }) {
  if (!isOpen || articleId === null) return null;
  const article = blogData[articleId];
  if (!article) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <div className="modal-container blog-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close article">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content blog-modal-content" data-lenis-prevent>
        <div className="blog-modal-header">
          <div className="blog-modal-badge" style={{ color: article.accent, borderColor: `${article.accent}30`, background: `${article.accent}10` }}>
            {article.category}
          </div>
          <h2 className="blog-modal-title">{article.title}</h2>
          <div className="blog-modal-meta">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#64748B]"></span>
            <span>{article.readTime}</span>
          </div>
          <div className="blog-modal-tags">
            {article.tags.map((t, i) => (
              <span key={i} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
        <div className="blog-modal-body">
          {article.sections.map((section, i) => (
            <div key={i} className="blog-modal-section">
              <h3 className="blog-modal-section-heading">{section.heading}</h3>
              <p className="blog-modal-section-text">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
