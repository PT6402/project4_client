import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";

export default function AdminCatetoriesPage() {
  const { getCategories, isLoading, error } = useCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="h-full">
      <Link to={"create"}>
        <Button variant="gradient" className="mt-5">
          Create
        </Button>
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-md p-4 shadow-md">
            {category.Imagedata && (
              <img
                src={`data:image/jpeg;base64,${category.Imagedata}`}
                alt={category.name}
                className="w-full h-32 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-gray-700">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
