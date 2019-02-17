import React from "react";
import { Vote } from "./Voting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMusic,
  faTshirt
} from "@fortawesome/free-solid-svg-icons";
import { calculateVoteScore } from "./utils";

interface State {}

interface Props {
  artists: string[];
  votes: Vote[];
}

class VoteList extends React.Component<Props, State> {
  groupedTopList = () => {
    const toplistPerArtist = this.props.artists.map(artist => {
      const artistVotes = this.props.votes.filter(
        vote => vote.artist === artist
      );
      artistVotes.sort((a, b) => calculateVoteScore(b) - calculateVoteScore(a));

      return {
        artist,
        votes: artistVotes
      };
    });
    toplistPerArtist.reverse();
    return toplistPerArtist.filter(toplist => toplist.votes.length > 0);
  };

  render() {
    return (
      <div className="row votelist">
        <div>
          <h4>Röster</h4>
        </div>
        <div className="twelve columns">
          {this.groupedTopList().map(toplist => (
            <div
              key={toplist.artist}
              style={{
                marginBottom: "1rem",
                marginRight: "1rem"
              }}
            >
              <b>{toplist.artist}</b>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5rem"
                }}
              >
                <div style={{ width: "70%" }} />
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginLeft: "10px"
                  }}
                >
                  <FontAwesomeIcon icon={faMusic} size="xs" />
                  <FontAwesomeIcon icon={faMicrophone} size="xs" />
                  <FontAwesomeIcon icon={faTshirt} size="xs" />
                </div>
              </div>
              <div>
                {toplist.votes.map(vote => (
                  <div
                    key={vote.user}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "70%", overflow: "hidden" }}>
                      <div>{vote.user}</div>
                    </div>
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "10px"
                      }}
                    >
                      <span>{vote.music}</span>
                      <span>{vote.performance}</span>
                      <span>{vote.clothes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default VoteList;
