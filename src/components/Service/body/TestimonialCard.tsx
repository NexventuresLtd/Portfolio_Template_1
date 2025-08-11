import { Quote, User, Building, Calendar } from 'lucide-react';
import type { Testimonial } from '../../../types/testimonial';
import { AnimatedSection } from './AnimatedSection';
import { StarRating } from './StarRating';


interface TestimonialCardProps {
  testimonial: Testimonial;
  isVisible: boolean;
}

export const TestimonialCard = ({
  testimonial,
  isVisible,
}: TestimonialCardProps) => {
  return (
    <div className="space-y-8">
      {/* Quote */}
      <AnimatedSection isVisible={isVisible} delay="delay-200">
        <div className="relative">
          <Quote className="w-16 h-16 text-accent/20 absolute -top-4 -left-2" />
          <blockquote className="text-2xl lg:text-3xl font-light text-secondary leading-relaxed pl-12 animate-[fadeInUp_0.8s_ease-out]">
            "{testimonial.text}"
          </blockquote>
        </div>
      </AnimatedSection>

      {/* Rating */}
      <AnimatedSection isVisible={isVisible} delay="delay-300">
        <div className="flex items-center gap-2 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <StarRating rating={testimonial.rating} />
          <span className="text-sm text-secondary/70 ml-2">
            ({testimonial.rating}.0 out of 5)
          </span>
        </div>
      </AnimatedSection>

      {/* Client Info */}
      <AnimatedSection isVisible={isVisible} delay="delay-400">
        <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-primary">{testimonial.name}</h4>
            <p className="text-secondary/70">{testimonial.role}</p>
            <p className="text-sm text-accent font-medium">
              {testimonial.company}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Project Details */}
      <AnimatedSection isVisible={isVisible} delay="delay-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
          <div className="bg-surface rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary">
                Project Type
              </span>
            </div>
            <p className="font-semibold text-primary">{testimonial.project}</p>
          </div>
          <div className="bg-surface rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary">
                Completed
              </span>
            </div>
            <p className="font-semibold text-primary">
              {testimonial.completionDate}
            </p>
            <p className="text-sm text-secondary/70">
              {testimonial.duration} duration
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};