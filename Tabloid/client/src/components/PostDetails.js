import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostById } from "../modules/postManager";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { PostComments } from "./PostComments";
import { CommentForm } from "./CommentForm";
import { getPostComments } from "../modules/commentManager";

export default function PostDetails() {
  const [post, setPost] = useState({});
  const [commentsOnPost, setCommentsOnPost] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    getPostById(id).then((p) => {
      setPost(p);
    });
  }, []);

  const getComments = () => {
    getPostComments(id).then((c) => {
      setCommentsOnPost(c);
    });
  };

  const DeletePostModal = () => {
    return (
      <Modal isOpen={isOpen}>
        <ModalBody>Are you sure you want to delete this post?</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-danger m-4"
            onClick={() => {
              deletePost(id);
              navigate(`/post`);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const handleSubscribe = () => {
    let subscription = {
      subscriberUserProfileId: 1,
      providerUserProfileId: 1,
      beginDateTime: new Date()
    }
  };

  const SubscriptionButton = () => {
    return (
      <Button className="btn-sm" onClick={handleSubscribe}>
        Subscribe to author
      </Button>
    );
  };

  return (
    <div>
      <Card className="m-4">
        <CardBody>
          {/* <img src={`${post.imageLocation}`} alt="header image" /> */}
          <CardTitle tag="h5">{post.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            {" "}
            Posted by: {post.userProfile?.displayName}
          </CardSubtitle>
          <SubscriptionButton />
          <CardText className="m-4">{post.content}</CardText>
          <CardSubtitle className="mb-2 text-muted">
            {" "}
            Posted On: {post.publishDateTime}
          </CardSubtitle>
          <CommentForm getComments={getComments} />
          <PostComments
            commentsOnPost={commentsOnPost}
            getComments={getComments}
          />
        </CardBody>
        <Button
          className="btn btn-danger m-4"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Delete Post
        </Button>
        <DeletePostModal />
      </Card>
    </div>
  );
}
