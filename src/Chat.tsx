import React from "react";

interface Props {}

interface State {
  comments: UserComment[];
}

interface UserComment {
  user: string;
  comment: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      comments: [
        {
          user: "User 1",
          comment: "Comment 1"
        },
        {
          user: "User 2",
          comment: "Comment 2"
        },
        {
          user: "User 3",
          comment: "Comment 3"
        },
        {
          user: "User 4",
          comment: "Comment 4"
        }
      ]
    };
  }
  renderComment = (userComment: UserComment) => (
    <div>
      {userComment.user} - {userComment.comment}
    </div>
  );

  render() {
    return (
      <div className="chat-container">
        <div>
          <h4>Chat</h4>
        </div>
        {this.state.comments.map(this.renderComment)}
      </div>
    );
  }
}

export default Chat;
