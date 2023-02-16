import React from "react";
import "./Login.css";

interface State {
  user: string;
}

interface Props {
  onUserSet: (user: string) => void;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: "",
    };
  }

  render() {
    return (
      <div className="row login shake">
        <div className="twelve columns">
          <h3>Hej! Vad heter du?</h3>
          <input
            type="text"
            className="u-full-width"
            value={this.state.user}
            onChange={(event) => this.setState({ user: event.target.value })}
          />
          <button
            type="button"
            className="button-primary"
            onClick={() => this.props.onUserSet(this.state.user)}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
