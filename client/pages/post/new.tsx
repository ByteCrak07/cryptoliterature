import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SelectInput from "../../components/editPosts/selectInput";
import TagInput from "../../components/editPosts/tagInput";
import Seo from "../../components/general/seo";
import { showToast } from "../../components/general/toast";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import { createNewPost } from "../../lib/posts/post";

const ErrorPg: NextPage = () => {
  const postTypes = ["Blog", "Novel", "Short story", "Poem", "Quote"];

  // contexts
  const { user } = useContext(WalletAuthContext) as WalletAuthContextType;

  // states
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [genre, setGenre] = useState<Array<string>>([]);

  const router = useRouter();

  useEffect(() => {
    if (!window.ethereum?.selectedAddress) {
      router.replace("/").then(() => {
        showToast("Add wallet to create a post");
      });
    }
  }, [router, user]);

  // creating new post
  const createPost = async () => {
    console.log("create post");
    // TODO: api for creating new post
    const postSlug = await createNewPost(title, type, genre);
    router.push(
      `/post/${postSlug}/edit?key=${window.ethereum?.selectedAddress}`
    );
  };

  return (
    <main className="main-div">
      <Seo
        title="New Post | Cryptoliterature"
        description="Start writing a new post"
        path="/new"
      />

      <section className="h-full w-full flex items-center justify-center mb-20">
        <div className="flex flex-col items-center font-Poppins text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-5">
            Write your own unique style
          </h1>
          <h2 className="md:text-lg font-medium">Name your literature</h2>
          <div
            className="flex flex-col gap-y-3 mt-20"
            style={{ width: `calc(100% + 10px)` }}
          >
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
              maxLength={100}
            />

            <SelectInput
              id="type"
              options={postTypes}
              value={type}
              onChange={(value) => {
                setType(value);
              }}
              placeholder="Choose Type"
            />

            <TagInput
              id="genre"
              tags={genre}
              onChange={(value) => {
                setGenre(value);
              }}
              placeholder="Enter Genre"
            />
          </div>

          <button
            onClick={createPost}
            className="mt-10 mb-16 py-2 px-4 w-40 font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-lg"
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default ErrorPg;
