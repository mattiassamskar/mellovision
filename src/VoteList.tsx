import React from "react";
import { Vote } from "./Voting";

interface State {}

interface Props {
  votes: Vote[];
}

class VoteList extends React.Component<Props, State> {
  render() {
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
          {this.props.votes.map(vote => (
            <tr key={vote.key}>
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
  }
}

export default VoteList;
