import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardImg, CardText } from "reactstrap";
import { getUser } from "../modules/userManager";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(parseInt(id)).then(setUser);
  }, []);

  const defaultPhoto =
    "https://www.greatwhatsit.com/wp-content/uploads/2008/07/wager.jpg";

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          Details for <strong>{user.displayName}</strong>
        </CardHeader>
        <div className="d-flex justify-content-around">
          <CardImg
            style={{ width: "250px" }}
            src={user.imageLocation ? user.imageLocation : defaultPhoto}
            alt="User profile picture"
          />
          <div className="d-flex flex-column justify-content-center">
            <CardText>
              <strong>Name:</strong> {user.fullName}
            </CardText>
            <CardText>
              <strong>Email:</strong> {user.email}
            </CardText>
            <CardText>
              <strong>User since:</strong>{" "}
              {new Date(user.createDateTime).toDateString()}
            </CardText>
            <CardText>
              <strong>Profile Type:</strong> {user.userType?.name}
            </CardText>
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserDetails;
