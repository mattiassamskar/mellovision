import React from "react";
import { Vote } from "./Voting";

interface State {}

interface Props {
  artists: string[];
  votes: Vote[];
}

interface ArtistPoint {
  artist: string;
  points: number;
}

class TotalTopList extends React.Component<Props, State> {
  calculateToplist = (): ArtistPoint[] => {
    const artistPoints = this.props.artists.map(artist => {
      const points = this.props.votes
        .filter(vote => vote.artist === artist)
        .reduce(
          (acc, curr) =>
            acc + curr.music * 3 + curr.performance * 2 + curr.clothes * 1,
          0
        );

      return {
        artist,
        points
      };
    });

    artistPoints.sort((a, b) => b.points - a.points);
    return artistPoints;
  };

  render() {
    return (
      <div className="row totaltoplist-container">
        <div>
          <h4>Totaltoppen</h4>
        </div>
        <div className="twelve columns">
          {this.calculateToplist().map((topList, index) => (
            <div key={topList.artist} className="totaltoplist-item">
              <div>{index + 1}. {topList.artist}</div>
              <div>{topList.points}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TotalTopList;
