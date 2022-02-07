import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";

const SignOut: FC = () => {
  // contexts
  const { removeUserData } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  // router
  const router = useRouter();

  const userSignOut = () => {
    removeUserData();
    router.push("/");
  };

  return (
    <div>
      <div className="hidden mt-9 ml-2 flex-col">
        <div>
          <button onClick={userSignOut} className="hover:underline">
            Signout
          </button>
        </div>
        <div>
          <Link href="/help">
            <a className="hover:underline">Help</a>
          </Link>
        </div>
        <div>
          <Link href="/terms">
            <a className="hover:underline">Terms</a>
          </Link>
        </div>
        <div>
          <Link href="/privacy">
            <a className="hover:underline">Privacy</a>
          </Link>
        </div>
      </div>

      <button
        onClick={(e) => {
          const target = e.target as Element;
          target.classList.add("hidden");
          target.parentElement?.children[0].classList.remove("hidden");
          target.parentElement?.children[0].classList.add("flex");
        }}
        className="mt-9 p-3 hover:bg-lit-gray hover:bg-opacity-20 rounded-full"
      >
        <svg
          width="30"
          height="6"
          viewBox="0 0 30 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#0B1D25" />
          <circle cx="15" cy="3" r="3" fill="#0B1D25" />
          <circle cx="27" cy="3" r="3" fill="#0B1D25" />
        </svg>
      </button>
    </div>
  );
};

export default SignOut;
