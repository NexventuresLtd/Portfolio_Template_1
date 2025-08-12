
import { Search, Filter, SortAsc, SortDesc, ChevronDown } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useProjectsLogic } from '../../../hooks/projects/useProjectsLogic';

const ProjectsView = () => {
  const {
    state: {
      searchTerm,
      selectedCategory,
      selectedStatus,
      sortBy,
      sortOrder,
      selectedProject,
      showFilters,
      currentImageIndex,
      direction,
      isAnimating,
      filteredAndSortedProjects,
    },
    actions: {
      setSearchTerm,
      setSelectedCategory,
      setSelectedStatus,
      setSortBy,
      setSortOrder,
      setSelectedProject,
      setShowFilters,
      setCurrentImageIndex,
      nextImage,
      prevImage,
      nextProject,
      prevProject,
      handleAnimationEnd,
      navigateImage,
    },
    helpers: {
      getCategoryIcon,
      getStatusColor,
      formatCurrency,
      formatDate,
    },
    refs: {
      imageRef,
    },
  } = useProjectsLogic();

  return (
    <div className="min-h-screen bg-background text-primary p-4 transition-colors duration-300">
      <div className="max-w-full md:max-w-11/12 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Our Projects</h1>
          <p className="text-lg text-secondary">Delivering excellence in construction and engineering across Rwanda</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-surface rounded-lg p-6 mb-6 shadow-sm transition-colors duration-300">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-background text-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
              >
                <option value="title">Sort by Title</option>
                <option value="budget">Sort by Budget</option>
                <option value="startDate">Sort by Date</option>
                <option value="status">Sort by Status</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-3 bg-background text-secondary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-color flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                >
                  <option value="all">All Categories</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              getCategoryIcon={getCategoryIcon}
              getStatusColor={getStatusColor}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-secondary">No projects found</h3>
              <p className="text-secondary">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            currentImageIndex={currentImageIndex}
            direction={direction}
            isAnimating={isAnimating}
            nextImage={nextImage}
            prevImage={prevImage}
            nextProject={nextProject}
            prevProject={prevProject}
            handleAnimationEnd={handleAnimationEnd}
            navigateImage={navigateImage}
            getCategoryIcon={getCategoryIcon}
            setCurrentImageIndex={setCurrentImageIndex}
            getStatusColor={getStatusColor}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            imageRef={imageRef}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsView