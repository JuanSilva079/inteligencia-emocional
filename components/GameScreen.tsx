
import React from 'react';
import type { GameState } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ChoiceButton from './ChoiceButton';

interface GameScreenProps {
  gameState: GameState | null;
  onChoice: (choice: string) => void;
  isLoading: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onChoice, isLoading }) => {
  if (isLoading && !gameState) {
    return <LoadingSpinner text="Iniciando tu historia de amor..." />;
  }

  if (!gameState) {
    return <div className="text-center text-gray-400">Esperando el inicio de la historia...</div>;
  }

  return (
    <div className="w-full text-center relative">
      <div
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-30' : 'opacity-100'}`}
      >
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap animate-fade-in">
          {gameState.scene}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {gameState.choices.map((choice, index) => (
            <ChoiceButton
              key={index}
              text={choice}
              onClick={() => onChoice(choice)}
              disabled={isLoading}
            />
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
          <LoadingSpinner text="El destino está decidiendo..." />
        </div>
      )}
    </div>
  );
};

export default GameScreen;
