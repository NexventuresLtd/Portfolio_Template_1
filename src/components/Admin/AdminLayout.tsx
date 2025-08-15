import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Building2,
} from "lucide-react";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    { name: "Add Project", href: "/admin/projects/new", icon: PlusCircle },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background transition-colors duration-300">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-surface">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent
            navigation={navigation}
            currentPath={location.pathname}
            mobile={true}
            onNavigate={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent
            navigation={navigation}
            currentPath={location.pathname}
            mobile={false}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-surface shadow-sm border-b border-color">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="px-4 text-secondary focus:outline-none focus:ring-2 focus:ring-accent md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h2 className="text-xl font-semibold text-primary">
                {navigation.find((item) => location.pathname === item.href)
                  ?.name || "Dashboard"}
              </h2>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-primary">
                      {user?.username}
                    </p>
                    <p className="text-xs text-secondary">Administrator</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded-md transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-background">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarContentProps {
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  currentPath: string;
  mobile: boolean;
  onNavigate?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  navigation,
  currentPath,
  mobile,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
    if (onNavigate) onNavigate();
  };

  return (
    <div className="flex flex-col h-0 flex-1 border-r border-color bg-surface">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="flex items-center">
            <div className="p-2 bg-primary rounded-lg mr-3">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">
                Robert Construction
              </h1>
              <p className="text-xs text-secondary">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="mt-2 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`
                  w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-secondary hover:bg-accent-hover hover:text-white"
                  }
                `}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive
                      ? "text-white"
                      : "text-secondary group-hover:text-white"
                  }`}
                />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
      {!mobile && (
        <div className="flex-shrink-0 flex border-t border-color p-4">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-primary">Admin User</p>
              <p className="text-xs text-secondary">System Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
