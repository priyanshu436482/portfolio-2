import ImageCarousel from './ImageCarousel';

export default function ProjectCard({ project, index, onClick, highlightState }) {
  const isRightVisual = index % 2 === 1;

  return (
    <div
      className={`project-card glass-card rounded-2xl overflow-hidden project-card-clickable relative project-card-highlightable ${
        highlightState === 'highlighted'
          ? 'project-card-highlighted'
          : highlightState === 'dimmed'
          ? 'project-card-dimmed'
          : ''
      }`}
      onClick={() => onClick(project.id)}
    >
      {/* Shine overlay */}
      <div className="shine-overlay" aria-hidden="true"></div>
      <div className="grid lg:grid-cols-5">
        <div className={`lg:col-span-3 ${isRightVisual ? 'lg:order-2' : ''}`}>
          <VisualColumn project={project} />
        </div>
        <div className={`lg:col-span-2 ${isRightVisual ? 'lg:order-1' : ''}`}>
          <ContentSide project={project} />
        </div>
      </div>
    </div>
  );
}

function VisualColumn({ project }) {
  const hasImages = (project.images?.length > 0) || !!project.image;

  return (
    <div
      className="min-h-[200px] sm:min-h-[240px] lg:min-h-full relative flex items-center justify-center p-5 sm:p-8 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${project.accent}0A, #F1F5F9, ${project.accent}0A)` }}
    >
      <div className="project-pattern" style={{ color: project.accent }} aria-hidden="true"></div>
      {hasImages ? (
        <ImageCarousel project={project} />
      ) : (
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3">{project.emoji}</div>
          <p className="font-semibold text-lg" style={{ color: project.accent }}>{project.visualTitle}</p>
          <p className="text-sm" style={{ color: project.accent }}>{project.visualSub}</p>
        </div>
      )}
    </div>
  );
}

function ContentSide({ project }) {
  const metrics = Object.entries(project.metrics);

  return (
    <div className="lg:col-span-2 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="badge" style={{ color: project.accent, background: `${project.accent}14`, borderColor: `${project.accent}1F` }}>
            {project.category}
          </span>
          <span className="text-xs text-[#64748B] font-mono-custom">{project.year}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#111827]">{project.title}</h3>
        <p className="text-[#475569] text-sm mt-2">{project.summary || project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-6 pt-6 border-t border-slate-200">
          {metrics.map(([key, val], i) => (
            <div key={i}>
              <div className="text-lg font-bold" style={{ color: project.accent }}>{val}</div>
              <div className="text-xs text-[#64748B]">{key}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
        {project.links && project.links.length > 0 ? (
          project.links.map((l, i) =>
            l.url ? (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="live-link"
                style={{ color: project.accent }}
                onClick={(e) => e.stopPropagation()}
              >
                {l.icon && <i className={l.icon}></i>}
                {l.label} <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            ) : (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs text-[#64748B] cursor-not-allowed italic"
              >
                {l.icon && <i className={l.icon}></i>}
                {l.label}
              </span>
            )
          )
        ) : (
          <span className="text-xs text-[#64748B] inline-block italic">
            Contact for details
          </span>
        )}
      </div>
    </div>
  );
}
