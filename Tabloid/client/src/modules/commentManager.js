import { getToken } from "./authManager";

const apiUrl = "/api/Comment";

export const getAllComments = () => {
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
                    "An unknown error occurred while trying to get comments.",
                );
            }
        });
    });
};

export const getPostComments = (postId) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/postComments?postId=${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occured while trying to get this posts comments."
                );
            }
        });
    });
};