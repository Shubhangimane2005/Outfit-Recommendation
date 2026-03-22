import React from 'react';
import { Star, Users, Zap, Shield, Heart, Sparkles } from 'lucide-react';

const BackgroundStudy: React.FC = () => {
  const inspirations = [
    {
      name: "Stitch Fix",
      logo: "SF",
      color: "from-pink-500 to-rose-600",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      strengths: [
        "Personal stylist experience",
        "Curated fashion selections",
        "Try-before-buy model",
        "Style feedback integration"
      ],
      limitations: [
        "Limited real-time interaction",
        "Subscription-only model",
        "No virtual try-on features"
      ],
      rating: "4.2/5",
      users: "4M+ Users"
    },
    {
      name: "Amazon StyleSnap",
      logo: "AS",
      color: "from-purple-500 to-indigo-600",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      strengths: [
        "Visual search technology",
        "Massive product database",
        "AI-powered recommendations",
        "Social media integration"
      ],
      limitations: [
        "Generic styling approach",
        "Limited personalization",
        "No conversational interface"
      ],
      rating: "3.8/5",
      users: "200M+ Users"
    }
  ];

  const ourAdvantages = [
    {
      icon: <Zap className="text-yellow-400" size={24} />,
      title: "Real-Time Virtual Try-On",
      description: "See yourself in outfits instantly with AR technology"
    },
    {
      icon: <Heart className="text-pink-400" size={24} />,
      title: "Conversational AI",
      description: "Natural chat-based styling consultation"
    },
    {
      icon: <Star className="text-purple-400" size={24} />,
      title: "Personalized Intelligence",
      description: "AI that learns and adapts to your unique style"
    },
    {
      icon: <Shield className="text-teal-400" size={24} />,
      title: "Privacy-First Design",
      description: "Your style data stays secure and private"
    }
  ];

  return (
    <section id="background" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-pink-600" size={16} />
            <span className="text-pink-800 font-medium text-sm">Fashion Innovation</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Inspired by the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600">
              Best in Fashion
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've studied the leaders in fashion technology to create something even better
          </p>
        </div>

        {/* Inspiration Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {inspirations.map((inspiration, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={inspiration.image} 
                  alt={inspiration.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${inspiration.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <span className="text-2xl font-bold">{inspiration.logo}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{inspiration.name}</h3>
                    <div className="flex items-center justify-center space-x-4 mt-2 text-sm">
                      <span>{inspiration.rating}</span>
                      <span>•</span>
                      <span>{inspiration.users}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Star className="text-green-500 mr-2" size={20} />
                    What They Do Well
                  </h4>
                  <ul className="space-y-2">
                    {inspiration.strengths.map((strength, strengthIndex) => (
                      <li key={strengthIndex} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="text-orange-500 mr-2" size={20} />
                    Room for Innovation
                  </h4>
                  <ul className="space-y-2">
                    {inspiration.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Advantages */}
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">How We're Different</h3>
              <p className="text-xl opacity-90">Fashion Style AI combines the best features with groundbreaking innovations</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ourAdvantages.map((advantage, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{advantage.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Innovation Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
            <p className="text-gray-600">Real-time Virtual Try-On</p>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">AI</div>
            <p className="text-gray-600">Conversational Interface</p>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
            <p className="text-gray-600">Personal Style Assistant</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundStudy;