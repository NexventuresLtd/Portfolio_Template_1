import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Award, 
  Wrench, 
  Target,
  Building2,
  User,
  FileText,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { projectAPI, transformApiProject } from '../services/projectAPI';
import type { Project } from '../types/Projects';

const AdminProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiProject = await projectAPI.getProject(projectId);
      const transformedProject = transformApiProject(apiProject);
      setProject(transformedProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !id) return;
    
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
      try {
        await projectAPI.deleteProject(id);
        navigate('/admin/projects');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
          <div className="bg-surface p-6 rounded-lg shadow border border-color">
            <div className="h-6 bg-background rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-background rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/projects')}
            className="inline-flex items-center px-3 py-2 border border-color rounded-md text-sm font-medium text-primary bg-background hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-red-500 mb-4">
            <FileText className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-primary">
            {error || 'Project not found'}
          </h3>
          <p className="mt-1 text-sm text-secondary opacity-70">
            The project you're looking for doesn't exist or couldn't be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/projects')}
            className="inline-flex items-center px-3 py-2 border border-color rounded-md text-sm font-medium text-primary bg-background hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Project Details</h1>
            <p className="text-sm text-secondary opacity-70">
              View and manage project information
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/admin/projects/${id}/edit`)}
            className="inline-flex items-center px-4 py-2 border border-color shadow-sm text-sm font-medium rounded-md text-primary bg-background hover:bg-secondary hover:text-white transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Project Header Card */}
      <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">
              {getCategoryIcon(project.category)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {project.title}
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </span>
              </div>
              <p className="text-secondary max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface shadow rounded-lg p-6 border border-color">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary opacity-70">Budget</p>
              <p className="text-2xl font-semibold text-primary">
                ${project.budget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface shadow rounded-lg p-6 border border-color">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary opacity-70">Team Size</p>
              <p className="text-2xl font-semibold text-primary">
                {project.teamSize}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface shadow rounded-lg p-6 border border-color">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary opacity-70">Start Date</p>
              <p className="text-lg font-semibold text-primary">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface shadow rounded-lg p-6 border border-color">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary opacity-70">Progress</p>
              <p className="text-2xl font-semibold text-primary">
                {project.completionPercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Information */}
        <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Project Information
          </h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-secondary opacity-70">Location</dt>
              <dd className="mt-1 text-sm text-primary flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary opacity-60" />
                {project.location}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-secondary opacity-70">Client</dt>
              <dd className="mt-1 text-sm text-primary flex items-center">
                <User className="h-4 w-4 mr-2 text-primary opacity-60" />
                {project.client}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-secondary opacity-70">End Date</dt>
              <dd className="mt-1 text-sm text-primary flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary opacity-60" />
                {new Date(project.endDate).toLocaleDateString()}
              </dd>
            </div>
            {project.architect && (
              <div>
                <dt className="text-sm font-medium text-secondary opacity-70">Architect</dt>
                <dd className="mt-1 text-sm text-primary">{project.architect}</dd>
              </div>
            )}
            {project.contractor && (
              <div>
                <dt className="text-sm font-medium text-secondary opacity-70">Contractor</dt>
                <dd className="mt-1 text-sm text-primary">{project.contractor}</dd>
              </div>
            )}
            {project.sustainabilityRating && (
              <div>
                <dt className="text-sm font-medium text-secondary opacity-70">Sustainability Rating</dt>
                <dd className="mt-1 text-sm text-primary">{project.sustainabilityRating}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Progress Bar */}
        <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Project Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-primary mb-2">
                <span>Completion</span>
                <span>{project.completionPercentage}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-secondary to-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${project.completionPercentage}%` }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-color">
              <p className="text-sm text-secondary opacity-70">
                Project Duration: {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features, Awards, Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-2 w-2 bg-secondary rounded-full mt-2 mr-3"></span>
                  <span className="text-sm text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Awards */}
        {project.awards && project.awards.length > 0 && (
          <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
            <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Awards
            </h3>
            <ul className="space-y-2">
              {project.awards.map((award, index) => (
                <li key={index} className="flex items-start">
                  <Award className="flex-shrink-0 h-4 w-4 text-yellow-500 mt-1 mr-3" />
                  <span className="text-sm text-primary">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges & Solutions */}
        {((project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0)) && (
          <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
            <h3 className="text-lg font-medium text-primary mb-4">
              Challenges & Solutions
            </h3>
            <div className="space-y-4">
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Challenges</h4>
                  <ul className="space-y-1">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-sm text-primary opacity-80">
                        • {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.solutions && project.solutions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Solutions</h4>
                  <ul className="space-y-1">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="text-sm text-primary opacity-80">
                        ✓ {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Images Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
          <h3 className="text-lg font-medium text-primary mb-4 flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Project Images ({project.images.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg border border-color"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => window.open(image, '_blank')}
                    className="opacity-0 group-hover:opacity-100 bg-white text-primary p-2 rounded-full shadow-lg transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectDetails;
