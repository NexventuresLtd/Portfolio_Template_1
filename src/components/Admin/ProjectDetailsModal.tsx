import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Award, 
  Wrench, 
  Target,
  User,
  ExternalLink,
  Edit,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/Projects';

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (projectId: string) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onDelete
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'residential':
        return '🏠';
      case 'commercial':
        return '🏢';
      case 'industrial':
        return '🏭';
      default:
        return '🏗️';
    }
  };

  const handleEdit = () => {
    navigate(`/admin/projects/${project.id}/edit`);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onDelete(project.id);
      onClose();
    }
  };

  const handleViewFull = () => {
    navigate(`/admin/projects/${project.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-surface rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 border border-color">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">
                {getCategoryIcon(project.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-secondary max-w-xl">
                  {project.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-background rounded-md p-2 inline-flex items-center justify-center text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-background p-4 rounded-lg border border-color">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-xs text-secondary opacity-70">Budget</p>
                  <p className="text-lg font-semibold text-primary">
                    ${project.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-color">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-xs text-secondary opacity-70">Team</p>
                  <p className="text-lg font-semibold text-primary">
                    {project.teamSize}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-color">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                <div>
                  <p className="text-xs text-secondary opacity-70">Start</p>
                  <p className="text-sm font-semibold text-primary">
                    {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-4 rounded-lg border border-color">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-orange-600 mr-2" />
                <div>
                  <p className="text-xs text-secondary opacity-70">Progress</p>
                  <p className="text-lg font-semibold text-primary">
                    {project.completionPercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-medium text-primary mb-3">Project Information</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-xs text-secondary opacity-70">Location:</dt>
                  <dd className="text-xs text-primary">{project.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-xs text-secondary opacity-70">Client:</dt>
                  <dd className="text-xs text-primary">{project.client}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-xs text-secondary opacity-70">End Date:</dt>
                  <dd className="text-xs text-primary">{new Date(project.endDate).toLocaleDateString()}</dd>
                </div>
                {project.architect && (
                  <div className="flex justify-between">
                    <dt className="text-xs text-secondary opacity-70">Architect:</dt>
                    <dd className="text-xs text-primary">{project.architect}</dd>
                  </div>
                )}
                {project.contractor && (
                  <div className="flex justify-between">
                    <dt className="text-xs text-secondary opacity-70">Contractor:</dt>
                    <dd className="text-xs text-primary">{project.contractor}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Progress */}
            <div>
              <h4 className="text-sm font-medium text-primary mb-3">Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium text-primary mb-1">
                    <span>Completion</span>
                    <span>{project.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-border-color rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features, Awards, Challenges */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <Wrench className="h-4 w-4 mr-1" />
                  Features
                </h4>
                <ul className="space-y-1 max-h-24 overflow-y-auto">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-primary flex items-start">
                      <span className="flex-shrink-0 h-1.5 w-1.5 bg-secondary rounded-full mt-1.5 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-xs text-secondary opacity-70">
                      +{project.features.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {project.awards && project.awards.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  Awards
                </h4>
                <ul className="space-y-1 max-h-24 overflow-y-auto">
                  {project.awards.slice(0, 2).map((award, index) => (
                    <li key={index} className="text-xs text-primary flex items-start">
                      <Award className="flex-shrink-0 h-3 w-3 text-yellow-500 mt-0.5 mr-2" />
                      {award}
                    </li>
                  ))}
                  {project.awards.length > 2 && (
                    <li className="text-xs text-secondary opacity-70">
                      +{project.awards.length - 2} more...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-primary mb-2">Challenges</h4>
                <ul className="space-y-1 max-h-24 overflow-y-auto">
                  {project.challenges.slice(0, 2).map((challenge, index) => (
                    <li key={index} className="text-xs text-primary opacity-80">
                      • {challenge}
                    </li>
                  ))}
                  {project.challenges.length > 2 && (
                    <li className="text-xs text-secondary opacity-70">
                      +{project.challenges.length - 2} more...
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Images Preview */}
          {project.images && project.images.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-primary mb-3">Images ({project.images.length})</h4>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {project.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="flex-shrink-0 relative group">
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border border-color"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center">
                      <button
                        onClick={() => window.open(image, '_blank')}
                        className="opacity-0 group-hover:opacity-100 bg-white text-primary p-1 rounded shadow-lg transition-all duration-200"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
                {project.images.length > 4 && (
                  <div className="flex-shrink-0 w-20 h-20 bg-background border border-color rounded flex items-center justify-center">
                    <span className="text-xs text-secondary">+{project.images.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-color">
            <button
              onClick={handleViewFull}
              className="inline-flex items-center px-4 py-2 border border-color rounded-md text-sm font-medium text-primary bg-background hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Details
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-color rounded-md text-sm font-medium text-primary bg-background hover:bg-secondary hover:text-white transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
