import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, Camera, MessageCircle, Database, Shield, Smartphone, Sparkles } from 'lucide-react';

const Modules: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const modules = [
    {
      icon: <Brain className="text-pink-600" size={32} />,
      title: "AI Style Engine",
      description: "The heart of our fashion intelligence system",
      gradient: "from-pink-500 to-pink-600",
      features: [
        "Personal Style Analysis",
        "Trend Prediction Algorithm",
        "Color Harmony Detection",
        "Body Type Recognition",
        "Occasion-Based Styling",
        "Seasonal Recommendations"
      ]
    },
    {
      icon: <Camera className="text-purple-600" size={32} />,
      title: "Virtual Fitting Room",
      description: "Try before you buy with AR technology",
      gradient: "from-purple-500 to-purple-600",
      features: [
        "Real-time Camera Integration",
        "3D Body Mapping",
        "Outfit Overlay System",
        "Size Adjustment AI",
        "Photo Capture & Share",
        "Multiple Angle Views"
      ]
    },
    {
      icon: <MessageCircle className="text-teal-600" size={32} />,
      title: "Style Conversation",
      description: "Natural language fashion consultation",
      gradient: "from-teal-500 to-teal-600",
      features: [
        "Natural Language Processing",
        "Style Intent Recognition",
        "Conversational Memory",
        "Personalized Responses",
        "Multi-language Support",
        "Voice Interaction"
      ]
    },
    {
      icon: <Database className="text-pink-600" size={32} />,
      title: "Fashion Database",
      description: "Comprehensive style and trend data",
      gradient: "from-pink-500 to-rose-600",
      features: [
        "Global Fashion Catalog",
        "Trend Analytics",
        "Style History Tracking",
        "Brand Integration",
        "Price Comparison",
        "Availability Tracking"
      ]
    },
    {
      icon: <Shield className="text-purple-600" size={32} />,
      title: "Privacy Guardian",
      description: "Your style data, completely secure",
      gradient: "from-purple-500 to-indigo-600",
      features: [
        "End-to-End Encryption",
        "Anonymous Style Profiles",
        "Data Ownership Control",
        "Secure Image Processing",
        "Privacy-First Design",
        "GDPR Compliance"
      ]
    },
    {
      icon: <Smartphone className="text-teal-600" size={32} />,
      title: "Style Interface",
      description: "Beautiful, intuitive user experience",
      gradient: "from-teal-500 to-cyan-600",
      features: [
        "Responsive Design",
        "Touch-Friendly Interface",
        "Accessibility Features",
        "Dark/Light Themes",
        "Gesture Controls",
        "Offline Capabilities"
      ]
    }
  ];

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <section id="modules" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-pink-400" size={16} />
            <span className="text-white font-medium text-sm">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Technology
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400">
              That Works
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover the advanced modules that power your personalized fashion experience
          </p>
        </div>

        <div className="space-y-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/20"
            >
              <button
                onClick={() => toggleModule(index)}
                className="w-full p-8 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex items-center space-x-6">
                  <div className={`p-4 bg-gradient-to-br ${module.gradient} rounded-2xl shadow-lg`}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {module.title}
                    </h3>
                    <p className="text-white/70 text-lg">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {expandedModule === index ? (
                    <ChevronUp className="text-white/60" size={28} />
                  ) : (
                    <ChevronDown className="text-white/60" size={28} />
                  )}
                </div>
              </button>

              {expandedModule === index && (
                <div className="px-8 pb-8 border-t border-white/10">
                  <div className="pt-6">
                    <h4 className="text-lg font-semibold text-white/90 mb-6">Key Features:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {module.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-white/80 font-medium group-hover:text-white transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Seamless Integration</h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              All modules work together harmoniously to create a unified, intelligent fashion experience 
              that adapts to your unique style and preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modules;