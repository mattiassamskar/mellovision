import { createRef, useEffect } from "react";
import { UserComment } from "../types";
import styles from "./Chat.module.css";

interface Props {
  comments: UserComment[];
  user: string;
}

export const Comments: React.FC<Props> = (props) => {
  const messagesEnd = createRef<HTMLDivElement>();

  useEffect(() => {
    messagesEnd.current &&
      messagesEnd.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
  }, [props.comments.length, messagesEnd]);

  const renderComment = (userComment: UserComment) => {
    const isMyComment = props.user === userComment.user;
    const className = isMyComment ? "my-comment" : "comment";

    return (
      <div key={userComment.key} className={className}>
        {!isMyComment && <div className={styles.user}>{userComment.user}</div>}
        {userComment.imageUrl && (
          <img
            src={userComment.imageUrl}
            alt=""
            width={200}
            style={{ marginTop: 6, marginBottom: 6, borderRadius: 5 }}
          />
        )}
        <div className={styles.chatComment}>{userComment.comment}</div>
      </div>
    );
  };

  return (
    <div className="comment-list">
      {props.comments.map(renderComment)}
      <div className="messages-end" ref={messagesEnd} />
    </div>
  );
};
