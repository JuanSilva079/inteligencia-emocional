
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-fade-in">
      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
        Cada relación es un viaje con sus propios desafíos y alegrías. ¿Tienes la inteligencia emocional para navegar sus complejidades y fortalecer el vínculo? Tus decisiones darán forma a esta historia.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-3 bg-rose-600 text-white font-bold rounded-lg shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Comenzar la Aventura
      </button>
    </div>
  );
};

export default StartScreen;
