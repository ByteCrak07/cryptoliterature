import { useEffect } from "react";
import { FC, MouseEvent, TouchEvent, useRef } from "react";

interface CustomInputSliderProps {
  value: number;
  min: number;
  max: number;
  mid?: boolean;
  noOfDecimalPlaces: number;
  unit?: string;
  changeFn: (value: number) => void;
}

const CustomInputSlider: FC<CustomInputSliderProps> = ({
  value,
  min,
  max,
  mid,
  unit,
  noOfDecimalPlaces,
  changeFn,
}) => {
  // refs
  const rangeSlider = useRef<HTMLDivElement>(null);
  const rangeSliderOverlay = useRef<HTMLDivElement>(null);
  const rangeSliderValue = useRef<HTMLDivElement>(null);

  // values
  let currentSliderLeft = 0;

  // functions
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    handleMouseMove(e);
    document.onmousemove = handleMouseMove;
    document.onmouseup = handleMouseTouchUp;
  };

  const handleTouchDown = (e: TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();

    handleTouchMove(e);
    document.ontouchmove = handleTouchMove;
    document.ontouchend = handleMouseTouchUp;
  };

  const handleMouseTouchUp = (
    e: globalThis.MouseEvent | globalThis.TouchEvent
  ) => {
    e.preventDefault();

    document.onmousemove = null;
    document.ontouchmove = null;
    document.onmouseup = null;
    document.ontouchend = null;
  };

  const handleMouseMove = (
    e: globalThis.MouseEvent | MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    if (rangeSlider.current) {
      let rect = rangeSlider.current.parentElement?.getBoundingClientRect();
      if (rect) {
        let sliderLeft = e.clientX - rect.left;

        if (sliderLeft > 0 && rect.right > e.clientX) {
          handleSliderChange(sliderLeft, rect);
        } else if (sliderLeft <= 0) {
          handleSliderChange(0, rect);
        } else if (rect.right <= e.clientX) {
          rangeSlider.current.style.left = `${rect.right - rect.left}px`;
          handleSliderChange(rect.right - rect.left, rect);
        }
      }
    }
  };

  const handleTouchMove = (
    e: globalThis.TouchEvent | TouchEvent<HTMLDivElement>
  ) => {
    // e.preventDefault();

    if (rangeSlider.current) {
      let rect = rangeSlider.current.parentElement?.getBoundingClientRect();
      if (rect) {
        let sliderLeft = e.touches[0].clientX - rect.left;

        if (sliderLeft > 0 && rect.right > e.touches[0].clientX) {
          handleSliderChange(sliderLeft, rect);
        } else if (sliderLeft <= 0) {
          handleSliderChange(0, rect);
        } else if (rect.right <= e.touches[0].clientX) {
          rangeSlider.current.style.left = `${rect.right - rect.left}px`;
          handleSliderChange(rect.right - rect.left, rect);
        }
      }
    }
  };

  const handleSliderChange = (sliderLeft: number, rect: DOMRect) => {
    currentSliderLeft = sliderLeft;
    let sliderValue =
      (sliderLeft / (rect.right - rect.left)) * (max - min) + min;
    changeFn(sliderValue);
  };

  // useEffect
  useEffect(() => {
    if (
      rangeSlider.current &&
      rangeSliderOverlay.current &&
      rangeSliderValue.current
    ) {
      let rect = rangeSlider.current.parentElement?.getBoundingClientRect();
      let sliderLeft;
      let tempVal = value;
      if (rect) {
        if (value === 0) tempVal = 0.000000001;

        sliderLeft =
          (((tempVal - min) * ((rect.right - rect.left) / tempVal)) /
            (max - min)) *
          tempVal;
        rangeSlider.current.style.left = `${sliderLeft}px`;
        rangeSliderOverlay.current.style.width = `${sliderLeft}px`;
      }
    }
  }, [value, max, min]);

  useEffect(() => {
    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, []);

  return (
    <div className="flex flex-col w-32 sm:w-64 m-auto items-center justify-center">
      <div
        className="py-1 relative min-w-full touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchDown}
      >
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 rounded-full bg-lit-dark w-0"
            ref={rangeSliderOverlay}
          ></div>
          <div
            className="absolute left-0 h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
            ref={rangeSlider}
          >
            <div className="relative -mt-2 w-1">
              <div className="absolute z-40 opacity-100 bottom-100 mb-2 min-w-full left-1/2 transform -translate-x-1/2">
                <div className="relative shadow-md">
                  <div
                    className="bg-lit-dark -mt-8 text-white truncate text-xs rounded py-1 px-4"
                    ref={rangeSliderValue}
                  >
                    <span className="pointer-events-none">
                      {value.toFixed(noOfDecimalPlaces)}
                      {unit}
                    </span>
                  </div>
                  <svg
                    className="absolute text-black w-full h-2 left-0 top-100"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <button
          onClick={() => {
            changeFn(min);
          }}
          className="absolute text-gray-800 bottom-0 left-0 transform -translate-x-1/2 -mb-6"
        >
          {min}
          {unit}
        </button>
        {mid ? (
          <button
            onClick={() => {
              changeFn(Math.abs(max) - Math.abs(min));
            }}
            className="absolute text-gray-800 left-1/2 transform -translate-x-1/2 bottom-0 -mb-6"
          >
            {Math.abs(max) - Math.abs(min)}
            {unit}
          </button>
        ) : null}
        <button
          onClick={() => {
            changeFn(max);
          }}
          className="absolute text-gray-800 right-0 transform translate-x-1/2 bottom-0 -mb-6"
        >
          {max}
          {unit}
        </button>
      </div>
    </div>
  );
};

export default CustomInputSlider;
