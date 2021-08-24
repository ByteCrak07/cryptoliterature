import type { NextPage } from "next";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// components
import Seo from "../components/seo";
// styles
import styles from "../styles/Home.module.css";

SwiperCore.use([EffectCoverflow, Autoplay]);

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Cryptoliterature" description="Crypto literature" />
      <section className="text-lit-dark py-20 px-10 md:px-20">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          speed={2000}
          loop={true}
          autoplay={{
            delay: 10000,
          }}
          grabCursor={true}
          longSwipesRatio={0.25}
        >
          <SwiperSlide>
            <div className="flex">
              <div
                className="flex-1 flex justify-evenly align-items flex-col"
                style={{ minHeight: "20rem" }}
              >
                <h1 className="font-Merriweather text-4xl md:text-5xl leading-snug md:leading-snug">
                  An epiphany for the literary world!!
                </h1>
                <div className="w-full">
                  <button
                    className={`${styles.bannerBtn} bg-lit-dark text-white font-semibold rounded-md px-5 py-3`}
                  >
                    Start Bidding&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="arrow-animate">
                      <FontAwesomeIcon
                        className="w-2 inline opacity-50"
                        icon={faChevronRight}
                      />
                      &nbsp;&nbsp;
                      <FontAwesomeIcon
                        className="w-2 inline opacity-0"
                        icon={faChevronRight}
                      />
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-1 hidden md:flex justify-around">
                <Image
                  src="/banner/Marcus_Aurelius.png"
                  height="500px"
                  width="500px"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};

export default Home;
