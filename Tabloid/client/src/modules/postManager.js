import { getToken } from "./authManager";

const apiUrl = "/api/Post";

export const getAllPosts = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get posts.",
                );
            }
        });
    });
};

export const getPostById = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get posts.",
                );
            }
        });
    });
};

export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new post.",
                );
            }
        });
    });
};
export const deletePost = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new post.",
                );
            }
        });
    });
};

export const editPost = (post) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${post.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(
                    "An unknown error occurred while trying to update a post.",
                );
            }
        });
    });
}

export const addPostTag = (postTag) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/addPostTags`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postTag),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new post.",
                );
            }
        });
    });
};

// export const testImageSend = (imgData) => {
//     return getToken().then((token) => {
//         return fetch(`${apiUrl}/addImage`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(imgData),
//         }).then((resp) => {
//             if (resp.ok) {
//                 return resp.json();
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error(
//                     "An unknown error occurred while trying to save a new post.",
//                 );
//             }
//         });
//     });
// }

