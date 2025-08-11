import { useAnimation, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer'; // ✅ CORRECT

import { useEffect } from "react";
// Service Card
const ServiceCard = ({ icon: Icon, title, items, theme, image }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    items: string[];
    theme: string;
    image: string;
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

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className={`overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                }`}
            whileHover={{ y: -5 }}
        >
            <div className="h-40 overflow-hidden relative group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>
            <div className="p-5">
                <div className="flex items-center mb-4">
                    <div className={`w-8 h-8 flex items-center justify-center mr-3 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                        }`}>
                        <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-primary' : 'text-primary'
                        }`}>{title}</h3>
                </div>
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            className="flex items-start"
                            whileHover={{ x: 3 }}
                        >
                            <div className={`w-1 h-1 mt-2 mr-3 flex-shrink-0 ${theme === 'dark' ? 'bg-accent' : 'bg-accent'
                                }`} />
                            <span className={`text-sm ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                                }`}>{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};
export default ServiceCard