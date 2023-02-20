interface Props {
  onChange: (vote: any) => void;
  values: any[];
  value: any;
  placeHolder: string;
}

export const VotePicker = (props: Props) => {
  const getOptions = () => {
    const placeHolderOption = (
      <option key="" value="" disabled hidden>
        {props.placeHolder}
      </option>
    );
    const options = props.values.map((value) => (
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
        onChange={(event) => props.onChange(event.target.value)}
        value={props.value}
      >
        {getOptions()}
      </select>
    </div>
  );
};
