import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Building2, ArrowRight, CheckCircle, Users, Trophy, Clock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically handle the login logic
      console.log('Login attempt:', { email, password, rememberMe });
      window.location.href ="/admin/dash"
    }, 2000);
  };

  const stats = [
    { icon: Building2, value: '250+', label: 'Projects Completed' },
    { icon: Users, value: '50+', label: 'Expert Engineers' },
    { icon: Trophy, value: '15+', label: 'Years Experience' },
    { icon: Clock, value: '24/7', label: 'Project Support' }
  ];

  const features = [
    'Real-time project tracking and updates',
    'Advanced project analytics and reporting',
    'Secure document management system',
    'Direct communication with project teams',
    'Mobile-responsive dashboard access',
    'Comprehensive project portfolio view'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          {/* Logo and Company Info */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Building2 className="w-10 h-10 mr-3" />
              <h1 className="text-3xl font-bold">Robert Construction</h1>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed">
              Led by <strong>Eng. Robert</strong>, delivering innovative, sustainable, and high-quality construction solutions across Rwanda.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8 w-full">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Our Commitment</h3>
            <p className="text-blue-100 leading-relaxed">
              Built on <strong>integrity, safety, and excellence</strong>, ensuring every client gets reliable solutions that exceed expectations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 mr-2 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Robert Construction</h1>
            </div>
            <p className="text-gray-600">Access Your Project Dashboard</p>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">
              Sign in to access your construction projects dashboard and stay updated on all developments.
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
            onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          </div>

          {/* Features Preview */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Inside Your Dashboard</h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Need help accessing your account?</p>
            <p>Contact our support team at <a href="mailto:support@robertconstruction.rw" className="text-blue-600 hover:text-blue-500">support@robertconstruction.rw</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;