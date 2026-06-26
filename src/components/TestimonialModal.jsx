export default function TestimonialModal({ testimonial, isOpen, onClose }) {
  if (!isOpen || !testimonial) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.author}`}
    >
      <div className="modal-container testimonial-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close testimonial">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-content" data-lenis-prevent>
          <div className="testimonial-modal-inner">
            <div className="flex items-center gap-1 text-[#FB923C] mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <i key={s} className="fa-solid fa-star text-lg"></i>
              ))}
            </div>
            <p className="testimonial-modal-text">{testimonial.text}</p>
            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="font-semibold text-base text-[var(--text-primary)]">{testimonial.author}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-0.5">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
