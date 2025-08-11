import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const StatCard = ({
    icon: Icon,
    value,
    label,
    theme,
    colorLight,
    colorDark,
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
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
                transition: { duration: 0.6 },
            });
        }
    }, [controls, inView]);
    const activeColor = theme === 'dark' ? colorDark : colorLight;
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className={`p-4 transition-all duration-300 hover:scale-105 rounded-2xl ${!activeColor ? (theme === "dark" ? "bg-glass-dark" : "bg-glass-light") : activeColor
                }`}
            whileHover={{ y: -3 }}
        >

            <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center mb-3 text-accent">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <motion.div
                    className="text-2xl font-bold mb-1 text-primary"
                    whileHover={{ scale: 1.05 }}
                >
                    {value}
                </motion.div>
                <div className="text-sm text-secondary">{label}</div>
            </div>
        </motion.div>
    );
};

export default StatCard;
