import { techMarqueeItems } from '../data/projectsData';

export default function SkillsMarquee() {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-[var(--bg-primary)]" aria-label="Technologies">
      <div className="overflow-hidden">
        <div className="marquee-track no-select">
          {[...techMarqueeItems, ...techMarqueeItems].map((item, i) => (
            <span key={i} className="tech-tag text-sm !px-4 !py-2 inline-flex items-center gap-1.5">
              {item.icon ? (
                item.icon.startsWith('<svg') ? (
                  <span className={`w-3.5 h-3.5 flex items-center justify-center ${item.color}`} dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                ) : (
                  <i className={`${item.icon} ${item.color}`}></i>
                )
              ) : (
                <span style={item.style}>{item.label.split(' ')[0]}</span>
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
