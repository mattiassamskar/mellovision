import React, { Component } from "react";
import "./App.css";
import Voting, { Vote } from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";

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

      const left: Vote[] = prevState.votes.slice(0, index);
      const right: Vote[] = prevState.votes.slice(index + 1);
      return {
        votes: left.concat(changedVote, right)
      };
    });
  };

  render() {
    const renderVoteList = () => {
      return (
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Artist</th>
              <th>M</th>
              <th>F</th>
              <th>K</th>
            </tr>
          </thead>
          <tbody>
            {this.state.votes.map(vote => (
              <tr>
                <td>{vote.user}</td>
                <td>{vote.artist}</td>
                <td>{vote.music}</td>
                <td>{vote.performance}</td>
                <td>{vote.clothes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return (
      <div className="App">
        <div className="row input">
          <Voting votes={this.state.votes} />
        </div>
        <div className="row votes">{renderVoteList()}</div>
      </div>
    );
  }
}

export default App;
