import { Building, Calendar, ChevronLeft, ChevronRight, Clock, DollarSign, Factory, Home, MapPin, Users, X } from "lucide-react";
import type { Project } from "../../../types/Projects";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  currentImageIndex: number;
  direction: 'left' | 'right';
  isAnimating: boolean;
  nextImage: () => void;
  prevImage: () => void;
  nextProject: () => void;
  prevProject: () => void;
  handleAnimationEnd: () => void;
  navigateImage: (index: number, dir: 'left' | 'right') => void;
  getCategoryIcon: (category: string) => string;
  getStatusColor: (status: string) => string;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
  imageRef: React.RefObject<HTMLImageElement | null>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProjectDetailModal = ({
  project,
  onClose,
  setCurrentImageIndex,
  currentImageIndex,
  direction,
  isAnimating,
  nextImage,
  prevImage,
  nextProject,
  prevProject,
  handleAnimationEnd,
  navigateImage,
  getCategoryIcon,
  getStatusColor,
  formatCurrency,
  formatDate,
  imageRef
}: ProjectDetailModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Image Gallery */}
        <div className="relative h-72 overflow-hidden">
          <img
            ref={imageRef}
            src={project.images[currentImageIndex]}
            alt={project.title}
            className={`w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out ${isAnimating
              ? direction === 'right'
                ? 'translate-x-full opacity-0'
                : '-translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
              }`}
            onTransitionEnd={handleAnimationEnd}
            key={`${project.id}-${currentImageIndex}`} // Unique key combining project ID and index
            onLoad={() => console.log('Image loaded')} // For debugging
            onError={(e) => {
              console.error('Image failed to load:', e.currentTarget.src);
              // Fallback to first image if current fails
              if (currentImageIndex !== 0) {
                setCurrentImageIndex(0);
              }
            }}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary bg-opacity-80 bg-background p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary bg-opacity-80 bg-background p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
                disabled={isAnimating}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const dir = index > currentImageIndex ? 'right' : 'left';
                      navigateImage(index, dir);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/70'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                    disabled={isAnimating || index === currentImageIndex}
                  />
                ))}
              </div>
            </>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-background text-primary bg-opacity-90  p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 z-10">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Project Navigation Arrows */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prevProject}
            className="hover:bg-primary hover:text-white cursor-pointer p-2 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="hover:bg-primary hover:text-white cursor-pointer p-2 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {getCategoryIcon(project.category) === 'home' && <Home className="w-5 h-5" />}
            {getCategoryIcon(project.category) === 'building' && <Building className="w-5 h-5" />}
            {getCategoryIcon(project.category) === 'factory' && <Factory className="w-5 h-5" />}
            <h2 className="text-3xl font-bold text-primary">{project.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">Location</span>
                  <p className="font-semibold text-primary">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">Budget</span>
                  <p className="font-semibold text-primary">{formatCurrency(project.budget)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">Team Size</span>
                  <p className="font-semibold text-primary">{project.teamSize} members</p>
                </div>
              </div>
              {project.architect && (
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-secondary" />
                  <div>
                    <span className="text-sm text-secondary">Architect</span>
                    <p className="font-semibold text-primary">{project.architect}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">Start Date</span>
                  <p className="font-semibold text-primary">{formatDate(project.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">End Date</span>
                  <p className="font-semibold text-primary">{formatDate(project.endDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-secondary" />
                <div>
                  <span className="text-sm text-secondary">Client</span>
                  <p className="font-semibold text-primary">{project.client}</p>
                </div>
              </div>
              {project.contractor && (
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-secondary" />
                  <div>
                    <span className="text-sm text-secondary">Contractor</span>
                    <p className="font-semibold text-primary">{project.contractor}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {project.status === 'ongoing' && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-secondary">Project Progress</span>
                <span className="text-sm font-bold text-accent">{project.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-accent h-3 rounded-full transition-all duration-300"
                  style={{ width: `${project.completionPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Project Description</h3>
            <p className="text-secondary leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {project.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-accent/10 text-accent dark:text-accent-hover text-sm rounded-lg text-center"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {project.sustainabilityRating && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Sustainability</h3>
              <p className="text-secondary">
                <span className="font-semibold">Rating:</span> {project.sustainabilityRating}
              </p>
            </div>
          )}

          {project.awards && project.awards.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Awards & Recognition</h3>
              <ul className="list-disc pl-5 text-secondary">
                {project.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && project.solutions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Key Challenges</h3>
                <ul className="list-disc pl-5 text-secondary">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Our Solutions</h3>
                <ul className="list-disc pl-5 text-secondary">
                  {project.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};