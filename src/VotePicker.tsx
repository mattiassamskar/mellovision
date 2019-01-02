import React from "react";

interface State {}

interface Props {
  onChange: (vote: any) => void;
  placeHolder: string;
  vote: any;
}

class VotePicker extends React.Component<Props, State> {
  render() {
    const renderOptions = () => {
      return [1, 2, 3, 4, 5].map(value => (
        <option value={value}>{value}</option>
      ));
    };

    return (
      <div>
        <select className="u-full-width">{renderOptions()}</select>
      </div>
    );
  }
}

export default VotePicker;
