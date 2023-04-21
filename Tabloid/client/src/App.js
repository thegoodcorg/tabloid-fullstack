import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange, me } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const isActiveUser = userProfile
    ? userProfile.activeStatus === "Active" && isLoggedIn
    : false;

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (userProfile?.activeStatus !== "Active") {
  //     setIsLoggedIn(false);
  //   }
  // }, [userProfile]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
