import { FC, useEffect, useState } from "react";
import { UserProfile } from "../../interfaces/profile";
import { showToast } from "../general/toast";
import RingSpinner from "../spinners/ringSpinner";
import ProfileInput from "./profileInput";

interface EditProfileModalProps {
  userData: UserProfile;
  close: (newValues: boolean) => void;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ userData, close }) => {
  // input states
  const [userName, setUserName] = useState(userData.user_name);
  const [fullName, setFullName] = useState(
    userData.full_name ? userData.full_name : ""
  );
  const [email, setEmail] = useState(userData.email ? userData.email : "");
  const [bio, setBio] = useState(userData.bio ? userData.bio : "");
  const [instagram, setInstagram] = useState(
    userData.instagram ? userData.instagram.link : ""
  );
  const [twitter, setTwitter] = useState(
    userData.twitter ? userData.twitter.link : ""
  );
  const [facebook, setFacebook] = useState(
    userData.facebook ? userData.facebook.link : ""
  );

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  // handle save
  const handleSubmit = () => {
    if (userName) {
      setIsSaveDisabled(true);
      // TODO: api call to update user

      setTimeout(() => {
        setIsSaveDisabled(false);
        close(true);
      }, 2000);
    } else showToast("Username is required");
  };

  // handle click outside
  const handleClick = (e: MouseEvent) => {
    const target = e.target;
    const modal = document.getElementById("edit-profile-div");

    if (target && modal) {
      if (modal.contains(target as Node)) return;

      // if clicked outside
      close(false);
    }
  };

  // useEffect
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    window.addEventListener("click", handleClick);

    return () => {
      document.body.removeAttribute("class");
      window.removeEventListener("click", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);

  return (
    <div className="fixed font-Poppins filter backdrop-blur bg-lit-dark bg-opacity-60 z-50 inset-0 overflow-auto">
      <div className="h-full w-full flex items-center justify-center">
        <div
          id="edit-profile-div"
          className="rounded-lg text-center bg-white py-5 px-5 sm:px-10 max-h-[80vh] overflow-auto relative"
        >
          <button
            onClick={() => close(false)}
            className="absolute flex items-center justify-center right-1 top-1 w-8 h-8 text-2xl font-extralight bg-lit-gray bg-opacity-20 hover:bg-opacity-40 rounded-full"
          >
            <span>&times;</span>
          </button>
          <h1 className="text-xl font-semibold">Edit Profile</h1>
          <div className="font-Poppins w-80 lg:w-96">
            <div className="py-5">
              <ProfileInput
                id="username"
                label="Username"
                placeholder="Enter username"
                value={userName}
                setValue={setUserName}
              />

              <ProfileInput
                id="name"
                label="Full Name"
                placeholder="Enter full name"
                value={fullName}
                setValue={setFullName}
              />

              <ProfileInput
                id="email"
                label="Email"
                type="email"
                placeholder="Enter email"
                value={email}
                setValue={setEmail}
              />

              <div className="mb-5 text-left">
                <label htmlFor="bio" className="block mb-1 font-medium">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  rows={5}
                  placeholder="Enter bio..."
                  className="outline-none w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
                ></textarea>
              </div>

              <ProfileInput
                id="instagram"
                label="Instagram"
                placeholder="Enter instagram handle"
                value={instagram}
                setValue={setInstagram}
              />

              <ProfileInput
                id="twitter"
                label="Twitter"
                placeholder="Enter twitter handle"
                value={twitter}
                setValue={setTwitter}
              />

              <ProfileInput
                id="facebook"
                label="Facebook"
                placeholder="Enter facebook handle"
                value={facebook}
                setValue={setFacebook}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={isSaveDisabled}
              className="py-2 px-5 font-semibold border border-lit-dark rounded-full bg-lit-dark text-white hover:shadow-lg"
            >
              {!isSaveDisabled ? (
                "Save"
              ) : (
                <RingSpinner width={25} color="white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
