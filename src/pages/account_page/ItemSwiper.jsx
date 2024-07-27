/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function ItemSwiper({ zoom, item }) {
  const [zoomSize, setZoomSize] = useState(zoom);

  useEffect(() => {
    setZoomSize(zoom);
  }, [zoom]);

  return (
    <div
      className={`max-h-[calc(100vh-4.5rem)] overflow-y-scroll absolute left-1/2 -translate-x-1/2 scrollbar-webkit `}
      style={{ width: `calc(100vw - ${zoomSize}rem)` }}
    >
      <div className="p-2">
        <img
          src={`data:image/png;base64,${item.image_data}`}
          className="w-full h-full object-cover border-2 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
