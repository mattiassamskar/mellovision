import styles from "./TopList.module.css";
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
    <div className={`row ${styles.container}`}>
      <h4>TOPPLISTAN</h4>
      <div className="twelve columns">
        {calculateToplist().map((topList) => (
          <div key={topList.artist} className={styles.item}>
            <span className={styles.artist}>{topList.artist}</span>
            <div>{Math.round(topList.points)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
