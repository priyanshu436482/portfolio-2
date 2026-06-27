import { useCounter } from '../hooks/useCounter';
import { useState, useEffect } from 'react';

function Metric({ target, label }) {
  const [count, ref] = useCounter(target);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (count === target && target > 0) {
      setCounted(true);
    }
  }, [count, target]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FAF9F5] border border-[#0f172a08] rounded-xl hover:shadow-sm transition-all duration-300">
      <div ref={ref} className="text-3xl font-black text-[var(--accent-1)]">
        {count}<span>+</span>
      </div>
      <p className="text-xs text-[#64748B] mt-1 font-semibold uppercase tracking-wider">{label}</p>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono-custom text-xl font-bold tracking-widest text-[var(--accent-1)]">
      {time || '12:00:00 PM'}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-[#FAF8F5]" role="region" aria-label="About">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="section-label reveal">About & Stats</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight mb-8 reveal">
          Crafting products with <span className="gradient-text">precision</span>
        </h2>

        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Bio card */}
          <div className="glass-card bento-card bento-col-2 p-6 md:p-8 hover:border-[rgba(255,160,0,0.2)] transition-colors duration-300 reveal">
            <div>
              <span className="badge mb-4"><i className="fa-solid fa-user text-xs"></i> Biography</span>
              <p className="text-[#475569] text-base md:text-lg leading-relaxed">
                With over 10 years of experience across startups and enterprises, I specialize in full-stack development, cloud architecture, and AI integration. I've delivered 50+ projects spanning web, mobile, and desktop, from real-time booking systems to AI-powered SaaS platforms.
              </p>
              <p className="text-[#475569] text-base md:text-lg leading-relaxed mt-4">
                My approach combines deep technical expertise with product-thinking, ensuring every solution is not just well-engineered but also delivers real business value.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#0f172a08]">
              <div className="w-10 h-10 rounded-full bg-[#ffa00014] flex items-center justify-center text-[var(--accent-1)]">
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p className="italic text-sm text-[#64748B]">"Simple code, solid architecture, high business impact."</p>
            </div>
          </div>

          {/* Timezone / Live Clock Card */}
          <div className="glass-card bento-card p-6 md:p-8 flex flex-col justify-between hover:border-[rgba(255,160,0,0.2)] transition-colors duration-300 reveal">
            <div>
              <span className="badge mb-4"><i className="fa-solid fa-earth-americas text-xs"></i> Location</span>
              <h3 className="text-lg font-bold text-[#111827] mb-2">India</h3>
              <p className="text-xs text-[#64748B] mb-4">Working globally with remote teams.</p>
            </div>
            <div className="bg-[#FAF9F5] border border-[#0f172a08] rounded-xl p-4 text-center">
              <span className="status-ring mb-1"></span>
              <span className="text-xs font-bold text-[#2fa84f] uppercase tracking-wider block mb-2">Available for Work</span>
              <LiveClock />
              <span className="text-[10px] text-[#8b8b8b] block mt-1 font-mono-custom">IST (India)</span>
            </div>
          </div>

          {/* Tech Spotlight Bento Card */}
          <div className="glass-card bento-card bento-col-2 p-6 md:p-8 hover:border-[rgba(255,160,0,0.2)] transition-colors duration-300 reveal">
            <div>
              <span className="badge mb-4"><i className="fa-solid fa-code text-xs"></i> Tech Spotlight</span>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Core Expertise</h3>
              <p className="text-sm text-[#64748B] mb-6">These are the primary frameworks and tools I architect with on a daily basis:</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Next.js / React', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                { name: 'Angular', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
                { name: 'Vue.js', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
                { name: '.NET Core', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
                { name: 'Node.js', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
                { name: 'Python', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'PHP', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
                { name: 'Laravel', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
                { name: 'WordPress', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg' },
                { name: 'Flutter', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
                { name: 'AWS / Cloud', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
                { name: 'Docker', imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'AI Integrations', icon: 'fa-solid fa-brain', color: 'text-[#a855f7]' }
              ].map((tech) => (
                <div key={tech.name} className="flex items-center gap-2.5 p-3 bg-[#FAF9F5] border border-[#0f172a08] rounded-lg">
                  {tech.imgUrl ? (
                    <img src={tech.imgUrl} alt={tech.name} className="w-4 h-4 object-contain" />
                  ) : tech.icon && tech.icon.startsWith('<svg') ? (
                    <span className={`w-3.5 h-3.5 flex items-center justify-center ${tech.color}`} dangerouslySetInnerHTML={{ __html: tech.icon }}></span>
                  ) : (
                    <i className={`${tech.icon} ${tech.color} text-sm`}></i>
                  )}
                  <span className="text-xs font-semibold text-[#475569]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bento Card */}
          <div className="glass-card bento-card p-6 md:p-8 hover:border-[rgba(255,160,0,0.2)] transition-colors duration-300 reveal">
            <div>
              <span className="badge mb-4"><i className="fa-solid fa-chart-simple text-xs"></i> Metrics</span>
              <h3 className="text-lg font-bold text-[#111827] mb-4">Key Milestones</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric target={10} label="Years Exp" />
              <Metric target={50} label="Projects" />
              <Metric target={15} label="Clients" />
              <Metric target={13} label="Core Tech" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
