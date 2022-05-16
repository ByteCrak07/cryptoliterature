import { FC, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { showToast } from "../general/toast";
import RingSpinner from "../spinners/ringSpinner";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import { createUser } from "../../lib/users/post";
import { getCookie } from "../../lib/general/cookies";

interface OnboardingProps {
  close: () => void;
}

const Onboarding: FC<OnboardingProps> = ({ close }) => {
  // states
  const [isWriter, setIsWriter] = useState(false);
  const [isCollector, setIsCollector] = useState(false);
  const [screen, setScreen] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isFinishDisabled, setIsFinishDisabled] = useState(false);

  // context
  const { user, setUserData } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  // router
  const router = useRouter();

  const handleSubmit = async () => {
    if (userName) {
      setIsFinishDisabled(true);
      // api call to create user

      try {
        let data = await createUser(
          user as string,
          getCookie("signature") as string,
          userName,
          fullName,
          email,
          isWriter,
          isCollector
        );

        if (data) {
          const { accessToken, ...newUserData } = data;
          setUserData(newUserData);
          setIsFinishDisabled(false);
          router.push(`/${userName}`);
          router.reload();
          close();
        }
      } catch (e) {
        if (String(e) === "Error: username already exists")
          showToast("This username already exists");

        if (String(e) === "Error: email must be an email")
          showToast("Provide a valid email");

        setIsFinishDisabled(false);
      }
    } else showToast("Provide us your Username");
  };

  return (
    <>
      {screen === 0 ? (
        <>
          <h1 className="my-5 mx-auto w-72 font-medium text-2xl">
            What describes you the best?
          </h1>
          <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col items-center">
              <label
                htmlFor="writer"
                className="block w-36 hover:cursor-pointer"
              >
                <Image
                  src="/onboarding/writer.png"
                  className="rounded-2xl"
                  alt="writer"
                  height={377}
                  width={332}
                />
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="writer"
                  className="form-radio hover:cursor-pointer text-lit-dark focus:ring-0"
                  checked={isWriter}
                  onChange={() => setIsWriter(!isWriter)}
                />
                <label htmlFor="writer" className="ml-2 font-light">
                  I&apos;m a writer
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="collector"
                className="block w-36 hover:cursor-pointer"
              >
                <Image
                  src="/onboarding/collector.jpg"
                  className="rounded-2xl"
                  alt="writer"
                  height={377}
                  width={332}
                />
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="collector"
                  className="form-radio hover:cursor-pointer text-lit-dark focus:ring-0"
                  checked={isCollector}
                  onChange={() => setIsCollector(!isCollector)}
                />
                <label htmlFor="collector" className="ml-2 font-light">
                  I&apos;m a collector
                </label>
              </div>
            </div>
          </div>
          <div className="text-right mt-8 mb-3">
            <button
              onClick={() => {
                if (isWriter || isCollector) setScreen(1);
                else showToast("Select atleast one option");
              }}
              className="py-2 px-5 font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-lg"
            >
              Lets go!
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-5 mb-8 mx-auto w-72 font-medium text-2xl">
            Tell us more about yourself
          </h1>
          <div className="mb-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="What should we call you*"
              className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="What is your full name"
              className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Where should we email you"
              className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
            />
          </div>
          <div className="text-right mt-5 mb-3">
            <button
              onClick={handleSubmit}
              disabled={isFinishDisabled}
              className="py-2 px-5 font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-lg"
            >
              {!isFinishDisabled ? (
                "Finish"
              ) : (
                <RingSpinner width={24} color="white" />
              )}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Onboarding;
