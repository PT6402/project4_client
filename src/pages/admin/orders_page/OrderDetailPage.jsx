import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import http from '../../../http';

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setIsLoading(true);
            try {
                const response = await http.get(`/api/v1/orders/admin/${id}`);
                setOrder(response.data.model);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch order details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    return (
        <div className="p-4">
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {order && (
                <div>
                    <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
                    <p>Order ID: {order.orderId}</p>
                    <p>User Name: {order.userName}</p>
                    <p>Email: {order.email}</p>
                    <p>Create Date: {order.creatDate}</p>
                    <p>Payment Status: {order.paymentStatus === 1 ? 'Paid' : 'Pending'}</p>

                    <h2 className="text-xl font-semibold mt-4 mb-2">Order Items</h2>
                    <ul>
                        {order.orderDetails.map((detail) => (
                            <li key={detail.id} className="mb-2">
                                <p>Book Name: {detail.bookName}</p>
                                <p>Day Quantity: {detail.dayQuantity}</p>
                                <p>Price: ${detail.price}</p>
                                <p>Package: {detail.packName ? detail.packName : "Permanent Purchases"}</p>
                                {detail.imageCove && (
                                    <img
                                        src={`data:image/jpeg;base64,${detail.imageCove}`}
                                        alt={detail.bookName}
                                        className="w-32 h-32 object-cover mt-2"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                    <Button variant="gradient" onClick={() => window.history.back()}>
                        Back
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
