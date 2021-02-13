import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Props {
  onAddComment: (comment: string) => void;
  onShowCamera: () => void;
}

export const Message: React.FC<Props> = ({ onAddComment, onShowCamera }) => {
  const [comment, setComment] = useState("");

  const addComment = () => {
    if (!comment) return;
    onAddComment(comment);
    setComment("");
  };

  return (
    <div className="chat">
      <div className="close-icon-container" onClick={onShowCamera}>
        <div className="close-icon">
          <FontAwesomeIcon icon={faCamera} />
        </div>
      </div>

      <input
        type="text"
        className="u-full-width chat-input"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button
        type="button"
        className="button-primary button-margin"
        onClick={addComment}
      >
        Skicka
      </button>
    </div>
  );
};
