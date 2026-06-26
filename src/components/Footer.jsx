export default function Footer() {
  return (
    <footer className="py-8 md:py-10 bg-[var(--bg-primary)] footer-gradient-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="logo-mark text-xs !w-7 !h-7">UP</span>
          <span className="text-sm text-[var(--text-secondary)]">&copy; 2024 Umesh Patel. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="social-bounce text-[var(--text-secondary)] inline-flex" aria-label="GitHub"><i className="fa-brands fa-github text-lg"></i></a>
          <a href="#" className="social-bounce text-[var(--text-secondary)] inline-flex" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in text-lg"></i></a>
          <a href="#" className="social-bounce text-[var(--text-secondary)] inline-flex" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter text-lg"></i></a>
        </div>
      </div>
    </footer>
  );
}
