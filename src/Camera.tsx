import { useRef, useState } from "react";
import Webcam from "react-webcam";

interface Props {
  onTakePicture: (imageSrc: string) => void;
}

export const Camera: React.FC<Props> = (props) => {
  const webcamRef = useRef<Webcam>(null);
  const [source, setSource] = useState<string>("");

  const takePicture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setSource(imageSrc);
    props.onTakePicture(imageSrc);
  };

  const Camera = (
    <>
      <div style={{ height: 300, width: 300 }}>
        <Webcam
          videoConstraints={{
            width: 300,
            aspectRatio: { ideal: 1 },
          }}
          audio={false}
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <button
        type="button"
        className="button-primary button-margin"
        onClick={takePicture}
      >
        Ta kort
      </button>
    </>
  );

  return (
    <div
      style={{
        height: "100%",
        width: 300,
      }}
    >
      {!source ? (
        Camera
      ) : (
        <>
          <img src={source} alt="" />
          <button
            type="button"
            className="button-primary button-margin"
            onClick={() => setSource("")}
          >
            Ta om
          </button>
        </>
      )}
    </div>
  );
};
