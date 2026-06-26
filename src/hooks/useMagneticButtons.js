import { useEffect } from 'react';

export function useMagneticButtons() {
  useEffect(() => {
    // Only run on desktop/non-touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const initMagnetic = () => {
      const buttons = document.querySelectorAll('.magnetic-btn');
      
      const handleMouseMove = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        // Calculate distance from center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move the button towards the mouse (magnetic pull)
        btn.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
      };
      
      const handleMouseLeave = (e) => {
        const btn = e.currentTarget;
        btn.style.transform = ''; // Let CSS transition handle the snap back
      };

      buttons.forEach(btn => {
        btn.addEventListener('mousemove', handleMouseMove, { passive: true });
        btn.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      });

      return () => {
        buttons.forEach(btn => {
          btn.removeEventListener('mousemove', handleMouseMove);
          btn.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(initMagnetic, 500);
    return () => clearTimeout(timeout);
  }, []);
}
