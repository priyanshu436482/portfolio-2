import { techMarqueeItems } from '../data/projectsData';

export default function SkillsMarquee() {
  return (
    <section className="py-12 md:py-16 overflow-hidden bg-[var(--bg-primary)]" aria-label="Technologies">
      <div className="overflow-hidden">
        <div className="marquee-track no-select">
          {[...techMarqueeItems, ...techMarqueeItems].map((item, i) => (
            <span key={i} className="px-6 md:px-12 py-4 inline-flex items-center justify-center transition-transform duration-300 hover:scale-110">
              {item.imgUrl ? (
                <img src={item.imgUrl} alt={item.label} title={item.label} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm" />
              ) : item.icon ? (
                item.icon.startsWith('<svg') ? (
                  <span className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${item.color}`} dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                ) : (
                  <i className={`${item.icon} ${item.color} text-4xl md:text-5xl`} title={item.label}></i>
                )
              ) : (
                <span className="text-2xl md:text-3xl font-bold" style={item.style}>{item.label.split(' ')[0]}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
