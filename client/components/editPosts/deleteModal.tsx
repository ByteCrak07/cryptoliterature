import { FC, useEffect, useState } from "react";
import RingSpinner from "../spinners/ringSpinner";

interface DeleteModalProps {
  isArchived: boolean;
  close: () => void;
  onArchive: (callback: () => void) => void;
  onDelete: (callback: () => void) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isArchived,
  close,
  onArchive,
  onDelete,
}) => {
  // states
  const [deleteMethod, setDeleteMethod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      const modal = document.getElementById(`deleteModal`);

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
      id="deleteModal"
      className="absolute z-20 top-12 right-2 bg-white p-4 rounded w-64 font-OpenSans"
      style={{ boxShadow: "3px 3px 10px 1px #00000040" }}
    >
      {!isArchived ? (
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="publish"
              name="delete-post"
              className="form-radio hover:cursor-pointer text-lit-dark focus:ring-0"
              onChange={() => setDeleteMethod("archive")}
            />
            <label htmlFor="publish" className="ml-2 hover:cursor-pointer">
              Archive post
            </label>
          </div>
          <div className="text-lit-gray text-xs">
            Remove this post and move to archive
          </div>
        </div>
      ) : null}

      <div className="mb-4 text-red-600">
        <div className="flex items-center">
          <input
            type="radio"
            id="draft"
            name="delete-post"
            className="form-radio hover:cursor-pointer text-red-600 focus:ring-0"
            onChange={() => setDeleteMethod("delete")}
          />
          <label htmlFor="draft" className="ml-2 hover:cursor-pointer">
            Delete post
          </label>
        </div>

        <div className="text-red-400 text-xs">
          Permanently delete this post from our database
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
        {!deleteMethod ? (
          <button className="bg-lit-gray w-28 bg-opacity-50 cursor-not-allowed px-3 py-1 text-white rounded-md">
            Select one
          </button>
        ) : deleteMethod === "delete" ? (
          <button
            disabled={isDisabled}
            onClick={() => {
              setIsDisabled(true);
              onDelete(close);
            }}
            className="flex justify-evenly items-center bg-red-600 w-28 px-3 py-1 text-white rounded-md"
          >
            Delete{" "}
            {isDisabled ? <RingSpinner width={18} color="white" /> : null}
          </button>
        ) : (
          <button
            disabled={isDisabled}
            onClick={() => {
              setIsDisabled(true);
              onArchive(close);
            }}
            className="flex justify-evenly items-center bg-lit-dark w-28 px-3 py-1 text-white rounded-md"
          >
            Archive{" "}
            {isDisabled ? <RingSpinner width={18} color="white" /> : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
