import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Seo from "../components/general/seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/walletAuthWrapper";

const MiAmor: NextPage = () => {
  // contexts
  const { userData } = useContext(WalletAuthContext) as WalletAuthContextType;

  const router = useRouter();

  useEffect(() => {
    if (userData) router.push(userData.username);
  }, [router, userData]);

  return (
    <main className="main-div">
      <Seo
        title="Add wallet | Cryptoliterature"
        description="Add wallet and create your account"
        path="/wallet"
      />

      <div className="h-full w-full flex flex-col items-center justify-center">
        <button
          onClick={() => {
            document.getElementById("walletAuthBtn")?.click();
          }}
          className="px-10 py-6 mb-20 text-3xl rounded-3xl bg-white border-lit-dark border-2 border-opacity-40 hover:border-opacity-100"
        >
          Add wallet
        </button>
      </div>
    </main>
  );
};

export default MiAmor;
