import { useState, useRef, useEffect } from 'react';
import { TestimonialHeader } from './TestimonialHeader';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialImage } from './TestimonialImage';
import { TestimonialControls } from './TestimonialControls';
import { TestimonialStats } from './TestimonialStats';
import type { Testimonial } from '../../../types/testimonial';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAutoPlay } from '../../hooks/useAutoPlay';
import { AnimatePresence, motion } from 'framer-motion';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null!) as React.RefObject<HTMLElement>;
  const isVisible = useIntersectionObserver(sectionRef);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Auto-play testimonials
  useAutoPlay(isAutoPlaying, nextTestimonial, 6000);

  // Pause autoplay if section is not visible
  useEffect(() => {
    setIsAutoPlaying(isVisible);
  }, [isVisible]);

  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '15+', label: 'Years Experience' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full animate-[float_8s_ease-in-out_infinite] hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full animate-[float_6s_ease-in-out_infinite_reverse] hidden lg:block" />

      <div className="px-6 lg:px-8">
        <TestimonialHeader
          title="What People Say"
          description="Discover why our clients trust us with their most important construction projects. Real feedback from real people who've experienced our exceptional service."
          isVisible={isVisible}
        />

        <div className="max-w-full md:max-w-11/12 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Animate testimonial card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${currentTestimonial}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard
                  testimonial={testimonials[currentTestimonial]}
                  isVisible={isVisible}
                />
              </motion.div>
            </AnimatePresence>

            {/* Animate testimonial image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${currentTestimonial}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialImage
                  testimonial={testimonials[currentTestimonial]}
                  isVisible={isVisible}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <TestimonialControls
          count={testimonials.length}
          currentIndex={currentTestimonial}
          onPrev={prevTestimonial}
          onNext={nextTestimonial}
          onGoTo={goToTestimonial}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoPlay={toggleAutoPlay}
        />

        <TestimonialStats stats={stats} isVisible={isVisible} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
