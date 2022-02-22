import { getCookie } from "../general/cookies";
import { ApiUrl, ClientAuthKey } from "../keys";

export async function getAllPublishedPosts(walletKey: string) {
  var requestOptions = {
    method: "GET",
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/published/${walletKey}&${ClientAuthKey}`,
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
    });

  if (data) return data;
  else return null;
}

export async function getAllDraftPosts(walletKey: string) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/drafts/${walletKey}&${ClientAuthKey}`,
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
    });

  if (data) return data;
  else return null;
}

export async function getAllArchivedPosts(walletKey: string) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/archived/${walletKey}&${ClientAuthKey}`,
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
    });

  if (data) return data;
  else return null;
}

export async function getPostWithSlug(slug: string) {
  var requestOptions = {
    method: "GET",
  };

  const data = await fetch(
    `${ApiUrl}/v1/post/${slug}&${ClientAuthKey}`,
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
    });

  if (data) return data;
  else return null;
}
