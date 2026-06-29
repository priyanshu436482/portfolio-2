export default function Contact({ onOpenModal }) {
  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" role="region" aria-label="Contact">
      <div className="contact-grid-deco" aria-hidden="true"></div>
      <div className="contact-float-shape contact-float-1" aria-hidden="true"></div>
      <div className="contact-float-shape contact-float-2" aria-hidden="true"></div>
      <div className="contact-float-shape contact-float-3" aria-hidden="true"></div>
      <div className="contact-float-shape contact-float-4" aria-hidden="true"></div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="section-label justify-center reveal">Contact</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight reveal">
          Let's build something<br />
          <span className="gradient-text">extraordinary together</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-base md:text-lg mt-6 max-w-xl mx-auto reveal">
          Whether you need full-stack architecture, AI integration, or a complete digital product, I'm ready to bring your vision to life.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10 reveal">
          <div className="contact-cta-glow-wrap">
            <div className="contact-cta-glow-ring" aria-hidden="true"></div>
            <button
              className="contact-hero-cta magnetic-btn contact-ripple-btn animated-border-btn"
              style={{ borderRadius: '8px' }}
              onClick={(e) => { handleRipple(e); onOpenModal(); }}
            >
              <i className="fa-solid fa-paper-plane"></i> Send a Message
            </button>
          </div>
          <a href="mailto:umeshmca.kadi@gmail.com" className="btn-outline magnetic-btn text-base !py-4 !px-7 contact-ripple-btn" onClick={handleRipple}>
            <i className="fa-solid fa-envelope"></i> Email Directly
          </a>
        </div>
        <div className="mt-6 reveal">
          <p className="text-sm text-[#64748B]">
            <span className="status-ring"></span> Available for freelance, contract & full-time
          </p>
        </div>
      </div>
    </section>
  );
}
