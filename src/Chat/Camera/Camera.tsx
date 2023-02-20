import { faDotCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Webcam from "react-webcam";
import styles from "./Camera.module.css";

interface Props {
  onTakePicture: (imageSrc: string) => void;
  onClose: () => void;
}

export const Camera: React.FC<Props> = (props) => {
  const ref = useRef<Webcam>(null);

  const takePicture = () => {
    const imageSrc = ref.current?.getScreenshot();
    if (!imageSrc) return;

    props.onTakePicture(imageSrc);
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
        onClick={props.onClose}
      />
    </div>
  );
};
