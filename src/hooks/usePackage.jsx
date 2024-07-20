import { useState } from 'react';
import http from '../http';
import { HttpStatusCode } from 'axios';

const usePackage = () => {
    const [packages, setPackages] = useState([]);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPackages = async () => {
        setIsLoading(true);
        try {
            const response = await http.get('/api/v1/package/view');
            if (response.status === HttpStatusCode.Ok) {
                setPackages(response.data.model);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const createPackage = async (packageData) => {
        setIsLoading(true);
        try {
            const response = await http.post('/api/v1/package/create', packageData);
            if (response.status === HttpStatusCode.Ok) {
                return { success: true };
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create package');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        packages,
        currentPackage,
        isLoading,
        error,
        getPackages,
        createPackage,
    };
};

export default usePackage;
