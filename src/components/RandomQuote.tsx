import React, { useEffect, useState } from 'react';
import { Quote } from '../types/Quote';

const RandomQuote: React.FC = () => {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (!response.ok) throw new Error('Failed to fetch random quote');
        const data = await response.json();
        setRandomQuote(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomQuote();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <p className="text-lg italic">"{randomQuote?.quote}"</p>
      {randomQuote?.author && <p className="mt-4 text-right font-semibold">- {randomQuote.author}</p>}
    </div>
  );
};

export default RandomQuote;