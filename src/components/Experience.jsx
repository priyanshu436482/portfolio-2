import { experienceData } from '../data/projectsData';

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-white" role="region" aria-label="Experience">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Experience</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            A decade of <span className="text-[#FFA000]">crafting software</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            From enterprise architecture to startup MVPs, delivering impact at every stage.
          </p>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          {experienceData.map((exp, i) => (
            <div
              key={i}
              className="reveal"
            >
              <div className="bg-white border border-[#0f172a08] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[rgba(255,160,0,0.2)] cursor-pointer max-w-3xl mx-auto">
                <span className="text-sm font-bold text-[#FFA000] font-mono-custom mb-2 block">{exp.period}</span>
                <h3 className="font-bold text-xl md:text-2xl text-[#111827]">{exp.title}</h3>
                <p className="text-[#475569] mt-1 mb-4 text-sm md:text-base">
                  {exp.company} <span className="opacity-70">· {exp.type}</span>
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F1F5F9] text-[#64748B] text-xs font-medium rounded-md">
                    <i className="fa-regular fa-clock"></i> {exp.duration}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F1F5F9] text-[#64748B] text-xs font-medium rounded-md">
                    <i className="fa-solid fa-location-dot"></i> {exp.location}
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-[#475569] leading-relaxed mb-6">{exp.desc}</p>
                
                {exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, j) => (
                      <span 
                        key={j} 
                        className={`px-3 py-1 text-xs font-bold rounded-md ${
                          skill.includes('additional skills') 
                            ? 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]' 
                            : 'bg-[#ffa00014] text-[#FFA000]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
