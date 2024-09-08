
import { useState } from 'react';
import axios from 'axios';

const usePostRequest = (url,) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, payload);
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

