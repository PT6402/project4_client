// import { useContext } from "react";
// import { BooksContext } from "../../../contexts/BooksProvider";
// import { FILTERS_ACTION } from "../../../constants/dispatchTypes";
import useBook from "../../../hooks/useBook";

const Checkbox = () => {
  const {
    bookStore: { categories },
  } = useBook();
  const selectedCategory = [];
  // const {
  //   booksState: { categories },
  //   filtersState: { selectedCategory },
  //   filtersDispatch,
  // } = useContext(BooksContext);

  const changeHandler = (e) => {
    // let categories = selectedCategory;
    // if (selectedCategory.includes(e.target.value)) {
    //   // Remove if already selected
    //   categories = selectedCategory.filter((ele) => ele !== e.target.value);
    // } else {
    //   categories = [...selectedCategory, e.target.value];
    // }
    // filtersDispatch({
    //   type: FILTERS_ACTION.UPDATE_CATEGORY,
    //   payload: categories,
    // });
  };
  return (
    <fieldset className="pb-4">
      <legend className="text-sm text-gray-100">Category</legend>
      <ul className="text-sm font-medium text-gray-100">
        {categories.map(({ name, id }) => (
          <li key={id} className="w-full cursor-pointer">
            <div className="flex items-center pl-3">
              <input
                id={id}
                onChange={changeHandler}
                name="categories"
                value={name}
                type="checkbox"
                checked={selectedCategory.includes(name)}
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
