/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
const Checkbox = ({ onChange }) => {
  const {
    categories,
    filterBook: { categorys },
  } = useSelector((state) => state.bookStore);

  return (
    <fieldset className="pb-4 mt-10">
      <legend className="text-sm text-gray-100">Category</legend>
      <ul className="text-sm font-medium text-gray-100">
        {categories.map(({ name, id }) => (
          <li key={id} className="w-full cursor-pointer">
            <div className="flex items-center pl-3">
              <input
                id={id}
                onChange={() => onChange(id)}
                name="categories"
                value={name}
                type="checkbox"
                checked={categorys.includes(id)}
                className="w-4 h-4 bg-gray-700 border-gray-500 cursor-pointer text-cyan-600 focus:ring-cyan-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2"
              />
              <label
                htmlFor={id}
                className="w-full py-2 ml-2 text-sm font-medium text-gray-100 cursor-pointer"
              >
                {name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default Checkbox;
