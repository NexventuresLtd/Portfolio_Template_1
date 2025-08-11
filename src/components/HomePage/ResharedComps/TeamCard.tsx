import { motion } from "framer-motion";

// Team Card
const TeamCard = ({ name, role, bio, image, theme }: {
    name: string;
    role: string;
    bio: string;
    image: string;
    theme: string;
}) => {
    return (
        <motion.div
            className={`p-5 text-center h-full transition-all duration-300 ${theme === 'dark' ? 'bg-surface' : 'bg-surface'
                }`}
            whileHover={{ scale: 1.02 }}
        >
            <div className="w-20 h-20 overflow-hidden mx-auto mb-4 relative group">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3 className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-primary' : 'text-primary'
                }`}>{name}</h3>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-accent' : 'text-accent'
                }`}>{role}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-secondary' : 'text-secondary'
                }`}>{bio}</p>
        </motion.div>
    );
};
export default TeamCard