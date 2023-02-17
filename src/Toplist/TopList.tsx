import { Vote } from "../types";
import { calculateVoteScore } from "../utils";

export const TopList = ({
  artists,
  votes,
}: {
  artists: string[];
  votes: Vote[];
}) => {
  const calculateToplist = () => {
    const artistPoints = artists.map((artist) => {
      const artistVotes = votes.filter((vote) => vote.artist === artist);
      const points =
        artistVotes.reduce((acc, curr) => acc + calculateVoteScore(curr), 0) /
          artistVotes.length || 0;
      return {
        artist,
        points,
      };
    });

    artistPoints.sort((a, b) => b.points - a.points);
    return artistPoints;
  };

  return (
    <div className="row totaltoplist-container">
      <div>
        <h4>TOPPLISTAN</h4>
      </div>
      <ul className="twelve columns">
        {calculateToplist().map((topList) => (
          <li key={topList.artist} className="totaltoplist-item">
            <span className="totaltoplist-artist">{topList.artist}</span>
            <div>{Math.round(topList.points)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
