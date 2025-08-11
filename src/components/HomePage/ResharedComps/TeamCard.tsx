import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Mail, Phone, Twitter, Linkedin, Github, User, Briefcase, ChevronRight } from "lucide-react";

interface TeamCardProps {
    name: string;
    role: string;
    bio: string;
    image: string;
    theme: 'light' | 'dark';
    personal?: {
        age?: number | string;
        location?: string;
        interests?: string[];
    };
    contact?: {
        email?: string;
        phone?: string;
    };
    social?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    experience?: {
        position?: string;
        department?: string;
        skills?: string[];
    };
}

const TeamCard = ({ name, role, bio, image, theme, personal, contact, social, experience }: TeamCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

    // Theme classes
    const bgClass = theme === 'dark' ? 'bg-glass-dark' : 'bg-glass-light';
    const textPrimary = theme === 'dark' ? 'text-primary' : 'text-primary';
    const textAccent = theme === 'dark' ? 'text-accent' : 'text-accent';
    const textSecondary = theme === 'dark' ? 'text-secondary' : 'text-secondary';
    const borderColor = theme === 'dark' ? 'border-color' : 'border-color';

    const tabs = [
        { id: 'personal', label: 'Personal', icon: <User size={16} /> },
        { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
        { id: 'social', label: 'Social', icon: <Twitter size={16} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <div className="space-y-4">
                        {personal?.age && (
                            <div className="flex items-center gap-3">
                                <span className={`${textAccent}`}>•</span>
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Age</p>
                                    <p className={textPrimary}>{personal.age}</p>
                                </div>
                            </div>
                        )}
                        {personal?.location && (
                            <div className="flex items-center gap-3">
                                <span className={`${textAccent}`}>•</span>
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Location</p>
                                    <p className={textPrimary}>{personal.location}</p>
                                </div>
                            </div>
                        )}
                        {personal?.interests && (
                            <div>
                                <p className={`text-xs font-medium mb-2 ${textAccent}`}>Interests</p>
                                <div className="flex flex-wrap gap-2">
                                    {personal.interests.map((interest, i) => (
                                        <motion.span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-xs text-primary ${theme === 'dark' ? 'bg-accent' : 'bg-surface'}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            {interest}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-4">
                        {contact?.email && (
                            <div className="flex items-center gap-3">
                                <Mail className={`${textAccent}`} size={16} />
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Email</p>
                                    <a href={`mailto:${contact.email}`} className={`${textPrimary} hover:underline`}>{contact.email}</a>
                                </div>
                            </div>
                        )}
                        {contact?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className={`${textAccent}`} size={16} />
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Phone</p>
                                    <a href={`tel:${contact.phone}`} className={`${textPrimary} hover:underline`}>{contact.phone}</a>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'social':
                return (
                    <div className="space-y-4">
                        {social?.twitter && (
                            <div className="flex items-center gap-3">
                                <Twitter className={`${textAccent}`} size={16} />
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Twitter</p>
                                    <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer" className={`${textPrimary} hover:underline`}>@{social.twitter}</a>
                                </div>
                            </div>
                        )}
                        {social?.linkedin && (
                            <div className="flex items-center gap-3">
                                <Linkedin className={`${textAccent}`} size={16} />
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>LinkedIn</p>
                                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={`${textPrimary} hover:underline`}>View Profile</a>
                                </div>
                            </div>
                        )}
                        {social?.github && (
                            <div className="flex items-center gap-3">
                                <Github className={`${textAccent}`} size={16} />
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>GitHub</p>
                                    <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className={`${textPrimary} hover:underline`}>@{social.github}</a>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-4">
                        {experience?.position && (
                            <div className="flex items-center gap-3">
                                <span className={`${textAccent}`}>•</span>
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Position</p>
                                    <p className={textPrimary}>{experience.position}</p>
                                </div>
                            </div>
                        )}
                        {experience?.department && (
                            <div className="flex items-center gap-3">
                                <span className={`${textAccent}`}>•</span>
                                <div>
                                    <p className={`text-xs font-medium ${textAccent}`}>Department</p>
                                    <p className={textPrimary}>{experience.department}</p>
                                </div>
                            </div>
                        )}
                        {experience?.skills && (
                            <div>
                                <p className={`text-xs font-medium mb-2 ${textAccent}`}>Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {experience.skills.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Compact Grid Card */}
            <motion.div
                className={`${bgClass} rounded-xl p-4  transition-all duration-300 cursor-pointer  `}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-4">
                    <motion.div 
                        className="w-16 h-16 rounded-lg overflow-hidden shrink-0"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold truncate ${textPrimary}`}>{name}</h3>
                        <p className={`text-sm font-medium ${textAccent}`}>{role}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                            {experience?.skills?.slice(0, 3).map((skill, i) => (
                                <motion.span
                                    key={i}
                                    className={`text-xs px-2 py-1 rounded-md ${theme === 'dark' ? 'bg-surface' : 'bg-surface'}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                            {experience?.skills && experience.skills.length > 3 && (
                                <span className="text-xs px-2 py-1 text-secondary">+{experience.skills.length - 3}</span>
                            )}
                        </div>
                    </div>

                    <ChevronRight className={`${textSecondary} shrink-0`} size={20} />
                </div>
            </motion.div>

            {/* Expanded Modal with Tabs */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className={`${theme === 'dark' ? 'bg-background' : 'bg-background'} rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl ${borderColor} border`}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-color">
                                <motion.h3 
                                    className={`text-2xl font-bold ${textPrimary}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {name}
                                </motion.h3>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-accent-hover' : 'hover:bg-accent-hover'}`}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className={textPrimary} size={20} />
                                </motion.button>
                            </div>

                            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                                {/* Profile Image */}
                                <motion.div 
                                    className="md:w-1/3 p-6 border-r border-color flex flex-col items-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="rounded-xl overflow-hidden aspect-square w-full max-w-xs shadow-lg mb-4">
                                        <img
                                            src={image}
                                            alt={name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h4 className={`text-lg font-semibold ${textAccent} text-center`}>{role}</h4>
                                    <p className={`text-sm ${textSecondary} text-center mt-2`}>{bio}</p>
                                </motion.div>

                                {/* Tabs Content */}
                                <div className="md:w-2/3 flex flex-col">
                                    {/* Tabs Navigation */}
                                    <motion.div 
                                        className="flex border-b border-color"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {tabs.map(tab => (
                                            <motion.button
                                                key={tab.id}
                                                className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 relative ${activeTab === tab.id ? textAccent : textSecondary}`}
                                                onClick={() => setActiveTab(tab.id)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {tab.icon}
                                                {tab.label}
                                                {activeTab === tab.id && (
                                                    <motion.div
                                                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-accent' : 'bg-accent'}`}
                                                        layoutId="underline"
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </motion.div>

                                    {/* Tab Content */}
                                    <motion.div 
                                        className="p-6 overflow-y-auto flex-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-glass-dark' : 'bg-glass-light'} h-full`}>
                                            {renderTabContent()}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TeamCard;