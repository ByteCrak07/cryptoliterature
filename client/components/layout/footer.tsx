import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="py-5 md:py-7 px-7 md:px-10 lg:px-20 flex flex-col-reverse md:flex-row text-lit-gray font-Poppins font-light justify-between items-start shadow">
      <div className="flex flex-col">
        <Link href="/">
          <a>
            <Image
              src="/logo/logo-gray.svg"
              alt="logo"
              height="32"
              width="197"
            />
          </a>
        </Link>
        <span className="text-xs">
          &copy; 2022 Cryptoliterature. All rights reserved
        </span>
      </div>

      <div className="block md:hidden px-3 my-5 w-full">
        <hr className="border-t border-lit-gray border-opacity-30 w-full" />
      </div>

      <nav className="w-full pt-0 md:pt-2 md:w-auto">
        <ul className="flex flex-col md:flex-row text-right">
          <li className="mx-4 my-1">
            <Link href="/story">
              <a className="hover:text-shadow">About</a>
            </Link>
          </li>
          <li className="mx-4 my-1">
            <Link href="/terms">
              <a className="hover:text-shadow">Terms&nbsp;and&nbsp;Services</a>
            </Link>
          </li>
          <li className="mx-4 my-1">
            <Link href="/privacy">
              <a className="hover:text-shadow">Privacy</a>
            </Link>
          </li>
          <li className="mx-4 my-1">
            <Link href="/help">
              <a className="hover:text-shadow">Help</a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
