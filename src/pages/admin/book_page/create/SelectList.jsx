/* eslint-disable react/prop-types */
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styleSelect from "./styleSelect";

const animatedComponents = makeAnimated();

export default function SelectList({ options, isMulti, onChange, value }) {
  return (
    <Select
      value={value}
      closeMenuOnSelect={true}
      components={animatedComponents}
      isMulti={isMulti}
      options={options}
      styles={styleSelect}
      isSearchable={false}
      onChange={onChange}
      className="max-w-xs py-3 px-4 block w-full border-gray-200 rounded-lg text-2xl disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    />
  );
}
