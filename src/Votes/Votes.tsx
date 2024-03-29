import styles from "./Votes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMusic,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";
import { calculateVoteScore } from "../utils";
import { Vote } from "../types";

export const Votes = ({
  artists,
  votes,
}: {
  artists: string[];
  votes: Vote[];
}) => {
  const getArtistVotes = () => {
    const voteList = artists.map((artist) => {
      const artistVotes = votes.filter((vote) => vote.artist === artist);
      artistVotes.sort((a, b) => calculateVoteScore(b) - calculateVoteScore(a));
      return {
        artist,
        votes: artistVotes,
      };
    });
    voteList.reverse();
    return voteList.filter((votelist) => votelist.votes.length > 0);
  };

  return (
    <div className={`row ${styles.container}`}>
      <div className="twelve columns">
        <h4>RÖSTER</h4>
        {getArtistVotes().map((artistVotes) => (
          <div key={artistVotes.artist}>
            <div className={styles.header}>{artistVotes.artist}</div>
            <div className={styles.vote}>
              <div className={styles.left} />
              <div className={styles.right}>
                <FontAwesomeIcon icon={faMusic} color="#e97db1" size="xs" />
                <FontAwesomeIcon
                  icon={faMicrophone}
                  color="#e97db1"
                  size="xs"
                />
                <FontAwesomeIcon icon={faTshirt} color="#e97db1" size="xs" />
              </div>
            </div>
            {artistVotes.votes.map((vote) => (
              <div key={vote.user} className={styles.vote}>
                <div className={styles.left}>{vote.user}</div>
                <div className={styles.right}>
                  <div>{vote.music}</div>
                  <div>{vote.performance}</div>
                  <div>{vote.clothes}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
