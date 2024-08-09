import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { usePublisher } from '../../../hooks';
import { toast } from 'react-hot-toast';

const AddPublisher = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fileImage, setFileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const { createPublisher, isLoading, error } = usePublisher();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Please upload a valid image file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fileImage) {
            toast.error("Please select an image.");
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('fileImage', fileImage);

        const success = await createPublisher(formData);
        if (success) {
            toast.success('Publisher created successfully');
            navigate('/admin/publisher');
        } else if (error) {
            toast.error(error);
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
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>
                <Button type="submit" variant="gradient" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default AddPublisher;
