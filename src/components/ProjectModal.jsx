import { projectsData } from '../data/projectsData';
import ImageCarousel from './ImageCarousel';

export default function ProjectModal({ projectId, isOpen, onClose, onOpenVoice }) {
  if (!isOpen || projectId === null) return null;
  const p = projectsData.find((proj) => proj.id === projectId);
  if (!p) return null;

  const metrics = Object.entries(p.metrics);
  const hasImages = (p.images?.length > 0) || !!p.image;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
    >
      <div className="modal-container project-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content project-modal-content" data-lenis-prevent>
        <div className="project-modal-layout">
          <div className="project-modal-visual">
            <div className="project-pattern" aria-hidden="true" style={{ color: p.accent }}></div>
            {hasImages ? (
              <ImageCarousel project={p} />
            ) : (
              <div className="relative z-10 text-center">
                <div className="project-modal-emoji">{p.emoji}</div>
                <div className="project-modal-visual-title">{p.visualTitle}</div>
                <div className="project-modal-visual-sub">{p.visualSub}</div>
              </div>
            )}
          </div>
          <div className="project-modal-details">
            <div className="project-modal-badge">{p.category}</div>
            <div className="project-modal-title">{p.title}</div>
            <div className="project-modal-desc">{p.summary || p.description}</div>
            <div className="project-modal-tags">
              {p.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
            <button className="project-listen-btn" onClick={() => onOpenVoice(p)}>
              <i className="fa-solid fa-headphones"></i>
              Listen to Project Overview
              <span className="project-listen-wave">
                <span></span><span></span><span></span>
              </span>
            </button>
            <div className="project-modal-meta">
              {metrics.map(([key, val], i) => (
                <div key={i} className="project-modal-meta-item">
                  <div className="project-modal-meta-label">{key}</div>
                  <div className="project-modal-meta-value">{val}</div>
                </div>
              ))}
            </div>
            {p.links && p.links.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
                {p.links.map((link, i) =>
                  link.url ? (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-link"
                      style={{ color: p.accent }}
                    >
                      {link.icon && <i className={link.icon}></i>}
                      {link.label} <i className="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                  ) : (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs text-[#64748B] cursor-not-allowed italic"
                    >
                      {link.icon && <i className={link.icon}></i>}
                      {link.label}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
