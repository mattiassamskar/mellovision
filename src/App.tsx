import React, { Component } from "react";
import "./App.css";
import Voting from "./Voting";

interface State {
}

interface Props {
}

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App" >
        <div className="row">
          <Voting />
        </div>
      </div>
    );
  }
}

export default App;
