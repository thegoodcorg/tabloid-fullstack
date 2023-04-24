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
import { me } from "../modules/authManager";
import {
    addSubscription,
    getAllSubscriptions,
} from "../modules/subscriptionManager";

export default function PostDetails() {
    const [post, setPost] = useState({});
    const [commentsOnPost, setCommentsOnPost] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const [isSubscriptionOkOpen, setIsSubscriptionOkOpen] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getComments();
        me().then(setUser);
        getAllSubscriptions().then(setSubscriptions);
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

    // subscription stuff
    const handleSubscribe = () => {
        let subscription = {
            subscriberUserProfileId: user.id,
            providerUserProfileId: post.userProfileId,
            beginDateTime: new Date(),
        };
        const isAlreadySubscribed = subscriptions.some((sub) => {
            return (
                sub.subscriberUserProfileId === subscription.subscriberUserProfileId &&
                sub.providerUserProfileId === subscription.providerUserProfileId
            );
        });

        if (!isAlreadySubscribed) {
            addSubscription(subscription).then(setIsSubscriptionOkOpen(true));
        } else {
            setIsSubscriptionOkOpen(true);
        }
    };

    const SubscriptionButton = () => {
        return (
            <Button className="btn-sm" onClick={handleSubscribe}>
                Subscribe to author
            </Button>
        );
    };
    // end subscription stuff

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

                    <p>
                        {post.tags?.map((tag) => {
                            return <li key={tag.id}>{tag.name} </li>;
                        })}
                    </p>
                    <div>
                        {
                            post.userProfileId == user.id ? <Button onClick={() => navigate("ManageTags")}>Manage Tags</Button> : ""
                        }
                    </div>
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
            <Modal isOpen={isSubscriptionOkOpen}>
                <ModalBody>You have subscribed to this author's posts</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setIsSubscriptionOkOpen(false)}
                    >
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
