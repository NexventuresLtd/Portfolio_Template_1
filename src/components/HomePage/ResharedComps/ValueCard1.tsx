import { useAnimation, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer'; // ✅ CORRECT

import { useEffect } from "react";
// Value Card
const ValueCard = ({ icon: Icon, title, description, theme,colorDark,colorLight }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    theme: string;
    colorLight?: string;
    colorDark?: string;
}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 }
            });
        }
    }, [controls, inView]);
    const activeColor = theme === 'dark' ? colorDark : colorLight;
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className={`group p-5 transition-all duration-300 rounded-2xl ${!activeColor ? (theme === "dark" ? "bg-glass-dark" : "bg-glass-light") : activeColor
                }`}
            whileHover={{ scale: 1.02 }}
        >
            <div className={`w-10 h-10 flex items-center justify-center mb-4 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                }`}>
                <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 text-primary" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-primary' : 'text-primary'
                }`}>{title}</h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                }`}>{description}</p>
        </motion.div>
    );
};
export default ValueCard