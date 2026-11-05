const services = [
  {
    title: 'Generative AI',
    outcome: 'Ship content, code, and creative assets with custom GenAI pipelines.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    iconBg: 'bg-[#ffa00014]',
    iconColor: 'text-[var(--accent-1)]',
    cta: 'Get a quote',
  },
  {
    title: 'AI Chatbots',
    outcome: 'Always-on assistants that answer, qualify leads, and support customers.',
    icon: 'fa-solid fa-comments',
    iconBg: 'bg-[#12284c14]',
    iconColor: 'text-[#12284C]',
    cta: 'Learn more',
  },
  {
    title: 'RAG',
    outcome: 'Ground LLMs in your docs so answers stay accurate and citeable.',
    icon: 'fa-solid fa-book-open',
    iconBg: 'bg-[#2fa84f14]',
    iconColor: 'text-[#2fa84f]',
    cta: 'Get a quote',
  },
  {
    title: 'Agentic AI',
    outcome: 'Multi-step agents that plan, tool-call, and complete real work.',
    icon: 'fa-solid fa-robot',
    iconBg: 'bg-[#ffa00014]',
    iconColor: 'text-[var(--accent-1)]',
    cta: 'Learn more',
  },
  {
    title: 'AI Workflow Automation',
    outcome: 'Connect n8n, Zapier, Make, and OpenAI into reliable business flows.',
    icon: 'fa-solid fa-diagram-project',
    iconBg: 'bg-[#12284c14]',
    iconColor: 'text-[#12284C]',
    cta: 'Get a quote',
  },
  {
    title: 'Voice AI Agents',
    outcome: 'Phone and voice agents that book, qualify, and handle live calls.',
    icon: 'fa-solid fa-microphone-lines',
    iconBg: 'bg-[#2fa84f14]',
    iconColor: 'text-[#2fa84f]',
    cta: 'Learn more',
  },
  {
    title: 'LLM Integrations',
    outcome: 'Embed GPT and other models into your product with solid APIs.',
    icon: 'fa-solid fa-plug',
    iconBg: 'bg-[#ffa00014]',
    iconColor: 'text-[var(--accent-1)]',
    cta: 'Get a quote',
  },
];

export default function AiServices({ onOpenModal }) {
  return (
    <section id="ai-services" className="section-padding bg-white" role="region" aria-label="AI Services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="section-label justify-center reveal">AI Services</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            AI that delivers <span className="gradient-text">business outcomes</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal leading-relaxed">
            From chatbots and RAG to agentic workflows — practical AI built for production.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <div key={service.title} className="reveal">
              <div className="ai-service-card h-full flex flex-col rounded-2xl p-6 md:p-8 border border-[#0f172a08] bg-[#FAF9F5] transition-all duration-300 hover:border-[rgba(255,160,0,0.22)] hover:shadow-md">
                <div className={`skill-icon-wrap ${service.iconBg} ${service.iconColor} mb-4`}>
                  <i className={`${service.icon} text-xl`} aria-hidden="true"></i>
                </div>
                <h3 className="font-bold text-lg text-[#111827]">{service.title}</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed flex-1">{service.outcome}</p>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="mt-5 self-start text-sm !py-2.5 !px-5 magnetic-btn btn-outline"
                >
                  {service.cta}
                  <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
