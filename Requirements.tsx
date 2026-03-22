import React from 'react';
import { Monitor, Smartphone, Cpu, HardDrive, Code, Database } from 'lucide-react';

const Requirements: React.FC = () => {
  const hardwareRequirements = [
    { component: "Processor", requirement: "Intel i5 / AMD Ryzen 5 or higher", icon: <Cpu size={20} /> },
    { component: "Memory (RAM)", requirement: "8GB minimum, 16GB recommended", icon: <HardDrive size={20} /> },
    { component: "Storage", requirement: "500GB SSD for optimal performance", icon: <Database size={20} /> },
    { component: "Graphics", requirement: "Dedicated GPU for AR processing", icon: <Monitor size={20} /> },
    { component: "Camera", requirement: "HD webcam or smartphone camera", icon: <Smartphone size={20} /> },
    { component: "Display", requirement: "1920x1080 minimum resolution", icon: <Monitor size={20} /> }
  ];

  const softwareRequirements = [
    { component: "Operating System", requirement: "Windows 10/11, macOS 10.15+, Ubuntu 20.04+", icon: <Code size={20} /> },
    { component: "Web Browser", requirement: "Chrome 90+, Firefox 88+, Safari 14+", icon: <Code size={20} /> },
    { component: "Runtime Environment", requirement: "Node.js 18.0 or higher", icon: <Code size={20} /> },
    { component: "Database", requirement: "PostgreSQL 13+ or MongoDB 5.0+", icon: <Database size={20} /> },
    { component: "AI Framework", requirement: "TensorFlow 2.8+ or PyTorch 1.11+", icon: <Code size={20} /> },
    { component: "Development Tools", requirement: "VS Code, Git, Docker (optional)", icon: <Code size={20} /> }
  ];

  const developmentStack = [
    { category: "Frontend", technologies: "React 18, TypeScript, Tailwind CSS, WebRTC" },
    { category: "Backend", technologies: "Node.js, Express.js, Socket.io, JWT Authentication" },
    { category: "AI/ML", technologies: "Python, TensorFlow, OpenCV, Natural Language Toolkit" },
    { category: "Database", technologies: "PostgreSQL, Redis, MongoDB (NoSQL)" },
    { category: "Cloud Services", technologies: "AWS, Google Cloud AI, Cloudinary" },
    { category: "DevOps", technologies: "Docker, GitHub Actions, Nginx, PM2" }
  ];

  return (
    <section id="requirements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            System Requirements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive hardware and software specifications for optimal system performance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Hardware Requirements */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Monitor className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Hardware Requirements</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-pink-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-800">Component</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-800">Requirement</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {hardwareRequirements.map((req, index) => (
                    <tr key={index} className="hover:bg-white/50 transition-colors duration-200">
                      <td className="py-4 px-2 flex items-center space-x-3">
                        <span className="text-pink-600">{req.icon}</span>
                        <span className="font-medium text-gray-700">{req.component}</span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{req.requirement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Software Requirements */}
          <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Software Requirements</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-800">Component</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-800">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  {softwareRequirements.map((req, index) => (
                    <tr key={index} className="hover:bg-white/50 transition-colors duration-200">
                      <td className="py-4 px-2 flex items-center space-x-3">
                        <span className="text-purple-600">{req.icon}</span>
                        <span className="font-medium text-gray-700">{req.component}</span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{req.requirement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Development Stack */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Technology Stack</h3>
            <p className="text-lg opacity-90">Modern technologies powering the Fashion Style AI system</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentStack.map((stack, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <h4 className="text-xl font-semibold mb-3">{stack.category}</h4>
                <p className="text-white/90 leading-relaxed">{stack.technologies}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;