import styles from "./MoodList.module.css";
import { Vote } from "../types";
import { calculateVoteScore } from "../utils";

export const calculateMoodlist = (votes: Vote[]) => {
  const userVotes = votes.reduce<{ [key: string]: number }>(
    (a: { [key: string]: number }, b: Vote) => {
      a[b.user] = a[b.user] || 0;
      a[b.user] = a[b.user] + calculateVoteScore(b);
      return a;
    },
    {}
  );
  var userMoods = [...Object.keys(userVotes)].map((user) => ({
    user,
    points: userVotes[user],
  }));
  userMoods.sort((a, b) => b.points - a.points);
  return userMoods.map((userMood) => userMood.user);
};

export const MoodList = ({ votes }: { votes: Vote[] }) => {
  return (
    <div className={`row ${styles.container}`}>
      <h4>HUMÖRTOPPEN</h4>
      <div className="twelve columns">
        {calculateMoodlist(votes).map((user, index) => (
          <div key={user}>
            <span className={styles.index}>{index + 1}. </span>
            <span className={styles.user}>{user}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
