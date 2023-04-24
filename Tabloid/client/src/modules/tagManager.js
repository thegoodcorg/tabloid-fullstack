import { getToken } from "./authManager";

const _apiUrl = "/api/tag";


export const getAllTags = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};

export const getTagById = (id) => {
  return fetch(`${_apiUrl}/${id}`)
    .then((res) => res.json())
};



export const addTag = (tag) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const updateTag = (tag) => {
  return fetch(`${_apiUrl}/${tag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const deleteTag = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};
