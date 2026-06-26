import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Navbar({ onOpenModal, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleScroll = useCallback(() => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 80) {
      setScrolled(true);
      if (currentScroll > lastScroll && currentScroll > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setScrolled(false);
      setHidden(false);
    }
    setLastScroll(currentScroll);

    // Scroll progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
  }, [lastScroll]);

  const isNavbarActive = scrolled || !isHome;

  useEffect(() => {
    if (!isHome) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isHome]);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavbarActive ? 'nav-blur shadow-sm' : ''}`}
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        opacity: hidden ? 0 : 1,
      }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between">
        {isHome ? (
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Umesh Patel Home">
            <span className="logo-mark">UP</span>
            <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] tracking-tight">Umesh Patel</span>
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Umesh Patel Home">
            <span className="logo-mark">UP</span>
            <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] tracking-tight">Umesh Patel</span>
          </Link>
        )}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          {isHome ? (
            <>
              <a href="#work" className="nav-link">Work</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#insights" className="nav-link">Insights</a>
              <a href="#contact" className="nav-link">Contact</a>
            </>
          ) : (
            <>
              {/* <Link to="/" className="nav-link">Home</Link>
              <a href="/#work" className="nav-link">Work</a>
              <a href="/#contact" className="nav-link">Contact</a> */}
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="btn-primary text-sm !py-2 !px-4 md:!py-2.5 md:!px-5 magnetic-btn hidden sm:inline-flex"
            onClick={onOpenBooking}
          >
            <span>Book a call</span>
          </button>
          {isHome ? (
            <button
              className="btn-outline text-sm !py-2 !px-5 md:!py-2.5 md:!px-6 magnetic-btn"
              onClick={onOpenModal}
            >
              Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <a href="/#contact" className="btn-outline text-sm !py-2 !px-5 md:!py-2.5 md:!px-6 magnetic-btn">
              Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          )}
        </div>
      </div>
      {/* Scroll progress bar */}
      {isHome && isNavbarActive && (
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
