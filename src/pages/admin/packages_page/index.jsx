import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { usePackage } from "../../../hooks";

export default function AdminPackagePage() {
  const { getPackages, packages, isLoading, error } = usePackage();

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div className="h-full p-4">
      <Link to={"create"}>
        <Button variant="gradient" className="mt-5 mb-8">
          Create Package
        </Button>
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">Error fetching users: {error.message}</p>
      )}
      {!isLoading && packages.length === 0 && <p>No package found</p>}
      {!isLoading && packages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-fixed bg-white">
            <thead>
              <tr>
                <th className="py-2 px-8 border-b">Package Name</th>
                <th className="py-2 px-8 border-b">Day Quantity</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-8 border-b">{p.packageName}</td>
                  <td className="py-2 px-8 border-b">{p.dayQuantity} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
