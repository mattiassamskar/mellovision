import { useState } from "react";
import { addVote, updateVote } from "../firebase";
import { Vote } from "../types";
import VotePicker from "./VotePicker";

interface Props {
  votes: Vote[];
  user: string;
  artists: string[];
}

export const Voting = (props: Props) => {
  const [selectedArtist, setSelectedArtist] = useState("");
  const [musicVote, setMusicVote] = useState("");
  const [performanceVote, setPerformanceVote] = useState("");
  const [clothesVote, setClothesVote] = useState("");

  const vote = () => {
    const vote = props.votes.find(
      (vote) => vote.user === props.user && vote.artist === selectedArtist
    );

    if (vote) {
      updateVote({
        ...vote,
        artist: selectedArtist,
        music: +musicVote,
        performance: +performanceVote,
        clothes: +clothesVote,
      });
    } else {
      addVote({
        user: props.user,
        artist: selectedArtist,
        music: +musicVote,
        performance: +performanceVote,
        clothes: +clothesVote,
      });
    }
  };

  const handleVoteButtonClick = () => {
    if (!selectedArtist || !musicVote || !performanceVote || !clothesVote) {
      return;
    }

    vote();

    setSelectedArtist("");
    setMusicVote("");
    setPerformanceVote("");
    setClothesVote("");
  };

  return (
    <div className="row voting">
      <div>
        <h4>DIN RÖST</h4>
      </div>

      <div className="twelve columns">
        <VotePicker
          onChange={(selectedArtist) => setSelectedArtist(selectedArtist)}
          value={selectedArtist}
          values={props.artists}
          placeHolder="Välj artist.."
        />
      </div>
      <div className="twelve columns">
        <VotePicker
          onChange={(musicVote) => setMusicVote(musicVote)}
          value={musicVote}
          values={[1, 2, 3, 4, 5]}
          placeHolder="Betygsätt musiken.."
        />
      </div>
      <div className="twelve columns">
        <VotePicker
          onChange={(performanceVote) => setPerformanceVote(performanceVote)}
          value={performanceVote}
          values={[1, 2, 3, 4, 5]}
          placeHolder="Betygsätt framträdandet.."
        />
      </div>
      <div className="twelve columns">
        <VotePicker
          onChange={(clothesVote) => setClothesVote(clothesVote)}
          value={clothesVote}
          values={[1, 2, 3, 4, 5]}
          placeHolder="Betygsätt kläderna.."
        />
      </div>
      <div className="twelve columns">
        <button
          type="button"
          className="button-primary"
          onClick={handleVoteButtonClick}
        >
          Rösta!
        </button>
      </div>
    </div>
  );
};
