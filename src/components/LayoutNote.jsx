/* eslint-disable react/prop-types */

export default function LayoutNote({ children }) {
  return (
    <div className="w-full h-full p-2 flex flex-col relative">
      <div className="flex-grow flex ">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
