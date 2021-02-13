import { faArrowRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Camera } from "./Camera";

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
    <div style={{ background: "#f6348f", paddingTop: 5, paddingBottom: 5 }}>
      {showCamera && (
        <>
          <Camera
            onTakePicture={(image) => {
              onAddComment("", image);
              setShowCamera(false);
            }}
            onClose={() => setShowCamera(false)}
          />
        </>
      )}
      {!showCamera && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 5,
            justifyContent: "space-between",
          }}
        >
          <FontAwesomeIcon
            icon={faCamera}
            color="white"
            style={{
              margin: 5,
              background: "#33c3f0",
              padding: 6,
              borderRadius: 5,
            }}
            onClick={() => setShowCamera(!showCamera)}
          />
          <input
            type="text"
            className="u-full-width chat-input"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            style={{ marginBottom: 0 }}
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            color="white"
            style={{
              margin: 5,
              background: "#33c3f0",
              padding: 6,
              borderRadius: 5,
            }}
            onClick={addComment}
          />
        </div>
      )}
    </div>
  );
};
