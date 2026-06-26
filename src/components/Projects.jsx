import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import ProjectCard from './ProjectCard';
 
const INITIAL_COUNT = 6;

const skillMappings = {
  'Frontend': ['Next.js', 'React', 'Vue.js', 'VueJs', 'Vue', 'Angular', 'TypeScript', 'HTML/CSS', 'Figma'],
  'Backend': ['Node.js', '.NET Core', '.NET Core 6', 'NestJS', 'Express', 'Python', 'PHP', 'Laravel', 'WordPress', 'SQL Server', 'PostgreSQL', 'MongoDB', 'MySQL'],
  'Mobile': ['Flutter', 'React Native'],
  'Cloud & DevOps': ['Azure', 'AWS', 'Docker', 'CI/CD', 'AWS S3'],
  'Databases': ['PostgreSQL', 'SQL Server', 'MongoDB', 'MySQL', 'Redis'],
  'AI & Integrations': ['AI', 'OpenAI', 'Stripe', 'Twilio', 'Socket.IO', 'PDF.CO', 'RFID', 'QR Code', 'BLE', 'BLE 4.2+', 'NFC', 'BLE', 'Enterprise']
};

export default function Projects({ onOpenProject, activeSkill }) {
  const featured = projectsData.filter(p => p.image || (p.images && p.images.length > 0)).slice(0, INITIAL_COUNT);

  const getHighlightState = (project) => {
    if (!activeSkill) return null;
    const keywords = skillMappings[activeSkill] || [];
    const matches = project.tech.some(t =>
      keywords.some(k => t.toLowerCase().includes(k.toLowerCase()))
    );
    return matches ? 'highlighted' : 'dimmed';
  };

  return (
    <section id="work" className="section-padding bg-[var(--bg-primary)]" role="region" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Featured Work</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            Products I've <span className="gradient-text">built & shipped</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            From AI platforms to booking systems, each project represents a unique challenge solved with precision.
          </p>
        </div>
        <div className="space-y-6 md:space-y-10">
          {featured.map((project, i) => (
            <div key={project.id} className="reveal">
              <ProjectCard
                project={project}
                index={i}
                onClick={onOpenProject}
                highlightState={getHighlightState(project)}
              />
            </div>
          ))}
        </div>
        {projectsData.length > INITIAL_COUNT && (
          <div className="text-center mt-12 reveal">
            <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
              Load All Projects ({projectsData.length}) <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
