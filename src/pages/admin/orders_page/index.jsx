import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import useOrder from '../../../hooks/useOrder';

const AdminOrdersPage = () => {
    const { orders, isLoading, error } = useOrder();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Orders</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && orders.length === 0 && <p>No orders found</p>}

            {!isLoading && orders.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-8 border-b">Order ID</th>
                                <th className="py-2 px-8 border-b">User Name</th>
                                <th className="py-2 px-8 border-b">Email</th>
                                <th className="py-2 px-8 border-b">Created Date</th>
                                <th className="py-2 px-8 border-b">Payment Status</th>
                                <th className="py-2 px-8 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="py-2 px-8 border-b">{order.orderId}</td>
                                    <td className="py-2 px-8 border-b">{order.userName}</td>
                                    <td className="py-2 px-8 border-b">{order.email}</td>
                                    <td className="py-2 px-8 border-b">{order.creatDate}</td>
                                    <td className="py-2 px-8 border-b">{order.paymentStatus === 1 ? 'Paid' : 'Pending'}</td>
                                    <td className="py-2 px-8 border-b">
                                        <Link to={`/admin/order/${order.orderId}`}>
                                            <Button variant="gradient">Details</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
