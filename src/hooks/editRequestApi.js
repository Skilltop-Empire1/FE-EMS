import { useState } from 'react';

const useEditResource = (initialData, url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editResource = async (data = initialData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Unnable to send update: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('Resource updated successfully');
      console.log('Success:', result);
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { editResource, loading, error, success };
};

export default useEditResource;
