import { getCookie } from "../general/cookies";
import { DataURIToBlob } from "../general/imgToBlob";
import { ApiUrl } from "../keys";
import { updateUserAfterImageUpload } from "./patch";

interface LoginBody {
  walletKey: string;
  signature: string;
}

interface CreateUserBody {
  walletKey: string;
  signature: string;
  username: string;
  fullName?: string;
  email?: string;
  isWriter: boolean;
  isCollector: boolean;
}

export async function login(walletKey: string, signature: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body: LoginBody = {
    walletKey,
    signature,
  };

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(`${ApiUrl}/v1/auth/login`, requestOptions)
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

export async function createUser(
  walletKey: string,
  signature: string,
  username: string,
  fullName: string,
  email: string,
  isWriter: boolean,
  isCollector: boolean
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var body: CreateUserBody = {
    walletKey,
    signature,
    username: username.replace(/ /g, "_"),
    isWriter,
    isCollector,
  };

  if (fullName) body.fullName = fullName;
  if (email) body.email = email;

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(`${ApiUrl}/v1/user/new`, requestOptions)
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

export async function uploadProfileImg(file: string, currentUrl: string) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);

  var formdata = new FormData();
  formdata.append("file", DataURIToBlob(file), "file.jpeg");
  formdata.append("type", "profile");
  formdata.append("name", `user_${window.ethereum?.selectedAddress}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  const data = await fetch(`${ApiUrl}/v1/upload`, requestOptions)
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

  if (data) {
    if (data.url !== currentUrl) {
      const newData = await updateUserAfterImageUpload(
        window.ethereum?.selectedAddress as string,
        data.url
      );

      if (newData) return data.url;
    }

    return data.url;
  } else return null;
}
