import { FC, useEffect } from "react";
import { useState } from "react";

const WalletModal: FC = () => {
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
        <div className="rounded-lg bg-white py-5 px-5 sm:px-10">
          <h1 className="font-semibold font-3xl">Connect your wallet</h1>
          <button>Metamask</button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
