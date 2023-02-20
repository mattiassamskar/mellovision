import { faDotCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

export const Camera = ({
  onTakePicture,
  onClose,
}: {
  onTakePicture: (imageSrc: string) => void;
  onClose: () => void;
}) => {
  const ref = useRef<Webcam>(null);

  const takePicture = () => {
    const imageSrc = ref.current?.getScreenshot();
    if (!imageSrc) return;

    onTakePicture(imageSrc);
  };

  return (
    <div className={styles.container}>
      <Webcam
        videoConstraints={{
          width: 200,
          height: 200,
          aspectRatio: { ideal: 1 },
        }}
        audio={false}
        mirrored={true}
        ref={ref}
        screenshotFormat="image/jpeg"
        className={styles.camera}
      />
      <FontAwesomeIcon
        icon={faDotCircle}
        size={"2x"}
        color="white"
        className={styles.circle}
        onClick={takePicture}
      />
      <FontAwesomeIcon
        icon={faTimes}
        color="white"
        className={styles.close}
        onClick={onClose}
      />
    </div>
  );
};
