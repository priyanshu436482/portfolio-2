import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.png';

function SplitText({ text, baseDelay = 0, className = '' }) {
  return (
    <span className={className} style={{ perspective: '600px' }}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="split-char-space" />
        ) : (
          <span
            key={i}
            className="split-char"
            style={{ animationDelay: `${baseDelay + i * 0.04}s` }}
          >
            {char}
          </span>
        )
      )}
    </span>
  );
}

function Typewriter({ text, startDelay = 1200, speed = 30 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout;
    let i = 0;

    const startTyping = () => {
      const type = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          // Hide cursor 2s after typing completes
          setTimeout(() => setShowCursor(false), 2000);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);

  return (
    <span className="typewriter-container">
      {displayed}
      {showCursor && <span className="typewriter-cursor" />}
    </span>
  );
}

export default function Hero({ onOpenModal }) {
  const particlesRef = useRef(null);
  const tiltRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      const size = 2 + Math.random() * 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.setProperty('--duration', (6 + Math.random() * 10) + 's');
      particle.style.setProperty('--move-y', (-20 - Math.random() * 40) + 'px');
      particle.style.setProperty('--move-y2', (-40 - Math.random() * 60) + 'px');
      particle.style.setProperty('--move-y3', (-60 - Math.random() * 80) + 'px');
      particle.style.setProperty('--particle-opacity', (0.3 + Math.random() * 0.4));
      particle.style.animationDelay = (Math.random() * 8) + 's';
      container.appendChild(particle);
    }
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    const inner = tiltRef.current;
    if (!section || !inner) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform = `rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    };

    const onLeave = () => {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const subtitle = "I architect and build enterprise-grade digital products from AI-powered platforms to full-stack web and mobile solutions used by thousands worldwide.";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      role="region"
      aria-label="Hero"
    >
      <div className="hero-mesh" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`hero-blob hero-blob-${i} parallax-wrap`} data-speed={[0.03, -0.04, 0.05, -0.02][i - 1]}></div>
        ))}
      </div>
      <div className="hero-shine" aria-hidden="true"></div>
      <div ref={particlesRef} className="hero-particles-container" id="heroParticles" aria-hidden="true"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-24 pb-20 md:pt-32 md:pb-24 hero-tilt-wrap">
        <div ref={tiltRef} className="hero-tilt-inner" id="heroTiltInner">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 reveal">
              <span className="badge"><i className="fa-solid fa-sparkles text-xs"></i> Senior Full Stack Developer</span>
              <span className="text-xs text-[#64748B] hidden sm:inline">&middot; 10+ Years Experience</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.04] tracking-[-0.04em] text-[var(--text-primary)] whitespace-nowrap" style={{ perspective: '600px' }}>
                <SplitText text="Umesh" baseDelay={0.3} /> <SplitText text="Patel" baseDelay={0.6} className="text-[#FFA000]" />
              </h1>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] max-w-2xl mt-6 md:mt-8 leading-relaxed reveal">
              <Typewriter text={subtitle} startDelay={100} speed={18} />
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-10 reveal">
              <a href="#work" className="btn-primary magnetic-btn">
                View My Work <i className="fa-solid fa-arrow-down"></i>
              </a>
              <button className="btn-outline magnetic-btn" onClick={onOpenModal}>
                Get in Touch <i className="fa-solid fa-envelope"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
