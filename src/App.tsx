import React, { Component } from "react";
import "./App.css";
import Voting, { Vote } from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";
import VoteList from "./VoteList";
import TopList from "./TopList";
import Login from "./Login";

interface State {
  votes: Vote[];
  user: string;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { votes: [], user: "" };
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user !== null) this.setState({ user: user });
    initFirebaseVotes(this.onVoteAdded, this.onVoteChanged);
  }

  onUserSet = (user: string) => {
    localStorage.setItem("user", user);
    this.setState({ user: user });
  };

  onVoteAdded = (vote: Vote) => {
    this.setState((prevState: State) => {
      return {
        votes: [vote, ...prevState.votes]
      };
    });
  };

  onVoteChanged = (changedVote: Vote) => {
    this.setState((prevState: State) => {
      const index: number = prevState.votes.findIndex(
        (vote: Vote) => vote.key === changedVote.key
      );

      const left = prevState.votes.slice(0, index);
      const right = prevState.votes.slice(index + 1);
      return {
        votes: left.concat(changedVote, right)
      };
    });
  };

  render() {
    return (
      <div className="container App">
        <div className="row" style={{ marginTop: "1vh" }}>
          <img src="logo.png" width="100%" />
        </div>
        {this.state.user === "" ? (
          <Login onUserSet={this.onUserSet} />
        ) : (
          <Voting user={this.state.user} votes={this.state.votes} />
        )}
        <VoteList votes={this.state.votes} />
        <TopList votes={this.state.votes} />
      </div>
    );
  }
}

export default App;
