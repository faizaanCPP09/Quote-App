import React from 'react';
import { Quote } from '../types/Quote';
import { FaHeart } from 'react-icons/fa';

interface QuoteCardProps {
  quote: Quote;
  onAddToFavorites?: (quote: Quote) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onAddToFavorites }) => {
  const handleAddToFavorites = () => {
    if (onAddToFavorites) {
      onAddToFavorites(quote);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
      <p className="text-lg italic text-gray-800 dark:text-white">"{quote.quote}"</p>
      {quote.author && <p className="mt-4 text-right font-semibold text-gray-700 dark:text-gray-300">- {quote.author}</p>}
      {onAddToFavorites && (
        <button
          onClick={handleAddToFavorites}
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          <FaHeart />
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default QuoteCard;