import { FC, useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import { showToast } from "../general/toast";
import { getCookie, setCookie } from "../../lib/general/cookies";
import RingSpinner from "../spinners/ringSpinner";
import Onboarding from "./onboarding";

interface WalletModalProps {
  close: () => void;
}

const WalletModal: FC<WalletModalProps> = ({ close }) => {
  // contexts
  const { user, setUser, userData, accounts, setAccounts, startOnboarding } =
    useContext(WalletAuthContext) as WalletAuthContextType;

  // states
  const [metamaskBtnDisabled, setMetamaskBtnDisabled] = useState(false);
  const [signBtnDisabled, setSignBtnDisabled] = useState(false);

  // Setting screens
  // screen: 0 => screen showing wallets
  // screen: 1 => screen demanding user to sign
  // screen: 2 => screen for onboarding new user
  const [screen, setScreen] = useState(0);

  useLayoutEffect(() => {
    // if accounts[0] is present but no user is set => user has to sign
    if (accounts[0] && !user) setScreen(1);
    // if user is present but no userData => current user is new
    if (user && !userData) setScreen(2);
  }, [accounts, user, userData]);

  const reqPersonalSign = () => {
    setSignBtnDisabled(true);
    const ethereum = window.ethereum;

    ethereum
      ?.request({
        method: "personal_sign",
        params: [
          "Please sign this message to connect to Cryptoliterature",
          ethereum.selectedAddress,
        ],
      })
      .then((val) => {
        // TODO: api for getting back jwt token
        // storing val for now
        setCookie("token", val as string, 1);
        localStorage.setItem("user", ethereum.selectedAddress as string);
        setUser(ethereum.selectedAddress);
        setSignBtnDisabled(false);
        close();
      })
      .catch(() => {
        setSignBtnDisabled(false);
      });
  };

  const addWalletMetaMask = () => {
    const ethereum = window.ethereum;
    const token = getCookie("token");

    if (ethereum?.isMetaMask) {
      setMetamaskBtnDisabled(true);

      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((newAccounts) => {
          if (Array.isArray(newAccounts) && newAccounts.length > 0) {
            setAccounts(newAccounts);
            setMetamaskBtnDisabled(false);

            // after getting account change screen for personal sign if token doesn't exist or current user is previously signed in
            if (localStorage.getItem("user") === newAccounts[0] && token) {
              setUser(newAccounts[0]);
              close();
            } else setScreen(1);
          }
        })
        .catch((err) => {
          setMetamaskBtnDisabled(false);
          if (err.message === "A request is already in progress")
            showToast("Unlock your wallet to connect");
        });
    } else {
      startOnboarding();
    }
  };

  // useEffect
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.removeAttribute("class");
    };
  }, [close]);

  return (
    <div className="fixed font-Poppins filter backdrop-blur bg-lit-dark bg-opacity-60 z-50 inset-0 overflow-auto">
      <div className="h-full w-full flex items-center justify-center">
        <div
          id="wallet-div"
          className="rounded-lg text-center bg-white py-5 px-5 sm:px-10 relative"
        >
          <button
            onClick={close}
            className="absolute flex items-center justify-center right-1 top-1 w-8 h-8 text-2xl font-extralight bg-lit-gray bg-opacity-20 hover:bg-opacity-40 rounded-full"
          >
            <span>&times;</span>
          </button>
          {screen === 0 ? (
            <>
              {/* screen 0 */}
              <h1 className="my-5 mx-4 font-semibold text-2xl sm:text-3xl">
                Connect your wallet
              </h1>
              <div className="mt-10 mb-5 w-full">
                <button
                  onClick={addWalletMetaMask}
                  disabled={metamaskBtnDisabled}
                  className="flex items-center justify-between py-2 px-6 w-full border border-lit-dark rounded-lg hover:shadow-lg"
                >
                  <Image
                    src="/logo/metamask.svg"
                    alt="metamask"
                    height={50}
                    width={50}
                    loading="eager"
                  />
                  <div className="font-medium text-lg">
                    {!metamaskBtnDisabled ? "Metamask" : "Connecting..."}
                  </div>
                  <div style={{ width: 50 }}>
                    {metamaskBtnDisabled ? <RingSpinner width={35} /> : null}
                  </div>
                </button>
              </div>
              <div className="text-xs sm:text-sm w-60 sm:w-80 m-auto">
                By connecting your wallet, you agree to our{" "}
                <Link href="/terms">
                  <a
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                </Link>{" "}
                and our{" "}
                <Link href="/privacy">
                  <a
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </Link>
                .
              </div>
            </>
          ) : null}

          {screen === 1 ? (
            <>
              {/* screen 1 */}
              <h1 className="my-5 mx-auto w-72 font-semibold text-2xl">
                Sign the message in your wallet to continue
              </h1>
              <h2 className="mx-auto w-72">
                Cryptoliterature uses this signature to verify that you&apos;re
                the owner of this Ethereum address.
              </h2>
              <button
                onClick={reqPersonalSign}
                disabled={signBtnDisabled}
                className="flex justify-evenly items-center w-80 py-4 mt-5 mb-1 bg-black text-white disabled:bg-lit-gray disabled:bg-opacity-20 disabled:text-lit-dark rounded-lg"
              >
                {signBtnDisabled ? <div style={{ width: 30 }}></div> : null}
                <div>
                  {!signBtnDisabled ? "Continue" : "Sign message in wallet"}
                </div>
                {signBtnDisabled ? (
                  <div>
                    <RingSpinner width={30} color="white" />
                  </div>
                ) : null}
              </button>
              <button
                onClick={close}
                className="block w-80 py-4 mt-1 text-lit-gray hover:text-lit-dark rounded"
              >
                Disconnect
              </button>
            </>
          ) : null}

          {screen === 2 ? <Onboarding close={close} /> : null}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
