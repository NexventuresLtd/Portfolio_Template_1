import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating = ({ rating, className = '' }: StarRatingProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};