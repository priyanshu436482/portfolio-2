import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

const HOME_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#insights', label: 'Insights' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenModal, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleScroll = useCallback(() => {
    if (menuOpen) return;
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
  }, [lastScroll, menuOpen]);

  const isNavbarActive = scrolled || !isHome || menuOpen;

  useEffect(() => {
    if (!isHome) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  const openBooking = () => {
    closeMenu();
    onOpenBooking();
  };

  const openContact = () => {
    closeMenu();
    onOpenModal();
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavbarActive ? 'nav-blur' : ''}`}
      style={{
        transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        opacity: hidden && !menuOpen ? 0 : 1,
      }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3">
        {isHome ? (
          <a href="#hero" className="flex items-center gap-2.5 group shrink-0" aria-label="Umesh Patel Home" onClick={closeMenu}>
            <span className="logo-mark">UP</span>
            <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] tracking-tight">Umesh Patel</span>
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Umesh Patel Home" onClick={closeMenu}>
            <span className="logo-mark">UP</span>
            <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] tracking-tight">Umesh Patel</span>
          </Link>
        )}

        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          {isHome &&
            HOME_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            className="btn-primary text-sm !py-2 !px-4 md:!py-2.5 md:!px-5 magnetic-btn hidden md:inline-flex"
            onClick={onOpenBooking}
          >
            <span>Book a call</span>
          </button>
          {isHome ? (
            <button
              className="btn-outline text-sm !py-2 !px-5 md:!py-2.5 md:!px-6 magnetic-btn hidden md:inline-flex"
              onClick={onOpenModal}
            >
              Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <a
              href="/#contact"
              className="btn-outline text-sm !py-2 !px-5 md:!py-2.5 md:!px-6 magnetic-btn hidden md:inline-flex"
            >
              Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          )}

          <button
            type="button"
            className="nav-menu-toggle md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`nav-menu-bar ${menuOpen ? 'open' : ''}`} />
            <span className={`nav-menu-bar ${menuOpen ? 'open' : ''}`} />
            <span className={`nav-menu-bar ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`nav-mobile md:hidden ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="nav-mobile-panel" role="navigation" aria-label="Mobile navigation">
          {isHome &&
            HOME_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-mobile-link" onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          {!isHome && (
            <>
              <Link to="/" className="nav-mobile-link" onClick={closeMenu}>
                Home
              </Link>
              <a href="/#work" className="nav-mobile-link" onClick={closeMenu}>
                Work
              </a>
              <a href="/#contact" className="nav-mobile-link" onClick={closeMenu}>
                Contact
              </a>
            </>
          )}
          <div className="nav-mobile-actions">
            <button className="btn-primary text-sm w-full justify-center" onClick={openBooking}>
              Book a call
            </button>
            {isHome ? (
              <button className="btn-outline text-sm w-full justify-center" onClick={openContact}>
                Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            ) : (
              <a href="/#contact" className="btn-outline text-sm w-full justify-center" onClick={closeMenu}>
                Let's Talk <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
