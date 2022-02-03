import { FC, FocusEvent, useState } from "react";

interface TagInputProps {
  id: string;
  tags: Array<string>;
  onChange: (value: Array<string>) => void;
  placeholder: string;
}

const TagInput: FC<TagInputProps> = ({ id, tags, onChange, placeholder }) => {
  const activeClasses = ["shadow", "ring-1", "ring-lit-dark"];

  // states
  const [value, setValue] = useState("");

  // functions
  const handleFocus = (e: FocusEvent) => {
    e.target.parentElement?.classList.add(...activeClasses);
    window.addEventListener("click", handleClick);
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target;
    const parent = document.getElementById(`${id}-label`);

    if (target && parent) {
      if (parent.contains(target as Node)) return;

      // if clicked outside
      parent.classList.remove(...activeClasses);
      window.removeEventListener("click", handleClick);
    }
  };

  return (
    <label
      id={`${id}-label`}
      htmlFor={id}
      className="flex flex-wrap items-center gap-y-2 w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20"
    >
      {tags.map((tag, i) => (
        <div
          key={`tag${i}`}
          className="bg-lit-light-gray rounded-3xl px-2 mr-1 flex items-center"
        >
          {tag}
          <button
            onClick={() => {
              let newTags = [...tags];
              newTags.splice(tags.indexOf(tag), 1);
              onChange(newTags);
            }}
            className="ml-1 rounded-full border bg-lit-gray bg-opacity-40 border-lit-dark h-4 w-4 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
      ))}

      <input
        id={id}
        value={value}
        placeholder={tags.length ? "" : placeholder}
        className="outline-none flex-1"
        style={{ minWidth: "40px" }}
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.code === "Space" || e.code === "Enter") {
            if (value === "") {
              setValue("");
            } else {
              if (!tags.includes(value)) onChange([...tags, value]);
              setValue("");
            }
          } else if (e.code === "Backspace" && value === "") {
            let newTags = [...tags];
            newTags.pop();
            onChange(newTags);
          }
        }}
        onChange={(e) => {
          if (e.target.value !== " ") setValue(e.target.value);
        }}
      />
    </label>
  );
};

export default TagInput;
