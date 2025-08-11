import React, { useState } from 'react';
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    ArrowRight,
    ExternalLink,
    ChevronUp,
    Code
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';

interface QuickLinkProps {
    title: string;
    links: { name: string; href: string; isExternal?: boolean }[];
    theme: 'light' | 'dark';
}

const QuickLinks: React.FC<QuickLinkProps> = ({ title, links }) => (
    <div>
        <h3 className="text-lg font-bold text-slate-200 mb-6">{title}</h3>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <a
                        href={link.href}
                        className={`flex items-center text-slate-200 hover:text-accent transition-colors duration-200 group ${link.isExternal ? 'hover:translate-x-1' : ''
                            }`}
                        target={link.isExternal ? '_blank' : '_self'}
                        rel={link.isExternal ? 'noopener noreferrer' : ''}
                    >
                        <span>{link.name}</span>
                        {link.isExternal && (
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        )}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

interface ContactInfoProps {
    theme: 'light' | 'dark';
    t: (key: string) => string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ theme, t }) => (
    <div>
        <h3 className="text-lg font-bold text-slate-200 mb-6">{t('footer.sections.contact')}</h3>
        <div className="space-y-4">
            <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${theme === 'dark' ? 'bg-accent/20' : 'bg-accent text-white'
                    }`}>
                    <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <p className="text-slate-100 text-sm mb-1">{t('footer.contact.phone')}</p>
                    <a href="tel:+250788123456" className="text-slate-200 text-xs hover:text-accent transition-colors">
                        +250 790 225 000
                    </a>
                </div>
            </div>

            <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${theme === 'dark' ? 'bg-accent/20' : 'bg-accent text-white'
                    }`}>
                    <Mail className="w-15 h-5 text-accent" />
                </div>
                <div>
                    <p className="text-slate-100 text-sm mb-1">{t('footer.contact.email')}</p>
                    <a href="mailto:info@robertconstruction.rw" className="text-slate-200 text-xs hover:text-accent transition-colors">
                        info@robertconstruction.rw
                    </a>
                </div>
            </div>

            <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${theme === 'dark' ? 'bg-accent/20' : 'bg-accent text-white'
                    }`}>
                    <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <p className="text-slate-100 text-sm mb-1">{t('footer.contact.location')}</p>
                    <p className="text-slate-200 text-xs">
                        KG 123 St, Kimisagara<br />
                        Nyarugenge, Kigali, Rwanda
                    </p>
                </div>
            </div>

            <div className="flex items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${theme === 'dark' ? 'bg-secondary/20' : 'bg-accent'
                    }`}>
                    <Clock className="w-5 h-5 text-slate-100" />
                </div>
                <div>
                    <p className="text-slate-100 text-sm mb-1">{t('footer.contact.hours')}</p>
                    <p className="text-slate-200 text-xs">
                        {t('footer.contact.hoursDetail').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

interface NewsletterProps {
    theme: 'light' | 'dark';
    t: (key: string) => string;
}

const Newsletter: React.FC<NewsletterProps> = ({ theme, t }) => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-slate-200 mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-slate-100 mb-6 leading-relaxed">
                {t('footer.newsletter.description')}
            </p>

            {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('footer.newsletter.placeholder')}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${theme === 'dark'
                                ? 'bg-surface border-color text-slate-200 placeholder-secondary/60 focus:border-accent'
                                : 'border-gray-500 text-slate-200 placeholder-secondary/60 focus:border-accent'
                                } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-sm transition-all duration-200 ${theme === 'dark'
                            ? 'bg-accent text-white hover:bg-accent-hover'
                            : 'bg-secondary text-white hover:bg-accent-hover'
                            } hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                        <span>{t('footer.newsletter.button')}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </form>
            ) : (
                <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-success/20' : 'bg-success/10'
                    }`}>
                    <div className="text-success text-2xl mb-2">✓</div>
                    <p className="text-success text-xs">{t('footer.newsletter.success.title')}</p>
                    <p className="text-slate-100 text-sm mt-1">{t('footer.newsletter.success.message')}</p>
                </div>
            )}

            {/* Social Media Links */}
            <div className="mt-8">
                <p className="text-slate-100 text-sm mb-4">{t('footer.social')}</p>
                <div className="flex space-x-4">
                    {[
                        { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
                        { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
                        { icon: Youtube, href: '#', label: 'YouTube', color: '#FF0000' },
                        { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' }
                    ].map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                    ? 'bg-surface border border-color hover:border-accent/50'
                                    : 'hover:shadow-lg'
                                    }`}
                                style={{ '--hover-color': social.color } as React.CSSProperties}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = social.color + '20';
                                    e.currentTarget.style.borderColor = social.color + '50';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '';
                                    e.currentTarget.style.borderColor = '';
                                }}
                            >
                                <Icon className="w-5 h-5 text-slate-100 hover:text-slate-200" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Footer: React.FC = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Show back to top button when scrolling
    React.useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const companyLinks = [
        { name: t('footer.links.about'), href: '#about' },
        { name: t('footer.links.team'), href: '#team' },
        { name: t('footer.links.values'), href: '#values' },
        { name: t('footer.links.mission'), href: '#mission' },
        { name: t('footer.links.service'), href: '/service' }
    ];

    const legalLinks = [
        { name: t('footer.legal.privacy'), href: '#privacy' },
        { name: t('footer.legal.terms'), href: '#terms' },
        { name: t('footer.legal.cookies'), href: '#cookies' },
        { name: t('footer.legal.disclaimer'), href: '#disclaimer' }
    ];


    return (
        <footer className={`relative transition-colors duration-300 ${theme === 'dark' ? 'dark bg-surface' : 'light bg-primary'
            }`}>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${theme === 'dark' ? 'bg-accent text-white' : 'bg-accent text-white'
                        }`}
                    aria-label="Back to top"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
            )}

            {/* Main Footer Content */}
            <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-4 gap-12 ">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <Building2 className="w-8 h-8 text-white mr-3" />
                            <span className="text-xl font-bold text-slate-200">{t('footer.companyName')}</span>
                        </div>
                        <p className="text-slate-100 mb-6 leading-relaxed">
                            {t('footer.tagline')}
                        </p>


                    </div>

                    {/* Quick Links */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:col-span-2 w-full">
                        <QuickLinks title={t('footer.sections.company')} links={companyLinks} theme={theme} />
                        <ContactInfo theme={theme} t={t} />
                    </div>

                    {/* Contact & Newsletter */}
                    <Newsletter theme={theme} t={t} />


                </div>
            </div>

            {/* Bottom Bar */}
            <div className={` ${theme === 'dark' ? 'border-color bg-background' : 'border-color bg-gray-800'}`}>
                <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-slate-100 text-sm text-center md:text-left">
                                {t('footer.legal.copyright')}
                            </p>
                            <div className="flex items-center space-x-4">
                                {legalLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="text-slate-100 hover:text-accent text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center text-slate-100 text-sm cursor-pointer" onClick={() => window.location.href = "https://www.nexventures.net"}>
                            <span>{t('footer.developer')}</span>
                            <Code className="w-4 h-4 mx-1 text-accent" />
                            <span className='font-bold text-amber-700'>NexVenture</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;