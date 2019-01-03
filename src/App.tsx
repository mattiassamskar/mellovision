import React, { Component } from "react";
import "./App.css";
import Voting, { Vote } from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";
import VoteList from "./VoteList";
import TopList from "./TopList";

interface State {
  votes: Vote[];
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { votes: [] };
  }

  componentDidMount(): void {
    initFirebaseVotes(this.onVoteAdded, this.onVoteChanged);
  }

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
        <div className="row">
          <img src="logo.png" width="100%" />
        </div>
        <Voting votes={this.state.votes} />
        <VoteList votes={this.state.votes} />
        <TopList votes={this.state.votes} />
      </div>
    );
  }
}

export default App;
