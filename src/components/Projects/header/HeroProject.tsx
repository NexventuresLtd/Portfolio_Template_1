import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowDown, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides, stats } from '../../../constants/ProjectHero';

const ProjectsHero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);



    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPlaying, heroSlides.length]);

    const scrollToProjects = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-background pt-24 ">
            {/* Background Slideshow */}
            <div className="absolute inset-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0.9, zoom: 0.2 }}
                        animate={{ opacity: 1, zoom: 1 }}
                        exit={{ opacity: 0.9, zoom: 0.2 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroSlides[currentSlide].image}
                            alt={heroSlides[currentSlide].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/80" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen">
                <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-8">
                            {/* Company Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 bg-surface/30 backdrop-blur-sm rounded-full px-6 py-3"
                            >
                                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                <span className="text-sm font-medium">Engineering Excellence Since 1999</span>
                            </motion.div>

                            {/* Dynamic Content */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <h3 className="text-accent font-semibold text-lg tracking-wide uppercase">
                                        {heroSlides[currentSlide].subtitle}
                                    </h3>
                                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                        <span className="block">Our</span>
                                        <span className="block text-primary">
                                            Projects
                                        </span>
                                    </h1>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-xl text-white leading-relaxed max-w-lg"
                                >
                                    {heroSlides[currentSlide].description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-lg text-white leading-relaxed max-w-2xl"
                                >
                                    <p className="mb-4">
                                        Led by <strong className="text-white">Eng. Robert</strong>, our experienced team delivers
                                        innovative, sustainable, and high-quality construction solutions across Rwanda.
                                    </p>
                                    <p>
                                        From concept design to final handover, we ensure precision, quality, and efficiency
                                        in every project we undertake.
                                    </p>
                                </motion.div>
                            </div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={scrollToProjects}
                                    className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:bg-primary/90"
                                >
                                    Explore Our Work
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm bg-surface/30 hover:bg-surface/50">
                                    Contact Eng. Robert
                                </button>
                            </motion.div>

                            {/* Core Values */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-wrap gap-6 text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span className="text-white">Integrity</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span className="text-white">Safety</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                    <span className="text-white">Excellence</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content - Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        className="bg-surface/30 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <Icon className="w-8 h-8 text-accent group-hover:text-accent-hover transition-colors" />
                                            <div className="text-3xl font-bold text-white">{stat.number}</div>
                                        </div>
                                        <p className="text-white text-sm font-medium">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Slideshow Controls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
            >
                <div className="flex items-center gap-4 bg-surface/30 backdrop-blur-sm rounded-full px-6 py-3">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-accent transition-colors"
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <div className="flex gap-2">
                        {heroSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-accent w-8' : 'bg-secondary/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    y: [0, 10, 0]
                }}
                transition={{
                    delay: 1.6,
                    repeat: Infinity,
                    duration: 1.5
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <button
                    onClick={scrollToProjects}
                    className="text-white hover:text-white transition-colors"
                >
                    <ArrowDown className="w-6 h-6" />
                </button>
            </motion.div>
        </div>
    );
};

export default ProjectsHero;