import React from "react";
import { Vote } from "../Voting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMusic,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";
import { calculateVoteScore } from "../utils";
import "./VoteList.css";

interface State {}

interface Props {
  artists: string[];
  votes: Vote[];
}

class VoteList extends React.Component<Props, State> {
  artistVoteLists = () => {
    const voteList = this.props.artists.map((artist) => {
      const votes = this.props.votes.filter((vote) => vote.artist === artist);
      votes.sort((a, b) => calculateVoteScore(b) - calculateVoteScore(a));
      return {
        artist,
        votes,
      };
    });
    voteList.reverse();
    return voteList.filter((votelist) => votelist.votes.length > 0);
  };

  renderVoteListHeader = () => (
    <div className="votelist-vote">
      <div className="votelist-left" />
      <div className="votelist-right">
        <FontAwesomeIcon icon={faMusic} size="xs" color="#e97db1" />
        <FontAwesomeIcon icon={faMicrophone} color="#e97db1" size="xs" />
        <FontAwesomeIcon icon={faTshirt} color="#e97db1" size="xs" />
      </div>
    </div>
  );

  renderVote = (vote: Vote) => (
    <div key={vote.user} className="votelist-vote">
      <div className="votelist-left">{vote.user}</div>
      <div className="votelist-right">
        <div>{vote.music}</div>
        <div>{vote.performance}</div>
        <div>{vote.clothes}</div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="row votelist-container">
        <div className="twelve columns">
          <h4>RÖSTER</h4>
          {this.artistVoteLists().map((votelist) => (
            <div key={votelist.artist} className="votelist">
              <div className="artist-header">{votelist.artist}</div>
              {this.renderVoteListHeader()}
              {votelist.votes.map(this.renderVote)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default VoteList;
