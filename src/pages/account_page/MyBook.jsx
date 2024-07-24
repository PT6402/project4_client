import { useEffect, useState } from "react";
import { Loader, MyBookCard } from "../../components";
import { useBook } from "../../hooks";

export default function MyBook() {
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const { getMyBook, isLoading } = useBook();
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);
  useEffect(() => {
    getMyBook().then((res) => setData(res));
  }, []);
  if (showLoader) return <Loader />;
  return (
    <div>
      {data.length > 0 &&
        data.map((book) => <MyBookCard key={book.bookid} book={book} />)}
      {data.length == 0 && <>no my book</>}
    </div>
  );
}
