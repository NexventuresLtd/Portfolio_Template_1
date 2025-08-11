import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  theme: 'light' | 'dark';
}

const TeamCard = ({ name, role, bio, image, theme }: TeamCardProps) => {
  const bgClass = theme === 'dark' 
    ? 'bg-glass-dark' 
    : 'bg-glass-light';

  const textPrimary = theme === 'dark' ? 'text-primary' : 'text-primary';
  const textAccent = theme === 'dark' ? 'text-accent' : 'text-accent';
  const textSecondary = theme === 'dark' ? 'text-secondary' : 'text-secondary';

  return (
    <motion.div
      className={`${bgClass} p-6 rounded-3xl text-center transition-all duration-300 cursor-pointer select-none h-full`}
      whileHover={{zoom:1.1}}
    >
      <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border-4 border-color group relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <h3 className={`text-xl font-semibold mb-1 ${textPrimary}`}>{name}</h3>
      <p className={`text-sm font-medium mb-3 uppercase tracking-wide ${textAccent}`}>{role}</p>
      <p className={`text-xs leading-relaxed max-w-[280px] mx-auto ${textSecondary}`}>{bio}</p>
    </motion.div>
  );
};

export default TeamCard;
