import { FC, useState } from "react";
// components
import DeleteModal from "./deleteModal";
import SaveModal from "./saveModal";
// types
import { PostData } from "../../interfaces/posts";
// functions
import { DDMMMYYYYTwelveHr } from "../../lib/general/processDateTime";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface EditHeaderProps {
  postData: PostData;
  publishPost: (callback: () => void) => void;
  draftPost: (callback: () => void) => void;
  archivePost: (callback: () => void) => void;
  deletePost: (callback: () => void) => void;
  saving: boolean;
}

const EditHeader: FC<EditHeaderProps> = ({
  postData,
  publishPost,
  draftPost,
  archivePost,
  deletePost,
  saving,
}) => {
  // states for modals
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // router
  const router = useRouter();

  return (
    <header className="fixed z-50 bg-white w-full py-4 px-3 sm:px-5 md:px-10 flex justify-between font-Poppins">
      {/* left side */}
      <div>
        <div className="font-medium text-xl mb-0 sm:mb-2 ml-0 md:-ml-4">
          <button className="">
            <FontAwesomeIcon
              className="inline text-lit-gray hover:text-lit-dark"
              icon={faChevronLeft}
              onClick={() =>
                router.push(`
                  ${window.location.pathname.replace("/edit", "/")}${
                  router.query.key ? `?key=${router.query.key}` : ""
                }`)
              }
            />
          </button>{" "}
          Post &gt; <span className="text-lit-gray">Edit</span>
        </div>
        {/* published date / draft /archive */}
        {!postData.archived ? (
          postData.published ? (
            <div className="flex items-baseline">
              <span className="text-lit-gray text-xs">Published on</span>
              &nbsp;&nbsp;
              {postData.publishedOn ? (
                <span className="text-xs sm:text-sm">
                  {DDMMMYYYYTwelveHr(postData.publishedOn)}
                </span>
              ) : null}
            </div>
          ) : (
            <span className="text-xs sm:text-sm text-lit-gray">
              {!saving ? "Saved as draft" : "Saving..."}
            </span>
          )
        ) : (
          <div className="text-xs sm:text-sm text-lit-gray">
            This post is archived.
          </div>
        )}
      </div>

      {/* right side */}

      <div>
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <div className="relative">
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className="hidden sm:block py-2 px-4 text-sm sm:text-base text-lit-gray hover:text-red-500 border border-transparent hover:border-red-500 hover:shadow-lg rounded-full font-semibold"
            >
              Delete&nbsp;Post
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className="sm:hidden py-1.5 px-2 text-sm text-red-500 border border-red-500 hover:shadow-lg rounded-xl font-semibold"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {showDeleteModal ? (
              <DeleteModal
                isArchived={postData.archived}
                close={() => {
                  setShowDeleteModal(false);
                }}
                onArchive={archivePost}
                onDelete={deletePost}
              />
            ) : null}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowSaveModal(true);
              }}
              className="py-2 px-4 w-auto sm:w-28 text-xs sm:text-base font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-lg"
            >
              Save
            </button>
            {showSaveModal ? (
              <SaveModal
                isPublished={postData.published}
                close={() => {
                  setShowSaveModal(false);
                }}
                onPublish={publishPost}
                onDraft={draftPost}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditHeader;
