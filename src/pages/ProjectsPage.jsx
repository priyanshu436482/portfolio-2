import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import VoiceModal from '../components/VoiceModal';

const TABS = [
  { key: 'all', label: 'All Projects', icon: 'fa-solid fa-layer-group' },
  { key: 'web', label: 'Web Apps', icon: 'fa-solid fa-globe' },
  { key: 'mobile', label: 'Mobile Apps', icon: 'fa-solid fa-mobile-screen-button' },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceProject, setVoiceProject] = useState(null);

  const openProject = (id) => {
    setSelectedProject(id);
    setModalOpen(true);
  };

  const closeProject = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const openVoice = (project) => {
    setVoiceProject(project);
    setVoiceModalOpen(true);
  };

  const closeVoice = () => {
    setVoiceModalOpen(false);
    setVoiceProject(null);
  };

  const filtered = useMemo(() => {
    if (activeTab === 'all') return projectsData;
    return projectsData.filter((p) => p.type === activeTab || p.type === 'both');
  }, [activeTab]);

  return (
    <div className="projects-page">
      <div className="projects-page-header">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-12 md:pt-36 md:pb-14">
          <Link to="/" className="projects-page-back">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mt-6">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 md:text-lg max-w-2xl">
            A complete collection of products built across web and mobile, from AI platforms to enterprise-grade mobile applications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-28">
        <div className="projects-page-tabs" role="tablist" aria-label="Filter projects by type">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`projects-page-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={tab.icon}></i>
                {tab.label}
                {tab.key === 'all' && (
                  <span className="projects-page-tab-count">{projectsData.length}</span>
                )}
                {tab.key === 'web' && (
                  <span className="projects-page-tab-count">
                    {projectsData.filter((p) => p.type === 'web' || p.type === 'both').length}
                  </span>
                )}
                {tab.key === 'mobile' && (
                  <span className="projects-page-tab-count">
                    {projectsData.filter((p) => p.type === 'mobile' || p.type === 'both').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        {filtered.length > 0 ? (
          <div className="projects-page-list">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={openProject}
              />
            ))}
          </div>
        ) : (
          <div className="projects-page-empty">
            <i className="fa-solid fa-search"></i>
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>

      <ProjectModal
        projectId={selectedProject}
        isOpen={modalOpen}
        onClose={closeProject}
        onOpenVoice={openVoice}
      />
      <VoiceModal
        project={voiceProject}
        isOpen={voiceModalOpen}
        onClose={closeVoice}
      />
    </div>
  );
}
