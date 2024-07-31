import { useEffect, useState } from "react";
import { useBook } from "../../hooks";
import { AuthorBookCard, Loader } from "../../components";
import { useParams } from "react-router-dom";

export default function PublisherPage() {
  const { pubId } = useParams();
  const [data, setData] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const { isLoading, getPublisherById } = useBook();

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);
  useEffect(() => {
    getPublisherById({ pubId }).then((res) => setData(res));
  }, []);
  return (
    <div className=" mx-auto px-8 relative top-24 mb-24 h-screen">
      {showLoader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 ">
          <div className="col-span-4 sm:col-span-3 ">
            <div className="bg-gray-700 shadow rounded-lg p-6 sticky top-24">
              <div className="flex flex-col items-center">
                <img
                  src={`data:image/png;base64,${data?.image}`}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />
                <h1 className="text-xl font-bold text-white">{data?.name}</h1>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-700 shadow rounded-lg p-6 h-[calc(100vh-10rem)] overflow-y-scroll">
              <h2 className="text-xl font-bold  text-gray-100 mt-6 mb-4">
                Book
              </h2>
              <div className="mb-6">
                {data?.listBook && data.listBook.length > 0 ? (
                  data.listBook.map(({ id, image, name, price }, i) => (
                    <div className="rounded-lg md:w-2/3" key={i}>
                      <AuthorBookCard
                        product={{
                          bookId: id,
                          image: `data:image/png;base64,${image}`,
                          price: price,
                          nameBook: name,
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <p>not thing....</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
