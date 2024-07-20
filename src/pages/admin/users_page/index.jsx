import React, { useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import useFetchUsers from '../../../hooks/useFetchUsers';

const AdminUserPage = () => {
    const { users, isLoading, error, getUsers } = useFetchUsers();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="h-full p-4">
            <h1 className="text-2xl font-semibold mb-6">User Management</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error fetching users: {error.message}</p>}
            {!isLoading && users.length === 0 && <p>No users found</p>}
            {!isLoading && users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table-fixed bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-8 border-b">Name</th>
                                <th className="py-2 px-8 border-b">Email</th>
                                <th className="py-2 px-8 border-b">Type Login</th>
                                <th className="py-2 px-8 border-b">Role</th>
                                <th className="py-2 px-8 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-8 border-b">{user.name}</td>
                                    <td className="py-2 px-8 border-b">{user.email}</td>
                                    <td className="py-2 px-8 border-b">{user.typeLogin}</td>
                                    <td className="py-2 px-8 border-b">{user.role}</td>
                                    <td className="py-2 px-8 border-b">
                                        <Button variant="gradient" className="mr-2">
                                            Active
                                        </Button>
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

export default AdminUserPage;
