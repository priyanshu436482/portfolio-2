const tools = [
  { name: 'JetBrains', icon: 'fa-solid fa-code' },
  { name: 'Copilot', icon: 'fa-brands fa-github' },
  { name: 'OpenAI', icon: 'fa-solid fa-brain' },
  { name: 'Claude', icon: 'fa-solid fa-message' },
  { name: 'Cursor', icon: 'fa-solid fa-i-cursor' },
  { name: 'Gemini', icon: 'fa-solid fa-sparkles' },
  { name: 'Grok', icon: 'fa-brands fa-x-twitter' },
  { name: 'And many more', icon: 'fa-solid fa-ellipsis' },
];

export default function AiAssisted() {
  return (
    <section
      id="ai-assisted"
      className="section-padding bg-[#FAF8F5]"
      role="region"
      aria-label="AI-Assisted Engineering"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <div className="section-label justify-center reveal">How I Work</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal leading-tight">
            AI-Assisted,{' '}
            <span className="gradient-text">Never AI-Dependent</span>
          </h2>
          <p className="text-[#475569] mt-5 md:text-lg reveal leading-relaxed">
            I use AI to speed up repetitive work like boilerplate, test writing, refactoring, and
            documentation. How I engineer doesn&apos;t change: every change gets reviewed by a
            person, covered by tests, and checked before it ships. AI helps me move faster, but I
            make the decisions.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-3 md:gap-4 list-none m-0 p-0 reveal">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="inline-flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 rounded-xl border border-[#0f172a08] bg-white text-[#111827] font-semibold text-sm md:text-base transition-all duration-300 hover:border-[rgba(255,160,0,0.28)] hover:shadow-sm"
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#ffa00014] text-[var(--accent-1)]"
                aria-hidden="true"
              >
                <i className={`${tool.icon} text-sm`}></i>
              </span>
              {tool.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
