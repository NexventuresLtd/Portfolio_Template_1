import { useAnimation, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer'; 

import { useEffect } from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  theme: 'light' | 'dark'; // optional: limit to known values
}

const SectionTitle = ({ title, subtitle, theme }: SectionTitleProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center mb-12"
    >
      <h2
        className={`text-2xl md:text-3xl font-bold mb-4 ${
          theme === "dark" ? "text-primary" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-base max-w-3xl mx-auto ${
          theme === "dark" ? "text-secondary" : "text-secondary"
        }`}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
