import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderHistory from "./OrderHistory";
import { useSelector } from "react-redux";
import MyBook from "./MyBook";

const AccountPage = () => {
  const { tab } = useParams();
  const {
    inforUser: { fullname, email },
  } = useSelector((state) => state.userStore);
  const [selectedTab, setSelectedTab] = useState(tab ?? "profile");

  useEffect(() => {
    document.title = "User | The Book Shelf";
  }, []);

  return (
    <div className="mx-4 mt-[5.5rem]">
      <ul className="flex flex-wrap max-w-4xl mx-auto text-sm font-medium text-center text-gray-400">
        <li className="mr-2">
          <button
            onClick={() => setSelectedTab("profile")}
            type="button"
            aria-current="page"
            className={`${
              selectedTab === "profile" ? "bg-gray-800" : "hover:bg-gray-800"
            } inline-block p-4 text-gray-100 rounded-lg mb-1`}
          >
            Profile
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setSelectedTab("orders")}
            type="button"
            className={`${
              selectedTab === "orders" ? "bg-gray-800" : "hover:bg-gray-800"
            } inline-block p-4 text-gray-100 rounded-lg mb-1`}
          >
            Orders
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => setSelectedTab("mybook")}
            type="button"
            className={`${
              selectedTab === "mybook" ? "bg-gray-800" : "hover:bg-gray-800"
            } inline-block p-4 text-gray-100 rounded-lg mb-1`}
          >
            My book
          </button>
        </li>
      </ul>
      <div className="max-w-4xl mx-auto my-4 text-gray-100 ">
        {/* For profile */}
        {selectedTab === "profile" && (
          <>
            {<p className="text-lg font-semibold">{fullname}</p>}
            <p className="font-semibold text-md">{email}</p>
          </>
        )}
        {/* For Address */}
        {selectedTab === "orders" && (
          <>
            <OrderHistory />
          </>
        )}
        {selectedTab === "mybook" && (
          <>
            <MyBook />
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
