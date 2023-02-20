import { useState } from "react";
import { addVote, updateVote } from "../firebase";
import { Vote } from "../types";
import { VotePicker } from "./VotePicker/VotePicker";
import styles from "./Voting.module.css";

interface Props {
  votes: Vote[];
  user: string;
  artists: string[];
}

export const Voting = (props: Props) => {
  const [artist, setArtist] = useState("");
  const [musicVote, setMusicVote] = useState("");
  const [performanceVote, setPerformanceVote] = useState("");
  const [clothesVote, setClothesVote] = useState("");

  const onClick = () => {
    if (!artist || !musicVote || !performanceVote || !clothesVote) {
      return;
    }

    const vote = props.votes.find(
      (vote) => vote.user === props.user && vote.artist === artist
    );

    if (vote) {
      updateVote({
        ...vote,
        artist,
        music: +musicVote,
        performance: +performanceVote,
        clothes: +clothesVote,
      });
    } else {
      addVote({
        user: props.user,
        artist,
        music: +musicVote,
        performance: +performanceVote,
        clothes: +clothesVote,
      });
    }
    setArtist("");
    setMusicVote("");
    setPerformanceVote("");
    setClothesVote("");
  };

  return (
    <div className={`row ${styles.container}`}>
      <h4>DIN RÖST</h4>
      <VotePicker
        onChange={(value) => setArtist(value)}
        value={artist}
        values={props.artists}
        placeHolder="Välj artist.."
      />
      <VotePicker
        onChange={(value) => setMusicVote(value)}
        value={musicVote}
        values={[1, 2, 3, 4, 5]}
        placeHolder="Betygsätt musiken.."
      />
      <VotePicker
        onChange={(value) => setPerformanceVote(value)}
        value={performanceVote}
        values={[1, 2, 3, 4, 5]}
        placeHolder="Betygsätt framträdandet.."
      />
      <VotePicker
        onChange={(value) => setClothesVote(value)}
        value={clothesVote}
        values={[1, 2, 3, 4, 5]}
        placeHolder="Betygsätt kläderna.."
      />
      <button type="button" className="button-primary" onClick={onClick}>
        Rösta!
      </button>
    </div>
  );
};
