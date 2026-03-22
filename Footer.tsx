import React from 'react';
import { Heart, Sparkles, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Fashion Style</h3>
                <p className="text-white/70">AI Fashion Assistant</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed max-w-md">
              Revolutionizing fashion discovery through conversational AI and virtual try-on technology. 
              Experience personalized styling like never before.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Mail size={18} className="text-white" />
              </div>
              <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                <Phone size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#hero" },
                { label: "About", href: "#introduction" },
                { label: "Features", href: "#modules" },
                { label: "Try-On", href: "#try-on" },
                { label: "Contact", href: "#contact" }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/70 hover:text-pink-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Project Info</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div>
                <p className="font-medium text-white">Student</p>
                <p>Shubhangi Mane (T094)</p>
              </div>
              <div>
                <p className="font-medium text-white">Academic Year</p>
                <p>2025-26</p>
              </div>
              <div>
                <p className="font-medium text-white">Institution</p>
                <p>Institute of Technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="py-8 border-t border-white/10">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Built With Modern Technology</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
              {[
                "React", "TypeScript", "Tailwind CSS", "WebRTC", 
                "AI/ML", "Computer Vision", "Node.js", "Fashion API"
              ].map((tech, index) => (
                <span 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} Fashion Style AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="text-pink-400" size={16} fill="currentColor" />
              <span>for the future of fashion technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-teal-400/10 rounded-full animate-pulse delay-500"></div>
    </footer>
  );
};

export default Footer;