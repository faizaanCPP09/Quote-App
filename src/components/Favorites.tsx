import React, { useEffect, useState } from 'react';
import { Quote } from '../types/Quote';
import { FaTrash } from 'react-icons/fa';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((quote) => quote.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((quote) => (
            <div key={quote.id} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
              <p className="text-lg italic text-gray-800 dark:text-white">"{quote.quote}"</p>
              {quote.author && <p className="mt-4 text-right font-semibold text-gray-700 dark:text-gray-300">- {quote.author}</p>}
              <button
                onClick={() => removeFavorite(quote.id)}
                className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-red-600 hover:to-pink-600 transition-all"
              >
                <FaTrash />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;