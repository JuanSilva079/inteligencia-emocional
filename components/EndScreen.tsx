
import React from 'react';

interface EndScreenProps {
  finalScene: string | undefined;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ finalScene, onRestart }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-4xl font-serif text-rose-300 mb-4">Fin del Viaje</h2>
      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        {finalScene || "La historia ha llegado a su conclusión."}
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-3 bg-rose-600 text-white font-bold rounded-lg shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default EndScreen;
