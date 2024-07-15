import { useDispatch, useSelector } from "react-redux";
import { useFilter } from "../../../hooks";
import { refreshCollection, setFilterCate } from "../../../context/bookSlice";
import { useEffect } from "react";

const Checkbox = () => {
  const dispatch = useDispatch();
  const {
    categories,
    filterBook: { categorys: selectedCategory, isFilter, rating },
  } = useSelector((state) => state.bookStore);
  const { filterBook } = useFilter();

  const changeHandler = async (id) => {
    dispatch(setFilterCate(id));
    if (!isFilter) {
      dispatch(refreshCollection());
    }

    console.log(id);
  };
  useEffect(() => {
    (async () => {
      if (isFilter) {
        await filterBook({ rating, categorys: selectedCategory });
      }
    })();
  }, [selectedCategory]);
  return (
    <fieldset className="pb-4">
      <legend className="text-sm text-gray-100">Category</legend>
      <ul className="text-sm font-medium text-gray-100">
        {categories.map(({ name, id }) => (
          <li key={id} className="w-full cursor-pointer">
            <div className="flex items-center pl-3">
              <input
                id={id}
                onChange={() => changeHandler(id)}
                name="categories"
                value={name}
                type="checkbox"
                checked={selectedCategory.includes(id)}
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
