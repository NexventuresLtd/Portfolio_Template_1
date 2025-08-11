import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  ChevronDown,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';

type LanguageCode = 'en' | 'fr' | 'kn' | 'sw';

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Theme and Language hooks
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  // Define available languages with their display names
  const languages = [
    { code: "en" as LanguageCode, name: "English", flag: "🇺🇸" },
    { code: "fr" as LanguageCode, name: "Français", flag: "🇫🇷" },
    { code: "kn" as LanguageCode, name: "Kinyarwanda", flag: "🇷🇼" },
    { code: "sw" as LanguageCode, name: "Swahili", flag: "🇹🇿" },
  ];

  const navItems: NavItem[] = [
    { name: t('navbar.menu.home'), href: '#home' },
    { 
      name: t('navbar.menu.services'), 
      href: '#services',
      hasDropdown: true,
      dropdownItems: [
        { name: t('navbar.menu.residential'), href: '#residential' },
        { name: t('navbar.menu.commercial'), href: '#commercial' },
        { name: t('navbar.menu.renovations'), href: '#renovations' },
        { name: t('navbar.menu.management'), href: '#management' }
      ]
    },
    { name: t('navbar.menu.projects'), href: '#projects' },
    { name: t('navbar.menu.about'), href: '#about' },
    { name: t('navbar.menu.testimonials'), href: '#testimonials' },
    { name: t('navbar.menu.contact'), href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close dropdowns if screen size changes to desktop
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
      if (showLanguageDropdown && !(event.target as Element).closest('.language-selector')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, showLanguageDropdown]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? `${theme === 'dark' ? 'bg-surface' : 'bg-primary'} backdrop-blur-md shadow-lg }`
        : 'bg-transparent'
    }`}>
      {/* Top bar with contact info */}
      <div className={`${theme === 'dark' ? 'bg-background' : 'bg-primary'} text-white  transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100 py-2'
      }`}>
        <div className="w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{t('navbar.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{t('navbar.contact.email')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{t('navbar.contact.address')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full md:max-w-11/12 mx-auto px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Building2 className={`h-8 w-8 ${isScrolled ? (theme === 'dark' ? 'text-secondary' : 'text-accent') : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold ${
              isScrolled ? (theme === 'dark' ? 'text-primary' : 'text-white') : 'text-white'
            }`}>
              {t('navbar.companyName')}
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:block">
            <div className="flex items-baseline lg:space-x-0">
              {navItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative dropdown-container"
                  onMouseEnter={() => windowWidth > 768 && item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => windowWidth > 768 && setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                      isScrolled 
                        ? (theme === 'dark' ? 'text-primary hover:bg-secondary' : 'text-white hover:bg-accent')
                        : 'text-white hover:bg-secondary'
                    }`}
                    onClick={() => windowWidth < 768 && item.hasDropdown && setActiveDropdown(
                      activeDropdown === item.name ? null : item.name
                    )}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </a>
                  
                  {/* Dropdown menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className={`absolute top-full left-0 w-56 ${theme === 'dark' ? 'bg-surface' : 'bg-white'} shadow-xl rounded-lg ${theme === 'dark' ? 'border-color' : 'border-gray-200'} border py-2 mt-1`}>
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                            theme === 'dark' 
                              ? 'text-primary hover:bg-secondary hover:text-secondary' 
                              : 'text-primary hover:bg-accent hover:text-accent'
                          }`}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center ">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? (theme === 'dark' ? 'text-primary hover:bg-secondary/20' : 'text-white hover:bg-accent/20')
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={`Toggle theme, current mode: ${theme}`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Language Selector - Desktop */}
            <div className="hidden lg:block relative language-selector">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isScrolled 
                    ? (theme === 'dark' ? 'text-primary hover:bg-secondary/20' : 'text-white hover:bg-accent/20')
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Select language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === lang)?.flag} {languages.find(l => l.code === lang)?.name.split('')[0].toUpperCase()}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div className={`absolute top-full right-0 w-48 ${theme === 'dark' ? 'bg-surface' : 'bg-white'} shadow-xl rounded-lg ${theme === 'dark' ? 'border-color' : 'border-gray-200'} border py-2 mt-1`}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLang(language.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                        lang === language.code
                          ? (theme === 'dark' ? 'bg-secondary/20 text-secondary' : 'bg-accent/10 text-accent')
                          : (theme === 'dark' ? 'text-primary hover:bg-secondary/20' : 'text-primary hover:bg-accent/10')
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-md ${
                isScrolled ? (theme === 'dark' ? 'text-primary' : 'text-white') : 'text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`lg:hidden ${theme === 'dark' ? 'bg-surface' : 'bg-white'} border-t ${theme === 'dark' ? 'border-color' : 'border-gray-200'} shadow-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="dropdown-container">
                <a
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-primary hover:text-secondary hover:bg-secondary/20'
                      : 'text-primary hover:text-accent hover:bg-accent/10'
                  }`}
                  onClick={(e) => {
                    if (item.hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </a>
                
                {/* Mobile dropdown menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="pl-4 py-1 space-y-1">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'text-primary hover:text-secondary hover:bg-secondary/20'
                            : 'text-primary hover:text-accent hover:bg-accent/10'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <label className={`text-sm ${theme === 'dark' ? 'text-primary' : 'text-primary'}`}>
                {t('navbar.menu.language')}:
              </label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className={`ml-2 px-2 py-1 text-sm rounded border ${
                  theme === 'dark' 
                    ? 'bg-surface border-color text-primary' 
                    : 'bg-white border-gray-300 text-primary'
                }`}
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.flag} {language.name}
                  </option>
                ))}
              </select>
            </div>
            
            <a
              href="#contact"
              className="block px-3 py-2 bg-accent hover:bg-accent-hover text-white rounded-md text-base font-medium text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              {t('navbar.menu.getQuote')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;