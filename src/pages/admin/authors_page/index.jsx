import React, { useEffect } from 'react';
import useAuthor from '../../../hooks/useAuthor';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const AdminAuthorPage = () => {
  const { authors, isLoading, error, getAuthors } = useAuthor();

  useEffect(() => {
    getAuthors();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='mt-8'>
      <Link to={"create"}>
        <Button variant="gradient" className="mt-5">
          Create Author
        </Button>
      </Link>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map(author => (
          <div key={author.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`data:image/jpeg;base64,${author.image_data}`}
              alt={author.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{author.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAuthorPage;
