import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function AdminCatetoriesPage() {
  return (
    <div className="h-full ">
      <Link to={"create"}>
        <Button variant="gradient" className="mt-5">
          create
        </Button>
      </Link>
    </div>
  );
}
