export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing' | 'planned';
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  client: string;
  description: string;
  images: string[];
  teamSize: number;
  completionPercentage: number;
  features: string[];
  architect?: string;
  contractor?: string;
  sustainabilityRating?: string;
  awards?: string[];
  challenges?: string[];
  solutions?: string[];
}