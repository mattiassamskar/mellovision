import { faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Camera } from "../Camera/Camera";
import styles from "./Message.module.css";

interface Props {
  onAddComment: (comment: string, imageUrl: string) => void;
}

export const Message: React.FC<Props> = ({ onAddComment }) => {
  const [comment, setComment] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const addComment = () => {
    if (!comment) return;
    onAddComment(comment, "");
    setComment("");
  };

  return (
    <>
      {showCamera && (
        <Camera
          onTakePicture={(image) => {
            onAddComment("", image);
            setShowCamera(false);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}
      {!showCamera && (
        <div className={styles.container}>
          <FontAwesomeIcon
            icon={faCamera}
            color="white"
            className={styles.icon}
            onClick={() => setShowCamera(!showCamera)}
          />
          <input
            type="text"
            className={`u-full-width ${styles.input}`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            color="white"
            className={styles.icon}
            onClick={addComment}
          />
        </div>
      )}
    </>
  );
};
