import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import useCategory from '../../../hooks/useCategory';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fileImage, setFileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { createCategory, isLoading, error } = useCategory();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('fileImage', fileImage);

    console.log('Form Data:', {
      name,
      description,
      fileImage,
    });

    await createCategory(formData);
    navigate('/admin/category');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log('Name:', e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log('Description:', e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    console.log('File Image:', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="h-40 w-40 object-cover" />
            </div>
          )}
        </div>
        <Button type="submit" variant="gradient" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddCategory;
