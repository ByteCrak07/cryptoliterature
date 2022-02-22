import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ComingSoon: FC = () => {
  useEffect(() => {
    document.getElementsByTagName("main")[0].classList.add("bg-lit-dark");

    return () => {
      document.getElementsByTagName("main")[0].classList.remove("bg-lit-dark");
    };
  }, []);

  return (
    <div className="w-full h-full sm:h-auto flex justify-center">
      <div className="flex max-w-5xl gap-20 text-white font-Poppins">
        <div className="flex-1 flex items-center">
          <div>
            <h1 className="text-4xl font-normal">
              Our Website
              <br />
              <span className="font-bold">is on it&apos;s way!</span>
            </h1>
            <span className="inline-block mt-10">
              Feel free to check our{" "}
              <Link href="/blogs">
                <a className="underline font-semibold">blogs</a>
              </Link>{" "}
              in the meantime!
            </span>
          </div>
        </div>
        <div
          className="flex-1 hidden sm:block filter grayscale"
          style={{ transform: "rotateY(180deg)" }}
        >
          <Image
            height="400"
            width="380"
            src="/coming-soon/person.svg"
            alt="Coming soon"
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
