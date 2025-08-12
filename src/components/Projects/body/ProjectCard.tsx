import { Home, Building, Factory, Eye, Users, DollarSign, MapPin } from 'lucide-react';
import type { Project } from '../../../types/Projects';

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
  getCategoryIcon: (category: string) => string;
  getStatusColor: (status: string) => string;
  formatCurrency: (amount: number) => string;
}

export const ProjectCard = ({
  project,
  onViewDetails,
  getCategoryIcon,
  getStatusColor,
  formatCurrency
}: ProjectCardProps) => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        {project.status === 'ongoing' && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.completionPercentage}%` }}
              />
            </div>
            <span className="text-white text-xs font-medium">{project.completionPercentage}% Complete</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon(project.category) === 'home' && <Home className="w-4 h-4" />}
          {getCategoryIcon(project.category) === 'building' && <Building className="w-4 h-4" />}
          {getCategoryIcon(project.category) === 'factory' && <Factory className="w-4 h-4" />}
          <span className="text-sm text-secondary capitalize">{project.category}</span>
        </div>

        <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-secondary">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-semibold">{formatCurrency(project.budget)}</span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <Users className="w-4 h-4" />
            <span className="text-sm">{project.teamSize} team members</span>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors duration-300"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};