import React, { useState, useEffect } from 'react';
import QuoteCard from './components/QuoteCard';
import Pagination from './components/Pagination';
import RandomQuote from './components/RandomQuote';
import Favorites from './components/Favorites';
import useQuotes from './hooks/useQuotes';
import { FaRandom, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';

type Quote = {
  id: string;
  text: string;
  author: string;
};

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const { quotes, loading, error } = useQuotes(page);
  const [showRandomQuote, setShowRandomQuote] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [addingToFavorites, setAddingToFavorites] = useState(false);

  
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const addToFavorites = (quote: Quote) => {
    setAddingToFavorites(true);
    setTimeout(() => {
      const savedFavorites = localStorage.getItem('favorites');
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      if (!favorites.some((fav: Quote) => fav.id === quote.id)) {
        favorites.push(quote);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      setAddingToFavorites(false);
    }, 1000); // Simulate a delay for the loading spinner
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 font-poppins">
      
      <header className="sticky top-0 z-50 bg-glass backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quote App</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowRandomQuote(!showRandomQuote)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              <FaRandom />
              {showRandomQuote ? 'Quote List' : 'Random Quote'}
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all"
            >
              <FaHeart />
              {showFavorites ? 'Hide Favorites' : 'Favorites'}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-gray-800 hover:to-gray-900 transition-all"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      
      {addingToFavorites && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <span className="animate-spin text-2xl text-blue-500">
              <ImSpinner8 />
          </span>            
          <p className="text-gray-800 dark:text-white">Adding to Favorites...</p>
          </div>
        </div>
      )}

      
      <main className="container mx-auto p-4 pt-24">
        {showFavorites ? (
          <Favorites />
        ) : showRandomQuote ? (
          <RandomQuote />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} onAddToFavorites={addToFavorites} />
              ))}
            </div>
            <Pagination page={page} setPage={setPage} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;