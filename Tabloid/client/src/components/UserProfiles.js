import { useEffect, useState } from "react";
import { getAllUsers } from "../modules/userManager";
import UserProfileCard from "./UserProfileCard";

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserProfiles(users);
    });
  }, []);

  return (
    <>
      <h1 className="text-center">User List</h1>

      {userProfiles.map((user) => (
        <UserProfileCard key={user.id} user={user} />
      ))}
    </>
  );
};

export default UserProfiles;
