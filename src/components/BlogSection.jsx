import { blogData } from '../data/blogData';

export default function BlogSection({ onOpenArticle }) {
  return (
    <section id="insights" className="section-padding bg-white" role="region" aria-label="Blog & Insights">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="section-label justify-center reveal">Blog & Insights</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            Thinking in <span className="gradient-text">code</span>
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal">
            Deep dives into architecture decisions, tech choices, and solutions we've built for real clients.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {blogData.map((article) => (
            <article
              key={article.id}
              className="blog-card glass-card rounded-2xl p-6 md:p-8 reveal cursor-pointer"
              onClick={() => onOpenArticle(article.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpenArticle(article.id); }}
              aria-label={`Read article: ${article.title}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="blog-card-emoji emoji-bounce" style={{ background: `${article.accent}12` }}>
                  {article.emoji}
                </span>
                <span className="blog-card-cat" style={{ color: article.accent }}>{article.category}</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#111827] leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 text-xs text-[#64748B]">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#64748B]"></span>
                  <span>{article.readTime}</span>
                </div>
                <span className="blog-card-arrow" style={{ color: article.accent }}>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
