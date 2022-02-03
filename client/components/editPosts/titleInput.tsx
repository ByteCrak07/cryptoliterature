import { FC, RefObject } from "react";

interface TitleInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength: number;
}

const TitleInput: FC<TitleInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <>
      <div className="relative headingInp mb-3">
        <input
          id={id}
          type="text"
          value={value}
          className="font-medium focus:outline-none w-full text-xl"
          placeholder={placeholder}
          onFocus={(e) => e.target.parentElement?.classList.add("active")}
          onBlur={(e) => e.target.parentElement?.classList.remove("active")}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          maxLength={maxLength}
        />
        <style jsx>{`
          .headingInp::after,
          .headingInp::before {
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -2px;
            height: 1px;
            border-radius: 5px;
            transition: width 300ms ease-in-out 100ms;
          }

          .headingInp::before {
            width: calc(100% + 20px);
            background-color: #e1e1e1;
          }

          .headingInp::after {
            width: 0;
            background-color: #0b1d25;
            z-index: 10;
          }

          .headingInp.active::after {
            width: calc(100% + 20px);
          }
        `}</style>
      </div>
      <div className="text-right text-lit-gray">
        {`${value.length}`}/{maxLength}
      </div>
    </>
  );
};

export default TitleInput;
