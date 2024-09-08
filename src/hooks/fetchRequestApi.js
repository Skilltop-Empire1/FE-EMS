import { useState, useEffect } from 'react';

function useFetchRequest(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status
            
          }`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError(new Error('Request timed out.'));
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetchRequest;
