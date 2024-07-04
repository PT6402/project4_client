import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../../hooks";

const Logout = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center p-2 px-3 py-2 -m-2 text-sm font-medium text-gray-100 rounded-lg hover:bg-gray-50 hover:bg-opacity-10 hover:text-white group"
    >
      <span className="hidden mr-2 md:block">Log Out</span>
      <BiLogOut
        title="log out"
        className="flex-shrink-0 w-6 h-6 text-gray-100 group-hover:text-white"
        aria-hidden="true"
      />

      <span className="sr-only">log out</span>
    </button>
  );
};

export default Logout;
