import { FC, useState, FocusEvent, MouseEvent } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface SelectInputProps {
  id: string;
  options: Array<string>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SelectInput: FC<SelectInputProps> = ({
  id,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const activeClasses = ["shadow", "ring-1", "ring-lit-dark"];

  // states
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // functions
  const handleClick = (e: MouseEvent) => {
    if (!isDropDownOpen) {
      setIsDropDownOpen(true);
      const btn = e.target as Element;
      btn.classList.add(...activeClasses);

      window.addEventListener("click", handleClickOutside);
    }
  };

  const handleClose = () => {
    const btn = document.getElementById(`selectBtn-${id}`);

    setIsDropDownOpen(false);
    btn?.classList.remove(...activeClasses);
    window.removeEventListener("click", handleClickOutside);
  };

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    const target = e.target;
    const parent = document.getElementById(`selectBtn-${id}`)?.parentElement;

    if (target && parent) {
      if (parent.contains(target as Node)) return;

      // if clicked outside
      handleClose();
    }
  };

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        onFocus={() => {
          const btn = document.getElementById(`selectBtn-${id}`);
          btn?.click();
          btn?.focus();
        }}
      >
        {options.map((option, i) => (
          <option key={`option${i}`} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        id={`selectBtn-${id}`}
        aria-labelledby={id}
        className="w-full py-2 px-3 flex justify-between items-center rounded-md border border-lit-dark border-opacity-20"
        onClick={handleClick}
      >
        {!value ? (
          <span className="text-lit-gray pointer-events-none">
            {placeholder}
          </span>
        ) : (
          <span className="font-medium pointer-events-none">{value}</span>
        )}

        <span className="pointer-events-none">
          <FontAwesomeIcon icon={faCaretDown} size="lg" />
        </span>
      </button>

      {isDropDownOpen ? (
        <div
          className="absolute flex flex-col z-10 top-12 right-1 bg-white rounded-lg overflow-hidden w-40"
          style={{ boxShadow: "3px 3px 10px 1px #00000040" }}
        >
          {options.map((option, i) => (
            <button
              key={`option${i}`}
              className={`hover:bg-lit-light-gray p-2 ${
                value === option ? "bg-lit-light-gray" : ""
              }`}
              onClick={() => {
                onChange(option);
                handleClose();
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
