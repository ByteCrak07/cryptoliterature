import React from "react";

interface Props {
  image?: string;
}
const RoundAvatar: React.FC<Props> = ({ image }) => {
  return (
    <div className={`rounded-full inline-block`}>
      <img src={`${image}`} className="rounded-full w-6 h-6 object-cover" />
    </div>
  );
};

export default RoundAvatar;
