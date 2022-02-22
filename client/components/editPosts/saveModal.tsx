import { FC, useEffect, useState } from "react";
import RingSpinner from "../spinners/ringSpinner";

interface SaveModalProps {
  isPublished: boolean;
  close: () => void;
  onPublish: (callback: () => void) => void;
  onDraft: (callback: () => void) => void;
}

const SaveModal: FC<SaveModalProps> = ({
  isPublished,
  close,
  onPublish,
  onDraft,
}) => {
  // states
  const [saveMethod, setSaveMethod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      const modal = document.getElementById(`saveModal`);

      if (target && modal) {
        if (modal.contains(target as Node)) return;

        // if clicked outside
        close();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [close]);

  return (
    <div
      id="saveModal"
      className="absolute z-20 top-12 right-2 bg-white p-4 rounded w-64 font-OpenSans"
      style={{ boxShadow: "3px 3px 10px 1px #00000040" }}
    >
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="publish"
            name="save-post"
            className="form-radio hover:cursor-pointer text-lit-dark focus:ring-0"
            onChange={() => setSaveMethod("publish")}
          />
          <label htmlFor="publish" className="ml-2 hover:cursor-pointer">
            Publish post
          </label>
        </div>
        <div className="text-lit-gray text-xs">
          Save current changes and then {isPublished ? `republish` : `publish`}{" "}
          post
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="draft"
            name="save-post"
            className="form-radio hover:cursor-pointer text-lit-dark focus:ring-0"
            onChange={() => setSaveMethod("draft")}
          />
          <label htmlFor="draft" className="ml-2 hover:cursor-pointer">
            Draft post
          </label>
        </div>

        <div className="text-lit-gray text-xs">
          {isPublished
            ? `Unpublish the post and then save current changes as draft`
            : `Save current changes as draft`}
        </div>
      </div>
      <hr />
      <div className="mt-2 flex justify-end">
        <button
          className="border border-lit-dark px-3 py-1 rounded-md mr-2"
          onClick={close}
        >
          Close
        </button>
        {!saveMethod ? (
          <button className="bg-lit-gray w-28 bg-opacity-50 cursor-not-allowed px-3 py-1 text-white rounded-md">
            Select one
          </button>
        ) : saveMethod === "publish" ? (
          <button
            disabled={isDisabled}
            onClick={() => {
              setIsDisabled(true);
              onPublish(close);
            }}
            className="flex justify-evenly items-center bg-lit-dark w-28 px-3 py-1 text-white rounded-md"
          >
            Publish{" "}
            {isDisabled ? <RingSpinner width={18} color="white" /> : null}
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={() => {
              setIsDisabled(true);
              onDraft(close);
            }}
            className="flex justify-evenly items-center bg-lit-dark w-28 px-3 py-1 text-white rounded-md"
          >
            Draft {isDisabled ? <RingSpinner width={18} color="white" /> : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default SaveModal;
