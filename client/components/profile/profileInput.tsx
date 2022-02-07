import { Dispatch, FC, HTMLInputTypeAttribute, SetStateAction } from "react";

interface ProfileInputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const ProfileInput: FC<ProfileInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="mb-5 text-left">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type ? type : "text"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
      />
    </div>
  );
};

export default ProfileInput;
