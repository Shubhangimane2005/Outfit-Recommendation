import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

// --- Data for the Quiz with Relevant Images ---

const questions = [
  {
    questionText: 'Which color palette are you most drawn to?',
    options: [
      { answerText: 'Neutral tones: black, white, beige, and grey.', stylePoints: { classic: 2, minimalist: 2 }, imageUrl: 'https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Earthy shades: olive green, burnt orange, and brown.', stylePoints: { bohemian: 2 }, imageUrl: 'https://images.pexels.com/photos/547593/pexels-photo-547593.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Bold and vibrant: electric blue, hot pink, and metallics.', stylePoints: { edgy: 1, trendy: 2 }, imageUrl: 'https://images.pexels.com/photos/4451633/pexels-photo-4451633.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Soft pastels: blush pink, baby blue, and lavender.', stylePoints: { classic: 1 }, imageUrl: 'https://images.pexels.com/photos/7139708/pexels-photo-7139708.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },
  {
    questionText: 'Pick your ideal weekend outfit:',
    options: [
      { answerText: 'A tailored blazer, white tee, and dark-wash jeans.', stylePoints: { classic: 2 }, imageUrl: 'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'A flowy maxi dress and sandals.', stylePoints: { bohemian: 2 }, imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'A leather jacket, band t-shirt, and ripped jeans.', stylePoints: { edgy: 2 }, imageUrl: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'A simple, high-quality cashmere sweater and trousers.', stylePoints: { minimalist: 2 }, imageUrl: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },
  {
    questionText: 'Which pattern do you prefer?',
    options: [
      { answerText: 'Classic stripes or simple polka dots.', stylePoints: { classic: 2 }, imageUrl: 'https://images.pexels.com/photos/289823/pexels-photo-289823.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Paisley, floral, or tie-dye.', stylePoints: { bohemian: 2 }, imageUrl: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Animal prints or graphic logos.', stylePoints: { edgy: 1, trendy: 1 }, imageUrl: 'https://images.pexels.com/photos/7691238/pexels-photo-7691238.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'No patterns, I prefer solid colors.', stylePoints: { minimalist: 2 }, imageUrl: 'https://images.pexels.com/photos/8439169/pexels-photo-8439169.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },
  {
    questionText: 'Choose your go-to footwear:',
    options: [
      { answerText: 'Ballet flats or classic loafers.', stylePoints: { classic: 2 }, imageUrl: 'https://images.pexels.com/photos/450033/pexels-photo-450033.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Ankle boots or espadrilles.', stylePoints: { bohemian: 2 }, imageUrl: 'https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Combat boots or chunky platform sneakers.', stylePoints: { edgy: 2 }, imageUrl: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Clean, white leather sneakers.', stylePoints: { minimalist: 2 }, imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },
  {
    questionText: 'What kind of accessories do you gravitate towards?',
    options: [
      { answerText: 'A simple pearl necklace or a timeless watch.', stylePoints: { classic: 2, minimalist: 1 }, imageUrl: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Layered necklaces, stacked rings, and wide-brim hats.', stylePoints: { bohemian: 2 }, imageUrl: 'https://images.pexels.com/photos/5370640/pexels-photo-5370640.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Chains, studs, and statement silver jewelry.', stylePoints: { edgy: 2 }, imageUrl: 'https://images.pexels.com/photos/7615456/pexels-photo-7615456.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { answerText: 'Minimal jewelry—just a delicate chain or nothing at all.', stylePoints: { minimalist: 2 }, imageUrl: 'https://images.pexels.com/photos/6954209/pexels-photo-6954209.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },
];

const styleResults = {
  classic: {
    title: 'Classic Chic',
    description: "You appreciate timeless elegance. Your wardrobe is built on well-made, tailored pieces in neutral colors. Your style is sophisticated, polished, and always appropriate.",
    icon: '💎',
    imageUrl: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  bohemian: {
    title: 'Bohemian Spirit',
    description: "You are a free spirit with an artistic soul. You love flowy fabrics, earthy tones, and intricate patterns. Your style is relaxed, romantic, and effortlessly cool.",
    icon: '🌿',
    imageUrl: 'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  edgy: {
    title: 'Edgy & Bold',
    description: "You are confident and love to make a statement. Your style is rebellious and cool, featuring leather, dark colors, and unconventional silhouettes. You're not afraid to take risks.",
    icon: '🔥',
    imageUrl: 'https://images.pexels.com/photos/1805493/pexels-photo-1805493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  trendy: {
    title: 'Trendsetter',
    description: "You have your finger on the pulse of fashion. You love experimenting with the latest styles, colors, and silhouettes seen on runways and social media. Your look is always fresh and current.",
    icon: '✨',
    imageUrl: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  minimalist: {
    title: 'Modern Minimalist',
    description: "You believe less is more. Your style is defined by clean lines, simple silhouettes, and a neutral color palette. You focus on quality, fit, and creating an effortlessly chic look.",
    icon: '⚪',
    imageUrl: 'https://images.pexels.com/photos/4946615/pexels-photo-4946615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
};


const StyleQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ classic: 0, bohemian: 0, edgy: 0, trendy: 0, minimalist: 0 });
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerOptionClick = (stylePoints: any) => {
    const newScores = { ...scores };
    for (const style in stylePoints) {
      if (newScores.hasOwnProperty(style)) {
        newScores[style as keyof typeof scores] += stylePoints[style];
      }
    }
    setScores(newScores);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const finalScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
    if (finalScores.length === 0 || finalScores[0][1] === 0) {
      return styleResults.classic; // Default fallback
    }
    return styleResults[finalScores[0][0] as keyof typeof styleResults];
  }

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({ classic: 0, bohemian: 0, edgy: 0, trendy: 0, minimalist: 0 });
    setShowResult(false);
    setQuizStarted(true);
  };

  const backgroundSection = (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-pink-50 to-transparent"></div>
    </div>
  )

  if (!quizStarted) {
    return (
      <section id="style-quiz" className="relative py-20 bg-pink-50 overflow-hidden">
        {backgroundSection}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles className="text-pink-500" size={16} />
            <span className="text-pink-700 font-medium text-sm">Discover Your Fashion DNA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Personal Style</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Don't know your style? Take this fun, quick quiz to discover the fashion aesthetic that truly represents you!
          </p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start the Quiz <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="style-quiz" className="relative py-20 bg-pink-50 overflow-hidden">
      {backgroundSection}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-500">
          {showResult ? (
            <div className='text-center animate-fadeIn'>
              {/* --- IMAGE ADDED HERE --- */}
              <img 
                src={getResult().imageUrl} 
                alt={getResult().title}
                className="w-full max-w-sm mx-auto h-80 object-cover rounded-lg shadow-lg mb-8"
              />
              <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">{getResult().icon}</div>
              <h3 className='text-4xl font-bold text-gray-800 mb-4'>Your Style Is: {getResult().title}</h3>
              <p className='text-lg text-gray-600 max-w-xl mx-auto mb-8'>{getResult().description}</p>
              <button
                onClick={restartQuiz}
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <RefreshCw className="inline mr-2" size={18} /> Take Again
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-purple-700">Question {currentQuestion + 1}/{questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, transition: 'width 0.5s ease-in-out' }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center'>{questions[currentQuestion].questionText}</h3>
                <div className='grid grid-cols-2 md:grid-cols-2 gap-6'>
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(option.stylePoints)}
                      className='group block text-center bg-gray-50/50 border-2 border-transparent rounded-lg hover:border-purple-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 overflow-hidden transform hover:-translate-y-1'
                    >
                      <img src={option.imageUrl} alt={option.answerText} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                      <p className="p-4 text-sm font-medium text-gray-700">{option.answerText}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default StyleQuiz;