
import { useState } from 'react';
import axios from 'axios';

const usePostRequest = (url, config = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, payload, config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postRequest };
};

export default usePostRequest;


// to call the hook like this by destructuring as below
// const { data, loading, error: apiError, postRequest } = usePostRequest('/api/appointments', {}, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Default Authorization header
//     },
//     timeout: 5000, // Default timeout of 5 seconds
//   });
