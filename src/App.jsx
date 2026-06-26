import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsMarquee from './components/SkillsMarquee';
import SkillsGrid from './components/SkillsGrid';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import BookingModal from './components/BookingModal';
import ProjectModal from './components/ProjectModal';
import BlogModal from './components/BlogModal';
import VoiceModal from './components/VoiceModal';
import Terminal from './components/Terminal';
import { useLenis } from './hooks/useLenis';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceProject, setVoiceProject] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const lenisRef = useLenis();
  const revealRef = useScrollReveal();

  useEffect(() => {
    // Redirect to home and scroll to top on first mount / reload
    if (window.location.pathname !== '/' && !window.location.hash) {
      navigate('/', { replace: true });
    }
    window.scrollTo(0, 0);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, []);


  useEffect(() => {
    if (contactOpen || bookingOpen || projectModalOpen || blogModalOpen || terminalOpen || voiceModalOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      const lenis = lenisRef.current;
      if (lenis) lenis.stop();

      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        if (lenis) lenis.start();
        window.scrollTo(0, scrollY);
      };
    }
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
  }, [contactOpen, bookingOpen, projectModalOpen, blogModalOpen, terminalOpen, voiceModalOpen, lenisRef]);



  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn');
    const onMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) translateY(-1px)`;
    };
    const onLeave = (e) => { e.currentTarget.style.transform = ''; };
    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.querySelectorAll('.parallax-wrap').forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            el.style.transform = `translateY(${-(center - viewportCenter) * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [lenisRef]);

  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);
  const openProject = (id) => { setSelectedProject(id); setProjectModalOpen(true); };
  const closeProject = () => { setProjectModalOpen(false); setSelectedProject(null); };
  const openVoice = (project) => { setVoiceProject(project); setVoiceModalOpen(true); };
  const closeVoice = () => { setVoiceModalOpen(false); setVoiceProject(null); };
  const openArticle = (id) => { setSelectedArticle(id); setBlogModalOpen(true); };
  const closeArticle = () => { setBlogModalOpen(false); setSelectedArticle(null); };

  return (
    <div ref={revealRef}>

      <Navbar onOpenModal={openContact} onOpenBooking={openBooking} />
      <ScrollToTop lenisRef={lenisRef} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero onOpenModal={openContact} />
            <hr className="section-divider" />
            <About />
            <SkillsMarquee />
            <hr className="section-divider" />
            <SkillsGrid activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
            <hr className="section-divider" />
            <Projects onOpenProject={openProject} activeSkill={activeSkill} />
            <hr className="section-divider" />
            <Experience />
            <hr className="section-divider" />
            <Testimonials />
            <hr className="section-divider" />
            <BlogSection onOpenArticle={openArticle} />
            <hr className="section-divider" />
            <Contact onOpenModal={openContact} />
          </>
        } />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
      <Terminal isOpen={terminalOpen} onOpenChange={setTerminalOpen} />
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
      <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
      <ProjectModal
        projectId={selectedProject}
        isOpen={projectModalOpen}
        onClose={closeProject}
        onOpenVoice={openVoice}
      />
      <VoiceModal
        project={voiceProject}
        isOpen={voiceModalOpen}
        onClose={closeVoice}
      />
      <BlogModal
        articleId={selectedArticle}
        isOpen={blogModalOpen}
        onClose={closeArticle}
      />
    </div>
  );
}

export default App;
