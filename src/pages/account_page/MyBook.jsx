import { useEffect, useRef, useState } from "react";
import { Loader, MyBookCard } from "../../components";
import useMyBook from "../../hooks/user/useMyBook";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import CenterModal from "../../components/center_modal";
import LayoutReadBook from "../../components/LayoutReadBook";
import ReadBook from "./ReadBook";

export default function MyBook() {
  const [close, setClose] = useState(false);
  const { myBooks } = useSelector((state) => state.userStore);
  const sliderRef = useRef();
  const [zoom, setZoom] = useState(10);
  const handleZoomIn = () => {
    console.log("in");
    setZoom(zoom - 5);
  };
  const handleZoomOut = () => {
    console.log("out");
    setZoom(zoom + 5);
  };
  const handleReadBook = () => {
    setClose(true);
  };
  return (
    <div className="max-h-[calc(100vh-15rem)] no-scrollbar overflow-y-scroll">
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
            sliderRef={sliderRef}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            close={() => setClose(false)}
          >
            <ReadBook sliderRef={sliderRef} zoom={zoom} />
          </LayoutReadBook>
        </CenterModal>
      )}
    </div>
  );
}
