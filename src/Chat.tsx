import React from "react";
import { addComment } from "./FirebaseService";

interface Props {
  user: string;
  comments: UserComment[];
}

interface State {
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

  renderComment = (userComment: UserComment) => (
    <div key={userComment.key} className="comment">
      <div>{userComment.user}</div>
      <div>{userComment.comment}</div>
    </div>
  );

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  };

  addComment = () => {
    addComment({
      user: this.props.user,
      comment: this.state.comment
    });
    this.setState({ comment: "" });
  };

  render() {
    return (
      <div className="chat-container">
        <div>
          <h4>Chat</h4>
        </div>
        <div>
          <div className="comment-list">
            {this.props.comments.map(this.renderComment)}
            <div
              className="messages-end"
              ref={ref => (this.messagesEnd = ref)}
            />
          </div>
        </div>
        <div className="chat">
          <input
            type="text"
            className="u-full-width"
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
    );
  }
}

export default Chat;
