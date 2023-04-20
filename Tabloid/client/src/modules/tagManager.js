const _apiUrl = "/api/tag";

export const getAllTags = () => {
    return fetch(_apiUrl)
      .then((res) => res.json())
  };

//   export const addTags = () => {
//     return fetch(_apiUrl)
//       .then((res) => res.json())
//   };
  
  export const addTag = (tag) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  export const updateTag = (id) => {
    return fetch(`${_apiUrl}/tag/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
  };