import { FC } from "react";
import RoundAvatar from "../general/round-avatar";

interface CardProps {
  selected?: string;
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
      className={`w-80 rounded-lg border-2 border-lit-dark border-opacity-10 font-Poppins overflow-hidden ${
        selected === genre || selected === "All" || selected === undefined
          ? ""
          : "hidden"
      }`}
    >
      <div className="px-2">
        <div className="genre-hash flex p-2 justify-between">
          <div className="p-1 px-2 my-2 flex items-center bg-gray-200 rounded-full text-sm font-normal">
            {genre}
          </div>
          <div className="p-1 m-2 font-medium">{hash}</div>
        </div>
        <div className="title-avatar p-2 my-auto h-36 flex flex-col justify-center">
          <div className="font-bold text-2xl font-Merriweather">{title}</div>
          <div className="flex justify-start my-5">
            <RoundAvatar image={avatar} alt={name} />
            <span className="ml-2 font-medium">{name}</span>
          </div>
        </div>
      </div>
      <hr className="w-11/12 mx-auto" />
      <div
        className={`p-5 px-4 ${
          currentBid ? "bg-lit-dark text-white" : ""
        } flex justify-between items-center text-6x1`}
      >
        {(() => {
          if (currentBid) {
            return (
              <>
                <div className="pr-2">
                  <h5 className="font-light">Current Bid</h5>
                  <p className="font-semibold">{currentBid}</p>
                </div>
                <div className="pr-4">
                  <h5 className="font-light">Ending In</h5>
                  <p className="font-medium">{endingIn}</p>
                </div>
              </>
            );
          } else if (soldFor) {
            return (
              <>
                <div className="pr-4">
                  <h5 className="font-light">Sold For</h5>
                  <p className="font-semibold">{soldFor}</p>
                </div>
                <div className="pr-4">
                  <h5 className="font-light">Owned By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={ownedByAvatar} alt={ownedBy} />
                    <span className="ml-2 font-medium">
                      {ownedBy?.substring(0, 9) + ".."}
                    </span>
                  </span>
                </div>
              </>
            );
          } else if (uploadedIn) {
            return (
              <div>
                <h5 className="font-light">Uploaded In</h5>
                <p className="font-medium">{uploadedIn}</p>
              </div>
            );
          } else if (ownedBy) {
            return (
              <div>
                <h5 className="font-light">Owned By</h5>
                <span className="flex align-middle">
                  <RoundAvatar image={ownedByAvatar} alt={ownedBy} />
                  <span className="ml-2 font-medium">
                    {ownedBy.substring(0, 9) + ".."}
                  </span>
                </span>
              </div>
            );
          } else if (reservePrice) {
            return (
              <>
                <div className="">
                  <h5 className="font-light">Reserve Price</h5>
                  <p className="font-medium">{reservePrice}</p>
                </div>
                <div className="">
                  <h5 className="font-light">Listed By</h5>
                  <span className="flex align-middle">
                    <RoundAvatar image={listedByAvatar} alt={listedBy} />
                    <span className="ml-2 font-medium">
                      {listedBy?.substring(0, 9) + ".."}
                    </span>
                  </span>
                </div>
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Card;
