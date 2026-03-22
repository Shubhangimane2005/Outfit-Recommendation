import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, X, Minimize2, Maximize2, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dbHelpers } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  recommendations?: any[];
  followUpQuestions?: string[];
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your personal fashion stylist AI powered by advanced AI technology. I can help you with:\n\n• Outfit recommendations for any occasion\n• Color coordination and styling tips\n• Body type specific advice\n• Accessory suggestions\n• Fashion trends and shopping advice\n• Style questions for both men and women\n\nWhat would you like to know about fashion today? 👗✨",
      sender: 'bot',
      timestamp: new Date(),
      followUpQuestions: [
        "Suggest casual outfits for men",
        "Navaratri outfits for women",
        "What colors go with navy blue?",
        "Formal wear for women",
        "Diwali outfits for men",
        "Latest fashion trends"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      let data;
      
      try {
        const enhancedPrompt = `You are a professional fashion stylist AI assistant specializing in both Western and Indian fashion. The user asked: "${message}"
        
        Please provide comprehensive fashion advice including:
        1. Detailed outfit suggestions with specific items.
        2. Color coordination tips suitable for the occasion.
        3. Styling tips and explanations for why the look works.
        4. Accessory recommendations (jewelry, footwear, bags, etc.).
        5. If the query mentions a festival like Diwali or Navaratri, give culturally appropriate suggestions.
        
        Be conversational, helpful, and provide specific actionable advice.`;

        response = await fetch('/api/gemini-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: enhancedPrompt, userId: user?.id || 'anonymous' })
        });
        
        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error('Gemini API failed');
        }
      } catch (geminiError) {
        console.log('Gemini API failed, using fallback:', geminiError);
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, userId: user?.id || 'anonymous' })
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        data = await response.json();
      }

      if (data.success || data.response || data.text) {
        const responseText = data.response || data.text || data.message;
        const outfitImages = generateOutfitImages(message, responseText);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
          recommendations: outfitImages,
          followUpQuestions: data.followUpQuestions || generateFollowUpQuestions(message)
        };

        setMessages(prev => [...prev, botMessage]);
        
        if (user && outfitImages.length > 0) {
          console.log('Saving conversation to database...');
          await dbHelpers.saveConversation(user.id, message, responseText, outfitImages);
          console.log('Conversation saved successfully');
        }
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try asking your fashion question again in a moment!",
        sender: 'bot',
        timestamp: new Date(),
        followUpQuestions: ["Casual outfit ideas", "Formal wear suggestions", "Color matching tips"]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- MODIFIED FUNCTION WITH ENHANCED LOGIC ---
  const generateOutfitImages = (query: string, response: string) => {
    const lowerQuery = query.toLowerCase();
    const outfits = [];
    const isMaleQuery = lowerQuery.includes('men') || lowerQuery.includes('man') || lowerQuery.includes('male');
    const isFemaleQuery = lowerQuery.includes('women') || lowerQuery.includes('woman') || lowerQuery.includes('female');

    // Navaratri Outfits
    if (lowerQuery.includes('navaratri')) {
        if (isFemaleQuery || !isMaleQuery) {
            outfits.push({
                category: "Women's Navaratri Wear",
                items: [
                    { type: 'outfit', item: 'Colorful Lehenga Choli', image: 'https://images.pexels.com/photos/11832269/pexels-photo-11832269.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Ghagra with Mirror Work', image: 'https://images.pexels.com/photos/15579308/pexels-photo-15579308/free-photo-of-woman-in-a-saree-in-a-garden.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
        if (isMaleQuery || !isFemaleQuery) {
            outfits.push({
                category: "Men's Navaratri Wear",
                items: [
                    { type: 'outfit', item: 'Embroidered Kurta Pajama', image: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Kediyu and Dhoti', image: 'https://images.pexels.com/photos/9050567/pexels-photo-9050567.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
    }

    // Diwali Outfits
    if (lowerQuery.includes('diwali')) {
        if (isFemaleQuery || !isMaleQuery) {
            outfits.push({
                category: "Women's Diwali Wear",
                items: [
                    { type: 'outfit', item: 'Elegant Silk Saree', image: 'https://images.pexels.com/photos/10556947/pexels-photo-10556947.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Anarkali Suit', image: 'https://images.pexels.com/photos/5407054/pexels-photo-5407054.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
        if (isMaleQuery || !isFemaleQuery) {
            outfits.push({
                category: "Men's Diwali Wear",
                items: [
                    { type: 'outfit', item: 'Stylish Kurta with Nehru Jacket', image: 'https://images.pexels.com/photos/9050567/pexels-photo-9050567.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Silk Kurta Set', image: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
    }
    
    // Casual Outfits
    if (lowerQuery.includes('casual')) {
        if (isMaleQuery || !isFemaleQuery) {
            outfits.push({
                category: "Men's Casual",
                items: [
                    { type: 'outfit', item: 'Polo Shirt & Chinos', image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Henley & Jeans', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
        if (isFemaleQuery || !isMaleQuery) {
            outfits.push({
                category: "Women's Casual",
                items: [
                    { type: 'outfit', item: 'T-Shirt Dress & Sneakers', image: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Stylish Top & Jeans', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
    }

    // Formal Outfits
    if (lowerQuery.includes('formal') || lowerQuery.includes('office')) {
        if (isMaleQuery || !isFemaleQuery) {
            outfits.push({
                category: "Men's Formal",
                items: [
                    { type: 'outfit', item: 'Classic Business Suit', image: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Blazer & Trousers', image: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
        if (isFemaleQuery || !isMaleQuery) {
            outfits.push({
                category: "Women's Formal",
                items: [
                    { type: 'outfit', item: 'Modern Pantsuit', image: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Sheath Dress & Blazer', image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
    }

    // Party Outfits
    if (lowerQuery.includes('party')) {
        if (isMaleQuery || !isFemaleQuery) {
            outfits.push({
                category: "Men's Party Wear",
                items: [
                    { type: 'outfit', item: 'Stylish Blazer & Shirt', image: 'https://images.pexels.com/photos/5695977/pexels-photo-5695977.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Patterned Shirt & Trousers', image: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
        if (isFemaleQuery || !isMaleQuery) {
            outfits.push({
                category: "Women's Party Wear",
                items: [
                    { type: 'outfit', item: 'Cocktail Dress', image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400' },
                    { type: 'outfit', item: 'Sequin Top & Skirt', image: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=400' }
                ]
            });
        }
    }
    
    return outfits;
  };

  const generateFollowUpQuestions = (query: string) => {
    // ... (this function remains the same)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleQuickReply = (question: string) => {
    sendMessage(question);
  };

  // --- JSX (NO CHANGES BELOW THIS LINE) ---

  if (!isOpen) {
    return (
      <button
        data-chat-toggle
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-96 h-16' : 'w-[500px] h-[700px]'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Fashion AI Stylist</h3>
              <p className="text-sm opacity-90">
                {user ? `Welcome, ${user.user_metadata?.full_name || user.email?.split('@')[0]}!` : 'Sign in for personalized recommendations'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button onClick={onToggle} className="p-1 hover:bg-white/20 rounded transition-colors duration-200">
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'}`}>
                        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`rounded-2xl px-5 py-4 ${message.sender === 'user' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                        <p className="text-base whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        {message.recommendations && message.recommendations.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {message.recommendations.map((rec, index) => (
                              <div key={index} className="bg-white/10 rounded-xl p-4">
                                <h4 className="font-semibold text-base mb-3 flex items-center">
                                  <Image size={16} className="mr-2" />
                                  {rec.category}
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                  {rec.items.map((item: any, itemIndex: number) => (
                                    <div key={itemIndex} className="flex items-center space-x-3 bg-white/20 rounded-lg p-2">
                                      {item.image && (
                                        <img src={item.image} alt={item.item} className="w-12 h-12 object-cover rounded-lg" />
                                      )}
                                      <div>
                                        <span className="capitalize font-medium text-sm">{item.type}:</span>
                                        <p className="text-sm">{item.item}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 ml-12 mt-3">
                      {message.followUpQuestions.map((question, index) => (
                        <button key={index} onClick={() => handleQuickReply(question)} className="text-sm bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-700 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105">
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Bot size={16} className="text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <div className="p-5 border-t border-gray-200 bg-white">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input ref={inputRef} type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask about fashion, outfits, colors..." className="flex-1 px-5 py-3 text-base border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200" disabled={isLoading} />
                <button type="submit" disabled={isLoading || !inputMessage.trim()} className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
                  <Send size={18} />
                </button>
              </form>
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Sparkles size={14} />
                  <span>Powered by Advanced Fashion AI {user ? '• Personalized for you' : ''}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;