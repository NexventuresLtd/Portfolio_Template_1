import { Quote } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface TestimonialHeaderProps {
  title: string;
  description: string;
  isVisible: boolean;
}

export const TestimonialHeader = ({
  title,
  description,
  isVisible,
}: TestimonialHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <AnimatedSection isVisible={isVisible}>
        <div className="inline-flex items-center gap-3 bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Quote className="w-4 h-4" />
          Client Testimonials
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-4">
          {title}
        </h2>
        <p className="text-xl text-secondary max-w-3xl mx-auto">
          {description}
        </p>
      </AnimatedSection>
    </div>
  );
};