import { FC } from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import RoundAvatar from "../general/round-avatar";

interface CardProps {
  image?: ImageProps;
  title?: string;
  description?: string;
  link: string;
  author?: {
    imgSrc?: string;
    name?: string;
  };
  time?: number | string;
}

const LatestBlogCard: FC<CardProps> = ({
  image,
  title,
  description,
  link,
  author,
  time,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-x-8 w-full mt-5">
      <div className="flex-1 flex items-center justify-center md:justify-end">
        <Link href={link}>
          <a>
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ) : (
              <></>
            )}
          </a>
        </Link>
      </div>
      <div className="flex-1 flex flex-col mt-5 md:mt-0 font-Poppins">
        <Link href={link}>
          <a>
            <h2 className="font-bold text-2xl">{title}</h2>
          </a>
        </Link>
        <div className="mt-1 mb-5 flex-1">
          <p className="font-light">{description}</p>
          <Link href={link}>
            <a className="inline-flex items-baseline font-medium py-1 px-2 -ml-2 hover:bg-gray-100 rounded-xl">
              Read more{" "}
              <span
                className="block ml-1 text-sm font-thin"
                style={{ letterSpacing: "-4px" }}
              >
                &gt;&gt;
              </span>
            </a>
          </Link>
        </div>
        <div className="mb-5 flex justify-between">
          <div className="flex items-center">
            {author ? (
              <>
                <RoundAvatar image={author.imgSrc} />
                <span className="ml-2 font-Poppins">{author.name}</span>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="pr-2">
            {time
              ? new Date(time)
                  .toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                  .toString()
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogCard;
