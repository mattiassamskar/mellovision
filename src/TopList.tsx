import React from "react";
import { Vote } from "./Voting";

interface UserTopList {
  user: string;
  votes: {
    artist: string;
    points: number;
  }[];
}

interface State {}

interface Props {
  votes: Vote[];
}

class TopList extends React.Component<Props, State> {
  getUsers = () => {
    return this.props.votes
      .map(vote => vote.user)
      .filter((user, index, self) => self.indexOf(user) === index);
  };

  calculateToplists = (): UserTopList[] => {
    return this.getUsers().map(user => {
      const votes = this.props.votes
        .filter(vote => vote.user === user)
        .map(vote => {
          return {
            artist: vote.artist,
            points: vote.music * 3 + vote.performance * 2 + vote.clothes * 1
          };
        });
      votes.sort((vote1, vote2) => vote2.points - vote1.points);
      return {
        user,
        votes
      };
    });
  };

  render() {
    return (
      <div className="row toplists-container">
      <div>
        <h4>Topplistor</h4>
      </div>
        <div className="twelve columns toplists">
          {this.calculateToplists().map(topList => (
            <div>
              <strong>{topList.user}</strong>
              {topList.votes.map((vote, index) => (
                <div>{index + 1}. {vote.artist}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TopList;