import { useState } from 'react';
// import { HttpAuth } from '../http';
import http from '../http';
import { HttpStatusCode } from 'axios';

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const httpAuth = HttpAuth();

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await http.get('/api/v1/admin/users');
            if (response.status === HttpStatusCode.Ok) {
                setUsers(response.data.model);
            }
        } catch (error) {
            setError(error.response?.data || 'Error fetching users');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        users,
        isLoading,
        error,
        getUsers,
    };
};

export default useFetchUsers;
