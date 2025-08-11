import { motion, AnimatePresence } from "framer-motion";
import { useState} from "react";
import { X, Hammer, HardHat, Ruler, ClipboardList, RefreshCw, HelpCircle } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import type { Service } from "../../../types/servicesTypes";



interface ServicesProps {
    services: Service[];

}

const ServicesComponent = ({ services }: ServicesProps) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { theme } = useTheme()
    // Theme classes from your palette
    const bgClass = theme === 'dark' ? 'bg-background' : 'bg-background';
    const textPrimary = theme === 'dark' ? 'text-primary' : 'text-primary';
    const textSecondary = theme === 'dark' ? 'text-secondary' : 'text-secondary';
    const textAccent = theme === 'dark' ? 'text-accent' : 'text-accent';
    const borderColor = theme === 'dark' ? 'border-color' : 'border-color';
    const cardBg = theme === 'dark' ? 'bg-surface' : 'bg-surface';

    // Icon components for services
    const serviceIcons = {
        construction: <Hammer className="w-8 h-8" />,
        engineering: <Ruler className="w-8 h-8" />,
        civil: <HardHat className="w-8 h-8" />,
        management: <ClipboardList className="w-8 h-8" />,
        renovation: <RefreshCw className="w-8 h-8" />,
        consultancy: <HelpCircle className="w-8 h-8" />
    };

    return (
        <div className={`${bgClass} py-16 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-full md:max-w-11/12 mx-auto" >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${textPrimary}`}>
                        What We Do
                    </h2>
                    <p className={`mt-4 max-w-2xl text-xl mx-auto ${textSecondary}`}>
                        Comprehensive construction solutions from concept to completion
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`rounded-xl overflow-hidden ${cardBg} ${borderColor} cursor-pointer transition-all duration-300`}
                            onClick={() => setSelectedService(service)}
                        >
                            <div className="p-6">
                                <div className={`flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/20'} ${textAccent}`}>
                                    {serviceIcons[service.id as keyof typeof serviceIcons] || serviceIcons.construction}
                                </div>
                                <h3 className={`text-xl font-bold text-center mb-3 ${textPrimary}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-center ${textSecondary}`}>
                                    {service.shortDescription}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`mt-6 w-full py-2 rounded-lg font-medium bg-primary hover:bg-primary-hover text-white transition-colors`}
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Service Detail Modal */}
                <AnimatePresence>
                    {selectedService && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                        >
                            <motion.div
                                className={`${theme === 'dark' ? 'bg-surface' : 'bg-surface'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${borderColor}`}
                                initial={{ scale: 0.9, opacity: 0, zoom: 0 }}
                                animate={{ scale: 1, opacity: 1, zoom: 1 }}
                                exit={{ scale: 0.9, opacity: 0, zoom: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className={`flex items-center justify-center w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-primary/20' : 'bg-accent/20'} ${textAccent} mb-4`}>
                                                {serviceIcons[selectedService.id as keyof typeof serviceIcons] || serviceIcons.construction}
                                            </div>
                                            <h3 className={`text-2xl font-bold ${textPrimary}`}>
                                                {selectedService.title}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => setSelectedService(null)}
                                            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-primary/20' : 'hover:bg-accent/20'}`}
                                        >
                                            <X className={textPrimary} size={24} />
                                        </button>
                                    </div>

                                    <div className="mt-6 space-y-6">
                                        <div>
                                            <h4 className={`text-lg font-semibold mb-3 ${textAccent}`}>Service Overview</h4>
                                            <p className={textSecondary}>{selectedService.details.description}</p>
                                        </div>

                                        <div>
                                            <h4 className={`text-lg font-semibold mb-3 ${textAccent}`}>What We Offer</h4>
                                            <ul className="space-y-3">
                                                {selectedService.details.features.map((feature, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className={`flex items-start ${textPrimary}`}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <span className={`inline-block mr-2 mt-1 ${textAccent}`}>•</span>
                                                        {feature}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                                            <h4 className={`text-lg font-semibold mb-2 ${textAccent}`}>Our Commitment</h4>
                                            <p className={textSecondary}>{selectedService.details.commitment}</p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-3 rounded-lg font-medium bg-accent hover:bg-accent-hover text-white transition-colors`}
                                        >
                                            Contact Us About This Service
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Commitment Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`mt-24 p-8 rounded-xl ${theme === 'dark' ? 'bg-primary/10' : 'bg-accent/10'} ${borderColor} `}
                >
                    <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Our Commitment</h3>
                    <p className={`text-lg ${textSecondary}`}>
                        At Robert Construction, we combine technical expertise, modern tools, and skilled craftsmanship to deliver projects that are safe, functional, and sustainable. We aim to build lasting partnerships through transparency, reliability, and excellence.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};



export default ServicesComponent;