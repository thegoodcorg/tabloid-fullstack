import { useState } from "react";
import { Button, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal isOpen={show} toggle={onHide}>
      <ModalHeader>
      </ModalHeader>
      <ModalBody>
        Are you sure you want to deactivate this user profile?
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Deactivate
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const UserProfileCard = ({ user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeactivateClick = () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleConfirmDeactivate = () => {
    setShowConfirmation(false);
  };

  const handleHideConfirmation = () => {
    setShowConfirmation(false);
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
        <Button
          className="btn btn-danger mt-3"
          onClick={handleDeactivateClick}
        >
          Deactivate User
        </Button>
        <DeleteModal
          show={showConfirmation}
          onHide={handleHideConfirmation}
          onConfirm={handleConfirmDeactivate}
        />
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;