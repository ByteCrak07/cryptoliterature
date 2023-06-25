import type { GetStaticProps, NextPage } from "next";
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
import { getPosts } from "../lib/ghost/posts";
import { GhostPost } from "../interfaces/posts";
import IframeModal from "../components/layout/iframeModal";

// export const getStaticProps: GetStaticProps = async () => {
//   const posts = await getPosts();

//   if (!posts) {
//     return {
//       notFound: true,
//       revalidate: 600,
//     };
//   }

//   return {
//     props: { latestPost: posts[0] },
//     revalidate: 600,
//   };
// };

interface HomePageProps {
  latestPost: GhostPost;
}

SwiperCore.use([Autoplay]);

const Home: NextPage<HomePageProps> = ({ latestPost }) => {
  const [email, setEmail] = useState("");
  const [isIframeModalOpen, setIsIframeModalOpen] = useState(false);

  const steps = [
    {
      icon: "wallet",
      title: "Sign up",
      content:
        "Click the “Sign Up” button and connect your wallet of your choice to cryptoliterature.",
    },
    {
      icon: "profile",
      title: "Set up your profile",
      content:
        "Add Profile details, Social Links and fill in other necessary details.",
    },
    {
      icon: "nft",
      title: "Create your NFT’s.",
      content:
        "Upload or write your literature work, fill in the details and publish it for bidding.",
    },
    {
      icon: "community",
      title: "Join our community",
      content:
        "Join our discord server and follow us on our socials to keep yourself connected with the latest updates.",
    },
  ];

  const resources = [
    {
      title: "This is how you easily setup your metamask wallet",
      link: "https://www.coindesk.com/learn/how-to-set-up-a-metamask-wallet",
    },
    {
      title: "This is how you add funds to your wallets",
      link: "https://www.alphr.com/add-funds-metamask",
    },
    {
      title: "Things to consider before buying an NFT",
      link: "https://coinmarketcap.com/alexandria/article/9-things-to-consider-before-buying-your-first-nft",
    },
  ];

  const communities = [
    { name: "insta", href: "https://www.instagram.com/cryptoliteratures" },
    { name: "twitter", href: "https://twitter.com/CryptoLiteratur" },
    {
      name: "fb",
      href: "https://www.facebook.com/CryptoLiterature-105070572070545",
    },
    { name: "discord", href: "https://discord.gg/MVRtmu4bBQ" },
  ];

  return (
    <main>
      <Seo
        title="Cryptoliterature"
        description="Sell your Literature works as NFTs - Cryptoliterature an epiphany to the literary world"
        path="/"
      />

      <div className="main-div relative">
        {isIframeModalOpen ? (
          <IframeModal close={() => setIsIframeModalOpen(false)} />
        ) : null}

        <section>
          {/* <Swiper
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
            <SwiperSlide> */}
          <div className="flex items-center flex-col-reverse md:flex-row">
            <div className="flex-1 flex justify-evenly align-items flex-col md:mr-5">
              <h1 className="mt-5 font-Merriweather text-4xl md:text-5xl leading-snug md:leading-snug">
                The only marketplace to sell and buy Literature works as NFT’s
              </h1>
              <div className="w-full mt-5">
                <button
                  className={`${styles.bannerBtn} font-Poppins bg-lit-dark text-white font-semibold rounded-md px-5 py-3`}
                  onClick={() => setIsIframeModalOpen(true)}
                >
                  Join Beta&nbsp;&nbsp;&nbsp;&nbsp;
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
                alt="Marcus Aurelius"
                height="550px"
                width="450px"
              />
            </div>
          </div>
          {/* </SwiperSlide>
          </Swiper> */}
        </section>

        <section className="py-20">
          <h2 className="font-Merriweather text-2xl">
            Create and sell your NFTs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
            {steps.map((step, i) => (
              <div key={`step${i}`}>
                <div>
                  <Image
                    src={`/vectors/${step.icon}.svg`}
                    alt={step.icon}
                    height={50}
                    width={50}
                  />
                </div>
                <h3 className="my-4 font-Merriweather font-bold text-xl">
                  {step.title}
                </h3>
                <div className="font-Poppins text-sm">{step.content}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 flex flex-col sm:flex-row gap-x-10 gap-y-10">
          <div className="flex-1 font-Merriweather text-3xl">
            <b>Resources</b> for getting started
          </div>

          <div className="flex-3 flex gap-10 flex-col sm:flex-row items-center flex-wrap justify-center">
            {resources.map((resource, i) => (
              <a
                href={resource.link}
                target="_blank"
                className="block flex-1 min-w-[135px] max-w-[280px]"
                key={`resource${i}`}
                rel="noreferrer"
              >
                <div>
                  <Image
                    src={`/vectors/resource${i + 1}.svg`}
                    alt={`resource${i + 1}`}
                    height={250}
                    width={250}
                  />
                </div>
                <span className="font-Poppins text-sm font-medium">
                  {resource.title}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* <section className="py-32">
          <div className="flex items-baseline">
            <h1 className="font-Poppins font-semibold text-2xl">Latest Blog</h1>
            <Link href="/blogs">
              <a className="font-OpenSans ml-3 block font-semibold">
                View all <span>&gt;&gt;</span>
              </a>
            </Link>
          </div>
          <div className="lg:px-5 xl:px-32">
            <LatestBlogCard
              image={
                latestPost.feature_image
                  ? {
                      src: latestPost.feature_image,
                      alt: latestPost.feature_image_alt,
                      width: "2000",
                      height: "1210",
                    }
                  : undefined
              }
              title={latestPost.title}
              description={
                latestPost.custom_excerpt
                  ? latestPost.custom_excerpt
                  : latestPost.excerpt
              }
              link={`/blogs/${latestPost.slug}`}
              author={
                latestPost.primary_author
                  ? {
                      imgSrc: latestPost.primary_author.profile_image,
                      name: latestPost.primary_author.name,
                    }
                  : undefined
              }
              time={latestPost.published_at}
            />
          </div>
        </section> */}
      </div>

      <section className="main-div py-20 text-center w-full bg-[#F8F8F8]">
        <h3 className="font-Merriweather text-3xl">Stay in the loop</h3>
        <p className="py-8 font-Poppins text-lg font-medium max-w-2xl mx-auto">
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating
          Cryptoliterature.
        </p>
        <form className="mx-0 sm:mx-20 md:mx-40">
          <input
            id="slug"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-full max-w-2xl outline-none block font-Poppins font-medium mx-auto mb-8 py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
          />
          <button
            type="submit"
            className="py-3 px-14 bg-lit-dark text-white rounded-md font-Poppins font-semibold"
          >
            Sign up
          </button>
        </form>
      </section>

      <section className="main-div py-20 text-center w-full">
        <h3 className="font-Merriweather text-3xl">Join the community</h3>
        <div className="py-8 flex justify-center gap-x-7">
          {communities.map((community, i) => (
            <a
              key={`community${i}`}
              href={community.href}
              target="_blank"
              className="flex p-4 rounded-xl shadow-2xl"
              rel="noreferrer"
            >
              <Image
                src={`/vectors/${community.name}.svg`}
                alt={community.name}
                height={40}
                width={40}
              />
            </a>
          ))}
        </div>
      </section>
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
