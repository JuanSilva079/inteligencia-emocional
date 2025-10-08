
import React from 'react';

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-rose-500/20 hover:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-75 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      <p className="text-gray-300 group-hover:text-white transition-colors">{text}</p>
    </button>
  );
};

export default ChoiceButton;
