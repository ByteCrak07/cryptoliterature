import { getCookie } from "../general/cookies";
import { ApiUrl } from "../keys";

interface EditUserBody {
  username?: string;
  fullName?: string;
  email?: string | null;
  imgUrl?: string;
  donationUrl?: string;
  bio?: string;
  instaId?: string;
  instaLink?: string;
  twitterId?: string;
  twitterLink?: string;
  facebookId?: string;
  facebookLink?: string;
}

export async function updateUser(
  walletKey: string,
  username: string,
  fullName?: string,
  email?: string,
  donationUrl?: string,
  bio?: string,
  instaId?: string,
  instaLink?: string,
  twitterId?: string,
  twitterLink?: string,
  facebookId?: string,
  facebookLink?: string
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var body: EditUserBody = {};

  body.username = username.replace(/ /g, "_");
  body.fullName = fullName;
  body.email = email ? email : null;
  body.donationUrl = donationUrl;
  body.bio = bio;
  body.instaId = instaId;
  body.instaLink = instaLink;
  body.twitterId = twitterId;
  body.twitterLink = twitterLink;
  body.facebookId = facebookId;
  body.facebookLink = facebookLink;

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(`${ApiUrl}/v1/user/${walletKey}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch(async (err) => {
      let errRes;
      try {
        errRes = await err.json();
      } catch (e) {
        errRes = err;
      }

      throw new Error(errRes.message);
    });

  if (data) return data;
  else return null;
}

export async function updateUserAfterImageUpload(
  walletKey: string,
  imgUrl: string
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var body: EditUserBody = {};

  body.imgUrl = imgUrl;

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(`${ApiUrl}/v1/user/${walletKey}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch(async (err) => {
      let errRes;
      try {
        errRes = await err.json();
      } catch (e) {
        errRes = err;
      }

      throw new Error(errRes.message);
    });

  if (data) return data;
  else return null;
}
