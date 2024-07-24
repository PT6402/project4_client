import { useEffect, useState } from "react";
import { Loader, MyBookCard } from "../../components";
import useMyBook from "../../hooks/user/useMyBook";
import { useSelector } from "react-redux";

export default function MyBook() {
  const { myBooks } = useSelector((state) => state.userStore);
  return (
    <div>
      {myBooks.length > 0 &&
        myBooks.map((book) => <MyBookCard key={book.bookid} book={book} />)}
      {myBooks.length == 0 && <>no my book</>}
    </div>
  );
}
