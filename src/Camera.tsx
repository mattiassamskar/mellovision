import Webcam from "react-webcam";

interface Props {}

export const Camera: React.FC<Props> = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Webcam videoConstraints={{ height: 500, width: 300 }} />
      <Button />
    </div>
  );
};
