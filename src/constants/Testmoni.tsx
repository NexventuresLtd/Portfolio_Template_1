import type { Testimonial } from "../types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Project Manager',
    company: 'UrbanBuild Co.',
    project: 'Downtown Commercial Tower',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200',
    rating: 5,
    text: 'Working with Robert Construction was seamless from start to finish. Their professionalism and attention to detail made the difference.',
    projectImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    completionDate: '2024-11-10',
    duration: '14 months'
  },
  {
    id: 2,
    name: 'James Lee',
    role: 'CEO',
    company: 'GreenHomes Ltd.',
    project: 'Eco-Friendly Residential Development',
    image: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200',
    rating: 4,
    text: 'Excellent execution and modern building techniques. Our sustainable project was in good hands.',
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    completionDate: '2025-02-18',
    duration: '9 months'
  },
  {
    id: 3,
    name: 'Amina Yusuf',
    role: 'Head of Real Estate',
    company: 'AfricaBuild Group',
    project: 'Mixed-Use Urban Complex',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200',
    rating: 5,
    text: 'Robert Construction brought our vision to life with strong communication, on-time delivery, and craftsmanship.',
    projectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    completionDate: '2025-07-01',
    duration: '18 months'
  }
];

export default testimonials;
