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
    const scrolled = windowHeight - rect.top;
    const percent = Math.max(0, Math.min(100, (scrolled / (totalHeight + windowHeight * 0.3)) * 100));
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
    <section id="experience" className="section-padding bg-white" role="region" aria-label="Experience">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Experience</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            A decade of <span className="gradient-text">crafting software</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            From enterprise architecture to startup MVPs, delivering impact at every stage.
          </p>
        </div>
        <div className="relative" ref={timelineRef}>
          <div className="space-y-10 md:space-y-14">
            {experienceData.map((exp, i) => (
              <div
                key={i}
                className={`timeline-item relative pl-0 ${exp.align === 'left' ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:pr-0 md:text-left'} ${exp.align === 'left' ? 'reveal-left' : 'reveal-right'}`}
              >
                <div className="glass-card rounded-2xl p-5 md:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[rgba(255,160,0,0.2)] hover:bg-white/90 cursor-pointer relative overflow-hidden">
                  <span className="text-xs font-semibold text-[#3B82F6] font-mono-custom">{exp.period}</span>
                  <h3 className="font-bold text-lg text-[#111827] mt-1">{exp.title}</h3>
                  <p className="text-sm text-[#475569] mt-1">{exp.company} · {exp.type}</p>
                  <p className="text-xs text-[#64748B]">{exp.duration}</p>
                  <p className="text-xs text-[#64748B]">{exp.location}</p>
                  <p className="text-xs text-[#64748B] mt-2">{exp.desc}</p>
                  {exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.skills.map((skill, j) => (
                        <span key={j} className="px-2 py-0.5 bg-[#3B82F6]/10 text-[#2563EB] text-xs rounded-full">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
