import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// types
import { UserProfile } from "../../interfaces/profile";
// components
import Seo from "../../components/general/seo";
import Card from "../../components/bids/card";
// styles
import styles from "../../styles/Profile.module.css";
import { showToast } from "../../components/general/toast";

const Profile: NextPage = () => {
  // dummy data
  const userData: UserProfile = {
    name: "Kiatanan Iamchan",
    profile_name: "@kiatanan",
    profile_id: "#00833",
    img_url: "/profile/dummyprofile.png",
    wallet_key: "0x3a2CcFb2c2Aeb093Bb508AB5F6412e714C352e68",
    following: 71,
    followers: 12,
    buymeacoffee_link: "https://www.buymeacoffee.com/linecensor",
    bio: `Born in 1982. My works reflect with a passion for cartoons, games
    and capitalism, Create character from mind and Convey in a
    personalized way. Art collected by Khoyai Art Museum, Bank of
    Thailand.`,
    social_media: {
      instagram: {
        id: "@linecensor",
        link: "https://www.instagram.com/linecensor",
      },
      twitter: {
        id: "@linecensor",
        link: "https://twitter.com/linecensor",
      },
      facebook: {
        id: "@linecensor",
        link: "https://www.facebook.com/linecensor",
      },
    },
    joined_on: "April 2021",
  };

  // states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [tabs, setTabs] = useState<Array<string>>(["Created", "Collected"]);
  const BiddingTabs = ["Ongoing", "Completed"];
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedBiddingTab, setSelectedBiddingTab] = useState<number>(0);

  // if logged in
  useEffect(() => {
    if (isLoggedIn) setTabs(["Published", "Draft", "Bidding"]);
  }, [isLoggedIn]);

  useEffect(() => {
    // applying overlay and changing bg color of header
    let header = document.getElementById("nav-header");
    header?.classList.add("bg-lit-light-gray");
    header?.classList.remove("bg-white");

    let profilePic = document.getElementById("profile-pic");
    let profileOverlay = document.getElementById("profile-overlay");
    let overlayHeight;

    const applyOverlay = () => {
      if (header && profilePic && profileOverlay) {
        overlayHeight = header.offsetHeight + 50 + profilePic.offsetHeight / 2;
        profileOverlay.style.minHeight = overlayHeight.toString() + "px";
      }
    };

    applyOverlay();
    window.addEventListener("resize", applyOverlay);

    return () => {
      header?.classList.remove("bg-lit-light-gray");
      header?.classList.add("bg-white");
      window.removeEventListener("resize", applyOverlay);
    };
  }, []);

  return (
    <>
      <Seo
        title={`${userData.name} | Cryptoliterature`}
        description={userData.bio}
        // TODO: change path
        path="/profile"
      />

      <div className="h-48 bg-lit-light-gray" id="profile-overlay">
        {isLoggedIn ? (
          <div className="h-full w-full relative">
            <Link href="/new">
              <a className="flex items-center p-3 sm:py-2 sm:px-3 rounded-full sm:rounded-lg bg-lit-light-gray border border-lit-dark border-opacity-50 hover:border-opacity-100 fixed sm:absolute bottom-5 sm:bottom-3 right-5 md:right-16 lg:right-32">
                <Image
                  src="/vectors/edit.svg"
                  alt="Edit"
                  height={18}
                  width={18}
                />
                <span className="font-Poppins text-lg font-medium hidden sm:inline">
                  &nbsp;&nbsp;Create new blog
                </span>
              </a>
            </Link>
          </div>
        ) : null}
      </div>

      <main className="main-div" style={{ paddingTop: 0 }}>
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-x-10">
          {/* left bio section */}
          <section className={`flex-1 mb-20 ${styles.bio}`}>
            <div className="flex mb-5">
              <div className="flex-3 relative">
                <div className="absolute -top-full rounded-3xl border-7 border-white bg-white overflow-hidden">
                  <Image
                    id="profile-pic"
                    src={userData.img_url}
                    alt={userData.name}
                    height="725"
                    width="725"
                    className="rounded-3xl"
                  />
                </div>
                <div style={{ paddingTop: "50%" }}></div>
              </div>
              <div className="flex-2 hidden sm:block"></div>
            </div>

            {/* user details */}
            <div className="mr-0 sm:mr-10">
              <h2 className="font-Merriweather font-bold text-2xl">
                {userData.name}
              </h2>
              <h2 className="font-OpenSans font-semibold text-2xl text-lit-gold">
                {userData.profile_name}
              </h2>

              <div className="flex flex-col items-center sm:block">
                <div className="mt-8">
                  <div className="bg-lit-light-gray rounded-3xl py-2 px-4 inline-block font-OpenSans">
                    <div className="bg-lit-dark py-2 px-4 -my-3 -mx-4 rounded-3xl inline-block text-white font-bold">
                      {userData.profile_id}
                    </div>
                    <button
                      className={`ml-7 ${styles.copyBtn}`}
                      onClick={() => {
                        navigator.clipboard.writeText(userData.wallet_key);
                        showToast("Copied to clipboard");
                      }}
                    >
                      <span id="wallet-key">
                        {`${userData.wallet_key.substring(
                          0,
                          4
                        )}.......${userData.wallet_key.substring(36, 42)}`}
                      </span>
                      <span className="ml-2 inline-block">
                        <svg
                          width="15"
                          height="18"
                          viewBox="0 0 15 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.43155 18H2.78422C1.24896 18 0 16.7384 0 15.1875V5.66016C0 4.1093 1.24896 2.84766 2.78422 2.84766H9.43155C10.9668 2.84766 12.2158 4.1093 12.2158 5.66016V15.1875C12.2158 16.7384 10.9668 18 9.43155 18ZM2.78422 4.25391C2.01666 4.25391 1.39211 4.8848 1.39211 5.66016V15.1875C1.39211 15.9629 2.01666 16.5938 2.78422 16.5938H9.43155C10.1991 16.5938 10.8237 15.9629 10.8237 15.1875V5.66016C10.8237 4.8848 10.1991 4.25391 9.43155 4.25391H2.78422ZM15 13.4297V2.8125C15 1.26164 13.751 0 12.2158 0H4.48956C4.1051 0 3.7935 0.314758 3.7935 0.703125C3.7935 1.09149 4.1051 1.40625 4.48956 1.40625H12.2158C12.9833 1.40625 13.6079 2.03714 13.6079 2.8125V13.4297C13.6079 13.8181 13.9195 14.1328 14.3039 14.1328C14.6884 14.1328 15 13.8181 15 13.4297Z"
                            fill="#989898"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex ml-2">
                  <div>
                    <span className="font-Merriweather text-2xl font-bold">
                      {userData.following}
                    </span>
                    <br />
                    <div className="font-OpenSans">Following</div>
                  </div>
                  <div className="border-l mx-4 my-1 border-lit-dark border-opacity-10 h-auto"></div>
                  <div>
                    <span className="font-Merriweather text-2xl font-bold">
                      {userData.followers}
                    </span>
                    <br />
                    <div className="font-OpenSans">Followers</div>
                  </div>
                </div>
                <div className="mt-8 font-Poppins flex flex-col text-lg w-full sm:w-auto">
                  <button className="py-2 px-3 border border-lit-dark border-opacity-30 hover:border-opacity-100 rounded-3xl mr-0 sm:mr-6 w-full sm:w-auto">
                    Follow
                  </button>
                  {userData.buymeacoffee_link ? (
                    <a
                      href={userData.buymeacoffee_link}
                      className="text-center py-2 px-3 border border-lit-dark border-opacity-30 hover:border-opacity-100 rounded-3xl mt-3 mr-0 sm:mr-6 w-full sm:w-auto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        <Image
                          src="/vectors/coffee.svg"
                          alt="Buy me a Coffee"
                          height={18}
                          width={18}
                        />
                      </span>
                      &nbsp; Tip some crypto
                    </a>
                  ) : null}
                </div>
              </div>

              {/* user bio */}
              <div className="mt-8 font-OpenSans font-bold border-b border-lit-dark border-opacity-10">
                Bio
              </div>
              <div className="mt-5 font-OpenSans text-sm">{userData.bio}</div>

              {/* social media */}
              <div className={`mt-8 font-OpenSans ${styles.socialMedia}`}>
                {userData.social_media.instagram ? (
                  <a
                    className="mt-5 flex items-center"
                    href={userData.social_media.instagram.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/vectors/insta.svg"
                      alt="Instagram"
                      height={22}
                      width={22}
                    />
                    &nbsp; <span>{userData.social_media.instagram.id}</span>{" "}
                    &nbsp;
                    <Image
                      src="/vectors/check.svg"
                      alt="verified"
                      height={16}
                      width={16}
                    />
                  </a>
                ) : null}
                {userData.social_media.twitter ? (
                  <a
                    className="mt-5 flex items-center"
                    href={userData.social_media.twitter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/vectors/twitter.svg"
                      alt="Twitter"
                      height={22}
                      width={22}
                    />
                    &nbsp; <span>{userData.social_media.twitter.id}</span>{" "}
                    &nbsp;
                    <Image
                      src="/vectors/check.svg"
                      alt="verified"
                      height={16}
                      width={16}
                    />
                  </a>
                ) : null}
                {userData.social_media.facebook ? (
                  <a
                    className="mt-5 flex items-center"
                    href={userData.social_media.facebook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/vectors/fb.svg"
                      alt="Facebook"
                      height={22}
                      width={22}
                    />
                    &nbsp; <span>{userData.social_media.facebook.id}</span>{" "}
                    &nbsp;
                    <Image
                      src="/vectors/check.svg"
                      alt="verified"
                      height={16}
                      width={16}
                    />
                  </a>
                ) : null}
              </div>

              {/* more bio */}
              <div className="mt-8 border-t border-lit-dark border-opacity-10">
                <div className="mt-3 px-2 flex justify-between text-lit-gray font-OpenSans font-bold text-sm">
                  <div>Joined</div>
                  <div>{userData.joined_on}</div>
                </div>
                <div className="mt-12 px-2">
                  <svg
                    width="30"
                    height="6"
                    viewBox="0 0 30 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#0B1D25" />
                    <circle cx="15" cy="3" r="3" fill="#0B1D25" />
                    <circle cx="27" cy="3" r="3" fill="#0B1D25" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* bids section */}
          <section className="flex-3 mt-10 mb-20">
            <div className="flex pl-2 my-5">
              {tabs.map((filter, i) => (
                <button
                  key={`filter-${i}`}
                  onClick={() => {
                    setSelectedTab(i);
                  }}
                  className={`mx-2 px-4 p-1 rounded-full transition ease-linear font-OpenSans font-semibold ${
                    selectedTab == i ? "bg-lit-dark text-white" : ""
                  }`}
                >
                  <span className="block whitespace-nowrap">{filter}</span>
                </button>
              ))}
            </div>

            {tabs.map((filter, i) => (
              <div
                className={`flex flex-wrap justify-center gap-x-5 gap-y-10 ${
                  styles.tabcontent
                } ${selectedTab === i ? styles.active : ""}`}
                id={`profile-tab${i}`}
                key={`profile-tab${i}`}
              >
                {filter !== "Bidding" ? (
                  <DummyCards />
                ) : (
                  <>
                    <div className="border-b mx-8 border-lit-dark border-opacity-10 pb-2 w-full">
                      {BiddingTabs.map((tabName, j) => (
                        <button
                          key={`bidding${j}`}
                          onClick={() => {
                            setSelectedBiddingTab(j);
                          }}
                          className={`font-OpenSans font-semibold border-lit-dark mr-10 ${
                            styles.subTab
                          } ${
                            selectedBiddingTab == j ? styles.subTabActive : ""
                          }`}
                        >
                          <span className="block whitespace-nowrap">
                            {tabName}
                          </span>
                        </button>
                      ))}
                    </div>

                    {BiddingTabs.map((tabName, j) => (
                      <div
                        className={`flex flex-wrap justify-center gap-x-5 gap-y-10 ${
                          styles.tabcontent
                        } ${selectedBiddingTab === j ? styles.active : ""}`}
                        id={`profile-bidding-tab${j}`}
                        key={`profile-bidding-tab${j}`}
                      >
                        <DummyCards />
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;

// TODO: remove dummycards
const DummyCards = () => {
  return (
    <>
      <Card
        genre="Poem"
        hash="#473658"
        title="The best way to predict the future"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        currentBid="5.00 ETH"
        endingIn="05h 12m 45s"
      />
      <Card
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
        genre="Poem"
        hash="#473658"
        title="The best way to predict the furture"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        uploadedIn="5 June 2020"
      />
      <Card
        genre="Short Story"
        hash="#473658"
        title="The best way to predict the future"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        ownedBy="James Hood"
        ownedByAvatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
      />
      <Card
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
        genre="Short Story"
        hash="#473658"
        title="The best way to predict the future"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        uploadedIn="5 June 2020"
      />
      <Card
        genre="Poem"
        hash="#473658"
        title="The best way to predict the future"
        avatar="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        name="Lara Clarke"
        currentBid="5.00 ETH"
        endingIn="05h 12m 45s"
      />
    </>
  );
};
