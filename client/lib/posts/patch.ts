import { getCookie } from "../general/cookies";
import { ApiUrl } from "../keys";

interface EditPostBody {
  title?: string;
  type?: string;
  genre?: Array<string>;
  slug?: string;
  excerpt?: string;
  featureImage?: string;
  featureImageAlt?: string;
  content?: string;
  published?: boolean;
  archived?: boolean;
  publishedOn?: Date;
}

export async function updatePost(
  id: number,
  title: string,
  type: string,
  genre: Array<string>,
  slug: string,
  excerpt: string,
  featureImage: string,
  featureImageAlt: string,
  content: string,
  updateMode: string
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var body: EditPostBody = {};

  body.title = title;
  body.type = type;
  body.genre = genre;
  body.slug = slug;
  body.excerpt = excerpt;
  body.featureImage = featureImage;
  body.featureImageAlt = featureImageAlt;
  body.content = content;

  if (updateMode === "publish") {
    body.published = true;
    body.archived = false;
    body.publishedOn = new Date();
  }

  if (updateMode === "draft") {
    body.published = false;
    body.archived = false;
  }

  if (updateMode === "archive") {
    body.published = false;
    body.archived = true;
  }

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/${id}&${window.ethereum?.selectedAddress}`,
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

  if (data) return data;
  else return null;
}

export async function updatePostAfterImageUpload(
  id: number,
  featureImage: string
) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var body: EditPostBody = {};

  body.featureImage = featureImage;

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/${id}&${window.ethereum?.selectedAddress}`,
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

  if (data) return data;
  else return null;
}
