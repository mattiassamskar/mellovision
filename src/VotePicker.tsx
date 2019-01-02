import React from "react";

interface State {}

interface Props {
  onChange: (vote: any) => void;
  values: any[];
  value: any;
  placeHolder: string;
}

class VotePicker extends React.Component<Props, State> {
  render() {
    const renderOptions = () => {
      const placeHolderOption = (
        <option key="" value="" disabled hidden>
          {this.props.placeHolder}
        </option>
      );
      const options = this.props.values.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ));

      return [placeHolderOption, options];
    };

    return (
      <div>
        <select
          className="u-full-width"
          onChange={event => this.props.onChange(event.target.value)}
          value={this.props.value}
        >
          {renderOptions()}
        </select>
      </div>
    );
  }
}

export default VotePicker;
