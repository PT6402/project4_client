/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SelectList from "./SelectList";

export default function Step2({ data, handleGetValueStep2 }) {
  const optionCate = data.categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const optionAuthor = data.authors.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const optionPublisher = data.publishers.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [cates, setCates] = useState();
  const [authors, setAuthors] = useState();
  const [publisher, setPublisher] = useState();
  useEffect(() => {
    handleGetValueStep2({ cates, authors, publisher });
  }, [cates, authors, publisher]);
  return (
    <div className=" ">
      <div className="p-4  rounded-xl flex-1 h-full flex justify-center items-start">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-10 flex gap-2">
            <div className="max-w-sm flex-col flex items-center">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Category
              </label>
              <SelectList
                options={optionCate}
                isMulti={true}
                onChange={(value) => setCates(value)}
                value={cates}
              />
            </div>
            <div className="max-w-sm flex-col flex items-center">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Author
              </label>
              <SelectList
                options={optionAuthor}
                isMulti={true}
                onChange={(value) => setAuthors(value)}
                value={authors}
              />
            </div>
            <div className="max-w-sm flex-col flex items-center">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Publisher
              </label>
              <SelectList
                options={optionPublisher}
                isMulti={false}
                onChange={(value) => setPublisher(value)}
                value={publisher}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
