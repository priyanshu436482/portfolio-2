import { techMarqueeItems } from '../data/projectsData';

export default function SkillsMarquee() {
  // Renders a horizontal scrolling marquee of skills/technologies
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-[var(--bg-primary)]" aria-label="Technologies">
      <div className="overflow-hidden">
        <div className="marquee-track no-select">
          {[...techMarqueeItems, ...techMarqueeItems].map((item, i) => (
            <span key={i} className="tech-tag text-sm !px-4 !py-2 inline-flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
              {item.imgUrl ? (
                <img src={item.imgUrl} alt={item.label} className="w-4 h-4 object-contain" />
              ) : item.icon ? (
                item.icon.startsWith('<svg') ? (
                  <span className={`w-3.5 h-3.5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${item.color}`} dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                ) : (
                  <i className={`${item.icon} ${item.color} text-sm`}></i>
                )
              ) : (
                <span className="font-bold text-xs" style={item.style}>{item.label.split(' ')[0]}</span>
              )}
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
