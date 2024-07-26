import React, { useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { usePublisher } from '../../../hooks';

const AdminPublishersPage = () => {
    const { getPublishers, publishers, isLoading, error } = usePublisher();

    useEffect(() => {
        getPublishers();
    }, []);

    return (
        <div className="h-full">
            <Link to="create">
                <Button variant="gradient" className="mt-5">
                    Create Publisher
                </Button>
            </Link>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!isLoading && publishers.length === 0 && <p>No publishers found</p>}

            {!isLoading && publishers.length > 0 && (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publishers.map((publisher) => (
                        <div key={publisher.id} className="border rounded-md p-4 shadow-md">
                            {publisher.image_data && (
                                <img
                                    src={`data:image/jpeg;base64,${publisher.image_data}`}
                                    alt={publisher.name}
                                    className="w-full h-32 object-cover mb-4 rounded"
                                />
                            )}
                            <h2 className="text-xl font-semibold">{publisher.name}</h2>
                            <p className="text-gray-700">{publisher.description}</p>
                            <Link to={`edit/${publisher.id}`}>
                                <Button variant="gradient" className="mt-4">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPublishersPage;
