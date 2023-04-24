import React, { useEffect, useState } from "react";
import { getSubscribedPostsByFirebaseId } from "../modules/subscriptionManager";
import firebase from "firebase/app";
import { getAllPosts } from "../modules/postManager";
import Post from "./Post";

export default function Hello() {
  const [subscribedPosts, setSubscribedPosts] = useState([]);

  useEffect(() => {
    getSubscribedPostsByFirebaseId(firebase.auth().currentUser.uid).then(
      (postIds) => {
        getAllPosts().then((allPosts) => {
          const filteredPosts = allPosts.filter((post) =>
            postIds.includes(post.id)
          );
          setSubscribedPosts(filteredPosts);
        });
      }
    );
    console.log("chris here!", firebase.auth().currentUser.uid);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="text-center">Welcome to Tabloid!</h2>
      {/* <span
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: "-0.5rem",
          textAlign: "center",
        }}
      >
        <strong>hello</strong>
      </span> */}

      <img
        style={{ width: "500px" }}
        className="m-3"
        src="https://fox2now.com/wp-content/uploads/sites/14/2020/01/gettyimages-157204335.jpg"
        alt="a nice cow for you to enjoy"
      ></img>
      {subscribedPosts.length > 0 ? (
        <h4 className="text-center">Your recent subscribed posts:</h4>
      ) : (
        ""
      )}
      <div>
        {subscribedPosts.slice(0, 5).map((post) => {
          if (
            post.isApproved === true &&
            new Date(post.publishDateTime) < Date.now()
          ) {
            return <Post key={post.id} post={post} />;
          }
        })}
      </div>
    </div>
  );
}
