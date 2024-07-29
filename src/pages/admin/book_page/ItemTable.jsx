/* eslint-disable react/prop-types */
import IconStarFull from "../../../components/icons/IconStarFull";

export default function ItemTable({
  name,
  authors,
  categories,
  publisher,
  rating,
  price,
  image,
}) {
  return (
    <tr className="border-b border-dashed last:border-b-0">
      <td className="p-3 pl-0">
        <div className="flex items-center">
          <div className="relative inline-block shrink-0 rounded-lg me-3">
            <img
              src={`data:image/png;base64,${image}`}
              className="w-[4rem] h-[5rem] inline-block shrink-0 rounded-lg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-start">
            <p className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
              {name}
            </p>
          </div>
        </div>
      </td>
      <td className="p-3 pr-0 text-end">
        {authors.map((item) => (
          <p
            className="font-semibold text-light-inverse text-md/normal"
            key={item.id}
          >
            {item.name}
          </p>
        ))}
      </td>
      <td className="p-3 pr-0 text-end">
        {categories.map((item) => (
          <p
            className="font-semibold text-light-inverse text-md/normal"
            key={item.id}
          >
            {item.name}
          </p>
        ))}
      </td>
      <td className="p-3 pr-0 text-end">
        <p className="font-semibold text-light-inverse text-md/normal">
          {publisher.name}
        </p>
      </td>
      <td className="p-3 pr-12 text-end">
        <p className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
          <IconStarFull />({rating})
        </p>
      </td>
      <td className="pr-0 text-center">
        <span className="font-semibold text-light-inverse text-md/normal">
          ${price}
        </span>
      </td>
      <td className="p-3 pr-0 text-end">
        <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
          <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
      </td>
    </tr>
  );
}
