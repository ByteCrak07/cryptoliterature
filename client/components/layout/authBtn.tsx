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
import { getCookie, setCookie } from "../../lib/general/cookies";
import RingSpinner from "../spinners/ringSpinner";
import { login } from "../../lib/users/post";
import { getUser } from "../../lib/users/get";
import Link from "next/link";
import Image from "next/image";

interface AuthBtnProps {
  style: string;
  openModal: () => void;
  skipAutoLogin?: boolean;
}

const AuthBtn: FC<AuthBtnProps> = ({ style, openModal, skipAutoLogin }) => {
  // contexts
  const { user, setUser, userData, setUserData, accounts, setAccounts } =
    useContext(WalletAuthContext) as WalletAuthContextType;

  // states
  const [isBtnLoading, setIsBtnLoading] = useState(true);

  useEffect(() => {
    const ethereum = window.ethereum;
    const token = getCookie("accessToken");
    const signature = getCookie("signature");

    async function handleIncomingAccounts(
      incomingAccounts: Array<string> | Maybe<unknown> | unknown
    ) {
      if (incomingAccounts && Array.isArray(incomingAccounts)) {
        setAccounts(incomingAccounts);

        // if previously stored user and current user is same and token exists
        if (localStorage.getItem("user") === incomingAccounts[0]) {
          if (token) {
            try {
              const data = await getUser(incomingAccounts[0]);
              setUserData(data);
              if (data) setUser(incomingAccounts[0]);
            } catch (e) {
              setAccounts([]);
            }
          } else if (signature) {
            try {
              const data = await login(incomingAccounts[0], signature);
              if (data) {
                const { accessToken, ...newUserData } = data;

                setUserData(newUserData);
                setCookie("accessToken", accessToken, 1);
                setCookie("signature", signature, 1);
              }
            } catch (e) {
              setAccounts([]);
            }
          }
        }
      } else setAccounts([]);
    }

    // skip autoconnect
    if (!skipAutoLogin) {
      // if token and metamask wallet exists and wallet not connected
      if (ethereum && !accounts[0])
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
          <button
            id={!skipAutoLogin ? "walletAuthBtn" : ""}
            onClick={openModal}
            className={style}
          >
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
        ) : !userData ? (
          <button className={style} onClick={openModal}>{`${user.substring(
            0,
            4
          )}.....${user.substring(38, 42)}`}</button>
        ) : (
          <Link href={`/${userData.username}`}>
            <a className={style}>
              <span className="bg-white flex items-center justify-center rounded-full overflow-hidden p-0.5 mr-2">
                <Image
                  src={userData.imgUrl}
                  alt={userData.username}
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              </span>
              <span className="block">
                {userData.fullName ? userData.fullName : userData.username}
                <span className="block text-xs">{`${user.substring(
                  0,
                  4
                )}.....${user.substring(38, 42)}`}</span>
              </span>
            </a>
          </Link>
        )
      ) : (
        <button
          className="flex items-center font-medium px-10 py-2 rounded-full bg-white"
          disabled={true}
          style={{ boxShadow: "2px 2px 6px 0px #ffffff1c" }}
        >
          <RingSpinner width={25} />
        </button>
      )}
    </>
  );
};

export default AuthBtn;
