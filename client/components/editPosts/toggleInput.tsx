import { FC, RefObject } from "react";

interface ToggleInputProps {
  id: string;
  forwardedRef: RefObject<HTMLInputElement>;
  defaultValue: boolean;
}

const ToggleInput: FC<ToggleInputProps> = ({
  id,
  forwardedRef,
  defaultValue,
}) => {
  return (
    <div className="flex items-center w-full">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <span id={`${id}-value`} className="text-xs w-6 mr-4 text-right">
          {defaultValue ? "Yes" : "No"}
        </span>
        <div className="relative">
          <input
            id={id}
            ref={forwardedRef}
            type="checkbox"
            defaultChecked={defaultValue}
            className="sr-only"
            onChange={(e) => {
              let value = document.getElementById(`${id}-value`);
              if (value) {
                if (e.target.checked) value.innerText = "Yes";
                else value.innerText = "No";
              }
            }}
          />
          <div className="slider w-10 h-4 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
      </label>
      <style jsx>
        {`
          .slider {
            background-color: #dee0e1;
          }

          .dot {
            background-color: #bdbdbd;
          }

          input:checked ~ .dot {
            transform: translateX(100%);
            background-color: #0b1d25;
          }
        `}
      </style>
    </div>
  );
};

export default ToggleInput;
