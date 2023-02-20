import { createRef, useEffect } from "react";
import { UserComment } from "../../types";
import styles from "./Comments.module.css";

export const Comments = ({
  comments,
  user,
}: {
  comments: UserComment[];
  user: string;
}) => {
  const bottom = createRef<HTMLDivElement>();

  useEffect(() => {
    bottom.current &&
      bottom.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
  }, [comments.length, bottom]);

  return (
    <div className={styles.container}>
      {comments.map((comment) => {
        const isMyComment = user === comment.user;

        return (
          <div
            key={comment.key}
            className={isMyComment ? styles.myComment : styles.comment}
          >
            {!isMyComment && <div className={styles.user}>{comment.user}</div>}
            {comment.imageUrl && (
              <img src={comment.imageUrl} alt="" className={styles.image} />
            )}
            <div>{comment.comment}</div>
          </div>
        );
      })}
      <div className={styles.bottom} ref={bottom} />
    </div>
  );
};
