/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import "./sliderRangePrice.css";
import { useDebounce } from "../../../hooks";
import { useSelector } from "react-redux";
export default function SlideRangePrice({ min, max, handleChange }) {
  const {
    filterBook: { isFilter, from, to },
  } = useSelector((state) => state.bookStore);
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const debouncedMinVal = useDebounce(minVal);
  const debouncedMaxVal = useDebounce(maxVal);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);
  useEffect(() => {
    handleChange({ min: minVal, max: maxVal });
  }, [debouncedMinVal, debouncedMaxVal]);
  useEffect(() => {
    if (from == null && to == null) {
      setMaxVal(1000);
      setMinVal(0);
    }
  }, [isFilter, from, to]);
  return (
    <div className="-mb-2">
      <p className="text-white my-2">Price</p>
      <div className="container ">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
}
