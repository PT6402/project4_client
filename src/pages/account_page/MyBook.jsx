import { useEffect, useRef, useState } from "react";
import { Loader, MyBookCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import CenterModal from "../../components/center_modal";
import LayoutReadBook from "../../components/LayoutReadBook";
import ReadBook from "./ReadBook";
import useReadBook from "../../hooks/user/useReadBook";
import { clearReadBook } from "../../context/readBookSlice";

export default function MyBook() {
  const [showLoader, setShowLoader] = useState(false);
  // const [data, setData] = useState([]);
  const {
    listPage,
    isLoading: loadBook,
    totalPage,
  } = useSelector((state) => state.readBook);
  const { getReadBook, isLoading, getReadAppendBook } = useReadBook();
  const [close, setClose] = useState(false);
  const [getCurrent, setCurrent] = useState(1);
  const { myBooks } = useSelector((state) => state.userStore);
  const sliderRef = useRef();
  const [zoom, setZoom] = useState(65);
  const dispatch = useDispatch();
  const handleZoomIn = () => {
    console.log("in");
    setZoom(zoom - 5);
  };
  const handleZoomOut = () => {
    console.log("out");
    setZoom(zoom + 5);
  };
  const handleReadBook = async (bookId) => {
    await getReadBook(bookId);
    setClose(true);
  };
  const handleCurrentSlide = (index) => {
    const length = listPage.length;
    setCurrent(listPage[index].image_name.match(/page_(\d+)/)[1]);
    if (index == 4 && listPage.length == 10 && !loadBook) {
      getReadAppendBook();
    } else if (length > 10 && index >= length - 6 && !loadBook) {
      getReadAppendBook();
    }
  };
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  return (
    <div className={` !no-scrollbar ${close ? "max-h-0" : "min-h-[100vh]"} `}>
      {showLoader && <Loader />}
      {myBooks.length > 0 &&
        myBooks.map((book) => (
          <>
            <MyBookCard
              key={book.bookid}
              book={book}
              handleReadBook={handleReadBook}
            />
          </>
        ))}
      {myBooks.length == 0 && <>no my book</>}
      {close && (
        <CenterModal close={() => setClose(false)}>
          <LayoutReadBook
            totalPage={totalPage}
            sliderRef={sliderRef}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            close={() => {
              setClose(false);
              dispatch(clearReadBook());
              setCurrent(1);
            }}
            currentSlide={getCurrent}
          >
            <ReadBook
              sliderRef={sliderRef}
              zoom={zoom}
              data={listPage}
              handleCurrentSlide={handleCurrentSlide}
            />
          </LayoutReadBook>
        </CenterModal>
      )}
    </div>
  );
}
