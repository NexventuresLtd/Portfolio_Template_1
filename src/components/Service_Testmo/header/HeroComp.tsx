import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Award, Users, Calendar, ArrowRight, Phone, Mail } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample construction images - replace with your actual images
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Premium Construction Services",
      subtitle: "Building Your Dreams with Excellence"
    },
    {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Modern Architecture Solutions",
      subtitle: "Innovative Designs for Tomorrow"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Commercial & Residential Projects",
      subtitle: "Transforming Spaces, Creating Value"
    },
    {
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Expert Team & Quality Materials",
      subtitle: "Your Trusted Construction Partner"
    }
  ];

  const services = [
    { icon: "🏗️", title: "General Construction", desc: "Complete building solutions from foundation to finish" },
    { icon: "🏠", title: "Residential Projects", desc: "Custom homes and renovations tailored to your needs" },
    { icon: "🏢", title: "Commercial Buildings", desc: "Office complexes, retail spaces, and industrial facilities" },
    { icon: "🔧", title: "Renovation & Remodeling", desc: "Transform existing spaces with modern upgrades" }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: Award },
    { number: "50+", label: "Expert Team Members", icon: Users },
    { number: "15+", label: "Years of Experience", icon: Calendar }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full pt-16 md:pt-32 lg:pt-64 xl:pt-20 h-auto lg:h-screen overflow-hidden bg-background">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-glass-dark text-white hover:bg-primary transition-all duration-300 group"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-glass-dark text-white hover:bg-primary transition-all duration-300 group"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-accent scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center py-12 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white space-y-6 md:space-y-8">
              {/* Animated Title */}
              <div className="space-y-3 md:space-y-4">
                <div className="overflow-hidden">
                  <h1 
                    key={currentSlide}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-[slideInUp_0.8s_ease-out_forwards] opacity-0"
                    style={{
                      animationDelay: '0.2s'
                    }}
                  >
                    {heroSlides[currentSlide].title}
                  </h1>
                </div>
                
                <div className="overflow-hidden">
                  <p 
                    key={`${currentSlide}-subtitle`}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 animate-[slideInUp_0.8s_ease-out_forwards] opacity-0"
                    style={{
                      animationDelay: '0.4s'
                    }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-[slideInUp_0.8s_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: '0.6s'
                }}
              >
                <button className="group px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group px-6 py-3 sm:px-8 sm:py-4 bg-glass-dark text-white rounded-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-semibold border border-white/20">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Projects
                </button>
              </div>

              {/* Contact Info */}
              <div 
                className="flex flex-col sm:flex-row gap-4 md:gap-6 animate-[slideInUp_0.8s_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: '0.8s'
                }}
              >
                <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                  <div className="p-1 md:p-2 bg-glass-dark rounded-lg">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm opacity-75">Call Us</p>
                    <p className="text-sm md:text-base font-semibold">+250 788 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                  <div className="p-1 md:p-2 bg-glass-dark rounded-lg">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm opacity-75">Email Us</p>
                    <p className="text-sm md:text-base font-semibold">info@r-construction.rw</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Stats & Services */}
            <div className="space-y-6 md:space-y-8">
              {/* Stats Cards */}
              <div 
                className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2 sm:gap-4 animate-[slideInRight_0.8s_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: '0.3s'
                }}
              >
                {/* {stats.map((stat, index) => (
                  <div key={index} className="bg-glass-dark rounded-lg md:rounded-xl p-3 md:p-6 text-center text-white hover:bg-glass-light transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.02] md:hover:scale-105">
                    <div className="flex justify-center mb-2 md:mb-3">
                      <div className="p-2 md:p-3 bg-primary rounded-lg">
                        <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">{stat.number}</h3>
                    <p className="text-gray-200 text-xs md:text-sm mt-1">{stat.label}</p>
                  </div>
                ))} */}
              </div>

              {/* Services Preview */}
              <div 
                className="bg-glass-dark rounded-xl md:rounded-2xl p-4 md:p-6 animate-[slideInRight_0.8s_ease-out_forwards] opacity-0"
                style={{
                  animationDelay: '0.5s'
                }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Our Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="group p-3 md:p-4 rounded-lg hover:bg-glass-light transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm md:text-base text-white group-hover:text-primary transition-colors">{service.title}</h4>
                          <p className="text-gray-300 text-xs md:text-sm mt-1">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-[float_6s_ease-in-out_infinite] hidden lg:block" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary/20 rounded-full animate-[float_4s_ease-in-out_infinite_reverse] hidden lg:block" />
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full animate-[float_5s_ease-in-out_infinite] hidden lg:block" />
    </div>
  );
};

// Custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes float-reverse {
    0%, 100% {
      transform: translateY(-20px);
    }
    50% {
      transform: translateY(0px);
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-reverse {
    animation: float-reverse 4s ease-in-out infinite;
  }
`;

if (!document.head.contains(style)) {
  document.head.appendChild(style);
}

export default HeroSection;