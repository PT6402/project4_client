/* eslint-disable react/prop-types */
export default function ItemAuthor({ image_data, name, id }) {
  return (
    <div className="p-4">
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        {/* <a href="#"> */}
        <img
          src={`data:image/png;base64,${image_data}`}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black  block capitalize ">
            {name}
          </p>
        </div>
        {/* </a> */}
      </div>
    </div>
  );
}
