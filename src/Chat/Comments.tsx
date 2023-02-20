import { createRef, useEffect } from "react";
import { UserComment } from "../types";
import styles from "./Chat.module.css";

export const Comments: React.FC<{
  comments: UserComment[];
  user: string;
}> = ({ comments, user }) => {
  const messagesEnd = createRef<HTMLDivElement>();

  useEffect(() => {
    messagesEnd.current &&
      messagesEnd.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
  }, [comments.length, messagesEnd]);

  return (
    <div className={styles.comments}>
      {comments.map((comment) => {
        const isMyComment = user === comment.user;

        return (
          <div
            key={comment.key}
            className={isMyComment ? styles.myComment : styles.comment}
          >
            {!isMyComment && <div className={styles.user}>{comment.user}</div>}
            {comment.imageUrl && (
              <img
                src={comment.imageUrl}
                alt=""
                width={200}
                style={{ marginTop: 6, marginBottom: 6, borderRadius: 5 }}
              />
            )}
            <div className={styles.chatComment}>{comment.comment}</div>
          </div>
        );
      })}
      <div className="messages-end" ref={messagesEnd} />
    </div>
  );
};
