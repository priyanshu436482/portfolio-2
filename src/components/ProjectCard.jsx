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
    <div className="project-card-visual min-h-[200px] sm:min-h-[240px] lg:min-h-full relative flex items-center justify-center p-5 sm:p-8 overflow-hidden">
      <div className="project-pattern project-pattern-brand" aria-hidden="true"></div>
      {hasImages ? (
        <ImageCarousel project={project} />
      ) : (
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3">{project.emoji}</div>
          <p className="font-semibold text-lg text-[var(--accent-2)]">{project.visualTitle}</p>
          <p className="text-sm text-[var(--accent-1)]">{project.visualSub}</p>
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
          <span className="badge">{project.category}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{project.title}</h3>
        <p className="text-[var(--text-secondary)] text-sm mt-2">{project.summary || project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-6 pt-6 border-t border-[rgba(0,0,0,0.08)]">
          {metrics.map(([key, val], i) => (
            <div key={i}>
              <div className="text-lg font-bold text-[var(--accent-1)]">{val}</div>
              <div className="text-xs text-[var(--text-muted)]">{key}</div>
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
                onClick={(e) => e.stopPropagation()}
              >
                {l.icon && <i className={l.icon}></i>}
                {l.label} <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            ) : (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] cursor-not-allowed italic"
              >
                {l.icon && <i className={l.icon}></i>}
                {l.label}
              </span>
            )
          )
        ) : (
          <span className="text-xs text-[var(--text-muted)] inline-block italic">
            Contact for details
          </span>
        )}
      </div>
    </div>
  );
}
