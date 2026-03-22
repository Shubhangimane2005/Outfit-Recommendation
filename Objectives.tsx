import React from 'react';
import { Target, Users, Zap, Shield, Globe, Lightbulb } from 'lucide-react';

const Objectives: React.FC = () => {
  const objectives = [
    {
      icon: <Target className="text-pink-600" size={32} />,
      title: "Personalized Recommendations",
      description: "Develop an AI system that provides highly personalized outfit recommendations based on individual user preferences, body type, and lifestyle."
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: "Enhanced User Experience",
      description: "Create an intuitive conversational interface that makes fashion discovery accessible and enjoyable for users of all technical backgrounds."
    },
    {
      icon: <Zap className="text-teal-600" size={32} />,
      title: "Real-Time Processing",
      description: "Implement efficient algorithms to provide instant outfit suggestions and virtual try-on experiences without delays."
    },
    {
      icon: <Shield className="text-pink-600" size={32} />,
      title: "Privacy Protection",
      description: "Ensure user data privacy and security while delivering personalized fashion recommendations through advanced encryption methods."
    },
    {
      icon: <Globe className="text-purple-600" size={32} />,
      title: "Cross-Platform Compatibility",
      description: "Develop a responsive system that works seamlessly across web browsers, mobile devices, and various screen sizes."
    },
    {
      icon: <Lightbulb className="text-teal-600" size={32} />,
      title: "Innovation in Fashion Tech",
      description: "Pioneer new approaches in fashion technology by combining AI, computer vision, and augmented reality for virtual styling."
    }
  ];

  return (
    <section id="objectives" className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Project Objectives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to revolutionize the fashion industry through intelligent technology and user-centered design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {objective.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                {objective.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {objective.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              To create a world where everyone has access to personalized fashion advice and styling assistance, 
              powered by cutting-edge AI technology that understands individual needs and preferences while 
              promoting sustainable fashion choices and inclusive design principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectives;