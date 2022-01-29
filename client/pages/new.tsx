import type { NextPage } from "next";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
// components
import Seo from "../components/general/seo";
import TitleInput from "../components/formatBlogs/titleInput";
import ToggleInput from "../components/formatBlogs/toggleInput";
import ImageInput from "../components/formatBlogs/imgInput";
// functions
import { DDMMMYYYYTwelveHr } from "../lib/processDateTime";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ImgCropModal from "../components/formatBlogs/imgCropModal";

const CKEditor = dynamic(() => import("../components/formatBlogs/ckeditor"), {
  ssr: false,
  loading: () => (
    <div className="h-40 flex items-center justify-center bg-lit-light-gray font-Poppins text-xl font-medium">
      Loading the editor...
    </div>
  ),
});

const NewBlog: NextPage = () => {
  // dummy data
  const blogData = {
    published_on: 1624395600000,
    title: "Addressing the Dark Side of the Crypto World",
    featured: true,
    article_reference: "News 18",
    blog: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
  };

  // states
  const [imgUrl, setImgUrl] = useState<string>("");
  const [croppedImgUrl, setCroppedImgUrl] = useState<string>("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);

  // refs
  const title = useRef<HTMLInputElement>(null);
  const featured = useRef<HTMLInputElement>(null);
  const articleReference = useRef<HTMLInputElement>(null);
  const blog = useRef<string>(blogData.blog) as { current: string };

  // functions
  const cropImg = (img: File) => {
    setImgUrl(URL.createObjectURL(img));
    setShowCropModal(true);
  };

  const save = () => {
    console.log("save");
    console.log(title.current?.value);
    console.log(featured.current?.checked);
    // TODO: implement api call
  };

  const cancel = () => {
    console.log("cancel");
    // TODO: implement cancel
  };

  const deletePost = () => {
    console.log("delete");
    // TODO: implement api call
  };

  return (
    <main className="main-div">
      <Seo
        title="New Blog | Cryptoliterature"
        description="Start writing a new blog"
        path="/new"
      />

      <section className="flex gap-x-20 flex-col md:flex-row">
        {/* left side */}
        <div className="flex-3 font-Poppins mb-5 md:mb-10">
          <div className="font-medium text-xl mb-2 ml-0 md:-ml-4">
            <button className="">
              <FontAwesomeIcon
                className="inline text-lit-gray hover:text-lit-dark"
                icon={faChevronLeft}
                onClick={() => window.history.back()}
              />
            </button>{" "}
            Blog &gt; <span className="text-lit-gray">Edit</span>
          </div>

          <div className="flex items-baseline">
            <span className="text-lit-gray text-xs">Published on</span>
            &nbsp;&nbsp;
            <span className="text-sm">
              {DDMMMYYYYTwelveHr(blogData.published_on)}
            </span>
          </div>
        </div>

        {/* right side */}
        <div className="flex-2">
          <div className="flex justify-evenly md:justify-between flex-col xs:flex-row mb-5">
            <div>
              <button
                onClick={deletePost}
                className="py-2 text-lit-gray hover:text-lit-dark font-Poppins font-semibold"
              >
                &times; Delete Post
              </button>
            </div>
            <div className="flex gap-x-2 justify-end xs:justify-start">
              <button
                onClick={cancel}
                className="py-2 w-28 font-Poppins font-semibold border border-lit-dark rounded-full hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="py-2 w-28 font-Poppins font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex gap-x-20 flex-col-reverse md:flex-row">
        {/* left side */}
        <div className="flex-3 font-Poppins mb-5">
          {/* Heading input */}
          <div className="font-medium mb-3">
            <label htmlFor="title" className="block mb-1 text-lg">
              Heading
            </label>
            <TitleInput
              id="title"
              forwardedRef={title}
              defaultValue={blogData.title}
              placeholder="Heading Here..."
              maxLength={100}
            />
          </div>

          {/* featured */}
          <div className="flex items-center mb-10">
            <div className="font-medium text-lg mr-10">Featured&nbsp;News</div>
            <ToggleInput
              id="toggle"
              defaultValue={blogData.featured}
              forwardedRef={featured}
            />
          </div>

          {/* article reference */}
          <div className="mb-5">
            <input
              type="text"
              ref={articleReference}
              placeholder="Article Reference"
              defaultValue={blogData.article_reference}
              className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
            />
          </div>
        </div>

        {/* right side */}
        <div className="flex-2 mb-10">
          {/* upload img */}
          <div className="flex justify-center relative">
            <ImageInput
              id="img-input"
              cropImg={cropImg}
              iconOnly={!!croppedImgUrl}
            />
            {croppedImgUrl ? <img src={croppedImgUrl} /> : null}
          </div>
        </div>
      </section>

      <div>
        <div className="font-Poppins font-medium text-lg mb-3">Description</div>
        <CKEditor
          data={blog.current}
          onChange={(_, editor) => {
            const data = editor.getData();
            blog.current = data;
          }}
        />
      </div>

      {/* img crop modal */}
      {showCropModal ? (
        <ImgCropModal
          imgUrl={imgUrl}
          closeModal={(newImgUrl) => {
            setShowCropModal(false);
            console.log(newImgUrl);
            if (newImgUrl) setCroppedImgUrl(newImgUrl);
          }}
        />
      ) : null}
    </main>
  );
};

export default NewBlog;
