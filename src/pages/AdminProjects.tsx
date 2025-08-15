import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectAPI, transformApiProject } from "../services/projectAPI";
import type { Project } from "../types/Projects";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Users,
} from "lucide-react";

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [searchTerm, categoryFilter, statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getProjects({
        search: searchTerm || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      setProjects(response.results.map(transformApiProject));
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectAPI.deleteProject(projectId);
        await fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-success";
      case "ongoing":
        return "bg-blue-100 text-secondary";
      case "planned":
        return "bg-surface text-primary";
      default:
        return "bg-surface text-primary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "residential":
        return "🏠";
      case "commercial":
        return "🏢";
      case "industrial":
        return "🏭";
      default:
        return "🏗️";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-surface p-6 rounded-lg shadow border border-color"
              >
                <div className="h-4 bg-background rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-background rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-10 text-primary sm:text-3xl sm:truncate">
            Projects Management
          </h2>
          <p className="mt-1 text-sm text-secondary opacity-70">
            Manage all your construction projects from here.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary opacity-60 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          >
            <option value="all">All Statuses</option>
            <option value="planned">Planned</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={fetchProjects}
            className="px-4 py-2 bg-accent-hover text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary transition-colors"
          >
            <Filter className="h-4 w-4 inline mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-surface shadow-lg overflow-hidden sm:rounded-md border border-color">
        <ul className="divide-y divide-border-color">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-background transition-colors">
                <div className="flex flex-col sm:flex-row gap-4 mx-4 sm:mx-0 sm:gap-0 items-center justify-between">
                  <div className="flex-1 min-w-0 w-full mr-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3 flex-shrink-0">
                        {getCategoryIcon(project.category)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-medium text-secondary truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-primary opacity-80 truncate">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-secondary opacity-70">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary opacity-60" />
                          {project.location}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-secondary opacity-70 sm:mt-0 sm:ml-6">
                          <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary opacity-60" />
                          ${project.budget.toLocaleString()}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-secondary opacity-70 sm:mt-0 sm:ml-6">
                          <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary opacity-60" />
                          {project.teamSize} team members
                        </p>
                        <p className="mt-2 flex items-center text-sm text-secondary opacity-70 sm:mt-0 sm:ml-6">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-primary opacity-60" />
                          {new Date(project.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-secondary sm:mt-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => navigate(`/admin/projects/${project.id}`)}
                      className="inline-flex items-center px-3 py-2 border border-color shadow-sm text-sm leading-4 font-medium rounded-md text-primary bg-background hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/projects/${project.id}/edit`)
                      }
                      className="inline-flex items-center px-3 py-2 border border-color shadow-sm text-sm leading-4 font-medium rounded-md text-primary bg-background hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-error bg-white hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-primary opacity-60 mb-4">
            <Filter />
          </div>
          <h3 className="mt-2 text-sm font-medium text-primary">
            No projects found
          </h3>
          <p className="mt-1 text-sm text-secondary opacity-70">
            {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating a new project."}
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/admin/projects/new")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
