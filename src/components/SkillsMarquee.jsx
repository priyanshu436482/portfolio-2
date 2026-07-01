import { techMarqueeItems } from '../data/projectsData';

export default function SkillsMarquee() {
  // Renders a horizontal scrolling marquee of skills/technologies
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-[var(--bg-primary)]" aria-label="Technologies">
      <div className="overflow-hidden">
        <div className="marquee-track no-select">
          {[...techMarqueeItems, ...techMarqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-3 py-1.5 transition-transform duration-300 hover:scale-105 text-[#475569] font-semibold text-sm md:text-base">
              {item.imgUrl ? (
                <img src={item.imgUrl} alt={item.label} className="w-6 h-6 object-contain" />
              ) : item.icon ? (
                item.icon.startsWith('<svg') ? (
                  <span className={`w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${item.color}`} dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                ) : (
                  <i className={`${item.icon} ${item.color} text-lg`}></i>
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
