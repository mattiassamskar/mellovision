import { faDotCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Webcam from "react-webcam";

interface Props {
  onTakePicture: (imageSrc: string) => void;
  onClose: () => void;
}

export const Camera: React.FC<Props> = (props) => {
  const webcamRef = useRef<Webcam>(null);

  const takePicture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    props.onTakePicture(imageSrc);
  };

  return (
    <div
      style={{
        height: 280,
        width: 300,
        margin: 10,
      }}
    >
      <Webcam
        videoConstraints={{
          width: 280,
          height: 280,
          aspectRatio: { ideal: 1 },
        }}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <FontAwesomeIcon
        icon={faDotCircle}
        size={"2x"}
        color="white"
        onClick={takePicture}
        style={{ position: "absolute", bottom: 20, right: "46%" }}
      />
      <FontAwesomeIcon
        icon={faTimes}
        color="white"
        onClick={props.onClose}
        style={{ position: "absolute", right: 20, bottom: 270 }}
      />
    </div>
  );
};
