import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { deleteComment } from "../modules/commentManager";
import { me } from "../modules/authManager";
import { useParams } from "react-router-dom";

export const PostComments = ({ commentsOnPost, getComments }) => {
  const [currentUser, setCurrentUser] = useState({});

  const { id } = useParams();

  const handleDeleteClick = (e) => {
    deleteComment(e).then(() => {
      getComments();
    });
  };
  useEffect(() => {
    me().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  return (
    <>
      <h5> Comments</h5> <br />
      {commentsOnPost.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            {" "}
            <u>{comment.profile.displayName}</u> says <br />
            <li key={comment.id}>
              {comment.content}
              <br />
              {comment.userProfileId === currentUser.id ? (
                <button
                  onClick={() => {
                    handleDeleteClick(comment.id);
                  }}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </li>
          </React.Fragment>
        );
      })}
    </>
  );
};
