import { Link } from "react-router-dom";
import ItemTable from "./ItemTable";
import LayoutTable from "./LayoutTable";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useAdminBook from "../../../hooks/admin/userAdminBook";

export default function AdminBookPage() {
  const [showLoader, setShowLoader] = useState();
  const { isLoading, getBookAll } = useAdminBook();
  const [dataBook, setDataBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    getBookAll().then((res) => {
      setDataBook(res);
      setFilteredBooks(res);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredBooks(
      dataBook.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, dataBook]);

  if (showLoader) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6 mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-center flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">List Book</span>
                </h3>
                <div className="max-w-sm flex-1 flex justify-center">
                  <Input
                    type="text"
                    placeholder="Search by book name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-fit"
                  />
                </div>
                <Link to={"create"} className="">
                  <Button variant="gradient" className="">
                    Create
                  </Button>
                </Link>
              </div>

              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <LayoutTable>
                    {filteredBooks.length > 0 &&
                      filteredBooks.map(
                        ({
                          name,
                          authors,
                          categories,
                          publisher,
                          rating,
                          price,
                          id,
                          image,
                        }) => (
                          <ItemTable
                            image={image}
                            name={name}
                            key={id}
                            rating={rating}
                            publisher={publisher}
                            price={price}
                            authors={authors}
                            categories={categories}
                            id={id}
                          />
                        )
                      )}
                    {filteredBooks.length == 0 && (
                      <tr>
                        <td colSpan="7">
                          <p className="text-center">No books found...</p>
                        </td>
                      </tr>
                    )}
                  </LayoutTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
