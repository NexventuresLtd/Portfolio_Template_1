const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface ApiProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing' | 'planned';
  location: string;
  budget: number;
  start_date: string;
  end_date: string;
  client: string;
  description: string;
  team_size: number;
  completion_percentage: number;
  architect?: string;
  contractor?: string;
  sustainability_rating?: string;
  image_urls: string[];
  feature_names: string[];
  award_names: string[];
  challenge_descriptions: string[];
  solution_descriptions: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectCreateData {
  title: string;
  category: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing' | 'planned';
  location: string;
  budget: number;
  start_date: string;
  end_date: string;
  client: string;
  description: string;
  team_size: number;
  completion_percentage: number;
  architect?: string;
  contractor?: string;
  sustainability_rating?: string;
  features?: string[];
  awards?: string[];
  challenges?: string[];
  solutions?: string[];
}

export interface ProjectStats {
  total: number;
  completed: number;
  ongoing: number;
  planned: number;
  by_category: {
    residential: number;
    commercial: number;
    industrial: number;
  };
}

class ProjectAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all projects with optional filtering
  async getProjects(params?: {
    category?: string;
    status?: string;
    search?: string;
    ordering?: string;
    page?: number;
  }): Promise<{ results: ApiProject[]; count: number; next: string | null; previous: string | null }> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request<{ results: ApiProject[]; count: number; next: string | null; previous: string | null }>(
      `/projects/${query ? `?${query}` : ''}`
    );
  }

  // Get a single project by ID
  async getProject(id: string): Promise<ApiProject> {
    return this.request<ApiProject>(`/projects/${id}/`);
  }

  // Create a new project
  async createProject(data: ProjectCreateData): Promise<ApiProject> {
    return this.request<ApiProject>('/projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update a project
  async updateProject(id: string, data: Partial<ProjectCreateData>): Promise<ApiProject> {
    return this.request<ApiProject>(`/projects/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Delete a project
  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`/projects/${id}/`, {
      method: 'DELETE',
    });
  }

  // Get project statistics
  async getProjectStats(): Promise<ProjectStats> {
    return this.request<ProjectStats>('/projects/stats/');
  }

  // Upload image for a project
  async uploadProjectImage(projectId: string, imageFile: File, caption?: string): Promise<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (caption) {
      formData.append('caption', caption);
    }

    return this.request(`/projects/${projectId}/upload_image/`, {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    });
  }
}

// Create a singleton instance
export const projectAPI = new ProjectAPI();

// Helper function to transform API project to frontend Project type
export const transformApiProject = (apiProject: ApiProject): import('../types/Projects').Project => {
  return {
    id: apiProject.id,
    title: apiProject.title,
    category: apiProject.category,
    status: apiProject.status,
    location: apiProject.location,
    budget: apiProject.budget,
    startDate: apiProject.start_date,
    endDate: apiProject.end_date,
    client: apiProject.client,
    description: apiProject.description,
    images: apiProject.image_urls,
    teamSize: apiProject.team_size,
    completionPercentage: apiProject.completion_percentage,
    features: apiProject.feature_names,
    architect: apiProject.architect,
    contractor: apiProject.contractor,
    sustainabilityRating: apiProject.sustainability_rating,
    awards: apiProject.award_names,
    challenges: apiProject.challenge_descriptions,
    solutions: apiProject.solution_descriptions,
  };
};
