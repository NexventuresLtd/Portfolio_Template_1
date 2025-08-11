import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  FileText,
  Download,
  Award,
  Shield,
  Users,
  ExternalLink,
  ChevronUp,
  Code
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';


interface QuickLinkProps {
  title: string;
  links: { name: string; href: string; isExternal?: boolean }[];
  theme: 'light' | 'dark';
}

const QuickLinks: React.FC<QuickLinkProps> = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-bold text-primary mb-6">{title}</h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className={`flex items-center text-secondary hover:text-accent transition-colors duration-200 group ${
              link.isExternal ? 'hover:translate-x-1' : ''
            }`}
            target={link.isExternal ? '_blank' : '_self'}
            rel={link.isExternal ? 'noopener noreferrer' : ''}
          >
            <span>{link.name}</span>
            {link.isExternal && (
              <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

interface ContactInfoProps {
  theme: 'light' | 'dark';
}

const ContactInfo: React.FC<ContactInfoProps> = ({ theme }) => (
  <div>
    <h3 className="text-lg font-bold text-primary mb-6">Contact Information</h3>
    <div className="space-y-4">
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
          theme === 'dark' ? 'bg-accent/20' : 'bg-accent/10'
        }`}>
          <Phone className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-secondary text-sm mb-1">Phone & WhatsApp</p>
          <a href="tel:+250788123456" className="text-primary font-semibold hover:text-accent transition-colors">
            +250 788 123 456
          </a>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
          theme === 'dark' ? 'bg-accent/20' : 'bg-accent/10'
        }`}>
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-secondary text-sm mb-1">Email Address</p>
          <a href="mailto:info@robertconstruction.rw" className="text-primary font-semibold hover:text-accent transition-colors">
            info@robertconstruction.rw
          </a>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
          theme === 'dark' ? 'bg-accent/20' : 'bg-accent/10'
        }`}>
          <MapPin className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-secondary text-sm mb-1">Office Location</p>
          <p className="text-primary font-semibold">
            KG 123 St, Kimisagara<br />
            Nyarugenge, Kigali, Rwanda
          </p>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 mt-1 ${
          theme === 'dark' ? 'bg-secondary/20' : 'bg-secondary/10'
        }`}>
          <Clock className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <p className="text-secondary text-sm mb-1">Working Hours</p>
          <p className="text-primary font-semibold">
            Mon - Fri: 8:00 AM - 6:00 PM<br />
            Sat: 9:00 AM - 4:00 PM<br />
            <span className="text-secondary">Sunday: Closed</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface NewsletterProps {
  theme: 'light' | 'dark';
}

const Newsletter: React.FC<NewsletterProps> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-primary mb-4">Stay Updated</h3>
      <p className="text-secondary mb-6 leading-relaxed">
        Get the latest construction tips, project updates, and industry insights delivered to your inbox.
      </p>
      
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-surface border-color text-primary placeholder-secondary/60 focus:border-accent'
                  : 'bg-surface border-color text-primary placeholder-secondary/60 focus:border-accent'
              } focus:outline-none focus:ring-2 focus:ring-accent/20`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-accent text-white hover:bg-accent-hover'
                : 'bg-accent text-white hover:bg-accent-hover'
            } hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <span>Subscribe Now</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
      ) : (
        <div className={`p-4 rounded-lg text-center ${
          theme === 'dark' ? 'bg-success/20' : 'bg-success/10'
        }`}>
          <div className="text-success text-2xl mb-2">✓</div>
          <p className="text-success font-semibold">Successfully subscribed!</p>
          <p className="text-secondary text-sm mt-1">Thank you for joining our newsletter.</p>
        </div>
      )}
      
      {/* Social Media Links */}
      <div className="mt-8">
        <p className="text-secondary text-sm mb-4">Follow us on social media:</p>
        <div className="flex space-x-4">
          {[
            { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
            { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
            { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
            { icon: Youtube, href: '#', label: 'YouTube', color: '#FF0000' },
            { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' }
          ].map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-surface border border-color hover:border-accent/50' 
                    : 'bg-surface border border-color hover:shadow-lg'
                }`}
                style={{ '--hover-color': social.color } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color + '20';
                  e.currentTarget.style.borderColor = social.color + '50';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <Icon className="w-5 h-5 text-secondary hover:text-primary" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button when scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
    { name: 'Quality Policy', href: '#quality' },
    { name: 'Safety Standards', href: '#safety' }
  ];

  const serviceLinks = [
    { name: 'Residential Construction', href: '#residential' },
    { name: 'Commercial Projects', href: '#commercial' },
    { name: 'Industrial Construction', href: '#industrial' },
    { name: 'Project Management', href: '#management' },
    { name: 'Consultancy Services', href: '#consultancy' }
  ];

  const resourceLinks = [
    { name: 'Project Portfolio', href: '#portfolio' },
    { name: 'Client Testimonials', href: '#testimonials' },
    { name: 'Construction Blog', href: '#blog' },
    { name: 'Free Consultation', href: '#consultation' },
    { name: 'Cost Calculator', href: '#calculator' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'Disclaimer', href: '#disclaimer' }
  ];

  const downloadableResources = [
    { name: 'Company Profile', href: '#company-profile', icon: FileText },
    { name: 'Service Brochure', href: '#brochure', icon: FileText },
    { name: "Eng. Robert's CV", href: '#cv', icon: FileText },
    { name: 'Safety Guidelines', href: '#safety-guide', icon: Shield }
  ];

  return (
    <footer className={`relative transition-colors duration-300 ${
      theme === 'dark' ? 'dark bg-surface' : 'light bg-surface border-slate-500 border-t-10'
    }`}>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            theme === 'dark' ? 'bg-accent text-white' : 'bg-accent text-white'
          }`}
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Main Footer Content */}
      <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Building2 className="w-8 h-8 text-accent mr-3" />
              <span className="text-xl font-bold text-primary">Robert Construction</span>
            </div>
            <p className="text-secondary mb-6 leading-relaxed">
              Building excellence through innovation, integrity, and professional craftsmanship. 
              Your trusted partner for all construction and engineering solutions in Rwanda.
            </p>
            
            {/* Certifications & Awards */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-secondary mr-2" />
                <span className="text-secondary text-sm">Licensed Professional Engineer</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-secondary mr-2" />
                <span className="text-secondary text-sm">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-secondary mr-2" />
                <span className="text-secondary text-sm">REMA Environmental Compliant</span>
              </div>
            </div>

            {/* Downloadable Resources */}
            <div className="mt-8">
              <h4 className="font-semibold text-primary mb-4">Download Resources</h4>
              <div className="space-y-2">
                {downloadableResources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <a
                      key={index}
                      href={resource.href}
                      className={`flex items-center text-sm text-secondary hover:text-accent transition-colors duration-200 group`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{resource.name}</span>
                      <Download className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-2">
            <QuickLinks title="Company" links={companyLinks} theme={theme} />
            <QuickLinks title="Services" links={serviceLinks} theme={theme} />
            <QuickLinks title="Resources" links={resourceLinks} theme={theme} />
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <ContactInfo theme={theme} />
            <Newsletter theme={theme} />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${theme === 'dark' ? 'border-color bg-background' : 'border-color bg-background'}`}>
        <div className="max-w-full md:max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-secondary text-sm text-center md:text-left">
                © 2024 Robert Construction. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-secondary hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center text-secondary text-sm cursor-pointer" onClick={()=>window.location.href="https://www.nexventures.net"}>
              <span>Developed By</span>
              <Code className="w-4 h-4 mx-1 text-accent" />
              <span className='font-bold text-amber-700'>NexVenture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;