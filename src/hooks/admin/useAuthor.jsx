import { useState } from "react";
import { HttpStatusCode } from "axios";
import useHttp from "../auth/useHttp";

const useAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: dùng http của useHttp tương lai sẽ dùng authHttp để phân quyển admin
  const { http } = useHttp();

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
      setError(error.response?.data || "Error fetching author");
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
        fetchAuthor();
      }
    } catch (error) {
      setError(error.response?.data || "Error updating author");
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
