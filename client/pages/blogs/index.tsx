import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Seo from "../../components/general/seo";
import RoundAvatar from "../../components/general/round-avatar";
import LatestBlogCard from "../../components/blogs/latest-blog-card";
import BlogCard from "../../components/blogs/card";

const dummyTitle = "Addressing the Dark Side of the Crypto World";
const dummyDescription =
  "The same reason crypto-assets—or what some people call crypto-currencies—are so appealing is also what makes them dangerous. These digital offerings are typically built in a decentralized way and without the typically built in a decentralized way and without thetypically built in a decentralized way.";

const Blogs: NextPage = () => {
  return (
    <>
      <Seo title="Blogs | Cryptoliterature" description="Our latest blogs" />

      <section className="text-lit-dark">
        <div className="flex items-baseline">
          <h1 className="font-Poppins font-semibold text-2xl">Latest Blogs</h1>
        </div>

        <LatestBlogCard
          image={{
            src: "/blogs/dummy1.png",
            alt: "dummy1",
            width: "591",
            height: "311",
          }}
          title={dummyTitle}
          description={dummyDescription}
          link="/blogs"
          author={{
            imgSrc:
              "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
            name: "John Doe",
          }}
          time={new Date().getTime()}
        />

        <section className="my-20">
          <div className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
            <BlogCard
              image={{
                src: "/blogs/dummy2.png",
                alt: "dummy2",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy3.png",
                alt: "dummy3",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy2.png",
                alt: "dummy2",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy3.png",
                alt: "dummy3",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy2.png",
                alt: "dummy2",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy3.png",
                alt: "dummy3",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy2.png",
                alt: "dummy2",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
            <BlogCard
              image={{
                src: "/blogs/dummy3.png",
                alt: "dummy3",
                width: "244",
                height: "228",
              }}
              title={dummyTitle}
              description={dummyDescription}
              link="/blogs"
              author={{
                imgSrc:
                  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                name: "John Doe",
              }}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Blogs;
