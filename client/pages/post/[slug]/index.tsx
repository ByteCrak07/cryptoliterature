import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
// components
import RoundAvatar from "../../../components/general/round-avatar";
import Seo from "../../../components/general/seo";
// styles
import blogPostStyles from "../../../styles/BlogPost.module.css";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getPostWithSlug } from "../../../lib/posts/get";
import { PostData } from "../../../interfaces/posts";
import Link from "next/link";
import RingSpinner from "../../../components/spinners/ringSpinner";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  let postData: PostData | null = null;

  if (params && params.slug)
    postData = await getPostWithSlug(params.slug as string);

  if (!postData) {
    return {
      notFound: true,
    };
  }

  if (
    (postData.archived || !postData.published) &&
    query.key !== postData.author.walletKey
  )
    return {
      notFound: true,
    };

  if (postData.archived || !postData.published)
    return {
      props: {
        post: postData,
        privatePg: true,
        timestamp: new Date().toUTCString(),
      },
    };
  else
    return {
      props: {
        post: postData,
        privatePg: false,
        timestamp: new Date().toUTCString(),
      },
    };
};

interface PostPageProps {
  post: PostData;
  privatePg: boolean;
}

const PostPage: NextPage<PostPageProps> = ({ post, privatePg }) => {
  const router = useRouter();
  const [accessBlocked, setAccessBlocked] = useState(privatePg);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (privatePg && router.query.key === window.ethereum?.selectedAddress)
      setAccessBlocked(false);

    if (post.authorWalletKey === window.ethereum?.selectedAddress)
      setIsOwner(true);

    if (!privatePg && router.query) router.replace(`/post/${post.slug}`);

    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post)
    return (
      <main className="main-div">
        <Seo
          title="Loading | Cryptoliterature"
          description="Loading..."
          path={null}
        />
      </main>
    );

  return (
    <>
      {!accessBlocked ? (
        <main className="main-div">
          <Seo
            title={`${post.title} | Cryptoliterature`}
            description={post.excerpt ? post.excerpt : ""}
            path={`/post/${post.slug}`}
            blog={true}
            og_image={post.featureImage}
            published_time={post.publishedOn?.toString()}
            author={
              post.author.fullName ? post.author.fullName : post.author.username
            }
            authorImg={post.author.imgUrl}
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

                  {isOwner ? (
                    <Link
                      href={`/post/${post.slug}/edit${
                        privatePg ? `?key=${post.authorWalletKey}` : ""
                      }`}
                    >
                      <a className="fixed right-5 sm:right-20 z-10 bg-white py-2 px-3 rounded-full sm:rounded-lg font-semibold text-lg shadow-md hover:shadow-lg">
                        <FontAwesomeIcon icon={faPen} />{" "}
                        <span className="hidden sm:inline">Edit this post</span>
                      </a>
                    </Link>
                  ) : null}
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
                    <RoundAvatar
                      image={post.author.imgUrl}
                      alt={
                        post.author.fullName
                          ? post.author.fullName
                          : post.author.username
                      }
                    />
                    <span className="ml-2 font-Poppins">
                      {post.author.fullName
                        ? post.author.fullName
                        : post.author.username}
                    </span>
                  </div>

                  <div className="flex items-center">
                    {post.publishedOn
                      ? new Date(post.publishedOn)
                          .toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                          .toString()
                      : ""}{" "}
                    &nbsp;{" "}
                  </div>
                </div>
              </div>

              {post.featureImage ? (
                <div className="flex-1 flex items-center justify-center md:justify-end">
                  <Image
                    src={post.featureImage}
                    alt={post.featureImageAlt}
                    width="2000"
                    height="1210"
                  />
                </div>
              ) : null}
            </div>

            <div
              className={`${blogPostStyles.BlogPost} mt-8 flex flex-col ck-content`}
              dangerouslySetInnerHTML={{
                __html: post.content ? post.content : "Add content...",
              }}
            />
          </section>
        </main>
      ) : (
        <main className="main-div">
          {isLoading ? (
            <RingSpinner width={100} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-2xl">
                Sorry, you don&apos;t have access to this page
              </h1>
              <Link href="/">
                <a className="my-4 py-2 px-4 rounded-full bg-lit-dark text-white">
                  Go to home
                </a>
              </Link>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default PostPage;
