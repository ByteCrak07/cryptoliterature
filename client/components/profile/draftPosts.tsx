import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Card from "../bids/card";
import { getAllDraftPosts } from "../../lib/posts/get";
import RingSpinner from "../spinners/ringSpinner";
import { DDMMMYYYY } from "../../lib/general/processDateTime";
import { PostDataShort } from "../../interfaces/posts";

const DraftPosts: FC<{ walletKey: string }> = ({ walletKey }) => {
  const [data, setData] = useState<Array<PostDataShort>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getAllDraftPosts(walletKey);
      setData(posts);
      setIsLoading(false);
    };

    fetchData();
  }, [walletKey]);

  return (
    <>
      {!isLoading ? (
        <>
          {data?.length !== 0 ? (
            <>
              {data?.map((post, i) => (
                <Link
                  key={`draftPost${i}`}
                  href={`/post/${post.slug}?key=${window.ethereum?.selectedAddress}`}
                >
                  <a>
                    <Card
                      genre={post.type}
                      hash={`#${String(post.id).padStart(5, "0")}`}
                      title={post.title}
                      avatar={post.author.imgUrl}
                      name={
                        post.author.fullName
                          ? post.author.fullName
                          : post.author.username
                      }
                      uploadedIn={DDMMMYYYY(
                        post.publishedOn ? post.publishedOn : post.createdAt
                      )}
                    />
                  </a>
                </Link>
              ))}
            </>
          ) : (
            <p>No posts yet</p>
          )}
        </>
      ) : (
        <RingSpinner width={50} />
      )}
    </>
  );
};

export default DraftPosts;
