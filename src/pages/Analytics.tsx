import React, { useState, useEffect } from "react";
import { projectAPI } from "../services/projectAPI";
import type { ProjectStats } from "../services/projectAPI";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Building2,
  PieChart,
} from "lucide-react";

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const statsData = await projectAPI.getProjectStats();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const completionRate = stats ? (stats.completed / stats.total) * 100 : 0;
  const ongoingRate = stats ? (stats.ongoing / stats.total) * 100 : 0;
  const plannedRate = stats ? (stats.planned / stats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics & Insights
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive overview of project performance and trends.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={fetchAnalytics}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.total || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completion Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {completionRate.toFixed(1)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.ongoing || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Planned Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats?.planned || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Project Status Distribution
            </h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {stats?.completed || 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({completionRate.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Ongoing</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {stats?.ongoing || 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({ongoingRate.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${ongoingRate}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Planned</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  {stats?.planned || 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({plannedRate.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${plannedRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Projects by Category
            </h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>

          {stats && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Residential</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.by_category.residential}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (stats.by_category.residential / stats.total) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-600 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Commercial</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.by_category.commercial}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (stats.by_category.commercial / stats.total) * 100
                    }%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-600 rounded mr-3"></div>
                  <span className="text-sm text-gray-600">Industrial</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats.by_category.industrial}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
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
      </div>

      {/* Performance Metrics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
          Performance Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats?.completed || 0}
            </div>
            <div className="text-sm text-gray-500">Projects Completed</div>
            <div className="mt-2">
              <div className="text-xs text-green-600 font-medium">
                {completionRate.toFixed(1)}% completion rate
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats?.ongoing || 0}
            </div>
            <div className="text-sm text-gray-500">Active Projects</div>
            <div className="mt-2">
              <div className="text-xs text-blue-600 font-medium">
                Currently in progress
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">
              {stats?.planned || 0}
            </div>
            <div className="text-sm text-gray-500">Planned Projects</div>
            <div className="mt-2">
              <div className="text-xs text-gray-600 font-medium">
                Ready to start
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Key Insights
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                You have a {completionRate.toFixed(1)}% project completion rate,
                which is excellent for maintaining client satisfaction.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                {stats?.ongoing || 0} projects are currently active, ensuring
                steady workflow and revenue.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                {stats
                  ? Object.values(stats.by_category).sort(
                      (a, b) => b - a
                    )[0] === stats.by_category.residential
                    ? "Residential"
                    : Object.values(stats.by_category).sort(
                        (a, b) => b - a
                      )[0] === stats.by_category.commercial
                    ? "Commercial"
                    : "Industrial"
                  : "Some"}
                projects make up the largest portion of your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
