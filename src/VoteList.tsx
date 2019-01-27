import React from "react";
import { Vote } from "./Voting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMusic,
  faTshirt
} from "@fortawesome/free-solid-svg-icons";

interface State {}

interface Props {
  votes: Vote[];
}

class VoteList extends React.Component<Props, State> {
  render() {
    return (
      <div className="row votelist">
        <div>
          <h4>Röster</h4>
        </div>
        <div className="twelve columns">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Namn</th>
                <th>Artist</th>
                <th className="centerText">
                  <FontAwesomeIcon icon={faMusic} />
                </th>
                <th className="centerText">
                  <FontAwesomeIcon icon={faMicrophone} />
                </th>
                <th className="centerText">
                  <FontAwesomeIcon icon={faTshirt} />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.votes.map(vote => (
                <tr key={vote.key}>
                  <td>{vote.user}</td>
                  <td>{vote.artist}</td>
                  <td className="centerText" >{vote.music}</td>
                  <td className="centerText">{vote.performance}</td>
                  <td className="centerText">{vote.clothes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default VoteList;
