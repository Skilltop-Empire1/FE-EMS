
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRequest = (url, initialData = {}, config = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, config);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [url, config]);

  return { data, loading, error };
};

export default useFetchRequest;

// use case as below

// const { data, loading, error } = useFetchRequest('/api/appointments', [], {
//     headers: {
//       'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Example header
//     },
//     timeout: 5000, // Example timeout
//   });