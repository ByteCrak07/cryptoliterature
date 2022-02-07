import {
  FC,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ethers } from "ethers";
// types
import type { Maybe } from "@metamask/providers/dist/utils";
import type { Web3Provider } from "@ethersproject/providers";
import type { UserProfile } from "../interfaces/profile";
// functions
import { deleteCookie, getCookie, setCookie } from "../lib/general/cookies";

interface WalletAuthContextType {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  userData: UserProfile | null;
  setUserData: Dispatch<SetStateAction<UserProfile | null>>;
  accounts: Array<string>;
  setAccounts: Dispatch<SetStateAction<Array<string>>>;
  startOnboarding: () => void;
  removeUserData: () => void;
}

const WalletAuthContext = createContext<WalletAuthContextType | null>(null);

const WalletAuthWrapper: FC = ({ children }) => {
  // states
  const [user, setUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [ethersProvider, setEthersProvider] = useState<Web3Provider>();
  const onboarding = useRef<MetaMaskOnboarding>();

  // initialise onboarding and ethers
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }

    if (!ethersProvider && window.ethereum) {
      setEthersProvider(
        new ethers.providers.Web3Provider(window.ethereum as any)
      );
    }
  }, [ethersProvider]);

  // onboarding and handling new accounts
  const startOnboarding = () => {
    onboarding.current?.startOnboarding();
  };

  const stopOnboarding = () => {
    onboarding.current?.stopOnboarding();
  };

  function reqPersonalSign() {
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
      });
  }

  function removeUserData() {
    deleteCookie("token");
    setUser(null);
    setUserData(null);
    localStorage.removeItem("user");
  }

  function handleNewAccounts(
    newAccounts: Array<string> | Maybe<unknown> | unknown
  ) {
    if (Array.isArray(newAccounts) && newAccounts.length > 0) {
      if (
        newAccounts[0] === localStorage.getItem("user") &&
        getCookie("token")
      ) {
        setAccounts(newAccounts);
        setUser(newAccounts[0]);
      } else {
        removeUserData();
        // sign in with new account
        setAccounts(newAccounts);
        reqPersonalSign();
      }
    } else {
      setAccounts([]);
      setUser(null);
    }
  }

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) stopOnboarding();
    }
  }, [accounts]);

  useEffect(() => {
    const ethereum = window.ethereum;

    if (user) ethereum?.on("accountsChanged", handleNewAccounts);

    return () => {
      ethereum?.removeListener("accountsChanged", handleNewAccounts);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <WalletAuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        accounts,
        setAccounts,
        startOnboarding,
        removeUserData,
      }}
    >
      {children}
    </WalletAuthContext.Provider>
  );
};

export default WalletAuthWrapper;
export { WalletAuthContext };
export type { WalletAuthContextType };
