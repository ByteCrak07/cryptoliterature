import { FC, useEffect } from "react";

interface IframeModalProps {
  close: () => void;
}

const IframeModal: FC<IframeModalProps> = ({ close }) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      const modal = document.getElementById(`modal`);

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
    <div className="fixed font-Poppins filter backdrop-blur bg-lit-dark bg-opacity-60 z-50 inset-0 overflow-auto">
      <div className="h-full w-full flex items-center justify-center">
        <button
          onClick={close}
          className="absolute flex items-center justify-center right-1 top-1 w-8 h-8 text-2xl font-extralight bg-white hover:bg-opacity-80 rounded-full"
        >
          <span>&times;</span>
        </button>
        <div
          id="modal"
          className="bg-white w-[90vw] h-[90vh] md:w-[60vw] md:h-[90vh] rounded-xl overflow-hidden"
          style={{ boxShadow: "3px 3px 10px 1px #00000040" }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSesejsIuIDyJxpX_G9WxXeyXezWu3gN-2gotEO1DSOtQCS4uw/viewform?embedded=true"
            className="w-full h-full"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default IframeModal;
