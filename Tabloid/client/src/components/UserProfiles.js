import { useEffect, useState } from "react";
import { getAllUsers } from "../modules/userManager";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

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
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/userProfiles/details/${user.id}`}
            >
              <h3>{user.displayName}</h3>
            </Link>
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
