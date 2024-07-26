import { useState } from 'react';
import useHttp from '../auth/useHttp';
import { HttpStatusCode } from 'axios';

const usePublisher = () => {
    const { http_auth, isLoading: authLoading, error: authError } = useHttp();
    // const { http, http_auth } = useHttp();
    // const authHttp = http_auth();
    const [publishers, setPublishers] = useState([]);
    const [currentPublisher, setCurrentPublisher] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPublishers = async () => {
        setIsLoading(true);
        try {
            const http = http_auth();
            const response = await http.get("/api/v1/publisher/");
            if (response.status === HttpStatusCode.Ok) {
                setPublishers(response.data.model);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // const getPublisherById = async (id) => {
    //     setIsLoading(true);
    //     setError(null);
    //     try {
    //         const res = await http.get(`/api/v1/publisher/${id}`);
    //         if (res.status === HttpStatusCode.Ok) {
    //             return res.data.model;
    //         } else {
    //             setError("Failed to fetch publisher");
    //             return null;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setError("Failed to fetch publisher");
    //         return null;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const getPublisherById = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http_auth().get(`/api/v1/publisher/${id}`);
            if (response.status === 200) {
                setCurrentPublisher(response.data.model);
                return response.data.model;
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch publisher');
        } finally {
            setIsLoading(false);
        }
    };

    const createPublisher = async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const http = http_auth();
            const response = await http.post("/api/v1/publisher/create", formData);
            if (response.status === HttpStatusCode.Ok) {
                getPublishers(); // Refresh the list of publishers
                return { success: true };
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create publisher");
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    const updatePublisher = async (id, formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await http_auth().put(`/api/v1/publisher/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                return { success: true };
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update publisher');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        publishers,
        currentPublisher,
        isLoading,
        error,
        getPublishers,
        getPublisherById,
        createPublisher,
        updatePublisher,
    };
};

export default usePublisher;
