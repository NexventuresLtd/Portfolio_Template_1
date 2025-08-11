import { AnimatedSection } from "./AnimatedSection";

interface TestimonialStatsProps {
  stats: { value: string; label: string }[];
  isVisible: boolean;
}

export const TestimonialStats = ({ stats, isVisible }: TestimonialStatsProps) => {
  return (
    <AnimatedSection isVisible={isVisible} delay="delay-600">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-surface rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 className="text-3xl font-bold text-primary mb-2">
              {stat.value}
            </h3>
            <p className="text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};