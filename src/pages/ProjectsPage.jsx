import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import VoiceModal from '../components/VoiceModal';

export default function ProjectsPage() {
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
        <div className="projects-page-list">
          {projectsData.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={openProject}
            />
          ))}
        </div>
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
