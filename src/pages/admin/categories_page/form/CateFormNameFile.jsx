export default function CateFormNameFile() {
  return (
    <div className="my-10">
      <div className="p-4 bg-gray-50   border-2 border-dashed border-gray-400 rounded-xl flex-1 h-full flex justify-center items-start">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-10">
            <div className="max-w-sm">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 "
              >
                Name
              </label>
              <input
                type="email"
                id="input-label"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-indigo-600 focus:ring-indigo-600 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="you@site.com"
              />
            </div>
          </div>

          <div className="sm:col-span-10">
            <div className="max-w-sm space-y-3">
              <div className="relative overflow-hidden">
                <label
                  title="Click to upload"
                  htmlFor="button2"
                  className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 ring-transparent border-transparent outline-transparent"
                >
                  <div className="w-max relative">
                    <img
                      className="w-12"
                      src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                      alt="file upload icon"
                      width="512"
                      height="512"
                    />
                  </div>
                  <div className="relative">
                    <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
                      Upload a file
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500">
                      Max 2 MB
                    </span>
                  </div>
                </label>
                <input
                  hidden=""
                  type="file"
                  name="button2"
                  id="button2"
                  className="ring-transparent outline-transparent border-transparent hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
