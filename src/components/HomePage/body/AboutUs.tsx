import {
    Building2, Users, Award, Shield, Target, Heart, Star, TrendingUp, Clock, Wrench,
    Home, Factory, Store, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import SectionTitle from '../ResharedComps/SectionTitle';
import StatCard from '../ResharedComps/StatCard';
import ValueCard from '../ResharedComps/ValueCard1';
import ServiceCard from '../ResharedComps/ServiceCard1';
import TeamCard from '../ResharedComps/TeamCard';

const AboutUs = () => {
    const { theme } = useTheme();
    const { t, getTranslatedArray } = useLanguage();

    const stats = [
        {
            icon: Building2,
            value: '500+',
            label: t('about.stats.projects'),
            colorLight: 'bg-amber-100 text-amber-800',
            colorDark: 'bg-amber-700 text-amber-100',
        },
        {
            icon: Clock,
            value: '15+',
            label: t('about.stats.experience'),
            colorLight: 'bg-zinc-100 text-zinc-800',
            colorDark: 'bg-zinc-700 text-zinc-100',
        },
        {
            icon: Users,
            value: '50+',
            label: t('about.stats.team'),
            colorLight: 'bg-slate-100 text-slate-800',
            colorDark: 'bg-slate-700 text-slate-100',
        },
        {
            icon: Star,
            value: '98%',
            label: t('about.stats.satisfaction'),
            colorLight: 'bg-gray-50 text-gray-700',
            colorDark: 'bg-gray-600 text-gray-50',
        },
    ];

    const values = [
        {
            icon: Shield,
            title: t('about.values.safety.title'),
            description: t('about.values.safety.description'),
            colorLight: 'bg-stone-100 text-stone-800',
            colorDark: 'bg-stone-700 text-stone-100',
        },
        {
            icon: Award,
            title: t('about.values.excellence.title'),
            description: t('about.values.excellence.description'),
            colorLight: 'bg-zinc-100 text-zinc-800',
            colorDark: 'bg-zinc-700 text-zinc-100',
        },
        {
            icon: Heart,
            title: t('about.values.integrity.title'),
            description: t('about.values.integrity.description'),
            colorLight: 'bg-slate-100 text-slate-800',
            colorDark: 'bg-slate-700 text-slate-100',
        },
        {
            icon: TrendingUp,
            title: t('about.values.innovation.title'),
            description: t('about.values.innovation.description'),
            colorLight: 'bg-amber-100 text-amber-800',
            colorDark: 'bg-amber-700 text-amber-100',
        },
    ];

    const services = [
        {
            icon: Home,
            title: t('about.services.residential.title'),
            items: getTranslatedArray('about.services.residential.items'),
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            icon: Store,
            title: t('about.services.commercial.title'),
            items: getTranslatedArray('about.services.commercial.items'),
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            icon: Factory,
            title: t('about.services.industrial.title'),
            items: getTranslatedArray('about.services.industrial.items'),
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80'
        }
    ];

    const teamMembers = getTranslatedArray('about.team.members').map((member: any, index: number) => ({
        ...member,
        image: [
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
        ][index]
    }));

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-background' : 'bg-background'}`}>
            {/* Hero Section */}
            <section id='about' className={`relative py-20 md:py-24 overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={`inline-flex items-center px-4 py-2 mb-6 ${theme === 'dark' ? 'text-accent' : 'text-accent'}`}>
                                <Building2 className="w-4 h-4 mr-2 text-primary" />
                                <span className="text-sm font-medium text-primary">{t('about.hero.badge')}</span>
                            </div>

                            <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
                                {t('about.hero.titlePart1')}
                                <span className={`block ${theme === 'dark' ? 'text-accent' : 'text-accent'}`}>
                                    {t('about.hero.titlePart2')}
                                </span>
                            </h1>

                            <p
                                className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-secondary' : 'text-secondary'}`}
                                dangerouslySetInnerHTML={{ __html: t('about.hero.description') }}
                            />

                            <motion.button
                                className={`inline-flex items-center px-6 py-3 font-medium transition-colors duration-200 ${theme === 'dark'
                                    ? 'text-accent hover:bg-accent hover:text-primary'
                                    : 'text-accent hover:bg-accent hover:text-primary'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t('about.hero.cta')}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className={`p-4 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}>
                                <img src="https://www.newtimes.co.rw/uploads/imported_images/files/main/articles/2020/06/12/workers-at-a-construction-site.jpg" alt="" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                icon={stat.icon}
                                value={stat.value}
                                label={stat.label}
                                theme={theme}
                                colorLight={stat.colorLight}
                                colorDark={stat.colorDark}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-background' : 'bg-background'}`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className={`overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}>
                                <div className="h-92 overflow-hidden">
                                    <img
                                        src="https://www.azuremagazine.com/wp-content/uploads/2024/01/2024-projects.gif"
                                        alt="Construction team meeting"
                                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-6">
                                <Target className={`w-5 h-5 mr-3 ${theme === 'dark' ? 'text-accent' : 'text-accent'}`} />
                                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
                                    {t('about.mission.title')}
                                </h2>
                            </div>
                            <div className={`p-6 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}>
                                <p
                                    className={`text-base leading-relaxed mb-4 ${theme === 'dark' ? 'text-secondary' : 'text-secondary'}`}
                                    dangerouslySetInnerHTML={{ __html: t('about.mission.description1') }}
                                />
                                <p
                                    className={`leading-relaxed ${theme === 'dark' ? 'text-secondary' : 'text-secondary'}`}
                                    dangerouslySetInnerHTML={{ __html: t('about.mission.description2') }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={t('about.values.title')}
                        subtitle={t('about.values.subtitle')}
                        theme={theme}
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <ValueCard
                                key={index}
                                icon={value.icon}
                                title={value.title}
                                description={value.description}
                                colorDark={value.colorDark}
                                colorLight={value.colorLight}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-background' : 'bg-background'}`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={t('about.services.title')}
                        subtitle={t('about.services.subtitle')}
                        theme={theme}
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                items={service.items}
                                theme={theme}
                                image={service.image}
                            />
                        ))}
                    </div>

                    <motion.div
                        className={`text-center p-8 relative overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Wrench className={`w-10 h-10 mx-auto mb-4 ${theme === 'dark' ? 'text-accent' : 'text-accent'}`} />
                        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
                            {t('about.services.management.title')}
                        </h3>
                        <p className={`text-base mb-6 max-w-2xl mx-auto ${theme === 'dark' ? 'text-secondary' : 'text-secondary'}`}>
                            {t('about.services.management.description')}
                        </p>
                        <motion.button
                            className={`inline-flex items-center px-6 py-3 font-medium transition-colors duration-200 ${theme === 'dark'
                                ? 'text-accent hover:bg-accent hover:text-primary'
                                : 'text-accent hover:bg-accent hover:text-primary'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('about.services.management.cta')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`} id='team'>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={t('about.team.title')}
                        subtitle={t('about.team.subtitle')}
                        theme={theme}
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start lg:min-h-92 lg:overflow-hidden">
                        {teamMembers.map((member: any, index: number) => (
                            <TeamCard
                                key={index}
                                name={member.name}
                                role={member.role}
                                bio={member.bio}
                                image={member.image}
                                theme={theme}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;