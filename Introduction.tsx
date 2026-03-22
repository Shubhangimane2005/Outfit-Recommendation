import React from 'react';
import { Brain, MessageCircle, Palette, Smartphone, Zap, Users } from 'lucide-react';

const Introduction: React.FC = () => {
  const features = [
    {
      icon: <Brain className="text-pink-600" size={40} />,
      title: "Smart AI Brain",
      description: "Advanced machine learning that understands your unique fashion preferences and style"
    },
    {
      icon: <MessageCircle className="text-purple-600" size={40} />,
      title: "Natural Conversations",
      description: "Chat naturally about your style needs - no complex forms or confusing interfaces"
    },
    {
      icon: <Palette className="text-teal-600" size={40} />,
      title: "Style Matching",
      description: "Perfect color coordination and style combinations based on fashion expertise"
    },
    {
      icon: <Smartphone className="text-pink-600" size={40} />,
      title: "Virtual Reality",
      description: "See yourself in different outfits using cutting-edge AR technology"
    }
  ];

  return (
    <section id="introduction" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Zap className="text-pink-600" size={16} />
            <span className="text-pink-800 font-medium text-sm">Revolutionary Fashion Technology</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Meet Your Personal
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600">
              Style Assistant
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Fashion Style AI is more than just a recommendation system - it's your intelligent fashion companion 
            that understands your personality, lifestyle, and dreams to help you express your unique style.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fashion Stats */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Fashion Meets Technology</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
              Experience the future of fashion with AI that truly understands style, trends, and your personal aesthetic
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <p className="opacity-90">Fashion Items Analyzed</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                <p className="opacity-90">Style Match Accuracy</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <p className="opacity-90">Personal Style Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;