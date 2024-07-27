/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";

import { Checkbox, Loader, Range } from "../../components";
import { useBook, useFilter } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  setFilterCate,
  setFilterCategorys,
  setFilterRating,
} from "../../context/bookSlice";
import ShowItemFilter from "./ShowItemFilter";
import ButtonClearAll from "./ButtonClearAll";
import SlideRangePrice from "../../components/products/filters/SlideRangePrice";

const ProductLayout = ({ children, handleSetDataBook, idCate }) => {
  const [idCategory, setIdCategory] = useState(idCate);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  //
  const {
    filterBook: { isFilter, categorys, rating },
  } = useSelector((state) => state.bookStore);
  const { getBooks, isLoading } = useBook();
  const { filterBook, loading } = useFilter();

  //
  const handleToggleStar = (value) => {
    if (value == 1 && rating == 1) {
      dispatch(setFilterRating(0));
    }
  };
  const handleClearCate = () => {
    dispatch(setFilterCategorys([]));
    if (rating == null) {
      dispatch(clearFilter());
    }
  };
  const handleClearRating = () => {
    dispatch(setFilterRating(null));
    if (categorys.length == 0) {
      dispatch(clearFilter());
    }
  };
  //
  const handleCheckboxOnChange = (id) => {
    if (categorys.includes(id) && categorys.length == 1 && rating == null) {
      dispatch(clearFilter());
    } else {
      dispatch(setFilterCate(id));
    }
  };
  const handleChange = (value) => {
    dispatch(setFilterRating(value));
  };
  const handleCallApiFilter = async () => {
    const data = await filterBook({ categorys, rating });
    handleSetDataBook(data);
  };
  const handleCallApiBook = async () => {
    const data = await getBooks({ goToPage: 1 });
    handleSetDataBook(data);
  };

  const handleCallApi = async () => {
    if (categorys.length == 0 && rating == null) {
      if (idCategory == null) {
        await handleCallApiBook();
      } else {
        setIdCategory(null);
      }
    } else {
      await handleCallApiFilter();
    }
  };
  //
  useEffect(() => {
    if (idCategory != null) {
      dispatch(setFilterCate(Number(idCate)));
    }

    return () => {
      dispatch(clearFilter());
    };
  }, []);
  useEffect(() => {
    if (loading || isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [loading, isLoading]);

  useEffect(() => {
    handleCallApi();
  }, [categorys, rating]);
  return (
    <div className="mx-auto md:max-w-2xl lg:max-w-7xl">
      <main className="relative px-4 mx-auto md:ml-36 mt-18 max-w-7xl sm:px-6 lg:px-8">
        <div className="sticky z-20 flex items-baseline justify-between pt-40 pb-8 bg-gray-900 sm:top-16 lg:top-0 md:pt-24 mb-30">
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left"></Menu>
            <button
              type="button"
              className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          {/* Filters */}
          <aside
            id="default-sidebar"
            aria-label="Sidebar"
            className="fixed left-0 h-screen mx-6 transition-transform -translate-x-full lg:w-64 sm:top-32 lg:top-16 sm:translate-x-0"
          >
            <div className="h-full px-3 py-4 overflow-y-auto">
              <form className="hidden md:block">
                <h3 className="sr-only">Categories</h3>
                <div className="mt-6 flex flex-col gap-2">
                  <Range
                    handleToggleStar={handleToggleStar}
                    handleChange={handleChange}
                  />
                  <SlideRangePrice min={0} max={10} />
                  <Checkbox onChange={handleCheckboxOnChange} />
                </div>
                {isFilter && (
                  <div className="p-2 border-gray-300 border-2 rounded-lg">
                    <ButtonClearAll onClick={() => dispatch(clearFilter())} />
                    <ShowItemFilter
                      handleClearCate={handleClearCate}
                      handleClearRating={handleClearRating}
                    />
                  </div>
                )}
              </form>
            </div>
          </aside>

          {/* Product grid */}
          {showLoader ? (
            <Loader />
          ) : (
            <div className="p-4 sm:mt-12 lg:mt-0">{children}</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductLayout;
