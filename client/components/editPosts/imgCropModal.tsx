import { FC, useEffect } from "react";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../lib/general/cropImage";
import CustomInputSlider from "./customInputSlider";

interface ImgCropModalProps {
  aspect: number;
  imgUrl: string;
  closeModal: (croppedImgUrl: string | null) => void;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImgCropModal: FC<ImgCropModalProps> = ({
  aspect,
  imgUrl,
  closeModal,
}) => {
  // states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels>();

  // functions
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const processImg = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgUrl,
        croppedAreaPixels as CroppedAreaPixels,
        rotation
      );
      closeModal(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imgUrl, croppedAreaPixels, rotation, closeModal]);

  // useEffect
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.removeAttribute("class");
    };
  }, []);

  return (
    <div className="fixed font-Poppins bg-lit-dark bg-opacity-50 z-50 inset-0 overflow-auto">
      <div className="h-full w-full modal flex items-center justify-center">
        <div className="rounded-lg bg-white py-5 px-5 sm:px-10 relative">
          <div className="text-center mb-5 font-medium">Crop Image</div>
          <button
            onClick={() => {
              closeModal(null);
            }}
            className="absolute top-0.5 right-4 text-4xl font-light"
          >
            &times;
          </button>
          <div className="p-2" style={{ backgroundColor: "rgb(127,127,127)" }}>
            <div className="relative bg-white w-60 h-60 sm:w-96 sm:h-96">
              <Cropper
                image={imgUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>

          <div className="w-full h-10 mt-5 flex items-center justify-center">
            <span className="w-14 font-medium">Zoom:</span>{" "}
            <CustomInputSlider
              value={zoom}
              min={1}
              max={3}
              noOfDecimalPlaces={2}
              unit="x"
              changeFn={(value) => setZoom(value)}
            />
          </div>
          <div className="w-full h-10 mt-6 flex items-center justify-center">
            <span className="w-14 font-medium">Rotate:</span>{" "}
            <CustomInputSlider
              value={rotation}
              min={-180}
              max={180}
              mid
              noOfDecimalPlaces={2}
              unit="°"
              changeFn={(value) => setRotation(value)}
            />
          </div>

          <div className="flex justify-end mt-10 sm:mb-5">
            <button
              onClick={() => {
                closeModal(null);
              }}
              className="font-medium text-lit-gray hover:text-lit-dark"
            >
              Cancel
            </button>
            <button
              onClick={processImg}
              className="font-semibold bg-lit-dark ml-5 text-center text-white px-10 py-2 rounded-full"
            >
              Next &gt;
            </button>
          </div>
        </div>

        <style jsx>
          {`
            @media (max-height: 704px) and (min-width: 640px) {
              .modal {
                align-items: start;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ImgCropModal;
