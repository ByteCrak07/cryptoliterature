import { getCookie } from "../general/cookies";
import { ApiUrl } from "../keys";

export async function deletePostWithId(id: number) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getCookie("accessToken")}`);

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
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
    });

  if (data) return data;
  else return null;
}
