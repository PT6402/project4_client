import { useState } from 'react';
import http from '../http';
import { HttpStatusCode } from 'axios';

const useAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchAuthors = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const res = await http.get('/api/v1/authors');
  //     if (res.status === HttpStatusCode.Ok) {
  //       setAuthors(res.data.model);
  //     }
  //   } catch (error) {
  //     setError(error.response?.data || 'Error fetching authors');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const getAuthors = async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/api/v1/authors");
      setAuthors(response.data.model);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAuthor = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.get(`/api/v1/authors/${id}`);
      if (res.status === HttpStatusCode.Ok) {
        setCurrentAuthor(res.data.model);
      }
    } catch (error) {
      setError(error.response?.data || 'Error fetching author');
    } finally {
      setIsLoading(false);
    }
  };

  const createAuthor = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.post("/api/v1/authors", formData);
      if (res.status === 200) {
        return { success: true };
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create author");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateAuthor = async (id, authorData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await http.put(`/api/v1/authors/${id}`, authorData);
      if (res.status === HttpStatusCode.Ok) {
        fetchAuthors();
      }
    } catch (error) {
      setError(error.response?.data || 'Error updating author');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authors,
    currentAuthor,
    isLoading,
    error,
    getAuthors,
    fetchAuthor,
    createAuthor,
    updateAuthor,
  };
};

export default useAuthor;
