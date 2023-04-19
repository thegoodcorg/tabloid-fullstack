import { useEffect, useState } from "react";
import { getAllUsers } from "../modules/userManager";
import { Card, CardBody } from "reactstrap";

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
      <Card>
        {userProfiles.map((user) => (
          <CardBody className="border">
            <h3>{user.displayName}</h3>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>{user.userType.name}</div>
          </CardBody>
        ))}
      </Card>
    </>
  );
};

export default UserProfiles;
