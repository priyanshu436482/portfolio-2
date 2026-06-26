import { useEffect, useRef, useState, useCallback } from 'react';
import { experienceData } from '../data/projectsData';

export default function Experience() {
  const timelineRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeDots, setActiveDots] = useState(new Set());

  const handleScroll = useCallback(() => {
    const container = timelineRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far the user has scrolled through the timeline section
    const totalHeight = rect.height;
    const scrolled = windowHeight / 2 - rect.top;
    const percent = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100));
    setFillHeight(percent);

    // Check which timeline items are in view
    const items = container.querySelectorAll('.timeline-item');
    const newActive = new Set();
    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowHeight * 0.75) {
        newActive.add(index);
      }
    });
    setActiveDots(newActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section id="experience" className="section-padding bg-[#FAF9F5]" role="region" aria-label="Experience">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="section-label justify-center reveal">Experience</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            A decade of <span className="gradient-text">crafting software</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            From enterprise architecture to startup MVPs, delivering impact at every stage.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          <div className="space-y-8 md:space-y-12">
            {experienceData.map((exp, i) => {
              const isActive = activeDots.has(i);
              return (
                <div
                  key={i}
                  className="timeline-item relative group reveal"
                >
                  {/* Experience Card */}
                  <div className={`glass-card rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 hover:border-[rgba(255,160,0,0.3)] bg-white relative overflow-visible ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-4'}`}>
                    <span className="text-sm font-bold text-[var(--accent-1)] font-mono-custom mb-2 block">{exp.period}</span>
                    <h3 className="font-bold text-xl md:text-2xl text-[#111827]">{exp.title}</h3>
                    <p className="text-sm md:text-base font-semibold text-[#475569] mt-1">{exp.company} <span className="font-normal text-[#64748B]">· {exp.type}</span></p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 mb-4 text-xs font-medium text-[#64748B]">
                      <span className="flex items-center gap-1.5 bg-[#f1f5f9] px-2 py-1 rounded"><i className="fa-regular fa-clock"></i> {exp.duration}</span>
                      <span className="flex items-center gap-1.5 bg-[#f1f5f9] px-2 py-1 rounded"><i className="fa-solid fa-location-dot"></i> {exp.location}</span>
                    </div>
                    <p className="text-sm md:text-base text-[#475569] leading-relaxed mb-6">{exp.desc}</p>
                    
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, j) => {
                          const isAdditional = skill.includes('additional');
                          return (
                            <div key={j} className="relative group/tooltip inline-block">
                              <span className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${isAdditional ? 'bg-[#f8fafc] border border-[#e2e8f0] text-[#64748B] hover:bg-[#f1f5f9] cursor-help' : 'bg-[#ffa00014] text-[var(--accent-1)]'}`}>
                                {skill}
                              </span>
                              {isAdditional && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-[#111827] text-white text-xs text-center rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 transform group-hover/tooltip:-translate-y-1">
                                  We are collecting the remaining skills to display them here!
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#111827]"></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
