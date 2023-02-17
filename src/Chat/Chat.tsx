import { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { addComment, uploadImage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Message } from "./Message";
import { Comments } from "./Comments";
import { UserComment } from "../types";

interface Props {
  user: string;
  comments: UserComment[];
  hasUnreadComments: boolean;
  onClearUnreadComments: () => void;
}

export const Chat = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "scroll";
    document.documentElement.style.position = isVisible ? "fixed" : "relative";
  }, [isVisible]);

  const add = async (comment: string, imageSrc: string) => {
    const imageUrl = imageSrc ? await uploadImage(imageSrc) : "";
    addComment({ user: props.user, comment, imageUrl });
  };

  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
    props.onClearUnreadComments();
  };

  return isVisible ? (
    <div>
      <div className={styles.shadow} />
      <div className={styles.container}>
        <div className={styles.closeIconContainer} onClick={toggleIsVisible}>
          <div className={styles.closeIcon}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <Comments comments={props.comments} user={props.user} />
        <Message onAddComment={add} />
      </div>
    </div>
  ) : (
    <button
      type="button"
      className={`button-primary ${styles.popup}`}
      onClick={toggleIsVisible}
    >
      Chat
      {props.hasUnreadComments && <div className={styles.alert}></div>}
    </button>
  );
};
