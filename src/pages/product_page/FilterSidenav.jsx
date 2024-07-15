export default function FilterSidenav() {
  return (
    <div>
      {/* Mobile filter dialog */}
      {/* <Transition show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-gray-900 shadow-xl bg-inherit">
                <div className="flex justify-end px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-gray-900 rounded-md"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-between px-4 mt-8">
                  <h2 className="text-lg font-medium text-gray-100">Filters</h2>
                  <span className="w-px h-6 bg-gray-700" aria-hidden="true" />
                  <button
                    // onClick={handleFilterReset}
                    className="flex items-center p-2 text-sm text-gray-400 rounded-lg bg-gray-50 bg-opacity-10"
                    type="button"
                  >
                    {" "}
                    <XMarkIcon className="w-4 h-4 mr-2" /> Clear All
                  </button>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <div className="px-4 mt-12 space-y-2">
                    <Range />
                    <Checkbox />
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition> */}
    </div>
  );
}
