import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserProfiles from "./UserProfiles";
import UserDetails from "./UserDetails";
import PostsDisplay from "./PostsDisplay";
import TagList from "./TagList";
import TagForm from "./TagForm";


export default function ApplicationViews({ isLoggedIn }) {
  

  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="post" element={<PostsDisplay />} />
          <Route path="/tag">
          <Route index element={<TagList/>} />
          <Route path="add" element={<TagForm/>} />
          {/* <Route path=":id" element={<VideoDetails/>} /> */} 
        </Route>
          <Route path="userprofiles">
            <Route index element={<UserProfiles />} />
            <Route path="details/:id" element={<UserDetails />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}

