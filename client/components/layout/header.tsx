import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import throttle from "lodash/throttle";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// styles
import styles from "../../styles/Header.module.css";
import WalletModal from "./walletModal";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuBtn = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const closeSideBar = () => {
    setIsOpen(false);
  };

  const setActiveLink = () => {
    document.querySelectorAll("#nav-header a").forEach((ele) => {
      ele.classList.remove(styles.menuActive);
      let href = ele.getAttribute("href");
      if (href && window.location.pathname.startsWith(href))
        ele.classList.add(styles.menuActive);
    });
  };

  useEffect(() => {
    if (isOpen) {
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "10px";
        if (menuBtn.current) menuBtn.current.style.paddingRight = "10px";
      } else {
        document.body.style.overflow = "hidden";
      }
    } else {
      setTimeout(() => {
        document.body.removeAttribute("style");
        if (menuBtn.current) menuBtn.current.removeAttribute("style");
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    document.querySelectorAll(".sidebar a").forEach((ele) => {
      ele.addEventListener("click", closeSideBar);
    });

    window.addEventListener(
      "scroll",
      throttle(() => {
        if (window.scrollY > 0) {
          document
            .querySelector("#nav-header")
            ?.classList.add("border-b", "border-lit-dark", "border-opacity-10");
        } else {
          document
            .querySelector("#nav-header")
            ?.classList.remove(
              "border-b",
              "border-lit-dark",
              "border-opacity-10"
            );
        }
      }, 200)
    );

    setActiveLink();

    router.events.on("routeChangeComplete", () => {
      setActiveLink();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      id="nav-header"
      className="fixed bg-white top-0 left-0 right-0 z-50 py-5 md:py-7 px-7 md:px-10 lg:px-20 flex justify-between"
    >
      <Link href="/">
        <a>
          <Image src="/logo/logo.svg" alt="logo" height="37" width="237" />
        </a>
      </Link>

      {/* horizontal navbar */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex items-center font-Poppins font-medium">
          <li className="mx-4">
            <Link href="/bids">
              <a className={`${styles.menu}`}>Bids</a>
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/story">
              <a className={`${styles.menu}`}>Our&nbsp;Story</a>
            </Link>
          </li>
          <li className="mx-4">
            <Link href="/blogs">
              <a className={`${styles.menu}`}>Blogs</a>
            </Link>
          </li>
          <li
            className="border-l-2 mx-4 border-lit-dark border-opacity-30 h-6"
            aria-hidden="true"
          ></li>
          <li className="mx-4">
            <Link href="/wallet">
              <a className={`flex items-center ${styles.menu}`}>
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
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* menu-btn */}
      <div className="relative lg:hidden" ref={menuBtn}>
        <div className="absolute z-20 left-0 top-0 transform -translate-x-full translate-y-1/4">
          <button
            className={`flex ${styles.wrapperMenu} ${
              isOpen ? styles.open : ""
            }`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div
              className={`${styles.lineMenu} ${styles.half} ${styles.start}`}
            ></div>
            <div className={`${styles.lineMenu}`}></div>
            <div
              className={`${styles.lineMenu} ${styles.half} ${styles.end}`}
            ></div>
          </button>
        </div>
      </div>

      {/* sidenav overlay */}
      <div
        className={`fixed lg:hidden inset-0 bg-lit-dark transition duration-500 bg-opacity-30 transform ${
          !isOpen ? "translate-x-full" : ""
        }`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>

      {/* side navbar */}
      <div
        className={`sidebar bg-white lg:hidden w-60 fixed right-0 top-0 bottom-0 transition duration-500 rounded-l-xl transform ${
          !isOpen ? "translate-x-full" : ""
        }`}
      >
        <nav>
          <div className="p-5 pt-20">
            <Link href="/">
              <a className="block">
                <Image
                  src="/logo/logo.svg"
                  alt="logo"
                  height="37"
                  width="237"
                />
              </a>
            </Link>
          </div>
          <ul className="flex flex-col items-center font-Poppins font-medium">
            <li className="my-4">
              <Link href="/bids">
                <a className={`${styles.menu}`}>Bids</a>
              </Link>
            </li>
            <li className="my-4">
              <Link href="/story">
                <a className={`${styles.menu}`}>Our&nbsp;Story</a>
              </Link>
            </li>
            <li className="my-4">
              <Link href="/blogs">
                <a className={`${styles.menu}`}>Blogs</a>
              </Link>
            </li>
            <li
              className="border-t border-lit-dark w-44 border-opacity-30 my-4"
              aria-hidden="true"
            ></li>
            <li className="my-4">
              <Link href="/wallet">
                <a className={`flex items-center ${styles.menu}`}>
                  <div
                    className="bg-lit-dark h-5 w-5 rounded-full flex items-center justify-center"
                    style={{ padding: 6 }}
                  >
                    <FontAwesomeIcon
                      className="inline text-white"
                      icon={faPlus}
                    />
                  </div>
                  &nbsp;
                  <span>Add&nbsp;wallet</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* <WalletModal /> */}
    </header>
  );
};

export default Header;
