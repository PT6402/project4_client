import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";

export default function ItemProduct() {
  return (
    <div className="p-4">
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <img
            src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 mr-3 uppercase text-xs ">Brand</p>
              <div className="flex justify-center items-center">
                <StarIcon className="w-6 h-6" />
                <p>(2/5)60 views</p>
              </div>
            </div>
            <p className="text-lg font-bold text-black  block capitalize ">
              Product Name Product Name Product Name Product Name
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <div className="ml-auto">
                <HeartIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
