import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface TestimonialControlsProps {
    count: number;
    currentIndex: number;
    onPrev: () => void;
    onNext: () => void;
    onGoTo: (index: number) => void;
    isAutoPlaying: boolean;
    onToggleAutoPlay: () => void;
}

export const TestimonialControls = ({
    count,
    currentIndex,
    onPrev,
    onNext,
    onGoTo,
    isAutoPlaying,
    onToggleAutoPlay,
}: TestimonialControlsProps) => {
    return (
        <div className="flex justify-center items-center gap-6 mt-12">
            {/* Previous Button */}
            <button
                onClick={onPrev}
                className="p-3 rounded-full bg-surface hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Testimonial Indicators */}
            <div className="flex items-center gap-3">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onGoTo(index)}
                        className={`transition-all duration-300 ${index === currentIndex
                                ? 'w-12 h-3 bg-primary rounded-full'
                                : 'w-3 h-3 bg-secondary/30 rounded-full hover:bg-secondary/50'
                            }`}
                    />
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onNext}
                className="p-3 cursor-pointer text-primary rounded-full bg-surface hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl "
            >
                sdsd
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Auto-play Toggle */}
            <button
                onClick={() => onToggleAutoPlay()}
                className={`p-3 rounded-full text-primary transition-all duration-300 shadow-lg hover:shadow-xl ${isAutoPlaying ? 'bg-accent text-white' : 'bg-surface hover:bg-accent hover:text-white'
                    }`}
            >
                {isAutoPlaying ? (
                    <Pause className="w-6 h-6" />
                ) : (
                    <Play className="w-6 h-6" />
                )}
            </button>
        </div>
    );
};