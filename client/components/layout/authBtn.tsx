import { FC, useContext, useEffect, useState } from "react";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// context
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
// types
import type { Maybe } from "@metamask/providers/dist/utils";
// functions
import { getCookie } from "../../lib/general/cookies";
import RingSpinner from "../spinners/ringSpinner";

interface AuthBtnProps {
  style: string;
  openModal: () => void;
  skipAutoLogin?: boolean;
}

const AuthBtn: FC<AuthBtnProps> = ({ style, openModal, skipAutoLogin }) => {
  // contexts
  const { user, setUser, accounts, setAccounts } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  // states
  const [isBtnLoading, setIsBtnLoading] = useState(true);

  useEffect(() => {
    const ethereum = window.ethereum;
    const token = getCookie("token");

    function handleIncomingAccounts(
      incomingAccounts: Array<string> | Maybe<unknown> | unknown
    ) {
      console.log("incoming");
      if (incomingAccounts && Array.isArray(incomingAccounts)) {
        setAccounts(incomingAccounts);

        // if previously stored user and current user is same and token exists
        if (localStorage.getItem("user") === incomingAccounts[0] && token) {
          setUser(incomingAccounts[0]);
        }
      } else setAccounts([]);
    }

    // skip autoconnect
    if (!skipAutoLogin) {
      // if token and metamask wallet exists and wallet not connected
      if (token && ethereum && !accounts[0])
        ethereum._metamask.isUnlocked().then((unlocked) => {
          // if wallet is unlocked autoconnect
          if (unlocked)
            ethereum
              ?.request({ method: "eth_requestAccounts" })
              .then(handleIncomingAccounts)
              .then(() => setIsBtnLoading(false))
              .catch(() => {
                setIsBtnLoading(false);
              });
          else setIsBtnLoading(false);
        });
      else setIsBtnLoading(false);
    } else setIsBtnLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isBtnLoading ? (
        !user ? (
          <button onClick={openModal} className={style}>
            <div
              className="bg-lit-dark h-5 w-5 rounded-full flex items-center justify-center"
              style={{ padding: 6 }}
            >
              <FontAwesomeIcon
                className="inline text-white"
                icon={faPlus}
                size="xs"
              />
            </div>
            &nbsp;
            <span>Add&nbsp;wallet</span>
          </button>
        ) : (
          <button
            className="flex items-center font-medium px-5 py-2 rounded-full bg-white"
            style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
            onClick={openModal}
          >{`${user.substring(0, 4)}.....${user.substring(38, 42)}`}</button>
        )
      ) : (
        <button
          className="flex items-center font-medium px-10 py-2 rounded-full bg-white"
          disabled={true}
          style={{ boxShadow: "2px 2px 6px 0px #00000040" }}
        >
          <RingSpinner width={25} />
        </button>
      )}
    </>
  );
};

export default AuthBtn;
