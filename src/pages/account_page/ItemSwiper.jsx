/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import page2 from "../../assets/img/Lord of the Rings, The Silmarillion, The Hobbit - Tolkien.pdf_page_4.jpg";

export default function ItemSwiper({ zoom }) {
  const [zoomSize, setZoomSize] = useState(zoom);

  useEffect(() => {
    setZoomSize(zoom);
  }, [zoom]);

  return (
    <div
      className={`max-h-[calc(100vh-4.5rem)] overflow-y-scroll absolute left-1/2 -translate-x-1/2 scrollbar-webkit`}
      style={{ width: `calc(100vw - ${zoomSize}rem)` }}
    >
      <img src={page2} className="w-full h-full object-cover" />
    </div>
  );
}
