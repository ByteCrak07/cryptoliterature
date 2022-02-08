import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState, MouseEvent } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { throttle } from "lodash";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// components
import Card from "../components/bids/card";
import LatestBlogCard from "../components/blogs/latest-blog-card";
import Seo from "../components/general/seo";
// styles
import styles from "../styles/Home.module.css";
import ComingSoon from "../components/general/coming-soon";

SwiperCore.use([Autoplay]);

const Home: NextPage = () => {
  const [selected, setSelected] = useState<number>(0);

  const filters = ["All", "Short Story", "Poem", "Quote"];

  useEffect(() => {
    var countDownDate = new Date("Feb 14, 2022 20:00:00 UTC+5:30").getTime();

    var timer = setInterval(function () {
      // Current date and time
      var now = new Date().getTime();

      // Difference between now and the count down date
      var diff = countDownDate - now;

      var days, hours, minutes, seconds;

      if (diff < 0) {
        days = hours = minutes = seconds = 0;
      } else {
        days = Math.floor(diff / (1000 * 60 * 60 * 24));
        hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((diff % (1000 * 60)) / 1000);
      }

      // Display the values
      (document.getElementById("time-days") as Element).innerHTML = `${days}`;
      (document.getElementById("time-hours") as Element).innerHTML = `${hours}`;
      (
        document.getElementById("time-mins") as Element
      ).innerHTML = `${minutes}`;
      (
        document.getElementById("time-secs") as Element
      ).innerHTML = `${seconds}`;

      // If the count down is finished stop
      if (diff < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // switching dark mode
  useEffect(() => {
    const isInViewport = () => {
      const learnMore = document.getElementById("switch-darkmode");

      if (learnMore) {
        const rect = learnMore.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      } else return false;
    };

    const applyDarkMode = throttle(() => {
      if (isInViewport()) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }, 100);

    applyDarkMode();

    window.addEventListener("scroll", applyDarkMode);

    return () => {
      document.documentElement.classList.remove("dark");
      window.removeEventListener("scroll", applyDarkMode);
    };
  }, []);

  // handling drag to learn more
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    handleMouseMove(e);
    document.onmousemove = handleMouseMove;
    document.onmouseup = handleMouseUp;
  };

  const handleMouseUp = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };

  const handleMouseMove = (
    e: globalThis.MouseEvent | MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    const landingSection = document.getElementById("landing-section");
    const slidesSection = document.getElementById("slides-section");

    // -24 for adjusting window to the learn more text
    if (landingSection && slidesSection) {
      document.documentElement.scrollTop = window.innerHeight - e.clientY - 24;

      if (window.scrollY > landingSection.clientHeight / 3) {
        handleMouseUp();
        // -96 for offsetting from header 6rem (96px)
        window.scrollTo({
          top: slidesSection.offsetTop - 96,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <main>
      <Seo
        title="Cryptoliterature"
        description="Sell your Literature works as NFTs - Cryptoliterature an epiphany to the literary world"
        path="/"
      />

      <div className="main-div bg-lit-dark transition-colors">
        <section
          id="landing-section"
          className="text-white flex items-center pb-24 relative"
          style={{ height: `calc(100vh - 6rem)` }}
        >
          <div className="flex items-center font-OpenSans w-full">
            <div className="flex-3 flex justify-evenly align-items flex-col md:mr-5">
              <div>
                <h2 className="text-lg md:text-xl">
                  Cryptoliterature presents
                </h2>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                  Mi Amor
                </h1>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-y-2 gap-x-2 sm:gap-x-4 mt-10">
                <div className="bg-[#1F3139] shadow-2xl shadow-black p-2 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm lg:text-base xl:text-xl">
                    DAYS
                  </div>
                  <div
                    id="time-days"
                    className="font-Merriweather text-4xl sm:text-5xl lg:text-7xl xl:text-9xl"
                  >
                    &nbsp;
                  </div>
                </div>
                <div className="bg-[#1F3139] shadow-2xl shadow-black p-2 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm lg:text-base xl:text-xl">
                    HOURS
                  </div>
                  <div
                    id="time-hours"
                    className="font-Merriweather text-4xl sm:text-5xl lg:text-7xl xl:text-9xl"
                  >
                    &nbsp;
                  </div>
                </div>
                <div className="bg-[#1F3139] shadow-2xl shadow-black p-2 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm lg:text-base xl:text-xl">
                    MINUTES
                  </div>
                  <div
                    id="time-mins"
                    className="font-Merriweather text-4xl sm:text-5xl lg:text-7xl xl:text-9xl"
                  >
                    &nbsp;
                  </div>
                </div>
                <div className="bg-[#1F3139] shadow-2xl shadow-black p-2 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm lg:text-base xl:text-xl">
                    SECONDS
                  </div>
                  <div
                    id="time-secs"
                    className="font-Merriweather text-4xl sm:text-5xl lg:text-7xl xl:text-9xl"
                  >
                    &nbsp;
                  </div>
                </div>
              </div>

              <div id="intro-section" className="mt-14 ml-5">
                <Link href="/mi-amor">
                  <a className="hover:underline font-Poppins text-xl">
                    Register now
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex-2 hidden md:flex justify-around max-w-xs md:max-w-none">
              <Image
                src="/banner/Lucius_Verus.png"
                alt="Lucius Verus"
                height="577px"
                width="428px"
                loading="eager"
              />
            </div>
          </div>

          <div id="switch-darkmode" className="absolute bottom-24 w-full"></div>

          <div className="absolute -bottom-3 w-full">
            <div className="relative flex justify-center">
              <div className="hover:cursor-grab" onMouseDown={handleMouseDown}>
                <Image
                  src="/vectors/union.png"
                  alt=""
                  draggable={false}
                  aria-hidden
                  height={100}
                  width={280}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 -bottom-2 left-1 flex items-center justify-center text-lit-dark font-OpenSans font-semibold">
                Drag to Learn More
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="main-div pb-24">
        <section id="slides-section" style={{ height: `calc(100vh - 6rem)` }}>
          <div className="flex items-center font-OpenSans w-full">
            <div className="flex-3 mt-10 md:mt-0 w-40 lg:w-96 xl:w-[30rem]">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                speed={1000}
                autoplay={{
                  delay: 10000,
                }}
                loop
                grabCursor
                longSwipesRatio={0.25}
              >
                {/* slide 1 */}
                <SwiperSlide>
                  <div className="px-1">
                    <h2 className="text-5xl sm:text-6xl font-bold">
                      What is this about?
                    </h2>
                    <h3 className="mt-10 font-Roboto text-xl">
                      Mi Amour is an exclusive event conducted by
                      Cryptoliterature for the <b>writers inside you</b>. This
                      is your chance to write and publish your favorite piece of
                      work, be it an article, poem, story or anything that you
                      are passionate about.
                    </h3>
                  </div>

                  <div className="flex mt-14 sm:mt-20">
                    <div className="font-Merriweather text-4xl flex tracking-tighter">
                      01/<div className="text-xl ml-1">03</div>
                    </div>

                    <div className="ml-16 flex items-center gap-x-2">
                      <SlidePrevButton disabled />
                      <SlideNextButton />
                    </div>
                  </div>
                </SwiperSlide>

                {/* slide 2 */}
                <SwiperSlide>
                  <div className="px-1">
                    <h2 className="text-5xl sm:text-6xl font-bold">
                      What&apos;s the catch?
                    </h2>
                    <h3 className="mt-10 font-Roboto text-xl">
                      Well well well, we definitely have something exciting for
                      you! The winners will be awarded with one of the hottest
                      currencies in the world, <b>Bitcoin</b>.
                      <br />
                      Yes you read that right. This is your chance to write and
                      win big
                    </h3>
                  </div>

                  <div className="flex mt-14 sm:mt-20">
                    <div className="font-Merriweather text-4xl flex tracking-tighter">
                      02/<div className="text-xl ml-1">03</div>
                    </div>

                    <div className="ml-16 flex items-center gap-x-2">
                      <SlidePrevButton />
                      <SlideNextButton />
                    </div>
                  </div>
                </SwiperSlide>

                {/* slide 3 */}
                <SwiperSlide>
                  <div className="px-1">
                    <h2 className="text-5xl sm:text-6xl font-bold">
                      Tell me more!!
                    </h2>
                    <h3 className="mt-10 font-Roboto text-xl">
                      Calm down Amigo! The event will span from February 14th
                      till 28th and the theme for the event is{" "}
                      <b>‘Romantic Literature’</b>. Register from the link
                      above, put on your romantic thinking caps and voila! you
                      are good to go. See you on the other side!
                    </h3>
                  </div>

                  <div className="flex mt-14 sm:mt-20">
                    <div className="font-Merriweather text-4xl flex tracking-tighter">
                      03/<div className="text-xl ml-1">03</div>
                    </div>

                    <div className="ml-16 flex items-center gap-x-2">
                      <SlidePrevButton />
                      <SlideNextButton disabled />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div
              className="flex-2 hidden md:flex justify-around"
              style={{ maxHeight: `calc(100vh - 10rem)` }}
            >
              <Image
                src="/banner/Thinker.png"
                alt="Thinker"
                height="642px"
                width="415px"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const SlidePrevButton: FC<{ disabled?: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <button
      className="p-3 bg-lit-dark disabled:bg-opacity-70 rounded-full text-white"
      disabled={disabled}
      onClick={() => swiper.slidePrev()}
    >
      <div className="w-4 h-4 flex items-center justify-center">
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </button>
  );
};

const SlideNextButton: FC<{ disabled?: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <button
      className="p-3 bg-lit-dark disabled:bg-opacity-70 rounded-full text-white"
      disabled={disabled}
      onClick={() => swiper.slideNext()}
    >
      <div className="w-4 h-4 flex items-center justify-center">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </button>
  );
};

export default Home;
