import React from "react";
import { addComment, uploadImage } from "../FirebaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";
import { Message } from "./Message";
import { Camera } from "../Camera";

interface Props {
  user: string;
  comments: UserComment[];
}

interface State {
  isVisible: boolean;
  showCamera: boolean;
}

export interface UserComment {
  key?: string;
  user: string;
  comment: string;
  imageUrl: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: true,
      showCamera: true,
    };
  }

  messagesEnd = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.current &&
      this.messagesEnd.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
  };

  add = async (comment: string, imageSrc: string) => {
    var imageUrl = "";

    if (imageSrc) {
      imageUrl = await uploadImage(imageSrc);
    }

    addComment({
      user: this.props.user,
      comment,
      imageUrl,
    });
    this.setState({ showCamera: false });
  };

  toggleIsVisible = () =>
    this.setState((prevState) => {
      return {
        isVisible: !prevState.isVisible,
      };
    });

  handleWindowScrolling = () => {
    if (this.state.isVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
    } else {
      document.body.style.overflow = "scroll";
      document.documentElement.style.position = "relative";
    }
  };

  renderComment = (userComment: UserComment) => {
    const isMyComment = this.props.user === userComment.user;
    const className = isMyComment ? "my-comment" : "comment";

    return (
      <div key={userComment.key} className={className}>
        {userComment.imageUrl && (
          <img src={userComment.imageUrl} alt="" width={200} />
        )}
        {!isMyComment && <div className="chat-user">{userComment.user}</div>}
        <div className="chat-comment">{userComment.comment}</div>
      </div>
    );
  };

  renderChatPopup = () => (
    <div className="chat-popup" onClick={this.toggleIsVisible}>
      Chat
    </div>
  );

  renderCommentList = () => (
    <div className="comment-list">
      {this.props.comments.map(this.renderComment)}
      <div className="messages-end" ref={this.messagesEnd} />
    </div>
  );

  renderChat = () => (
    <div>
      <div className="shadow" />
      <div className="chat-container">
        <div className="close-icon-container" onClick={this.toggleIsVisible}>
          <div className="close-icon">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        {this.state.showCamera ? (
          <Camera onTakePicture={(imageSrc) => this.add("", imageSrc)} />
        ) : (
          this.renderCommentList()
        )}
        <Message
          onAddComment={this.add}
          onShowCamera={() =>
            this.setState({ showCamera: !this.state.showCamera })
          }
        />
      </div>
    </div>
  );

  render() {
    this.handleWindowScrolling();
    return this.state.isVisible ? this.renderChat() : this.renderChatPopup();
  }
}

export default Chat;
