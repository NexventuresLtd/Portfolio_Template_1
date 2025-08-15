import { useState, useMemo, useRef, useEffect } from "react";
import type { Project } from "../../types/Projects";
import { projectAPI, transformApiProject } from "../../services/projectAPI";

export const useProjectsLogic = () => {
  // State declarations
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const orderingMap: { [key: string]: string } = {
          title: sortOrder === "asc" ? "title" : "-title",
          budget: sortOrder === "asc" ? "budget" : "-budget",
          startDate: sortOrder === "asc" ? "start_date" : "-start_date",
        };

        const response = await projectAPI.getProjects({
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          status: selectedStatus !== "all" ? selectedStatus : undefined,
          search: searchTerm || undefined,
          ordering: orderingMap[sortBy] || "-created_at",
        });

        const transformedProjects = response.results.map(transformApiProject);
        setProjects(transformedProjects);
      } catch (err) {
        setError("Failed to fetch projects. Please try again.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Filter and sort projects (now just returns the API results since filtering is done server-side)
  const filteredAndSortedProjects = useMemo(() => {
    return projects;
  }, [projects]);

  // Helper functions
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "residential":
        return "home";
      case "commercial":
        return "building";
      case "industrial":
        return "factory";
      default:
        return "building";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const navigateImage = (newIndex: number, navDirection: "left" | "right") => {
    if (isAnimating || !selectedProject) return;

    setIsAnimating(false);
    setDirection(navDirection);

    // Use a small timeout to ensure animation starts before changing image
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
    }, 10);
  };

  const nextImage = () => {
    if (!selectedProject || isAnimating) return;
    const newIndex = (currentImageIndex + 1) % selectedProject.images.length;
    navigateImage(newIndex, "right");
  };

  const prevImage = () => {
    if (!selectedProject || isAnimating) return;
    const newIndex =
      (currentImageIndex - 1 + selectedProject.images.length) %
      selectedProject.images.length;
    navigateImage(newIndex, "left");
  };

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredAndSortedProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex =
      currentIndex === filteredAndSortedProjects.length - 1
        ? 0
        : currentIndex + 1;
    setSelectedProject(filteredAndSortedProjects[nextIndex]);
    setCurrentImageIndex(0);
    setDirection("right");
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const currentIndex = filteredAndSortedProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const prevIndex =
      currentIndex === 0
        ? filteredAndSortedProjects.length - 1
        : currentIndex - 1;
    setSelectedProject(filteredAndSortedProjects[prevIndex]);
    setCurrentImageIndex(0);
    setDirection("left");
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  // Function to refresh projects (useful for dashboard)
  const refreshProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getProjects();
      const transformedProjects = response.results.map(transformApiProject);
      setProjects(transformedProjects);
    } catch (err) {
      setError("Failed to refresh projects");
    } finally {
      setLoading(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  // Return all state and functions
  return {
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
      loading,
      error,
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
      setDirection,
      setIsAnimating,
      nextImage,
      prevImage,
      nextProject,
      prevProject,
      handleAnimationEnd,
      navigateImage,
      refreshProjects,
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
  };
};
