
import React, { useState, useEffect } from 'react';
import { StarField } from './components/StarField';
import { Confetti } from './components/Confetti';
import { BalloonLayer } from './components/BalloonLayer';
import { TypewriterMessage } from './components/TypewriterMessage';
import { BackgroundMusic } from './components/BackgroundMusic';

const MESSAGES = [
  "Happy Birthday Papa 🎂😊",
  "Happy 50th Birthday! 🎈",
  "Thank you for everything 🙏",
  "Wishing you happiness & good health 🌟",
  "Love you always ❤️"
];

const App: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showFinale, setShowFinale] = useState(false);
  const [interactionStarted, setInteractionStarted] = useState(false);

  // Cycle through messages
  useEffect(() => {
    if (!interactionStarted) return;

    if (currentMessageIndex < MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 3500); // Wait for typing + reading time
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowFinale(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, interactionStarted]);

  const startCelebration = () => {
    setInteractionStarted(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 flex flex-col items-center justify-center text-white">
      {/* Background elements always visible */}
      <StarField />
      
      {/* Interaction Overlay (Initial Start) */}
      {!interactionStarted && (
        <div className="z-50 flex flex-col items-center animate-fade-in text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
            A Special Surprise for Papa
          </h1>
          <button 
            onClick={startCelebration}
            className="px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-slate-950 font-bold rounded-full text-2xl transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer"
          >
            Celebrate Papa 💝
          </button>
        </div>
      )}

      {interactionStarted && (
        <>
          <BackgroundMusic />
          <BalloonLayer />
          <Confetti trigger={showFinale} />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-6">
            <div className="mb-8 transform transition-all duration-1000 scale-110">
               {/* 50th badge - Made much bigger and more "Golden" */}
               <div className="relative inline-flex items-center justify-center w-48 h-48 md:w-64 md:h-64 border-4 border-amber-400 rounded-full mb-6 bg-amber-500/20 backdrop-blur-md shadow-[0_0_50px_rgba(251,191,36,0.3)] animate-pulse">
                 <div className="absolute inset-2 border-2 border-dashed border-amber-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <span className="text-7xl md:text-9xl font-serif font-bold text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">50</span>
               </div>
            </div>

            <div className="min-h-[120px] flex items-center justify-center">
              <TypewriterMessage 
                key={currentMessageIndex}
                text={MESSAGES[currentMessageIndex]} 
                onComplete={() => {}}
              />
            </div>

            {showFinale && (
              <div className="mt-8 animate-fade-in flex flex-col items-center space-y-6">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-lg">
                  Happy 50th Birthday Papa!
                </h3>
                <p className="text-2xl md:text-3xl font-cursive text-amber-100 italic">"The man, the myth, the legend."</p>
                <div className="flex space-x-6 text-5xl md:text-6xl">
                  <span className="animate-bounce" style={{animationDelay: '0s'}}>🌸</span>
                  <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎂</span>
                  <span className="animate-bounce" style={{animationDelay: '0.4s'}}>🎉</span>
                  <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🎂</span>
                  <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🌺</span>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Flowers in corners */}
          <div className="absolute bottom-10 left-10 text-7xl md:text-8xl opacity-60 select-none animate-float" style={{animationDelay: '1s'}}>🌸</div>
          <div className="absolute bottom-10 right-10 text-7xl md:text-8xl opacity-60 select-none animate-float" style={{animationDelay: '2s'}}>🌺</div>
          <div className="absolute top-24 left-16 text-5xl opacity-40 select-none animate-float" style={{animationDelay: '3s'}}>✨</div>
          
          {/* Moon */}
          <div className="absolute top-10 right-10 w-24 h-24 md:w-32 md:h-32 bg-amber-50 rounded-full shadow-[0_0_60px_rgba(254,243,199,0.5)] blur-[1px]">
            <div className="absolute top-6 left-6 w-5 h-5 bg-amber-200/50 rounded-full"></div>
            <div className="absolute bottom-8 left-14 w-8 h-8 bg-amber-200/50 rounded-full"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
