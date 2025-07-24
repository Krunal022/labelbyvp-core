import { useState, useEffect } from "react";

function useResponsiveRadius() {
  const [radius, setRadius] = useState(5.5);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRadius(4); // Mobile
      } else if (width < 1024) {
        setRadius(5); // Tablet
      } else {
        setRadius(5.5); // Desktop
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return radius;
}

export default useResponsiveRadius;
