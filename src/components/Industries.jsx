import { useEffect, useRef } from 'react';

const industries = [
  {
    title: 'E-commerce',
    desc: 'Storefronts, catalogues, carts, and order flows built to convert.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="d" pathLength="1" d="M5 9h5l4.5 20h20L40 15H12" />
        <circle cx="19" cy="38" r="3" />
        <circle cx="32" cy="38" r="3" />
        <rect className="a pkg" x="19" y="3" width="10" height="9" rx="1.5" />
      </svg>
    ),
  },
  {
    title: 'Appliances',
    desc: 'Product discovery, inventory, warranties, and service workflows.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect className="d" pathLength="1" x="9" y="5" width="30" height="38" rx="4" />
        <path d="M9 14h30" />
        <circle cx="15" cy="9.5" r="1.2" />
        <path d="M22 9.5h10" />
        <circle cx="24" cy="29" r="9" />
        <g className="spin a">
          <path d="M17.5 29c2-3 4-3 6.5 0s4.5 3 6.5 0" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Healthcare',
    desc: 'Incident reporting, compliance tools, and care-team platforms.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="d" pathLength="1" d="M24 42s-14-9.5-14-20a8 8 0 0 1 14-5.2A8 8 0 0 1 38 22c0 10.5-14 20-14 20z" />
        <path className="a pulse-line" d="M14 23h5l3-6 4 12 3-6h5" />
      </svg>
    ),
  },
  {
    title: 'Enterprise',
    desc: 'Operations dashboards, ERP-style systems, and scalable workflows.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="d" pathLength="1" d="M10 42V12a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v30" />
        <path d="M30 22h6a2 2 0 0 1 2 2v18" />
        <path d="M8 42h32" />
        <g className="wins">
          <path d="M15 16h4M23 16h4M15 22h4M23 22h4M15 28h4M23 28h4" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Events',
    desc: 'Vendor coordination, attendee management, and production tools.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect className="d" pathLength="1" x="8" y="10" width="32" height="30" rx="3" />
        <path d="M8 18h32" />
        <path d="M16 6v8M32 6v8" />
        <g className="dots a">
          <circle className="dot" cx="16" cy="26" r="1.8" />
          <circle className="dot dot2" cx="24" cy="26" r="1.8" />
          <circle className="dot dot3" cx="32" cy="26" r="1.8" />
          <circle className="dot" cx="16" cy="34" r="1.8" />
          <circle className="dot dot2" cx="24" cy="34" r="1.8" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Beauty & salon',
    desc: 'Booking systems, staff calendars, and client history management.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="sw sw-l">
          <path className="d" pathLength="1" d="M14 8l6 20" />
          <circle cx="14" cy="8" r="2.5" />
        </g>
        <g className="sw sw-r">
          <path d="M34 8l-6 20" />
          <circle className="a" cx="34" cy="8" r="2.5" />
        </g>
        <path d="M18 36c2 4 10 4 12 0" />
        <circle cx="24" cy="30" r="2" />
      </svg>
    ),
  },
  {
    title: 'Veterinary',
    desc: 'Clinic scheduling, pet records, and treatment tracking.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse className="d" pathLength="1" cx="24" cy="30" rx="10" ry="8" />
        <g className="pads a">
          <ellipse className="pad" cx="12" cy="16" rx="4" ry="5" />
          <ellipse className="pad" cx="22" cy="12" rx="4" ry="5" />
          <ellipse className="pad" cx="32" cy="12" rx="4" ry="5" />
          <ellipse className="pad" cx="38" cy="18" rx="4" ry="5" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Publishing',
    desc: 'Editorial platforms, subscriptions, and content delivery.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="d" pathLength="1" d="M8 10c4-2 8-2 12 0v28c-4-2-8-2-12 0V10zM40 10c-4-2-8-2-12 0v28c4-2 8-2 12 0V10z" />
        <path className="a ln ln1" d="M12 18h6" />
        <path className="ln ln2" d="M12 24h6" />
        <path className="ln ln3" d="M30 18h6" />
      </svg>
    ),
  },
  {
    title: 'Analytics',
    desc: 'Research tools that turn raw data into clear decisions.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="d" pathLength="1" d="M8 38V12M8 38h32" />
        <g className="bars a">
          <rect className="bar bar1" x="14" y="24" width="5" height="14" rx="1" />
          <rect className="bar bar2" x="23" y="16" width="5" height="22" rx="1" />
          <rect className="bar bar3" x="32" y="20" width="5" height="18" rx="1" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Weddings',
    desc: 'Planning timelines, vendor networks, and guest experience apps.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle className="d" pathLength="1" cx="18" cy="24" r="9" />
        <circle className="a" cx="30" cy="24" r="9" />
        <path d="M24 17.5v13" />
      </svg>
    ),
  },
  {
    title: 'Custom platforms',
    desc: 'Bespoke apps shaped around how your team actually works.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect className="d lay l1" pathLength="1" x="10" y="10" width="28" height="8" rx="2" />
        <rect className="lay l2 a" x="10" y="20" width="28" height="8" rx="2" />
        <rect className="lay l3" x="10" y="30" width="28" height="8" rx="2" />
      </svg>
    ),
  },
  {
    title: 'And more',
    desc: 'New domains welcome — if it needs software, I can build it.',
    icon: (
      <svg className="ic" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle className="d" pathLength="1" cx="24" cy="24" r="17" />
        <path className="a plus" d="M24 16v16M16 24h16" />
      </svg>
    ),
  },
];

export default function Industries() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      grid.classList.add('is-drawn');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add('is-drawn');
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="industries"
      className="section-padding industries-section"
      role="region"
      aria-label="Industries"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="section-label justify-center reveal">Industries</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] reveal">
            Domains I have shipped software in
          </h2>
          <p className="text-[#475569] mt-4 md:text-lg reveal leading-relaxed">
            From healthcare and enterprise to e-commerce and events — real products for real operations.
          </p>
        </div>

        <ul ref={gridRef} className="industries-grid draw-in reveal">
          {industries.map((item, i) => (
            <li key={item.title} className="industry-cell" style={{ '--i': i }}>
              <span className="industry-icon mark-ic" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="industry-title">{item.title}</h3>
              <p className="industry-desc">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
