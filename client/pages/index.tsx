import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <>
      <Seo
        title="Cryptoliterature"
        description="Sell your Literature works as NFTs - Cryptoliterature an epiphany to the literary world"
        path="/"
      />

      <ComingSoon />

      {/* <section>
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
            <div className="flex items-center flex-col-reverse md:flex-row">
              <div className="flex-1 flex justify-evenly align-items flex-col md:mr-5">
                <h1 className="mt-5 font-Merriweather text-4xl md:text-5xl leading-snug md:leading-snug">
                  An epiphany for the literary world!!
                </h1>
                <div className="w-full mt-5">
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
              <div className="flex-1 flex justify-around max-w-xs md:max-w-none">
                <Image
                  src="/banner/Marcus_Aurelius.png"
                  height="550px"
                  width="450px"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="my-20">
        <div className="flex pl-4 md:justify-start my-5 justify-center">
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
              <span className="block whitespace-nowrap">{filter}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-10">
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
      </section>

      <section>
        <div className="flex items-baseline">
          <h1 className="font-Poppins font-semibold text-2xl">Latest Blogs</h1>
          <Link href="/blogs">
            <a className="ml-3 block font-semibold">
              View more <span style={{ letterSpacing: "-4px" }}>&gt;&gt;</span>
            </a>
          </Link>
        </div>

        <LatestBlogCard
          image={{
            src: "/blogs/dummy1.png",
            alt: "dummy1",
            width: "591",
            height: "311",
          }}
          title="Addressing the Dark Side of the Crypto World"
          description="The same reason crypto-assets—or what some people call crypto-currencies—are so appealing is also what makes them dangerous. These digital offerings are typically built in a decentralized way and without the typically built in a decentralized way and without thetypically built in a decentralized way."
          link="/blogs"
          author={{
            imgSrc:
              "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
            name: "John Doe",
          }}
          time={new Date().getTime()}
        />
      </section> */}
    </>
  );
};

export default Home;
