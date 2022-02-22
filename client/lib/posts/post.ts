import { CreatePostData } from "../../interfaces/posts";
import { getCookie } from "../general/cookies";
import { DataURIToBlob } from "../general/imgToBlob";
import { ApiUrl } from "../keys";
import { updatePostAfterImageUpload } from "./patch";

export async function createNewPost(
  title: string,
  type: string,
  genre: Array<string>
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var body: CreatePostData = {
    title,
    type,
    genre,
  };

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  console.log(ApiUrl);

  const data = await fetch(
    `${ApiUrl}/v1/post/new/${window.ethereum?.selectedAddress}`,
    requestOptions
  )
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

  if (data) return data.slug;
  else return null;
}

export async function uploadPostFeatureImg(
  file: string,
  currentUrl: string,
  postId: number
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);

  var formdata = new FormData();
  formdata.append("file", DataURIToBlob(file), "file.jpeg");
  formdata.append("type", "post");
  formdata.append("name", `post_${postId}`);

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
      const newData = await updatePostAfterImageUpload(postId, data.url);

      if (newData) return data.url;
    }

    return data.url;
  } else return null;
}
