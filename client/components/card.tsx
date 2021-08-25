import React from "react";
import RoundAvatar from "./round-avatar";

interface Props {
  genre: string;
  hash: string;
  title: string;
  avatar: string;
  name: string;
  currentBid?: string;
  endingIn?: string;
  soldFor?: string;
  ownedBy?: string;
  ownedByAvatar?: string;
  uploadedIn?: string;
  reservePrice?: string;
  listedBy?: string;
  listedByAvatar?: string;
}

const Card: React.FC<Props> = ({
  genre,
  hash,
  title,
  avatar,
  name,
  currentBid,
  endingIn,
  soldFor,
  ownedBy,
  ownedByAvatar,
  uploadedIn,
  reservePrice,
  listedBy,
  listedByAvatar,
}) => {
  return (
    <div
      className={`container inline-block m-2 overflow-hidden w-80 h-72 rounded-lg border-gray-300 border  ${
        uploadedIn ? "bg-gray-100" : ""
      }`}
    >
      <div className="genre-hash flex p-2 justify-between">
        <section className="inline-block leading-6 p-0.5 m-2 px-2 bg-gray-200 rounded-full text-sm text-center align-middle">
          {genre}
        </section>
        <section className="p-1 m-2 font-semibold">{hash}</section>
      </div>
      <div className="title-avatar p-2 my-3">
        <section className="font-bold text-xl font-serif">{title}</section>
        <section className="flex justify-start my-5">
          <RoundAvatar image={avatar} />
          <span className="ml-2 font-semibold">{name}</span>
        </section>
      </div>
      {currentBid ? "" : <hr className="w-11/12 mx-auto" />}
      <div
        className={`p-3 px-4 card-footer ${
          currentBid ? "bg-litBlue text-white" : ""
        } w h-24 flex justify-between align-middle text-lg`}
      >
        {(() => {
          if (currentBid) {
            return (
              <>
                <section className="pr-2">
                  <h5>Current Bid</h5>
                  <p className="font-semibold">{currentBid}</p>
                </section>
                <section className="pr-4">
                  <h5>Ending In</h5>
                  <p className="font-semibold">{endingIn}</p>
                </section>
              </>
            );
          } else if (soldFor) {
            return (
              <>
                <section className="pr-4">
                  <h5>Sold For</h5>
                  <p className="font-semibold">{soldFor}</p>
                </section>
                <section className="pr-4">
                  <h5>Owned By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={ownedByAvatar} />
                    <span className="ml-2 font-semibold">{ownedBy}</span>
                  </span>
                </section>
              </>
            );
          } else if (uploadedIn) {
            return (
              <section>
                <h5>Uploaded In</h5>
                <p className="font-semibold">{uploadedIn}</p>
              </section>
            );
          } else if (ownedBy) {
            return (
              <section>
                <h5>Owned By</h5>
                <span className="flex align-middle">
                  <RoundAvatar image={ownedByAvatar} />
                  <span className="ml-2 font-semibold">{ownedBy}</span>
                </span>
              </section>
            );
          } else if (reservePrice) {
            return (
              <>
                <section className="">
                  <h5>Reserve Price</h5>
                  <p className="font-semibold">{reservePrice}</p>
                </section>
                <section className="">
                  <h5>Listed By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={listedByAvatar} />
                    <span className="ml-2 font-semibold">{listedBy}</span>
                  </span>
                </section>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Card;
