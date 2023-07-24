import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// types
import { PostData } from "../../../interfaces/posts";
// components
import Image from "next/image";
import Link from "next/link";
import Seo from "../../../components/general/seo";
import TitleInput from "../../../components/editPosts/titleInput";
// import ToggleInput from "../../components/editPosts/toggleInput";
import ImageInput from "../../../components/editPosts/imgInput";
import ImgCropModal from "../../../components/editPosts/imgCropModal";
import TagInput from "../../../components/editPosts/tagInput";
import SelectInput from "../../../components/editPosts/selectInput";
import EditHeader from "../../../components/editPosts/editHeader";
import { getPostWithSlug } from "../../../lib/posts/get";
import RingSpinner from "../../../components/spinners/ringSpinner";
import { updatePost } from "../../../lib/posts/patch";
import { uploadPostFeatureImg } from "../../../lib/posts/post";
import { showToast } from "../../../components/general/toast";
import { deletePostWithId } from "../../../lib/posts/delete";
import { useRouter } from "next/router";

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

  return {
    props: { post: postData, timestamp: new Date().toUTCString() },
  };
};

interface EditPostProps {
  post: PostData;
}

const CKEditor = dynamic(
  () => import("../../../components/editPosts/ckeditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 flex items-center justify-center bg-lit-light-gray font-Poppins text-xl font-medium">
        Starting editor...
      </div>
    ),
  }
);

const EditPost: NextPage<EditPostProps> = ({ post }) => {
  const postTypes = ["Blog", "Novel", "Short story", "Poem", "Quote"];

  const [postData, setPostData] = useState<PostData>(post);

  // states for featured img
  const [tempImgUrl, setTempImgUrl] = useState<string>("");
  const [croppedImgUrl, setCroppedImgUrl] = useState<string>(
    postData.featureImage ? postData.featureImage : ""
  );
  const [showCropModal, setShowCropModal] = useState<boolean>(false);

  // input states
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState<Array<string>>([]);
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imgAlt, setImgAlt] = useState("");

  // other states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);

  // using ref for editor to prevent too many re-renders
  const content = useRef<string>(
    postData && postData.content ? postData.content : ""
  ) as {
    current: string;
  };

  // router
  const router = useRouter();

  const fetchData = async (reFetch: boolean) => {
    const slug = window.location.pathname.split("/").slice(-2)[0];
    let data: PostData;
    if (reFetch) data = await getPostWithSlug(slug);
    else data = postData;

    if (data.author.walletKey === window.ethereum?.selectedAddress) {
      setIsLoggedIn(true);
      setPostData(data);
      setTitle(data.title);
      setType(data.type);
      setGenre(data.genre);
      setSlug(data.slug);
      setExcerpt(data.excerpt ? data.excerpt : "");
      setCroppedImgUrl(data.featureImage ? data.featureImage : "");
      setImgAlt(data.featureImageAlt ? data.featureImageAlt : "");
    }

    setIsLoading(false);
  };

  // fetching data
  useEffect(() => {
    fetchData(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const closeCropModal = async (newImgUrl: string | null) => {
    setShowCropModal(false);
    if (newImgUrl) {
      // api for storing image and update profile with new img url
      const newUrl = await uploadPostFeatureImg(
        newImgUrl,
        postData.featureImage ? postData.featureImage : "",
        postData.id
      );

      setCroppedImgUrl(newUrl);
      setImageChanged(true);
    }
  };

  // handling saving and deleting
  const publishPost = async (callback: () => void) => {
    const data: PostData = await updatePost(
      postData.id,
      title,
      type,
      genre,
      slug,
      excerpt,
      croppedImgUrl,
      imgAlt,
      content.current,
      "publish"
    );

    callback();
    showToast("Post published");
    setContentChanged(false);
    setValuesChanged(false);
    setPostData(data);

    router.replace(`/post/${data.slug}/edit`);
  };

  const draftPost = async (callback: () => void) => {
    const data: PostData = await updatePost(
      postData.id,
      title,
      type,
      genre,
      slug,
      excerpt,
      croppedImgUrl,
      imgAlt,
      content.current,
      "draft"
    );

    callback();
    showToast("Post saved as draft");
    setContentChanged(false);
    setValuesChanged(false);
    setPostData(data);

    router.replace(`/post/${data.slug}/edit?key=${data.authorWalletKey}`);
  };

  const archivePost = async (callback: () => void) => {
    const data: PostData = await updatePost(
      postData.id,
      title,
      type,
      genre,
      slug,
      excerpt,
      croppedImgUrl,
      imgAlt,
      content.current,
      "archive"
    );

    callback();
    showToast("Post archived");
    setContentChanged(false);
    setValuesChanged(false);
    setPostData(data);

    router.replace(`/post/${data.slug}/edit?key=${data.authorWalletKey}`);
  };

  const deletePost = async (callback: () => void) => {
    const data = await deletePostWithId(postData.id);

    callback();
    if (data) {
      showToast("Post deleted");
      setContentChanged(false);
      setValuesChanged(false);
      setTimeout(() => {
        router.replace(`/${postData.author.username}`);
      }, 2000);
    }
  };

  const handleAutoSave = async () => {
    if (
      postData &&
      !postData.published &&
      !postData.archived &&
      contentChanged
    ) {
      setSaving(true);

      await updatePost(
        postData.id,
        title,
        type,
        genre,
        slug,
        excerpt,
        croppedImgUrl,
        imgAlt,
        content.current,
        "draft"
      );

      setContentChanged(false);
      setSaving(false);
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
        description="Edit post"
        path={`/post/${postData.slug}/edit`}
      />

      <EditHeader
        postData={postData}
        publishPost={publishPost}
        draftPost={draftPost}
        archivePost={archivePost}
        deletePost={deletePost}
        saving={saving}
      />

      {!isLoading && isLoggedIn ? (
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

              {/* post excerpt */}
              <div className="mb-5">
                <label htmlFor="excerpt" className="block mb-1 text-lg">
                  Post excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => {
                    setValuesChanged(true);
                    setExcerpt(e.target.value);
                  }}
                  placeholder="Enter excerpt"
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
          <div className="mb-20">
            <CKEditor
              data={content.current}
              onBlur={handleAutoSave}
              onChange={(_, editor) => {
                if (!contentChanged) setContentChanged(true);
                const data = editor.getData();
                content.current = data;
              }}
            />
          </div>

          {/* img crop modal */}
          {showCropModal ? (
            <ImgCropModal
              aspect={1.8}
              imgUrl={tempImgUrl}
              closeModal={closeCropModal}
            />
          ) : null}
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
              <Link
                href={window.location.pathname.slice(
                  0,
                  window.location.pathname.lastIndexOf("/")
                )}
              >
                <a className="my-4 py-2 px-4 rounded-full bg-lit-dark text-white">
                  Go back to post
                </a>
              </Link>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default EditPost;
