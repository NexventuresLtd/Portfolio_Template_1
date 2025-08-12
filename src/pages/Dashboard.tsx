import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, SortAsc, SortDesc, X, Calendar, MapPin, DollarSign, Users, Clock, ChevronDown, 
  Building, Home, Factory, Eye, Menu, Bell, Settings, LogOut, BarChart3, Activity, TrendingUp, Briefcase, Mail, Shield, ChevronRight,
  PieChart, Award, Hammer, Zap, 
} from 'lucide-react';

// Project interface and mock data (same as before)
interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial';
  status: 'completed' | 'ongoing' | 'planned';
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  client: string;
  description: string;
  image: string;
  teamSize: number;
  completionPercentage: number;
  features: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Luxury Villa Complex',
    category: 'residential',
    status: 'completed',
    location: 'Kigali Hills',
    budget: 850000,
    startDate: '2023-01-15',
    endDate: '2024-03-20',
    client: 'Horizon Properties Ltd',
    description: 'A premium residential complex featuring 12 luxury villas with modern amenities, sustainable design, and panoramic city views.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
    teamSize: 45,
    completionPercentage: 100,
    features: ['Solar Power', 'Smart Home Systems', 'Private Gardens', 'Security Systems']
  },
  {
    id: '2',
    title: 'Corporate Office Tower',
    category: 'commercial',
    status: 'ongoing',
    location: 'CBD Kigali',
    budget: 2500000,
    startDate: '2024-02-01',
    endDate: '2025-08-15',
    client: 'Rwandan Investment Corp',
    description: '25-story modern office building with state-of-the-art facilities, LEED certification, and advanced building management systems.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
    teamSize: 120,
    completionPercentage: 65,
    features: ['LEED Certified', 'Smart Building Tech', 'Rooftop Garden', 'Underground Parking']
  },
  {
    id: '3',
    title: 'Manufacturing Plant',
    category: 'industrial',
    status: 'completed',
    location: 'Kigali Economic Zone',
    budget: 1800000,
    startDate: '2022-08-10',
    endDate: '2023-11-30',
    client: 'East Africa Manufacturing',
    description: 'Modern textile manufacturing facility with automated systems, quality control labs, and worker amenities.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
    teamSize: 80,
    completionPercentage: 100,
    features: ['Automated Systems', 'Quality Labs', 'Worker Facilities', 'Environmental Compliance']
  },
  {
    id: '4',
    title: 'Affordable Housing Estate',
    category: 'residential',
    status: 'ongoing',
    location: 'Gasabo District',
    budget: 1200000,
    startDate: '2024-01-10',
    endDate: '2025-06-30',
    client: 'Rwanda Development Bank',
    description: 'Sustainable affordable housing project featuring 200 units with community facilities and green spaces.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop',
    teamSize: 60,
    completionPercentage: 40,
    features: ['Community Center', 'Playground', 'Green Spaces', 'Solar Water Heating']
  }
];

// Dashboard Components
const DashboardOverview: React.FC = () => {
  const stats = [
    { title: 'Active Projects', value: '8', change: '+12%', icon: Activity, color: 'blue' },
    { title: 'Total Revenue', value: '$12.5M', change: '+8%', icon: DollarSign, color: 'green' },
    { title: 'Team Members', value: '245', change: '+15%', icon: Users, color: 'purple' },
    { title: 'Completed Projects', value: '156', change: '+25%', icon: Award, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, Eng. Robert. Here's what's happening with your projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Project milestone completed', project: 'Corporate Office Tower', time: '2 hours ago' },
              { action: 'New client onboarded', project: 'Shopping Mall Complex', time: '4 hours ago' },
              { action: 'Budget approved', project: 'Residential Complex', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.project}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
          <div className="space-y-4">
            {mockProjects.filter(p => p.status === 'ongoing').map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{project.title}</span>
                  <span className="text-sm font-semibold text-blue-600">{project.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.completionPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects component from the previous artifact
const ProjectsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Project];
      let bValue: any = b[sortBy as keyof Project];
      
      if (sortBy === 'budget') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === 'startDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'residential': return <Home className="w-4 h-4" />;
      case 'commercial': return <Building className="w-4 h-4" />;
      case 'industrial': return <Factory className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Projects</h1>
        <p className="text-gray-600">Delivering excellence in construction and engineering across Rwanda</p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white/50 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/70 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Sort by Title</option>
              <option value="budget">Sort by Budget</option>
              <option value="startDate">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-3 bg-white/50 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/70 transition-all duration-300"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-white/30 flex flex-wrap gap-4 animate-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {filteredAndSortedProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/80 hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              {project.status === 'ongoing' && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-white text-xs font-medium">{project.completionPercentage}% Complete</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(project.category)}
                <span className="text-sm text-gray-500 capitalize">{project.category}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{project.teamSize} team members</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(project)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {getCategoryIcon(selectedProject.category)}
                <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-semibold">{selectedProject.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Budget</span>
                      <p className="font-semibold">{formatCurrency(selectedProject.budget)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Team Size</span>
                      <p className="font-semibold">{selectedProject.teamSize} members</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Start Date</span>
                      <p className="font-semibold">{formatDate(selectedProject.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">End Date</span>
                      <p className="font-semibold">{formatDate(selectedProject.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-500">Client</span>
                      <p className="font-semibold">{selectedProject.client}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedProject.status === 'ongoing' && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Project Progress</span>
                    <span className="text-sm font-bold text-blue-600">{selectedProject.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProject.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedProject.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-xl text-center"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Component
const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-600">Comprehensive insights into your construction business performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <PieChart className="w-16 h-16 text-blue-400" />
            <span className="ml-3 text-gray-600">Chart placeholder</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Performance</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
            <BarChart3 className="w-16 h-16 text-green-400" />
            <span className="ml-3 text-gray-600">Chart placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Component
const Team: React.FC = () => {
  const teamMembers = [
    { name: 'Eng. Robert', role: 'CEO & Lead Engineer', email: 'robert@robertconstruction.com', status: 'online' },
    { name: 'Sarah Mitchell', role: 'Project Manager', email: 'sarah@robertconstruction.com', status: 'away' },
    { name: 'David Chen', role: 'Senior Architect', email: 'david@robertconstruction.com', status: 'online' },
    { name: 'Maria Santos', role: 'Quality Manager', email: 'maria@robertconstruction.com', status: 'offline' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
        <p className="text-gray-600">Manage your construction team and track performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                member.status === 'online' ? 'bg-green-400' : 
                member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{member.email}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Settings Component
const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input 
                type="text" 
                defaultValue="Robert Construction"
                className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="robert@robertconstruction.com"
                className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                defaultValue="+250 123 456 789"
                className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Two-Factor Authentication</span>
              </div>
              <span className="text-green-600 text-sm">Enabled</span>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectsView />;
      case 'analytics':
        return <Analytics />;
      case 'team':
        return <Team />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-white/50 transition-all duration-300"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">Robert Construction</h1>
                  <p className="text-xs text-gray-500">Engineering Excellence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <button className="relative p-2 text-gray-500 hover:bg-white/50 rounded-xl transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  ER
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Eng. Robert</p>
                  <p className="text-xs text-gray-500">CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white/70 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group
                    ${activeSection === item.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-white/50'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-white/20">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">Pro Plan</span>
                </div>
                <p className="text-xs text-orange-700 mb-3">Unlock advanced features</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Upgrade Now
                </button>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-white/50 rounded-xl transition-all duration-300">
                <LogOut className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;