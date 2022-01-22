import { FC, DragEvent, ChangeEvent, useState } from "react";
import { showToast } from "../general/toast";

interface ImageInputProps {
  id: string;
  cropImg: (img: File) => void;
  iconOnly?: boolean;
}

const ImageInput: FC<ImageInputProps> = ({ id, cropImg, iconOnly }) => {
  // states
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  // functions
  const preventDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOverlayOpen(false);
    let file = e.dataTransfer.files[0];
    if (file) validateFile(file);
  };

  const imgInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let files;
    files = e.target.files;
    if (files && files.length > 0) validateFile(files[0]);
    (document.getElementById(id) as HTMLInputElement).value = "";
  };

  const validateFile = (file: File) => {
    if (file.type.startsWith("image/")) cropImg(file);
    else showToast("Invalid file type");
  };

  const showOverlay = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!overlayOpen) setOverlayOpen(true);
  };

  const hideOverlay = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (overlayOpen) setOverlayOpen(false);
  };

  return (
    <>
      <input
        type="file"
        id={id}
        className="sr-only"
        onChange={imgInputHandler}
      />
      {!iconOnly ? (
        <div
          className="bg-lit-light-gray w-96 rounded-md"
          onDragEnter={showOverlay}
          onDragOver={preventDrag}
          onDrop={dropHandler}
        >
          <div className="w-full h-full p-10 relative flex flex-col items-center">
            <label
              htmlFor={id}
              className="bg-white cursor-pointer rounded-full h-14 w-14 flex items-center justify-center"
            >
              <svg
                width="25"
                height="27"
                viewBox="0 0 25 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4075 1.00077C11.8079 0.491197 12.5798 0.491197 12.9802 1.00077L18.1908 7.63246C18.7063 8.28859 18.2389 9.25028 17.4045 9.25028H6.98324C6.14881 9.25028 5.6814 8.28859 6.19693 7.63246L11.4075 1.00077Z"
                  fill="#1E2125"
                />
                <rect
                  x="10.2119"
                  y="7.26807"
                  width="3.9644"
                  height="11.8932"
                  fill="#1E2125"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.7052 12.1935C23.6341 12.1935 24.3871 12.9734 24.3871 13.9355V20.0323C24.3871 23.8804 21.3751 27 17.6596 27H6.72747C3.01199 27 0 23.8804 0 20.0323V14.8064C0 13.8444 0.752998 13.0645 1.68187 13.0645C2.61074 13.0645 3.36374 13.8444 3.36374 14.8064V20.0323C3.36374 21.9563 4.86973 23.5161 6.72747 23.5161H17.6596C19.5174 23.5161 21.0234 21.9563 21.0234 20.0323V13.9355C21.0234 12.9734 21.7764 12.1935 22.7052 12.1935Z"
                  fill="#1E2125"
                />
              </svg>
            </label>
            <div className="mt-5 font-Poppins text-sm">
              Drag and drop or{" "}
              <label htmlFor={id} className="underline cursor-pointer">
                browse
              </label>{" "}
              image
            </div>

            {/* overlay */}
            <div
              className={`overlay absolute inset-0 rounded-md transition-opacity p-5 ${
                overlayOpen ? "open" : ""
              }`}
              onDragLeave={hideOverlay}
            >
              <div className="h-full w-full pointer-events-none flex items-center justify-center bg-lit-light-gray font-Poppins border-2 border-lit-dark border-dashed ">
                Drop Image Here
              </div>
            </div>

            <style jsx>
              {`
                .overlay {
                  opacity: 0;
                  display: none;
                }

                .overlay.open {
                  opacity: 100;
                  display: block;
                }
              `}
            </style>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="bg-white cursor-pointer rounded-full h-14 w-14 flex items-center justify-center absolute -bottom-5 -right-5"
          style={{ boxShadow: "3px 3px 7px 0px #00000075" }}
        >
          <svg
            width="25"
            height="27"
            viewBox="0 0 25 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4075 1.00077C11.8079 0.491197 12.5798 0.491197 12.9802 1.00077L18.1908 7.63246C18.7063 8.28859 18.2389 9.25028 17.4045 9.25028H6.98324C6.14881 9.25028 5.6814 8.28859 6.19693 7.63246L11.4075 1.00077Z"
              fill="#1E2125"
            />
            <rect
              x="10.2119"
              y="7.26807"
              width="3.9644"
              height="11.8932"
              fill="#1E2125"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.7052 12.1935C23.6341 12.1935 24.3871 12.9734 24.3871 13.9355V20.0323C24.3871 23.8804 21.3751 27 17.6596 27H6.72747C3.01199 27 0 23.8804 0 20.0323V14.8064C0 13.8444 0.752998 13.0645 1.68187 13.0645C2.61074 13.0645 3.36374 13.8444 3.36374 14.8064V20.0323C3.36374 21.9563 4.86973 23.5161 6.72747 23.5161H17.6596C19.5174 23.5161 21.0234 21.9563 21.0234 20.0323V13.9355C21.0234 12.9734 21.7764 12.1935 22.7052 12.1935Z"
              fill="#1E2125"
            />
          </svg>
        </label>
      )}
    </>
  );
};

export default ImageInput;
