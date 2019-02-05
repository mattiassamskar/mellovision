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
  renderComment = (userComment: UserComment) => (
    <div key={userComment.key} className="comment">
      <div>{userComment.user}</div>
      <div>{userComment.comment}</div>
    </div>
  );

  render() {
    return (
      <div className="chat-container">
        <div>
          <h4>Chat</h4>
        </div>
        {this.props.comments.map(this.renderComment)}
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
            onClick={() =>
              addComment({
                user: this.props.user,
                comment: this.state.comment
              })
            }
          >
            Skicka
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
