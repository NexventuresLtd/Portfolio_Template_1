import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Building2,
  ArrowRight,
  Shield,
  BarChart3,
  Settings,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Real-time project insights",
    },
    {
      icon: Briefcase,
      title: "Project Management",
      desc: "Complete project oversight",
    },
    {
      icon: Settings,
      title: "System Controls",
      desc: "Comprehensive admin tools",
    },
    { icon: Shield, title: "Secure Access", desc: "Enterprise-grade security" },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-accent rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-accent-hover rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-accent-hover rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          {/* Brand Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-accent rounded-xl mr-4">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Robert Construction
                </h1>
                <p className="text-white/80 text-sm">Admin Portal</p>
              </div>
            </div>
            <p className="text-white/90 text-lg leading-relaxed max-w-md">
              Comprehensive project management and analytics platform for
              construction excellence.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 w-full max-w-md">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-accent rounded-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-2 bg-primary rounded-lg mr-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">
                Robert Construction
              </h1>
            </div>
            <p className="text-secondary">Admin Portal Access</p>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-3">
              Welcome Back
            </h2>
            <p className="text-secondary">
              Sign in to access your project management dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-5 h-5" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-primary"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-surface border border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center">
                  Access Dashboard
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-surface rounded-lg border border-color">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Secure Admin Access
            </h3>
            <p className="text-secondary text-sm">
              This portal provides secure access to project management tools,
              analytics, and administrative functions.
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center text-sm text-secondary">
            <p>Need assistance?</p>
            <p>
              Contact support at{" "}
              <a
                href="mailto:admin@robertconstruction.rw"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                admin@robertconstruction.rw
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
