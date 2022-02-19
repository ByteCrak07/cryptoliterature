import { ApiUrl, ClientAuthKey } from "../keys";

export async function getUser(walletKey: string) {
  var requestOptions = {
    method: "GET",
  };

  const data = await fetch(
    `${ApiUrl}/v1/user/${walletKey}&${ClientAuthKey}`,
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

export async function getUserWithUsername(username: string) {
  var requestOptions = {
    method: "GET",
  };

  const data = await fetch(
    `${ApiUrl}/v1/user/name/${username}&${ClientAuthKey}`,
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

export async function getAllUsers() {
  var requestOptions = {
    method: "GET",
  };

  const data = await fetch(
    `${ApiUrl}/v1/user/all/${ClientAuthKey}`,
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
