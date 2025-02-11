//This is a custom react hook
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Quote } from '../types/Quote';

const useQuotes = (page: number) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`https://dummyjson.com/quotes?limit=10&skip=${(page - 1) * 10}`);
        setQuotes(data.quotes);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [page]);

  return { quotes, loading, error };
};

export default useQuotes;
