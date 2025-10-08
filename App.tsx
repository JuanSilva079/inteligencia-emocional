
import React, { useState, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { GameStatus } from './types';
import type { GameState } from './types';
import { initGame, makeChoice } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartGame = useCallback(async () => {
    setGameStatus(GameStatus.LOADING);
    setErrorMessage(null);
    try {
      const { chatInstance, initialGameState } = await initGame();
      setChat(chatInstance);
      setGameState(initialGameState);
      setGameStatus(GameStatus.PLAYING);
    } catch (error) {
      console.error('Failed to start game:', error);
      setErrorMessage('No se pudo iniciar la aventura. Por favor, revisa tu conexión o la configuración de la API y vuelve a intentarlo.');
      setGameStatus(GameStatus.ERROR);
    }
  }, []);

  const handleMakeChoice = useCallback(async (choice: string) => {
    if (!chat) return;
    setGameStatus(GameStatus.LOADING);
    setErrorMessage(null);
    try {
      const newGameState = await makeChoice(chat, choice);
      if (newGameState.scene.startsWith('FIN:')) {
        setGameState({ ...newGameState, scene: newGameState.scene.substring(4).trim() });
        setGameStatus(GameStatus.END);
      } else {
        setGameState(newGameState);
        setGameStatus(GameStatus.PLAYING);
      }
    } catch (error) {
      console.error('Failed to make choice:', error);
      setErrorMessage('Hubo un error al procesar tu elección. Por favor, inténtalo de nuevo.');
      setGameStatus(GameStatus.ERROR); // Revert to playing to allow retry
    }
  }, [chat]);

  const handleRestart = () => {
    setGameStatus(GameStatus.START);
    setGameState(null);
    setChat(null);
    setErrorMessage(null);
  };

  const renderContent = () => {
    if (errorMessage) {
      return (
        <div className="text-center text-red-300">
          <p className="mb-4">{errorMessage}</p>
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg transition-colors"
          >
            Reiniciar
          </button>
        </div>
      );
    }

    switch (gameStatus) {
      case GameStatus.START:
        return <StartScreen onStart={handleStartGame} />;
      case GameStatus.PLAYING:
      case GameStatus.LOADING:
        return (
          <GameScreen
            gameState={gameState}
            onChoice={handleMakeChoice}
            isLoading={gameStatus === GameStatus.LOADING}
          />
        );
      case GameStatus.END:
        return <EndScreen finalScene={gameState?.scene} onRestart={handleRestart} />;
      case GameStatus.ERROR:
       // This case is handled by the initial errorMessage check but is here for completeness.
        return (
          <div className="text-center text-red-300">
             <p className="mb-4">{errorMessage}</p>
             <button
                onClick={handleRestart}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg transition-colors"
             >
                Reiniciar
             </button>
          </div>
        )
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-900/50 to-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-serif tracking-wider">
            El Viaje del Amor
          </h1>
          <p className="text-rose-200/80 mt-2">Una aventura de inteligencia emocional</p>
        </header>
        <main className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl ring-1 ring-white/10 min-h-[300px] flex items-center justify-center">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
