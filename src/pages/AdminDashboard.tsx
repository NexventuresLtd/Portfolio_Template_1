import React, { useState, useEffect } from "react";
import { projectAPI } from "../services/projectAPI";
import type { ProjectStats } from "../services/projectAPI";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsData = await projectAPI.getProjectStats();
      setStats(statsData);

      // Fetch recent projects for activity feed
      const recentProjectsResponse = await projectAPI.getProjects({
        ordering: "-created_at",
      });

      // Take only the first 5 projects
      const recentProjectsData = recentProjectsResponse.results.slice(0, 5);

      // Transform projects into activity items
      const activities = recentProjectsData.map(
        (project: any, index: number) => {
          const createdDate = new Date(project.created_at);
          const now = new Date();
          const timeDiff = now.getTime() - createdDate.getTime();
          const hoursAgo = Math.floor(timeDiff / (1000 * 3600));
          const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));

          let timeString = "";
          if (daysAgo > 0) {
            timeString = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
          } else if (hoursAgo > 0) {
            timeString = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
          } else {
            timeString = "Just now";
          }

          return {
            id: project.id,
            action: index === 0 ? "Latest project created" : "Project created",
            project: project.title,
            time: timeString,
            status: project.status,
          };
        }
      );

      setRecentActivity(activities);
      setRecentProjects(recentProjectsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-surface rounded-lg p-6 shadow border border-color"
            >
              <div className="h-4 bg-background rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-background rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Projects",
      value: stats?.total || 0,
      icon: Building2,
      color: "bg-secondary",
      bgColor: "bg-accent",
      textColor: "text-white",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle,
      color: "bg-success",
      bgColor: "bg-green-50",
      textColor: "text-success",
    },
    {
      title: "In Progress",
      value: stats?.ongoing || 0,
      icon: Clock,
      color: "bg-accent",
      bgColor: "bg-yellow-50",
      textColor: "text-accent",
    },
    {
      title: "Planned",
      value: stats?.planned || 0,
      icon: AlertCircle,
      color: "bg-primary",
      bgColor: "bg-surface",
      textColor: "text-primary",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-primary sm:text-3xl sm:truncate">
            Dashboard Overview
          </h2>
          <p className="mt-1 text-sm text-secondary opacity-70">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={fetchDashboardData}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-surface overflow-hidden shadow-lg rounded-lg border border-color"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.textColor}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-secondary opacity-70 truncate">
                      {card.title}
                    </dt>
                    <dd className="text-lg font-medium text-primary">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Distribution Chart */}
        <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
          <h3 className="text-lg leading-6 font-medium text-primary mb-4">
            Projects by Category
          </h3>
          {stats && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">Residential</span>
                <span className="text-sm font-medium text-secondary">
                  {stats.by_category.residential}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.by_category.residential / stats.total) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">Commercial</span>
                <span className="text-sm font-medium text-success">
                  {stats.by_category.commercial}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.by_category.commercial / stats.total) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">Industrial</span>
                <span className="text-sm font-medium text-accent">
                  {stats.by_category.industrial}
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.by_category.industrial / stats.total) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
          <h3 className="text-lg leading-6 font-medium text-primary mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            {recentActivity.length > 0 ? (
              <ul className="-mb-8">
                {recentActivity.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-border-color"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full ${
                              activity.status === "completed"
                                ? "bg-green-500"
                                : activity.status === "ongoing"
                                ? "bg-secondary"
                                : "bg-primary"
                            } flex items-center justify-center ring-8 ring-background`}
                          >
                            {activity.status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-white" />
                            ) : activity.status === "ongoing" ? (
                              <Clock className="h-4 w-4 text-white" />
                            ) : (
                              <Building2 className="h-4 w-4 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-secondary opacity-80">
                              {activity.action}{" "}
                              <span className="font-medium text-primary">
                                {activity.project}
                              </span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-secondary opacity-70">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <BarChart3 className="mx-auto h-8 w-8 text-primary opacity-40" />
                <p className="mt-2 text-sm text-secondary opacity-70">
                  No recent activity to display
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface shadow-lg rounded-lg p-6 border border-color">
        <h3 className="text-lg leading-6 font-medium text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/admin/projects/new")}
            className="relative bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-lg hover:from-secondary hover:to-primary transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center">
              <Building2 className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">New Project</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/admin/analytics")}
            className="relative bg-gradient-to-r from-secondary to-accent-hover text-white p-4 rounded-lg hover:from-accent-hover hover:to-secondary transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">View Analytics</span>
            </div>
          </button>

          {/* <button className="relative bg-gradient-to-r from-accent to-primary text-white p-4 rounded-lg hover:from-primary hover:to-accent transition-all duration-200 shadow-lg hover:shadow-xl">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Team Management</span>
            </div>
          </button>

          <button className="relative bg-gradient-to-r from-accent-hover to-secondary text-white p-4 rounded-lg hover:from-secondary hover:to-accent-hover transition-all duration-200 shadow-lg hover:shadow-xl">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Schedule</span>
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
