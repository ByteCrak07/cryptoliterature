import type { NextPage } from "next";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Autoplay } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// components
import Seo from "../components/seo";

SwiperCore.use([EffectCoverflow, Autoplay]);

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Cryptoliterature" description="Crypto literature" />
      <section className="text-lit-dark p-20">
        <Swiper
          slidesPerView={1}
          speed={2000}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          <SwiperSlide>
            <div className="flex">
              <div className="flex-1 flex justify-around align-items flex-col py-20">
                <h1 className="font-Merriweather text-5xl leading-snug">
                  An epiphany for the literary world!!
                </h1>
                <div className="w-full">
                  <button className="bg-lit-dark text-white font-semibold rounded-md px-5 py-3">
                    Start Bidding&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      className="w-2 inline"
                      icon={faChevronRight}
                    />
                  </button>
                </div>
              </div>
              <div className="flex-1">
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
