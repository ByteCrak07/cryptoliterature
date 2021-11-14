import { FC } from "react";
import Image from "next/image";

interface RoundAvatarProps {
  image?: string;
  alt?: string;
}
const RoundAvatar: FC<RoundAvatarProps> = ({ image, alt }) => {
  return (
    <div className="flex rounded-full items-center">
      <Image
        src={`${image}`}
        className="rounded-full w-6 h-6 object-cover"
        alt={alt ? alt : "image"}
        width={25}
        height={25}
      />
    </div>
  );
};

export default RoundAvatar;
