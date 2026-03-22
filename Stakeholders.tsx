import React from 'react';
import { Building, Users, Code } from 'lucide-react';

const Stakeholders: React.FC = () => {
  const stakeholderGroups = [
    {
      icon: <Building className="text-pink-600" size={48} />,
      title: "Client Stakeholders",
      color: "from-pink-500 to-pink-600",
      stakeholders: [
        {
          role: "Project Sponsor",
          description: "Academic institution providing resources and oversight",
          responsibilities: ["Project funding", "Timeline approval", "Resource allocation"]
        },
        {
          role: "Fashion Industry Partners",
          description: "Clothing brands and retailers providing product data",
          responsibilities: ["Product catalogs", "Brand guidelines", "Market insights"]
        }
      ]
    },
    {
      icon: <Users className="text-purple-600" size={48} />,
      title: "User Stakeholders",
      color: "from-purple-500 to-purple-600",
      stakeholders: [
        {
          role: "End Users",
          description: "Fashion enthusiasts seeking personalized styling advice",
          responsibilities: ["User feedback", "Beta testing", "Feature suggestions"]
        },
        {
          role: "Fashion Consultants",
          description: "Professional stylists validating AI recommendations",
          responsibilities: ["Style validation", "Trend insights", "Quality assurance"]
        }
      ]
    },
    {
      icon: <Code className="text-teal-600" size={48} />,
      title: "Technical Stakeholders",
      color: "from-teal-500 to-teal-600",
      stakeholders: [
        {
          role: "Development Team",
          description: "Software engineers and AI specialists building the system",
          responsibilities: ["System development", "Algorithm implementation", "Technical testing"]
        },
        {
          role: "Quality Assurance",
          description: "Testing professionals ensuring system reliability",
          responsibilities: ["Test planning", "Bug reporting", "Performance validation"]
        }
      ]
    }
  ];

  return (
    <section id="stakeholders" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Project Stakeholders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key individuals and groups invested in the success of the Fashion Style AI project
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stakeholderGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${group.color} p-6 text-white text-center`}>
                <div className="mb-4 flex justify-center">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-bold">{group.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {group.stakeholders.map((stakeholder, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {stakeholder.role}
                    </h4>
                    <p className="text-gray-600 mb-3 text-sm">
                      {stakeholder.description}
                    </p>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Key Responsibilities:</h5>
                      <ul className="space-y-1">
                        {stakeholder.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Collaborative Success</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            The success of Fashion Style AI depends on the active collaboration and engagement of all stakeholder groups. 
            Through continuous communication and feedback loops, we ensure that the system meets the needs of users 
            while maintaining technical excellence and business viability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stakeholders;