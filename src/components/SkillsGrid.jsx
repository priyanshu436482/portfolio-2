import { skillsData } from '../data/projectsData';

export default function SkillsGrid({ activeSkill, setActiveSkill }) {
  return (
    <section id="skills" className="section-padding bg-white" role="region" aria-label="Skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Expertise</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            A <span className="gradient-text">full spectrum</span> developer
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            From frontend to infrastructure, mobile to AI, I bring end-to-end capability to every project.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" id="skillsGrid">
          {skillsData.map((skill, i) => {
            const isHovered = activeSkill === skill.title;
            return (
              <div key={i} className="reveal">
                <div
                  style={{ backgroundColor: '#ffffff', background: '#ffffff' }}
                  className={`skill-card rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 border border-gray-100/50 shadow-sm ${
                    isHovered ? 'border-[var(--accent-1)] shadow-md translate-y-[-4px]' : ''
                  }`}
                  onMouseEnter={() => setActiveSkill(skill.title)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {/* Shine overlay */}
                  <div className="skill-card-shine" aria-hidden="true"></div>
                  <div className={`skill-icon-wrap skill-icon-wobble ${skill.iconBg} ${skill.iconColor} mb-4`}>
                    <i className={`${skill.icon} text-xl`}></i>
                  </div>
                  <h3 className="font-bold text-lg text-[#111827]">{skill.title}</h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
