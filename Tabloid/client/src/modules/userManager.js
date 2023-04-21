import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/userprofile";

export const getUser = (userId) => {
  return getToken().then((token) => {
    const fetchUrl = `${_apiUrl}/details/${userId}`;
    return fetch(fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch a user profile."
        );
      }
    });
  });
};

export const getAllUsers = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to fetch a user profile."
        );
      }
    });
  });
};

export const deactivateUser = (userId) => {
  return getToken().then((token) => {
    let fetchUrl = `${_apiUrl}/deactivate/${userId}`;
    return fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          "An unknown error occurred while trying to deactivate the user."
        );
      }
    });
  });
};

export const reactivateUser = (userId) => {
  return getToken().then((token) => {
    let fetchUrl = `${_apiUrl}/reactivate/${userId}`;
    return fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(
          "An unknown error occurred while trying to reactivate the user."
        );
      }
    });
  });
};
