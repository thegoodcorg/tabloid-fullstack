import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";
import { getUser } from "../modules/userManager";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(parseInt(id)).then(setUser);
  }, []);

  return (
    <>
      <Card>
        <CardHeader>Details for {user.firstName}</CardHeader>
      </Card>
    </>
  );
};

export default UserDetails;
