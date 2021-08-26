import type { NextPage } from "next";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// components
import Card from "../components/card";
import Seo from "../components/seo";
// styles
import styles from "../styles/Home.module.css";

SwiperCore.use([Autoplay]);

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
      <Seo title="Crypto literature" description="Crypto literature" />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        currentBid="50 ETH"
        endingIn="05h 12m 45s"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        soldFor="50 ETH"
        ownedBy="James Hood"
        ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        uploadedIn="5 June 2020"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        ownedBy="James Hood"
        ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="It's a nice good evening"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        reservePrice="50 ETH"
        listedBy="James Maxwell"
        listedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <div>Crypto Literature</div>
    </>
  );
};

export default Home;
