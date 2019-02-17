import React from "react";
import { addComment } from "./FirebaseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  user: string;
  comments: UserComment[];
}

interface State {
  isVisible: boolean;
  comment: string;
}

export interface UserComment {
  key?: string;
  user: string;
  comment: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: false,
      comment: ""
    };
  }

  messagesEnd: any;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd &&
      this.messagesEnd.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "start"
      });
  };

  addComment = () => {
    if (this.state.comment === "") return;

    addComment({
      user: this.props.user,
      comment: this.state.comment
    });
    this.setState({ comment: "" });
  };

  toggleIsVisible = () =>
    this.setState(prevState => {
      return {
        isVisible: !prevState.isVisible
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

  renderChat = () => (
    <div>
      <div className="shadow" />
      <div className="chat-container">
        <div className="close-icon-container" onClick={this.toggleIsVisible}>
          <div className="close-icon">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <div className="comment-list">
          {this.props.comments.map(this.renderComment)}
          <div className="messages-end" ref={ref => (this.messagesEnd = ref)} />
        </div>
        <div className="chat">
          <input
            type="text"
            className="u-full-width chat-input"
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
          />
          <button
            type="button"
            className="button-primary button-margin"
            onClick={this.addComment}
          >
            Skicka
          </button>
        </div>
      </div>
    </div>
  );

  render() {
    this.handleWindowScrolling();
    return this.state.isVisible ? this.renderChat() : this.renderChatPopup();
  }
}

export default Chat;
