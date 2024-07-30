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
  setPrice,
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
    filterBook: { isFilter, categorys, rating, from, to },
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
    if (rating == null && from == null && to == null) {
      dispatch(clearFilter());
    }
  };
  const handleClearRating = () => {
    dispatch(setFilterRating(null));
    if (categorys.length == 0 && from == null && to == null) {
      dispatch(clearFilter());
    }
  };
  const handleClearPrice = () => {
    dispatch(setPrice({ from: null, to: null }));
    if (categorys.length == 0 && rating == null) {
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
    const data = await filterBook({ categorys, rating, from, to });
    handleSetDataBook(data);
  };
  const handleCallApiBook = async () => {
    const data = await getBooks({ goToPage: 1 });
    handleSetDataBook(data);
  };

  const handleCallApi = async () => {
    if (categorys.length == 0 && rating == null && from == null && to == null) {
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
  const handleChangePrice = ({ min, max }) => {
    if (min != 0 || max != 1000) {
      dispatch(setPrice({ from: min, to: max }));
    } else {
      if (isFilter) {
        if (!(from == null && to == null)) {
          dispatch(setPrice({ from: 0, to: 1000 }));
        }
      }
    }
  };
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
  }, [categorys, rating, from, to]);
  return (
    <div className="relative h-screen">
      <main>
        <section className="pt-6 pb-24 mt-10 flex">
          {/* Filters */}
          <aside className=" mx-6 transition-transform  lg:w-64 sm:top-32 lg:top-16 sm:translate-x-0 sticky top-48">
            <div className="h-full px-3 py-4 overflow-y-auto">
              <form className="hidden md:block">
                <h3 className="sr-only">Categories</h3>
                <div className="mt-6 flex flex-col gap-2">
                  <Range
                    handleToggleStar={handleToggleStar}
                    handleChange={handleChange}
                  />
                  <SlideRangePrice
                    min={0}
                    max={1000}
                    handleChange={handleChangePrice}
                  />
                  <Checkbox onChange={handleCheckboxOnChange} />
                </div>
                {isFilter && (
                  <div className="p-2 border-gray-300 border-2 rounded-lg">
                    <ButtonClearAll onClick={() => dispatch(clearFilter())} />
                    <ShowItemFilter
                      handleClearCate={handleClearCate}
                      handleClearRating={handleClearRating}
                      handleClearPrice={handleClearPrice}
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
