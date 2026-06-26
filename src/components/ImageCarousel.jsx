import { useState, useCallback, useRef, useEffect } from 'react';

export default function ImageCarousel({ project }) {
  const images = project.images?.length > 0
    ? project.images
    : project.image
      ? [project.image]
      : [];

  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const hasMultiple = images.length > 1;
  const accent = project.accent || '#2563EB';

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple || paused) return;
    intervalRef.current = setInterval(goNext, 3000);
    return () => clearInterval(intervalRef.current);
  }, [hasMultiple, paused, goNext]);

  useEffect(() => {
    if (!hasMultiple) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [hasMultiple, goNext, goPrev]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (images.length === 0) return null;

  return (
    <div
      className="carousel-wrap"
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((src, i) => (
            failedImages.has(i) ? (
              <div key={i} className="carousel-slide z-10 w-full h-full flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-6xl md:text-7xl lg:text-8xl mb-4 opacity-90">{project.emoji}</div>
                <p className="font-bold text-xl md:text-2xl text-center" style={{ color: project.accent }}>{project.visualTitle}</p>
                <p className="text-sm md:text-base text-center mt-2 opacity-80" style={{ color: project.accent }}>{project.visualSub}</p>
              </div>
            ) : (
              <img
                key={i}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                className="carousel-slide z-10 w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.10))' }}
                draggable={false}
                onError={() => {
                  setFailedImages(prev => {
                    const newSet = new Set(prev);
                    newSet.add(i);
                    return newSet;
                  });
                }}
              />
            )
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              className="carousel-arrow carousel-arrow-prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{ color: accent }}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="carousel-arrow carousel-arrow-next"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{ color: accent }}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              style={i === current ? { background: accent, borderColor: accent } : {}}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
