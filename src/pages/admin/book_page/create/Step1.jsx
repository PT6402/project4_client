/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Step1({ handleGetValueStep1 }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [edition, setEdition] = useState("");
  const [file, setFile] = useState();
  useEffect(() => {
    handleGetValueStep1({ name, price, edition, file });
  }, [name, price, edition, file]);
  return (
    <div className="m-10 w-full ">
      <div className="p-4 bg-gray-50   border-2 border-dashed border-gray-400 rounded-xl flex-1 h-full flex justify-center items-start">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-10 flex gap-2">
            <div className="max-w-sm flex-col flex items-start">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="email"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none "
              />
            </div>
            <div className="max-w-sm flex-col flex items-start">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="email"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none "
              />
            </div>
          </div>
          <div className="sm:col-span-10">
            <div className="max-w-sm flex-col flex items-start">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Editon
              </label>
              <input
                onChange={(e) => setEdition(e.target.value)}
                type="email"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none "
              />
            </div>
            <div className="max-w-sm flex-col flex items-start mt-4">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Upload file
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block p-2  focus:outline-transparent w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 border rounded-xl bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
