import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { usePublisher } from '../../../hooks';
import { toast } from 'react-hot-toast';

const EditPublisher = () => {
    const { id } = useParams();
    const { getPublisherById, updatePublisher, isLoading, error } = usePublisher();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [fileImage, setFileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublisher = async () => {
            const publisher = await getPublisherById(id);
            if (publisher) {
                setName(publisher.name);
                setDescription(publisher.description);
                if (publisher.image_data) {
                    setPreview(`data:image/jpeg;base64,${publisher.image_data}`);
                }
            }
        };
        fetchPublisher();
    }, []);

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

        // Check if file is not an image
        if (fileImage && !fileImage.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            return; // Prevent form submission
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        // Only append the fileImage if it is a valid image file
        if (fileImage) {
            formData.append('fileImage', fileImage);
        }

        const success = await updatePublisher(id, formData);
        if (success) {
            toast.success('Publisher updated successfully');
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>
                <Button type="submit" variant="gradient" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default EditPublisher;
