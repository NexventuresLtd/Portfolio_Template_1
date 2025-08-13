import React from 'react';
import {
    Phone,
    ArrowRight,
    Building2,
    Users,
    Award,
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';

const Hero: React.FC = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();

    const stats = [
        { icon: Building2, value: '500+', label: t('hero.stats.projects') },
        { icon: Users, value: '15+', label: t('hero.stats.experience') },
        { icon: Award, value: '100%', label: t('hero.stats.satisfaction') }
    ];

    return (
        <section className={`relative min-h-screen flex items-center pt-20 justify-center overflow-hidden ${theme === 'dark' ? 'dark:bg-background' : 'bg-background'}`}>
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 z-10 ${theme === 'dark'
                    ? 'bg-black/60'
                    : 'bg-black/50'
                    }`}></div>
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        src="/3dVideo/3dEffect.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Construction-themed background pattern */}
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="construction" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect width="20" height="20" fill="none" stroke={theme === 'dark' ? 'lightgray' : 'lightgray'} strokeWidth="0.5" />
                                <rect x="2" y="2" width="6" height="6" fill={theme === 'dark' ? 'lightgray' : 'lightgray'} />
                                <rect x="12" y="12" width="6" height="6" fill={theme === 'dark' ? 'lightgray' : 'lightgray'} />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#construction)" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-md:pt-6">
                <div className="max-w-7xl mx-auto">
                    {/* Badge */}
                    <div className={`inline-flex items-center px-4 py-2 ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-accent text-white'} rounded-full text-sm font-medium mb-6 ${theme === 'dark' ? 'dark:border-secondary' : 'border-accent'}`}>
                        <Award className="h-4 w-4 mr-2" />
                        {t('hero.badge')}
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight px-4">
                        {t('hero.headingPart1')}
                        {" "}{t('hero.headingPart2')}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
                        dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
                    />

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
                        <a
                            href="#projects"
                            className={`${theme === 'dark' ? 'bg-secondary hover:bg-secondary' : 'bg-accent hover:bg-accent-hover'} text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl`}
                        >
                            <span>{t('hero.ctaProjects')}</span>
                            <ArrowRight className="h-5 w-5" />
                        </a>
                        <a
                            href="#contact"
                            className="bg-transparent  text-white hover:bg-white hover:text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <Phone className="h-5 w-5" />
                            <span>{t('hero.ctaQuote')}</span>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="text-center group">
                                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-accent text-white'} rounded-full mb-4 mx-auto transition-colors duration-300`}>
                                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                                    </div>
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-gray-300 font-medium text-sm sm:text-base">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;