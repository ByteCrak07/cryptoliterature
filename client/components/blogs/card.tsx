import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import RoundAvatar from "../general/round-avatar";

interface CardProps {
  image: {
    src: string;
    alt: string;
    width?: string;
    height?: string;
  };
  title: string;
  description: string;
  link: string;
  author: {
    imgSrc: string;
    name: string;
  };
}

const BlogCard: FC<CardProps> = ({
  image,
  title,
  description,
  link,
  author,
}) => {
  return (
    <div className="w-64">
      <div className="flex flex-col">
        <Link href={link}>
          <a>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </a>
        </Link>
        <div className="flex items-center my-3">
          <RoundAvatar image={author.imgSrc} />
          <span className="ml-2 font-Poppins">{author.name}</span>
        </div>
        <h3 className="font-bold text-xl line-clamp-2">{title}</h3>
        <p className="line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
