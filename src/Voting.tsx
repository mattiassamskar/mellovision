import React, { Component } from "react";
import { addVote, updateVote } from "./FirebaseService";
import VotePicker from "./VotePicker";

export interface Vote {
  key?: string;
  user: string;
  artist: string;
  music: number;
  performance: number;
  clothes: number;
}

interface State {
  artists: any[];
  selectedArtist: any;
  musicVote: any;
  performanceVote: any;
  clothesVote: any;
}

interface Props {
  votes: Vote[];
}

class Voting extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      artists: [
        "Ashes to Ashes – Anna Bergendahl",
        "Chasing Rivers – Nano",
        "Hello – Mohombi",
        "Mina bränder – Zeana",
        "Mina fyra årstider – Arja Saijonmaa",
        "No Drama – High15",
        "Not With Me – Wiktoria"
      ],
      selectedArtist: "",
      musicVote: "",
      performanceVote: "",
      clothesVote: ""
    };
  }

  handleVoteButtonClick = () => {
    if (
      !this.state.selectedArtist ||
      !this.state.musicVote ||
      !this.state.performanceVote ||
      !this.state.clothesVote
    ) {
      return;
    }

    this.vote();
    this.setState({
      selectedArtist: "",
      musicVote: "",
      performanceVote: "",
      clothesVote: ""
    });
  };

  vote = () => {
    const vote = this.props.votes.find(
      vote =>
        vote.user === "Mattias" && vote.artist === this.state.selectedArtist
    );

    if (vote) {
      updateVote({
        ...vote,
        artist: this.state.selectedArtist,
        music: this.state.musicVote,
        performance: this.state.performanceVote,
        clothes: this.state.clothesVote
      });
    } else {
      addVote({
        user: "Mattias",
        artist: this.state.selectedArtist,
        music: this.state.musicVote,
        performance: this.state.performanceVote,
        clothes: this.state.clothesVote
      });
    }
  };

  render() {
    return (
      <div className="row voting">
        <div>
          <h4>Din röst</h4>
        </div>

        <div className="twelve columns">
          <VotePicker
            onChange={selectedArtist => this.setState({ selectedArtist })}
            value={this.state.selectedArtist}
            values={this.state.artists}
            placeHolder="Välj artist.."
          />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={musicVote => this.setState({ musicVote })}
            value={this.state.musicVote}
            values={[1, 2, 3, 4, 5]}
            placeHolder="Betygsätt musiken.."
          />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={performanceVote => this.setState({ performanceVote })}
            value={this.state.performanceVote}
            values={[1, 2, 3, 4, 5]}
            placeHolder="Betygsätt framträdandet.."
          />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={clothesVote => this.setState({ clothesVote })}
            value={this.state.clothesVote}
            values={[1, 2, 3, 4, 5]}
            placeHolder="Betygsätt kläderna.."
          />
        </div>
        <div className="twelve columns">
          <button
            type="button"
            className="button-primary"
            onClick={this.handleVoteButtonClick}
          >
            Rösta!
          </button>
        </div>
      </div>
    );
  }
}

export default Voting;
