import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// types
import { PostData } from "../../interfaces/posts";
// components
import Image from "next/image";
import Seo from "../../components/general/seo";
import TitleInput from "../../components/editPosts/titleInput";
// import ToggleInput from "../../components/editPosts/toggleInput";
import ImageInput from "../../components/editPosts/imgInput";
import ImgCropModal from "../../components/editPosts/imgCropModal";
import TagInput from "../../components/editPosts/tagInput";
import SelectInput from "../../components/editPosts/selectInput";
import EditHeader from "../../components/editPosts/editHeader";

const CKEditor = dynamic(() => import("../../components/editPosts/ckeditor"), {
  ssr: false,
  loading: () => (
    <div className="h-48 flex items-center justify-center bg-lit-light-gray font-Poppins text-xl font-medium">
      Loading the editor...
    </div>
  ),
});

const EditPost: NextPage = () => {
  const postTypes = ["Blog", "Novel", "Short story", "Poem", "Quote"];
  // dummy data
  const postData: PostData = {
    published_on: 1624395600000,
    feature_image: "",
    feature_image_alt: "",
    title: "Addressing the Dark Side of the Crypto World",
    excerpt: "",
    slug: "addressing-the-dark-side-of-the",
    type: "Short story",
    genre: ["story", "romance"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
    author: {
      profile_id: 123,
      profile_image: "",
      name: "",
    },
    published: false,
    archived: false,
  };

  // states for featured img
  const [tempImgUrl, setTempImgUrl] = useState<string>("");
  const [croppedImgUrl, setCroppedImgUrl] = useState(postData.feature_image);
  const [showCropModal, setShowCropModal] = useState<boolean>(false);

  // input states
  const [title, setTitle] = useState(postData.title);
  const [type, setType] = useState(postData.type);
  const [genre, setGenre] = useState(postData.genre);
  const [slug, setSlug] = useState(postData.slug);
  const [exerpt, setExerpt] = useState(postData.excerpt);
  const [imgAlt, setImgAlt] = useState(postData.feature_image_alt);

  // other states
  const [saving, setSaving] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);

  // using ref for editor to prevent too many re-renders
  const content = useRef<string>(postData.content) as { current: string };

  // hiding actual header for edit page
  useEffect(() => {
    document.getElementById("nav-header")?.classList.add("hidden");

    return () => {
      document.getElementById("nav-header")?.classList.remove("hidden");
    };
  }, []);

  // handling images
  const cropImg = (img: File) => {
    setTempImgUrl(URL.createObjectURL(img));
    setShowCropModal(true);
  };

  const closeCropModal = (newImgUrl: string | null) => {
    setShowCropModal(false);
    if (newImgUrl) {
      setCroppedImgUrl(newImgUrl);
      setImageChanged(true);
    }
  };

  // handling saving and deleting
  const publishPost = () => {
    console.log("save");
    // TODO: implement api call
  };

  const draftPost = () => {
    console.log("draft");
    // TODO: implement api call
  };

  const archivePost = () => {
    console.log("archive");
    // TODO: implement api call
  };

  const deletePost = () => {
    console.log("delete");
    // TODO: implement api call
  };

  const handleAutoSave = () => {
    if (!postData.published && !postData.archived) {
      setSaving(true);
      // TODO: implement api
      // dummy timeout for now
      setTimeout(() => {
        setSaving(false);
        setContentChanged(false);
      }, 3000);
    }
  };

  // handling prevent page reload
  useEffect(() => {
    if (imageChanged || valuesChanged || contentChanged) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };
    } else window.onbeforeunload = null;
  }, [imageChanged, valuesChanged, contentChanged]);

  return (
    <>
      <Seo
        title="Edit Post | Cryptoliterature"
        description="Start writing a new post"
        path="/edit"
      />

      <EditHeader
        postData={postData}
        publishPost={publishPost}
        draftPost={draftPost}
        archivePost={archivePost}
        deletePost={deletePost}
        saving={saving}
      />

      <main className="main-div">
        <section className="flex gap-x-10 lg:gap-x-32 flex-col-reverse md:flex-row">
          {/* left side */}
          <div className="flex-3 font-Poppins font-medium mb-5">
            {/* Heading input */}
            <div>
              <label htmlFor="title" className="block mb-1 text-lg">
                Title
              </label>
              <TitleInput
                id="title"
                value={title}
                onChange={(value) => {
                  setValuesChanged(true);
                  setTitle(value);
                }}
                placeholder="Title Here..."
                maxLength={100}
              />
            </div>

            {/* Type */}
            <div className="mb-5">
              <label htmlFor="type" className="block mb-1 text-lg">
                Type
              </label>
              <SelectInput
                id="type"
                options={postTypes}
                value={type}
                onChange={(value) => {
                  setValuesChanged(true);
                  setType(value);
                }}
                placeholder="Choose Type"
              />
            </div>

            {/* Genre */}
            <div className="mb-5">
              <label htmlFor="genre" className="block mb-1 text-lg">
                Genre
              </label>
              <TagInput
                id="genre"
                tags={genre}
                onChange={(value) => {
                  setValuesChanged(true);
                  setGenre(value);
                }}
                placeholder="Enter Genre"
              />
            </div>

            {/* post slug */}
            <div className="mb-5">
              <label htmlFor="slug" className="block mb-1 text-lg">
                Post slug
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setValuesChanged(true);
                  setSlug(e.target.value);
                }}
                placeholder="Enter slug"
                className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
              />
            </div>

            {/* post exerpt */}
            <div className="mb-5">
              <label htmlFor="exerpt" className="block mb-1 text-lg">
                Post exerpt
              </label>
              <textarea
                id="exerpt"
                value={exerpt}
                onChange={(e) => {
                  setValuesChanged(true);
                  setExerpt(e.target.value);
                }}
                placeholder="Enter exerpt"
                className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
              ></textarea>
            </div>
          </div>

          {/* right side */}
          <div
            className="flex-2 flex flex-col items-center justify-center mb-5"
            style={{ minWidth: 305 }}
          >
            {/* upload img */}
            <div className="relative w-full">
              <ImageInput
                id="img-input"
                cropImg={cropImg}
                aspect={1.8}
                iconOnly={!!croppedImgUrl}
              />
              {croppedImgUrl ? (
                <Image
                  src={croppedImgUrl}
                  alt="post-img"
                  width={2187}
                  height={1215}
                />
              ) : null}
            </div>

            {/* Feature Image Alt */}
            {croppedImgUrl ? (
              <div className="w-full my-5 font-Poppins">
                <input
                  id="img-alt"
                  type="text"
                  value={imgAlt}
                  onChange={(e) => {
                    setValuesChanged(true);
                    setImgAlt(e.target.value);
                  }}
                  placeholder="Enter image description"
                  className="outline-none w-full px-3 border-b border-lit-dark border-opacity-10 focus:border-opacity-100"
                />
              </div>
            ) : null}
          </div>
        </section>

        <div className="font-Poppins font-medium text-lg mb-3">Content</div>
        <CKEditor
          data={content.current}
          onBlur={handleAutoSave}
          onChange={(_, editor) => {
            setContentChanged(true);
            const data = editor.getData();
            content.current = data;
          }}
        />

        {/* img crop modal */}
        {showCropModal ? (
          <ImgCropModal
            aspect={1.8}
            imgUrl={tempImgUrl}
            closeModal={closeCropModal}
          />
        ) : null}
      </main>
    </>
  );
};

export default EditPost;
