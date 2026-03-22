import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, CameraOff, Download, RotateCcw, Shirt, User, X, Sparkles } from 'lucide-react';

const VirtualTryOn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fashion outfit data with style-appropriate colors
  const outfits = [
    {
      id: 1,
      name: "White Formal Shirt",
      color: "#FFFFFF",
      category: "Formal",
      style: "Professional",
      gender: "unisex"
    },
    {
      id: 2,
      name: "Navy Business Blazer",
      color: "#1E40AF",
      category: "Formal",
      style: "Executive",
      gender: "unisex"
    },
    {
      id: 3,
      name: "Pink Casual Top",
      color: "#F8BBD9",
      category: "Casual",
      style: "Trendy",
      gender: "female"
    },
    {
      id: 4,
      name: "Black T-Shirt",
      color: "#000000",
      category: "Casual",
      style: "Classic",
      gender: "unisex"
    },
    {
      id: 5,
      name: "Green Casual Shirt",
      color: "#14B8A6",
      category: "Casual",
      style: "Fresh",
      gender: "unisex"
    },
    {
      id: 6,
      name: "Red Party Dress",
      color: "#DC2626",
      category: "Party",
      style: "Glamorous",
      gender: "female"
    },
    {
      id: 7,
      name: "Grey Hoodie",
      color: "#6B7280",
      category: "Casual",
      style: "Comfortable",
      gender: "unisex"
    },
    {
      id: 8,
      name: "Yellow Summer Top",
      color: "#FCD34D",
      category: "Casual",
      style: "Bright",
      gender: "female"
    },
    {
      id: 9,
      name: "Brown Leather Jacket",
      color: "#92400E",
      category: "Casual",
      style: "Edgy",
      gender: "unisex"
    },
    {
      id: 10,
      name: "Purple Formal Blouse",
      color: "#7C3AED",
      category: "Formal",
      style: "Elegant",
      gender: "female"
    },
    {
      id: 11,
      name: "Orange Casual Tee",
      color: "#EA580C",
      category: "Casual",
      style: "Vibrant",
      gender: "unisex"
    },
    {
      id: 12,
      name: "Maroon Traditional Kurta",
      color: "#7F1D1D",
      category: "Traditional",
      style: "Cultural",
      gender: "unisex"
    }
  ];

  // Start camera stream
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [facingMode]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  // Toggle camera facing mode
  const toggleFacingMode = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isCameraActive) {
      stopCamera();
      setTimeout(() => startCamera(), 100);
    }
  }, [isCameraActive, stopCamera, startCamera]);

  // Take snapshot
  const takeSnapshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw outfit overlay
    if (selectedOutfit >= 0 && outfits[selectedOutfit]) {
      drawOutfitOverlay(ctx, canvas.width, canvas.height);
    }

    // Download the image
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fashion-style-${outfits[selectedOutfit].name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [selectedOutfit, outfits]);

  // Draw outfit overlay
  const drawOutfitOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const outfit = outfits[selectedOutfit];
    const overlayWidth = width * 0.4;
    const overlayHeight = height * 0.5;
    const x = (width - overlayWidth) / 2;
    const y = height * 0.2;

    // Create realistic gradient based on outfit type
    const gradient = ctx.createLinearGradient(x, y, x, y + overlayHeight);
    gradient.addColorStop(0, `${outfit.color}A0`);
    gradient.addColorStop(0.3, `${outfit.color}C0`);
    gradient.addColorStop(0.7, `${outfit.color}B0`);
    gradient.addColorStop(1, `${outfit.color}90`);

    // Draw outfit shape based on category
    ctx.fillStyle = gradient;
    
    if (outfit.category === 'Traditional') {
      // Draw traditional outfit shape (more flowing)
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + overlayWidth/2, y - 10, x + overlayWidth, y);
      ctx.lineTo(x + overlayWidth + 20, y + overlayHeight);
      ctx.quadraticCurveTo(x + overlayWidth/2, y + overlayHeight + 20, x - 20, y + overlayHeight);
      ctx.closePath();
      ctx.fill();
    } else if (outfit.category === 'Formal') {
      // Draw formal outfit shape (structured)
      ctx.fillRect(x, y, overlayWidth, overlayHeight * 0.7);
      // Add collar
      ctx.fillRect(x + overlayWidth * 0.3, y - 10, overlayWidth * 0.4, 15);
    } else {
      // Draw casual outfit shape
      ctx.fillRect(x, y, overlayWidth, overlayHeight);
    }
    
    // Add realistic shadows and highlights
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Add fabric texture effect
    ctx.globalCompositeOperation = 'multiply';
    const textureGradient = ctx.createLinearGradient(x, y, x + overlayWidth, y + overlayHeight);
    textureGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    textureGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
    textureGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
    ctx.fillStyle = textureGradient;
    ctx.fillRect(x, y, overlayWidth, overlayHeight);
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowColor = 'transparent';

    // Add outfit label with better styling
    const labelHeight = 50;
    const labelGradient = ctx.createLinearGradient(x, y + overlayHeight - labelHeight, x, y + overlayHeight);
    labelGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    labelGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = labelGradient;
    ctx.fillRect(x, y + overlayHeight - labelHeight, overlayWidth, labelHeight);
    
    // Add outfit name
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(outfit.name, x + overlayWidth / 2, y + overlayHeight - 30);
    
    // Add category and style
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(`${outfit.category} • ${outfit.style}`, x + overlayWidth / 2, y + overlayHeight - 10);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <section id="try-on" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-pink-400" size={16} />
            <span className="text-white font-medium text-sm">Virtual Fashion Experience</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Try On
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400">
              Your Style
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of fashion with our virtual try-on technology. See how different styles look on you instantly!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl relative border border-white/20">
              {!isCameraActive ? (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Camera size={36} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">Start Your Fashion Journey</h3>
                      <p className="text-white/70 mb-6 max-w-md mx-auto">
                        Allow camera access to begin your virtual styling session
                      </p>
                      {error && (
                        <div className="bg-red-500/20 border border-red-400 rounded-lg p-3 mb-4 max-w-md mx-auto backdrop-blur-sm">
                          <p className="text-red-300 text-sm">{error}</p>
                        </div>
                      )}
                      <button
                        onClick={startCamera}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {isLoading ? 'Starting Camera...' : 'Start Virtual Try-On'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-auto rounded-3xl"
                    style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                  />
                  
                  {/* Outfit Overlay */}
                  {selectedOutfit >= 0 && (
                    <div 
                      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-40 h-48 border-2 border-white/30 rounded-2xl backdrop-blur-sm"
                      style={{
                        backgroundColor: `${outfits[selectedOutfit].color}40`,
                      }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <Shirt size={32} className="mb-2 opacity-70" />
                        <span className="text-xs font-medium bg-black/50 px-2 py-1 rounded">
                          {outfits[selectedOutfit].name}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Camera Controls */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button
                      onClick={toggleFacingMode}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                      title="Switch Camera"
                    >
                      <RotateCcw size={20} />
                    </button>
                    
                    <button
                      onClick={takeSnapshot}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                      title="Take Snapshot"
                    >
                      <Download size={20} />
                    </button>
                    
                    <button
                      onClick={stopCamera}
                      className="bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                      title="Stop Camera"
                    >
                      <CameraOff size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Outfit Selection */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="mr-3" size={24} />
                Choose Your Style
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {outfits.slice(0, 12).map((outfit, index) => (
                  <button
                    key={outfit.id}
                    onClick={() => setSelectedOutfit(index)}
                    className={`p-4 rounded-2xl transition-all duration-300 border-2 group ${
                      selectedOutfit === index
                        ? 'border-pink-400 bg-pink-500/20 scale-105'
                        : 'border-white/20 bg-white/5 hover:border-pink-400/50 hover:bg-white/10'
                    }`}
                  >
                    <div 
                      className="aspect-square rounded-xl mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: outfit.color }}
                    >
                      <Shirt size={28} className="text-gray-700" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{outfit.name}</h4>
                    <div className="flex justify-between text-xs text-white/70">
                      <span>{outfit.category}</span>
                      <span>{outfit.style}</span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {outfit.gender === 'unisex' ? 'Unisex' : outfit.gender === 'male' ? 'Men' : 'Women'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4">Filter by Style</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  All Styles
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Formal
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Casual
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Traditional
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4">How It Works</h4>
              <div className="space-y-4 text-sm text-white/80">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Enable your camera</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Select an outfit style</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-teal-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>See the virtual overlay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Capture and share</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">✨ Pro Tips</h4>
              <ul className="text-sm text-white/80 space-y-2">
                <li>• Stand in good lighting for best results</li>
                <li>• Keep your full body in frame for better fitting</li>
                <li>• Try different angles and poses</li>
                <li>• Mix and match different styles</li>
                <li>• Use front camera for better accuracy</li>
                <li>• Try both formal and casual looks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hidden canvas for snapshots */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
};

export default VirtualTryOn;