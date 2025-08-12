import type { Project } from "../types/Projects";

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Luxury Villa Complex',
    category: 'residential',
    status: 'completed',
    location: 'Kigali Hills',
    budget: 850000,
    startDate: '2023-01-15',
    endDate: '2024-03-20',
    client: 'Horizon Properties Ltd',
    description: 'A premium residential complex featuring 12 luxury villas with modern amenities, sustainable design, and panoramic city views. The project was completed 2 weeks ahead of schedule and has won several design awards for its innovative use of local materials and energy-efficient systems.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=500&fit=crop'
    ],
    teamSize: 45,
    completionPercentage: 100,
    features: ['Solar Power', 'Smart Home Systems', 'Private Gardens', 'Security Systems'],
    architect: 'Kigali Design Studio',
    contractor: 'Rwanda Builders Ltd',
    sustainabilityRating: 'Gold',
    awards: ['Best Residential Design 2024', 'Green Building Award'],
    challenges: ['Steep terrain', 'Preservation of existing trees'],
    solutions: ['Terrace construction', 'Precision foundation work']
  },
  {
    id: '2',
    title: 'Corporate Office Tower',
    category: 'commercial',
    status: 'ongoing',
    location: 'CBD Kigali',
    budget: 2500000,
    startDate: '2024-02-01',
    endDate: '2025-08-15',
    client: 'Rwandan Investment Corp',
    description: '25-story modern office building with state-of-the-art facilities, LEED certification, and advanced building management systems. The tower will feature Rwanda\'s first sky lobby on the 15th floor with panoramic views of the city.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop'
    ],
    teamSize: 120,
    completionPercentage: 65,
    features: ['LEED Certified', 'Smart Building Tech', 'Rooftop Garden', 'Underground Parking'],
    architect: 'International Design Partners',
    contractor: 'Pan-African Construction',
    sustainabilityRating: 'Platinum (Target)'
  },
  {
    id: '3',
    title: 'Manufacturing Plant',
    category: 'industrial',
    status: 'completed',
    location: 'Kigali Economic Zone',
    budget: 1800000,
    startDate: '2022-08-10',
    endDate: '2023-11-30',
    client: 'East Africa Manufacturing',
    description: 'Modern textile manufacturing facility with automated systems, quality control labs, and worker amenities. The facility has created over 500 jobs and incorporates rainwater harvesting and solar power generation.',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=500&fit=crop'
    ],
    teamSize: 80,
    completionPercentage: 100,
    features: ['Automated Systems', 'Quality Labs', 'Worker Facilities', 'Environmental Compliance'],
    contractor: 'Industrial Builders Group',
    sustainabilityRating: 'Silver'
  },
  {
    id: '4',
    title: 'Affordable Housing Estate',
    category: 'residential',
    status: 'ongoing',
    location: 'Gasabo District',
    budget: 1200000,
    startDate: '2024-01-10',
    endDate: '2025-06-30',
    client: 'Rwanda Development Bank',
    description: 'Sustainable affordable housing project featuring 200 units with community facilities and green spaces. The project is part of the government\'s initiative to provide quality housing while maintaining affordability through innovative construction techniques.',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600566752227-8f3b540123d3?w=800&h=500&fit=crop'
    ],
    teamSize: 60,
    completionPercentage: 40,
    features: ['Community Center', 'Playground', 'Green Spaces', 'Solar Water Heating'],
    architect: 'Community Housing Design',
    contractor: 'Rwanda Social Builders'
  },
  {
    id: '5',
    title: 'Shopping Mall Complex',
    category: 'commercial',
    status: 'planned',
    location: 'Nyarutarama',
    budget: 3200000,
    startDate: '2025-01-15',
    endDate: '2026-12-20',
    client: 'Retail Ventures Rwanda',
    description: 'Multi-level shopping center with entertainment zones, restaurants, and modern retail spaces. The complex will include Rwanda\'s first IMAX cinema and an indoor play area for children, making it a family destination.',
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=500&fit=crop'
    ],
    teamSize: 150,
    completionPercentage: 0,
    features: ['Entertainment Zone', 'Food Court', 'Cinema', 'Underground Parking'],
    architect: 'Urban Retail Design'
  },
  {
    id: '6',
    title: 'Pharmaceutical Facility',
    category: 'industrial',
    status: 'ongoing',
    location: 'Kigali Special Economic Zone',
    budget: 2800000,
    startDate: '2023-09-01',
    endDate: '2025-03-15',
    client: 'PharmaRx East Africa',
    description: 'State-of-the-art pharmaceutical manufacturing facility with clean rooms and advanced quality control systems. The facility will produce essential medicines for the East African region and includes research laboratories for local drug development.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581093057305-4093bafa9af4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581093057927-02d65d9a5a0a?w=800&h=500&fit=crop'
    ],
    teamSize: 95,
    completionPercentage: 75,
    features: ['Clean Rooms', 'Quality Control', 'Cold Storage', 'Research Labs'],
    contractor: 'Specialized Industrial Builders',
    sustainabilityRating: 'Gold (Target)'
  }
];
