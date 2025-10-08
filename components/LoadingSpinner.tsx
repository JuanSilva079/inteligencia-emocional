
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-rose-200">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
