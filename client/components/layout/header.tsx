import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import throttle from "lodash/throttle";
// styles
import styles from "../../styles/Header.module.css";
// components
import WalletModal from "./walletModal";
import AuthBtn from "./authBtn";

const Header: FC = () => {
  // states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
  const menuBtn = useRef<HTMLDivElement>(null);

  // router
  const router = useRouter();

  // functions
  const closeSideBar = () => {
    setIsSidebarOpen(false);
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
    if (isSidebarOpen) {
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
      }, 200);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    document.querySelectorAll(".sidebar a").forEach((ele) => {
      ele.addEventListener("click", closeSideBar);
    });

    // for smooth transition of header after dom loads
    window.onload = () => {
      document
        .getElementById("nav-header")
        ?.classList.add("transition-colors", "duration-500");
    };

    setActiveLink();

    router.events.on("routeChangeComplete", () => {
      setActiveLink();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const addBorder = throttle(() => {
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
    }, 200);

    if (window.location.pathname !== "/")
      window.addEventListener("scroll", addBorder);

    return () => {
      window.removeEventListener("scroll", addBorder);
    };
  }, [router]);

  return (
    <header
      id="nav-header"
      className="fixed bg-white dark:bg-lit-dark top-0 left-0 right-0 z-50 py-5 md:py-7 px-7 md:px-10 lg:px-20 flex justify-between"
    >
      <Link href="/">
        <a>
          <span className="dark:hidden">
            <Image
              src="/logo/logo.svg"
              alt="logo"
              height="37"
              width="237"
              loading="eager"
            />
          </span>
          <span className="hidden dark:inline">
            <Image
              src="/logo/logo-white.svg"
              alt="logo"
              height="37"
              width="237"
              loading="eager"
            />
          </span>
        </a>
      </Link>

      {/* horizontal navbar */}
      <nav className="hidden lg:flex items-center text-lit-dark dark:text-white">
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
            className="border-l-2 mx-4 border-lit-dark dark:border-white border-opacity-30 h-6"
            aria-hidden="true"
          ></li>
          <li className="mx-4">
            <AuthBtn
              style={styles.walletBtn}
              openModal={() => {
                setIsWalletModalOpen(true);
              }}
            />
          </li>
        </ul>
      </nav>

      {/* menu-btn */}
      <div className="relative lg:hidden" ref={menuBtn}>
        <div className="absolute z-20 left-0 top-0 transform -translate-x-full translate-y-1/4">
          <button
            className={`flex ${styles.wrapperMenu} ${
              isSidebarOpen ? styles.open : ""
            }`}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
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
          !isSidebarOpen ? "translate-x-full" : ""
        }`}
        onClick={() => {
          closeSideBar();
        }}
      ></div>

      {/* side navbar */}
      <div
        className={`sidebar bg-white lg:hidden w-60 fixed right-0 top-0 bottom-0 transition duration-500 rounded-l-xl transform ${
          !isSidebarOpen ? "translate-x-full" : ""
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
              <AuthBtn
                skipAutoLogin
                style={styles.walletBtnDark}
                openModal={() => {
                  closeSideBar();
                  setIsWalletModalOpen(true);
                }}
              />
            </li>
          </ul>
        </nav>
      </div>

      {isWalletModalOpen ? (
        <WalletModal
          close={() => {
            setIsWalletModalOpen(false);
          }}
        />
      ) : null}
    </header>
  );
};

export default Header;
