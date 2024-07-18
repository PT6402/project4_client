import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import useCategory from '../../../hooks/useCategory';
import { toast } from 'react-hot-toast';

const EditCategory = () => {
    const { id } = useParams();
    const { getCategoryById, updateCategory, isLoading, error } = useCategory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fileImage, setFileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // For image preview
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            const category = await getCategoryById(id);
            if (category) {
                setName(category.name);
                setDescription(category.description);
                if (category.imagedata) {
                    setPreviewUrl(`data:image/jpeg;base64,${category.imagedata}`);
                }
            }
        };
        fetchCategory();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (fileImage) {
            formData.append('fileImage', fileImage);
        }

        const success = await updateCategory(id, formData);
        if (success) {
            toast.success('Category updated successfully');
            navigate('/admin/category');
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
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {previewUrl && (
                    <div className="mt-4">
                        <img src={previewUrl} alt="Preview" className="h-40 w-40 object-cover rounded-md" />
                    </div>
                )}
                <Button type="submit" variant="gradient" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default EditCategory;
