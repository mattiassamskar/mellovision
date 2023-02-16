import React from "react";
import { addComment, uploadImage } from "../FirebaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";
import { Message } from "./Message";
import { Comments } from "./Comments";

interface Props {
  user: string;
  comments: UserComment[];
  hasUnreadComments: boolean;
  onClearUnreadComments: () => void;
}

interface State {
  isVisible: boolean;
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
      isVisible: false,
    };
  }

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
  };

  toggleIsVisible = () => {
    this.setState((prevState) => {
      return {
        isVisible: !prevState.isVisible,
      };
    });
    this.props.onClearUnreadComments();
  };

  handleWindowScrolling = () => {
    if (this.state.isVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
    } else {
      document.body.style.overflow = "scroll";
      document.documentElement.style.position = "relative";
    }
  };

  renderChatPopup = () => (
    <div className="chat-popup" onClick={this.toggleIsVisible}>
      {this.props.hasUnreadComments && <div className="chat-alert"></div>}
      Chat
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

        <Comments comments={this.props.comments} user={this.props.user} />
        <Message onAddComment={this.add} />
      </div>
    </div>
  );

  render() {
    this.handleWindowScrolling();
    return this.state.isVisible ? this.renderChat() : this.renderChatPopup();
  }
}

export default Chat;
