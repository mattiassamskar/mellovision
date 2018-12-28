import React from "react";
import Select from "react-select";

interface State {
}

interface Props {
  onChange: (vote: any) => void;
  placeHolder: string;
  vote: any;
}

class VotePicker extends React.Component<Props, State> {
  voteOptions = [
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    }
  ];

  render() {
    return (
      <div>
        <Select
          value={this.props.vote}
          onChange={this.props.onChange}
          options={this.voteOptions}
          placeholder={this.props.placeHolder}
        />
      </div>
    );
  }
}

export default VotePicker;