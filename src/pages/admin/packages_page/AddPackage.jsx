import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { usePackage } from "../../../hooks";

const AddPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [dayQuantity, setDayQuantity] = useState("");
  const { createPackage, isLoading, error } = usePackage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      packageName,
      dayQuantity: parseInt(dayQuantity),
    };

    const result = await createPackage(formData);
    if (result.success) {
      toast.success("Package created successfully");
      navigate("/admin/package");
    } else {
      toast.error("Failed to create package");
    }
  };

  return (
    <div className="w-full mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Package Name
          </label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Day Quantity
          </label>
          <input
            type="number"
            value={dayQuantity}
            onChange={(e) => setDayQuantity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <Button type="submit" variant="gradient" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AddPackage;
