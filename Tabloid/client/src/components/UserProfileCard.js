import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { deactivateUser, reactivateUser } from "../modules/userManager";

const DeactivateModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal isOpen={show} toggle={onHide}>
      <ModalHeader></ModalHeader>
      <ModalBody>
        Are you sure you want to deactivate this user profile?
      </ModalBody>
      <ModalFooter>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={onConfirm}>Deactivate</Button>
      </ModalFooter>
    </Modal>
  );
};

const UserProfileCard = ({ user, resetUsers }) => {
  const [showConfirmation, setShowDeactivateConfirmation] = useState(false);

  const handleDeactivateClick = () => {
    setShowDeactivateConfirmation(!showConfirmation);
  };

  const handleConfirmDeactivate = (userId) => {
    deactivateUser(userId).then(() => resetUsers());
    setShowDeactivateConfirmation(false);
  };

  const handleHideConfirmation = () => {
    setShowDeactivateConfirmation(false);
  };

  const handleReactivateClick = (userId) => {
    reactivateUser(userId).then(() => resetUsers());
  };

  return (
    <Card className="mt-1">
      <CardBody key={user.id} className="border">
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
        <div>{user.activeStatus}</div>
        {user.activeStatus === "Active" ? (
          <Button
            className="btn btn-danger mt-3"
            onClick={handleDeactivateClick}
          >
            Deactivate User
          </Button>
        ) : (
          <Button
            className="btn btn-success mt-3"
            onClick={() => handleReactivateClick(user.id)}
          >
            Reactivate user
          </Button>
        )}

        <DeactivateModal
          show={showConfirmation}
          onHide={handleHideConfirmation}
          onConfirm={() => handleConfirmDeactivate(user.id)}
        />
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;
