import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenisRef]);

  return null;
}
