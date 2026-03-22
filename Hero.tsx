import React from 'react';
import { Sparkles, Camera, Heart, Star, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Fashion Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-teal-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      </div>

      {/* Floating Fashion Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-teal-400/20 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-10 w-14 h-14 bg-pink-400/20 rounded-full animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8 animate-fadeIn">
          {/* Main Title */}
          <div className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-200"></div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              Fashion
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400">
                Style
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Your Personal AI Fashion Assistant
            </p>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Discover your perfect style with our conversational AI system for personalized outfit recommendations
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Powered</h3>
              <p className="text-white/70">Smart recommendations tailored to your unique style</p>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Virtual Try-On</h3>
              <p className="text-white/70">See how outfits look on you in real-time</p>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
              <p className="text-white/70">Curated just for your taste and preferences</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button
              onClick={() => document.getElementById('try-on')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <Camera size={20} />
              <span>Try Virtual Fitting</span>
            </button>
            
            <button
              onClick={() => {
                const chatButton = document.querySelector('[data-chat-toggle]') as HTMLButtonElement;
                chatButton?.click();
              }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Chat with AI Stylist</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;