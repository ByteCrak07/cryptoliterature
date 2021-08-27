import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
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
  const [selected, setSelected] = useState<number>(1);

  const filters = ["All", "Short Story", "Poem", "Quote"];

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
      <div className="container mx-auto xl:px-24">
        <div className="flex pl-4 md:justify-start my-5 justify-center text-lit-dark">
          {filters.map((filter, i) => (
            <button
              key={`filter-${i}`}
              onClick={() => {
                setSelected(i);
              }}
              className={`mx-2 px-4 p-1 rounded-full transition ease-linear ${
                selected == i ? "bg-lit-dark text-white" : ""
              }`}
            >
              <span>{filter}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-self-center gap-3 gap-y-5">
          <Card
            selected={filters[selected]}
            genre="Poem"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            currentBid="5.00 ETH"
            endingIn="05h 12m 45s"
          />
          <Card
            selected={filters[selected]}
            genre="Quote"
            hash="#473658"
            title="The best way to predict the furture"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            soldFor="5.00 ETH"
            ownedBy="James Hood"
            ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
          />
          <Card
            selected={filters[selected]}
            genre="Poem"
            hash="#473658"
            title="The best way to predict the furture"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            uploadedIn="5 June 2020"
          />
          <Card
            selected={filters[selected]}
            genre="Short Story"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            ownedBy="James Hood"
            ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
          />
          <Card
            selected={filters[selected]}
            genre="Quote"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            reservePrice="5.00 ETH"
            listedBy="James Maxwell"
            listedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
          />
          <Card
            selected={filters[selected]}
            genre="Short Story"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            soldFor="5.00 ETH"
            ownedBy="James Hood"
            ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
          />
          <Card
            selected={filters[selected]}
            genre="Short Story"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            uploadedIn="5 June 2020"
          />
          <Card
            selected={filters[selected]}
            genre="Poem"
            hash="#473658"
            title="The best way to predict the future"
            avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            name="Lara Clarke"
            currentBid="5.00 ETH"
            endingIn="05h 12m 45s"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
