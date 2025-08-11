
import type { Testimonial } from '../../../types/testimonial';
import { AnimatedSection } from './AnimatedSection';

interface TestimonialImageProps {
  testimonial: Testimonial;
  isVisible: boolean;
}

export const TestimonialImage = ({
  testimonial,
  isVisible,
}: TestimonialImageProps) => {
  return (
    <AnimatedSection isVisible={isVisible} delay="delay-400">
      <div className="relative group">
        <img
          src={testimonial.projectImage}
          alt={`${testimonial.project} by R-Construction`}
          className="w-full h-96 lg:h-[500px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 animate-[zoomIn_0.8s_ease-out]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Project Badge */}
        <div className="absolute bottom-6 left-6 bg-glass-dark text-white px-4 py-2 rounded-lg">
          <p className="font-semibold">{testimonial.project}</p>
          <p className="text-sm opacity-75">{testimonial.completionDate}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};