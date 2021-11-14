import { FC } from "react";
import RoundAvatar from "../general/round-avatar";

interface CardProps {
  selected: string;
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

const Card: FC<CardProps> = ({
  selected,
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
      className={`container inline-block w-80 h-76 rounded-lg border-gray-300 border font-Poppins ${
        uploadedIn ? "bg-gray-100" : ""
      } ${selected == genre || selected == "All" ? "" : "hidden"}`}
    >
      <div className="px-2">
        <div className="genre-hash flex p-2 justify-between">
          <section className="p-1 px-2 my-2 bg-gray-200 rounded-full text-sm font-normal">
            {genre}
          </section>
          <section className="p-1 m-2 font-medium">{hash}</section>
        </div>
        <div className="title-avatar p-2 my-auto h-36 flex flex-col justify-center">
          <section className="font-bold text-2xl font-Merriweather">
            {title}
          </section>
          <section className="flex justify-start my-5">
            <RoundAvatar image={avatar} />
            <span className="ml-2 font-medium">{name}</span>
          </section>
        </div>
      </div>
      {currentBid ? "" : <hr className="w-11/12 mx-auto" />}
      <div
        className={`p-5 px-4 rounded-b-lg ${
          currentBid ? "bg-lit-dark text-white" : ""
        } w flex justify-between items-center text-6x1`}
      >
        {(() => {
          if (currentBid) {
            return (
              <>
                <section className="pr-2">
                  <h5 className="font-light">Current Bid</h5>
                  <p className="font-semibold">{currentBid}</p>
                </section>
                <section className="pr-4">
                  <h5 className="font-light">Ending In</h5>
                  <p className="font-medium">{endingIn}</p>
                </section>
              </>
            );
          } else if (soldFor) {
            return (
              <>
                <section className="pr-4">
                  <h5 className="font-light">Sold For</h5>
                  <p className="font-semibold">{soldFor}</p>
                </section>
                <section className="pr-4">
                  <h5 className="font-light">Owned By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={ownedByAvatar} />
                    <span className="ml-2 font-medium">
                      {ownedBy?.substring(0, 9) + ".."}
                    </span>
                  </span>
                </section>
              </>
            );
          } else if (uploadedIn) {
            return (
              <section>
                <h5 className="font-light">Uploaded In</h5>
                <p className="font-medium">{uploadedIn}</p>
              </section>
            );
          } else if (ownedBy) {
            return (
              <section>
                <h5 className="font-light">Owned By</h5>
                <span className="flex align-middle">
                  <RoundAvatar image={ownedByAvatar} />
                  <span className="ml-2 font-medium">
                    {ownedBy.substring(0, 9) + ".."}
                  </span>
                </span>
              </section>
            );
          } else if (reservePrice) {
            return (
              <>
                <section className="">
                  <h5 className="font-light">Reserve Price</h5>
                  <p className="font-medium">{reservePrice}</p>
                </section>
                <section className="">
                  <h5 className="font-light">Listed By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={listedByAvatar} />
                    <span className="ml-2 font-medium">
                      {listedBy?.substring(0, 9) + ".."}
                    </span>
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
