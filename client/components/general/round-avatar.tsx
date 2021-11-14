import { FC } from "react";

interface RoundAvatarProps {
  image?: string;
}
const RoundAvatar: FC<RoundAvatarProps> = ({ image }) => {
  return (
    <div className={`rounded-full inline-block`}>
      <img src={`${image}`} className="rounded-full w-6 h-6 object-cover" />
    </div>
  );
};

export default RoundAvatar;
