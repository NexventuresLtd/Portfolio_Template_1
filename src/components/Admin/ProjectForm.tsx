import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectAPI, transformApiProject } from "../../services/projectAPI";
import type { ProjectCreateData } from "../../services/projectAPI";
import type { Project } from "../../types/Projects";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectCreateData>({
    title: "",
    category: "residential",
    status: "planned",
    location: "",
    budget: 0,
    start_date: "",
    end_date: "",
    client: "",
    description: "",
    team_size: 1,
    completion_percentage: 0,
    architect: "",
    contractor: "",
    sustainability_rating: "none",
    features: [],
    awards: [],
    challenges: [],
    solutions: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    if (isEdit && id) {
      fetchProject();
    }
  }, [isEdit, id]);

  const fetchProject = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const apiProject = await projectAPI.getProject(id);
      const transformedProject = transformApiProject(apiProject);
      setProject(transformedProject);

      // Populate form with existing data
      setFormData({
        title: transformedProject.title,
        category: transformedProject.category,
        status: transformedProject.status,
        location: transformedProject.location,
        budget: transformedProject.budget,
        start_date: transformedProject.startDate,
        end_date: transformedProject.endDate,
        client: transformedProject.client,
        description: transformedProject.description,
        team_size: transformedProject.teamSize,
        completion_percentage: transformedProject.completionPercentage,
        architect: transformedProject.architect || "",
        contractor: transformedProject.contractor || "",
        sustainability_rating:
          transformedProject.sustainabilityRating || "none",
        features: transformedProject.features || [],
        awards: transformedProject.awards || [],
        challenges: transformedProject.challenges || [],
        solutions: transformedProject.solutions || [],
      });
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProjectCreateData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (
    field: "features" | "awards" | "challenges" | "solutions",
    value: string
  ) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let savedProject;
      if (isEdit && id) {
        savedProject = await projectAPI.updateProject(id, formData);
      } else {
        savedProject = await projectAPI.createProject(formData);
      }

      // Upload images if any
      if (images.length > 0) {
        for (const image of images) {
          try {
            await projectAPI.uploadProjectImage(savedProject.id, image);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }

      navigate("/admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-surface rounded"></div>
            <div className="h-10 bg-surface rounded"></div>
            <div className="h-32 bg-surface rounded"></div>
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
          <div className="flex items-center">
            <button
              onClick={() => navigate("/admin/projects")}
              className="mr-4 p-2 text-primary hover:bg-accent-hover hover:text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
                {isEdit ? "Edit Project" : "Add New Project"}
              </h2>
              <p className="mt-1 text-sm text-secondary opacity-70">
                {isEdit
                  ? "Update project information"
                  : "Create a new construction project"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-surface shadow-lg rounded-lg border border-color">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              {/* Category & Status */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                >
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Location & Client */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleInputChange("client", e.target.value)}
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              {/* Budget & Team Size */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Budget (USD) *
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    handleInputChange("budget", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Team Size *
                </label>
                <input
                  type="number"
                  value={formData.team_size}
                  onChange={(e) =>
                    handleInputChange("team_size", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              {/* Dates */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              {/* Completion Percentage */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Completion Percentage
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.completion_percentage}
                  onChange={(e) =>
                    handleInputChange(
                      "completion_percentage",
                      Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
              </div>

              {/* Sustainability Rating */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Sustainability Rating
                </label>
                <select
                  value={formData.sustainability_rating}
                  onChange={(e) =>
                    handleInputChange("sustainability_rating", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                >
                  <option value="none">None</option>
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>

              {/* Architect & Contractor */}
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Architect
                </label>
                <input
                  type="text"
                  value={formData.architect}
                  onChange={(e) =>
                    handleInputChange("architect", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Contractor
                </label>
                <input
                  type="text"
                  value={formData.contractor}
                  onChange={(e) =>
                    handleInputChange("contractor", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                  required
                />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.features?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayFieldChange("features", e.target.value)
                  }
                  placeholder="e.g., Solar Power, Smart Home Systems, Private Gardens"
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
              </div>

              {/* Awards */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-primary mb-2">
                  Awards (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.awards?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayFieldChange("awards", e.target.value)
                  }
                  placeholder="e.g., Best Design Award 2024, Green Building Award"
                  className="w-full px-3 py-2 border border-color rounded-md bg-background text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-surface shadow-lg rounded-lg border border-color">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-primary mb-4">
              Project Images
            </h3>

            <div className="space-y-4">
              {/* Upload Button */}
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-color border-dashed rounded-md hover:border-secondary transition-colors">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-primary opacity-60" />
                  <div className="flex text-sm text-secondary">
                    <label className="relative cursor-pointer bg-background rounded-md font-medium text-secondary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-secondary">
                      <span>Upload images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-secondary opacity-70">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg border border-color"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Existing Images (for edit mode) */}
              {isEdit && project?.images && project.images.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">
                    Existing Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Existing ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg border border-color"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="px-4 py-2 border border-color rounded-md shadow-sm text-sm font-medium text-primary bg-background hover:bg-accent-hover hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? "Update Project" : "Create Project"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
