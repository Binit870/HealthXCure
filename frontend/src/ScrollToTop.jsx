// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current location object from React Router
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the 'pathname' (route) changes, scroll to the top of the page.
    window.scrollTo(0, 0);
  }, [pathname]); // Rerun the effect whenever the pathname changes

  // This component doesn't render anything, it just handles the side effect
  return null;
};

export default ScrollToTop;