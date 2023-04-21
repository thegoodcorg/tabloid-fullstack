import { useEffect, useState, useRef } from "react";
import { getAllUsers } from "../modules/userManager";
import UserProfileCard from "./UserProfileCard";
import { FormGroup, Input, Label } from "reactstrap";

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const tempUserProfiles = useRef([]);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserProfiles(users);
    });
  }, []);

  const filterForDeactivated = (users) => {
    return users.filter((up) => up.activeStatus === "Deactivated");
  };

  const resetUsers = () => {
    getAllUsers().then((users) => {
      if (isChecked) {
        users = filterForDeactivated(users);
      }
      setUserProfiles(users);
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    let deactivatedUsers = filterForDeactivated(userProfiles);
    if (isChecked) {
      tempUserProfiles.current = userProfiles;
      setUserProfiles(deactivatedUsers);
    } else {
      setUserProfiles(tempUserProfiles.current);
    }
  }, [isChecked]);

  const DeactivatedCheckbox = () => {
    return (
      <FormGroup check className="text-center m-2">
        <Label check>
          <Input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{" "}
          Show deactivated users
        </Label>
      </FormGroup>
    );
  };

  return (
    <>
      <h1 className="text-center">User List</h1>
      <DeactivatedCheckbox />
      {userProfiles.map((user) => (
        <UserProfileCard key={user.id} user={user} resetUsers={resetUsers} />
      ))}
    </>
  );
};

export default UserProfiles;
