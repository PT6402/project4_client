import { useState, useEffect } from 'react';
import http from '../http';

const useOrder = (userId) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getOrdersAdmin = async () => {
        setIsLoading(true);
        try {
            const response = await http.get('/api/v1/orders/admin');
            setOrders(response.data.model);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getOrdersAdmin();
    }, []);

    return { orders, isLoading, error };
};

export default useOrder;
