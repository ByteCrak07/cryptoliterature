import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
// components
import RoundAvatar from "../../components/general/round-avatar";
import Seo from "../../components/general/seo";
import ComingSoon from "../../components/general/coming-soon";
// styles
import blogPostStyles from "../../styles/BlogPost.module.css";
// ghost api
import { GhostPost } from "../../interfaces/posts";
import { getSinglePost, getPosts } from "../../lib/ghost/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  // const posts = await getPosts();

  // const paths = posts.map((post: { slug: string }) => ({
  //   params: { slug: post.slug },
  // }));

  // return { paths, fallback: true };

  return { paths: [], fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const post = await getSinglePost(context.params?.slug);

  // if (!post) {
  //   return {
  //     notFound: true,
  //     revalidate: 600,
  //   };
  // }

  // return {
  //   props: { post },
  //   revalidate: 600,
  // };

  return {
    notFound: true,
  };
};

interface PostPageProps {
  post: GhostPost;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    // styling yt iframes
    document.querySelectorAll(".kg-embed-card").forEach((ele) => {
      if (ele.children[0].tagName === "IFRAME")
        ele.classList.add("kg-embed-card-yt");
    });
  }, [router]);

  if (!post)
    return (
      <main className="main-div">
        <Seo
          title="Loading | Cryptoliterature"
          description="Loading..."
          path={null}
        />

        <ComingSoon />
      </main>
    );

  return (
    <main className="main-div">
      <Seo
        title={
          post.meta_title
            ? `${post.meta_title} | Cryptoliterature`
            : `${post.title} | Cryptoliterature`
        }
        description={
          post.meta_description
            ? post.meta_description
            : post.custom_excerpt
            ? post.custom_excerpt
            : post.excerpt
        }
        path={`/blogs/${post.slug}`}
        blog={true}
        og_title={post.og_title}
        og_description={post.og_description}
        og_image={post.og_image}
        published_time={post.published_at}
        twitter_title={post.twitter_title}
        twitter_description={post.twitter_description}
        twitter_image={post.twitter_image}
        author={post.primary_author?.name}
        authorImg={post.primary_author?.profile_image}
      />

      <section className="lg:px-5 xl:px-32 mb-20">
        <div className="flex flex-col-reverse gap-x-12 md:flex-row w-full mt-5">
          <div className="flex-1 flex flex-col mt-5 md:mt-0 font-Poppins">
            <div>
              <button
                onClick={() => {
                  router.back();
                }}
                className="font-semibold"
              >
                &lt;Back
              </button>
            </div>

            <h1
              className="font-bold text-4xl lg:text-5xl mt-2 lg:leading-tight line-clamp-3"
              title={post.title}
            >
              {post.title}
            </h1>

            <div className="flex-1"></div>

            <div className="my-5 flex justify-between">
              <div className="flex items-center">
                {post.primary_author ? (
                  <>
                    <RoundAvatar
                      image={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                    />
                    <span className="ml-2 font-Poppins">
                      {post.primary_author.name}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex items-center">
                {post.published_at
                  ? new Date(post.published_at)
                      .toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      .toString()
                  : ""}{" "}
                &nbsp;{" "}
                <FontAwesomeIcon
                  className="w-2 inline opacity-75"
                  icon={faDotCircle}
                />{" "}
                &nbsp; {post.reading_time} min read
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center md:justify-end">
            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.feature_image_alt}
                width="2000"
                height="1210"
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          className={`${blogPostStyles.BlogPost} mt-8 flex flex-col`}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </main>
  );
};

export default PostPage;
