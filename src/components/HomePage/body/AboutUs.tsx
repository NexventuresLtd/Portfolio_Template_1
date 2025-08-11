import {
    Building2, Users, Award, Shield, Target, Heart, Star, TrendingUp, Clock, Wrench,
    Home, Factory, Store, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import SectionTitle from '../ResharedComps/SectionTitle';
import StatCard from '../ResharedComps/StatCard';
import ValueCard from '../ResharedComps/ValueCard1';
import ServiceCard from '../ResharedComps/ServiceCard1';
import TeamCard from '../ResharedComps/TeamCard';






const AboutUs = () => {
    const { theme } = useTheme();

    const stats = [
        {
            icon: Building2,
            value: '500+',
            label: 'Projects Completed',
            colorLight: 'bg-amber-100 text-amber-800',
            colorDark: 'bg-amber-700 text-amber-100',
        },
        {
            icon: Clock,
            value: '15+',
            label: 'Years Experience',
            colorLight: 'bg-zinc-100 text-zinc-800',
            colorDark: 'bg-zinc-700 text-zinc-100',
        },
        {
            icon: Users,
            value: '50+',
            label: 'Expert Team Members',
            colorLight: 'bg-slate-100 text-slate-800',
            colorDark: 'bg-slate-700 text-slate-100',
        },
        {
            icon: Star,
            value: '98%',
            label: 'Client Satisfaction',
            colorLight: 'bg-gray-50 text-gray-700',
            colorDark: 'bg-gray-600 text-gray-50',
        },
    ];




    const values = [
        {
            icon: Shield,
            title: 'Safety First',
            description:
                'We prioritize the safety of our workers, clients, and communities in every project, implementing rigorous safety protocols and standards.',
            colorLight: 'bg-stone-100 text-stone-800',
            colorDark: 'bg-stone-700 text-stone-100',
        },
        {
            icon: Award,
            title: 'Excellence',
            description:
                'We deliver exceptional quality through meticulous attention to detail, innovative solutions, and continuous improvement in our processes.',
            colorLight: 'bg-zinc-100 text-zinc-800',
            colorDark: 'bg-zinc-700 text-zinc-100',
        },
        {
            icon: Heart,
            title: 'Integrity',
            description:
                'We build lasting relationships through honest communication, transparent practices, and unwavering commitment to our promises.',
            colorLight: 'bg-slate-100 text-slate-800',
            colorDark: 'bg-slate-700 text-slate-100',
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description:
                'We embrace cutting-edge technology and modern construction methods to deliver efficient, sustainable, and future-ready solutions.',
            colorLight: 'bg-amber-100 text-amber-800',
            colorDark: 'bg-amber-700 text-amber-100',
        },
    ];



    const services = [
        {
            icon: Home,
            title: 'Residential Construction',
            items: [
                'Custom home design and construction',
                'Luxury apartments and condominiums',
                'Home renovations and extensions',
                'Interior design and finishing'
            ],
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            icon: Store,
            title: 'Commercial Projects',
            items: [
                'Office buildings and corporate centers',
                'Retail spaces and shopping complexes',
                'Hotels and hospitality facilities',
                'Educational and healthcare buildings'
            ],
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            icon: Factory,
            title: 'Industrial Construction',
            items: [
                'Manufacturing facilities and factories',
                'Warehouses and distribution centers',
                'Industrial infrastructure projects',
                'Specialized equipment installation'
            ],
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80'
        }
    ];

    const teamMembers = [
        {
            name: 'Eng. Robert',
            role: 'Founder & CEO',
            bio: 'Civil engineer with 20+ years of experience in construction management and project development.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Sarah Johnson',
            role: 'Director of Operations',
            bio: 'Construction management expert specializing in large-scale commercial projects.',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Michael Chen',
            role: 'Head of Engineering',
            bio: 'Structural engineer with expertise in sustainable building practices and innovative design.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80'
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-background' : 'bg-background'
            }`}>

            {/* Hero Section */}
            <section className={`relative py-20 md:py-24 overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                }`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={`inline-flex items-center px-4 py-2 mb-6 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                                }`}>
                                <Building2 className="w-4 h-4 mr-2 text-primary" />
                                <span className="text-sm font-medium text-primary">About Robert Construction</span>
                            </div>

                            <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-primary' : 'text-primary'
                                }`}>
                                Building Excellence,
                                <span className={`block ${theme === 'dark' ? 'text-accent' : 'text-accent'
                                    }`}>Crafting Futures</span>
                            </h1>

                            <p className={`text-base leading-relaxed mb-8 ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                                }`}>
                                Robert Construction is a trusted engineering and construction company led by{' '}
                                <strong className={theme === 'dark' ? 'text-primary' : 'text-primary'}>Eng. Robert</strong>, a highly skilled and experienced civil engineer
                                with a proven record of delivering innovative, sustainable, and high-quality projects.
                            </p>

                            <motion.button
                                className={`inline-flex items-center px-6 py-3 font-medium transition-colors duration-200 ${theme === 'dark'
                                    ? 'text-accent hover:bg-accent hover:text-primary'
                                    : 'text-accent hover:bg-accent hover:text-primary'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className={`p-4 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                                }`}>
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
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-background' : 'bg-background'
                }`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className={`overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                                }`}>
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
                                <Target className={`w-5 h-5 mr-3 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                                    }`} />
                                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-primary' : 'text-primary'
                                    }`}>Our Mission</h2>
                            </div>
                            <div className={`p-6 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                                }`}>
                                <p className={`text-base leading-relaxed mb-4 ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                                    }`}>
                                    We specialize in providing <strong className={theme === 'dark' ? 'text-primary' : 'text-primary'}>end-to-end construction and
                                        engineering solutions</strong> for residential, commercial, and industrial developments.
                                </p>
                                <p className={`leading-relaxed ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                                    }`}>
                                    From concept design to final handover, our team ensures precision, quality, and efficiency
                                    in every project we undertake. Our commitment is built on{' '}
                                    <strong className={theme === 'dark' ? 'text-accent' : 'text-accent'}>integrity, safety, and excellence</strong>.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                }`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title="Our Core Values"
                        subtitle="These fundamental principles guide every decision we make and every project we deliver"
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
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-background' : 'bg-background'
                }`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title="Our Services"
                        subtitle="We design and construct durable, functional, and aesthetically pleasing buildings across all sectors"
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
                        className={`text-center p-8 relative overflow-hidden ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                            }`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Wrench className={`w-10 h-10 mx-auto mb-4 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                            }`} />
                        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-primary' : 'text-primary'
                            }`}>Complete Project Management</h3>
                        <p className={`text-base mb-6 max-w-2xl mx-auto ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                            }`}>
                            We handle everything from architectural design to finishing touches, ensuring seamless project delivery
                            with transparent communication and on-time completion.
                        </p>
                        <motion.button
                            className={`inline-flex items-center px-6 py-3 font-medium transition-colors duration-200 ${theme === 'dark'
                                ? 'text-accent hover:bg-accent hover:text-primary'
                                : 'text-accent hover:bg-accent hover:text-primary'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Start Your Project
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                }`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title="Meet Our Leadership"
                        subtitle="Experienced professionals guiding our company to excellence"
                        theme={theme}
                    />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
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