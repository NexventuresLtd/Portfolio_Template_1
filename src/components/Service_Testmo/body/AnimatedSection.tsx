import { type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  isVisible: boolean;
  delay?: string;
  className?: string;
}

export const AnimatedSection = ({
  children,
  isVisible,
  delay = 'delay-0',
  className = '',
}: AnimatedSectionProps) => {
  return (
    <div
      className={`transition-all duration-1000 ${delay} ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0'
          : 'opacity-0 translate-y-10 translate-x-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};