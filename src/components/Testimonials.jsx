import { useState, useEffect } from 'react';
import { testimonialsData } from '../data/projectsData';
import TestimonialModal from './TestimonialModal';

function StarSparkle({ delay }) {
  return (
    <i
      className="fa-solid fa-star star-sparkle"
      style={{ animationDelay: `${delay}s` }}
    ></i>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected !== null) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollY);
      };
    }
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
  }, [selected]);

  const truncate = (text, max = 110) =>
    text.length > max ? text.slice(0, max) + '...' : text;

  return (
    <section id="testimonials" className="section-padding bg-[var(--bg-primary)]" role="region" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Testimonials</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            What people <span className="gradient-text">say</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            Feedback from clients and collaborators across the projects I've delivered.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonialsData.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card rounded-2xl p-6 md:p-8 reveal cursor-pointer relative overflow-hidden"
              onClick={() => setSelected(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(i); } }}
            >
              {/* Floating quote mark */}
              <span className="quote-float" aria-hidden="true">&ldquo;</span>
              <div className="flex items-center gap-1 text-[#FB923C] mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarSparkle key={s} delay={0.1 * s} />
                ))}
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">{truncate(t.text)}</p>
              {t.text.length > 110 && (
                <span className="inline-block mt-2 text-xs font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors">
                  Read more <i className="fa-solid fa-arrow-right text-[10px] ml-0.5"></i>
                </span>
              )}
              <div className="mt-3 pt-4 border-t border-slate-200">
                <p className="font-semibold text-sm text-[#111827]">{t.author}</p>
                <p className="text-xs text-[#64748B]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestimonialModal
        testimonial={selected !== null ? testimonialsData[selected] : null}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
