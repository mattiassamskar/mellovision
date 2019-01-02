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
      selectedArtist: undefined,
      musicVote: undefined,
      performanceVote: undefined,
      clothesVote: undefined
    };
  }

  handleChangeArtist = (selectedArtist: any) =>
    this.setState({ selectedArtist });
  handleChangeMusicVote = (musicVote: any) => this.setState({ musicVote });
  handleChangePerformanceVote = (performanceVote: any) =>
    this.setState({ performanceVote });
  handleChangeClothesVote = (clothesVote: any) =>
    this.setState({ clothesVote });
  handleVoteButtonClick = () => {
    this.vote();
    this.setState({
      selectedArtist: undefined,
      musicVote: undefined,
      performanceVote: undefined,
      clothesVote: undefined
    });
  };

  vote = () => {
    const vote: Vote | undefined = this.props.votes.find(
      vote => vote.user === "Elin" && vote.artist === this.state.selectedArtist
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
        user: "Elin",
        artist: this.state.selectedArtist,
        music: this.state.musicVote,
        performance: this.state.performanceVote,
        clothes: this.state.clothesVote
      });
    }
  };

  render() {
    const renderOptions = () => {
      return this.state.artists.map(value => (
        <option value={value}>{value}</option>
      ));
    };

    return (
      <div>
        <div className="twelve columns">
          <select className="u-full-width">{renderOptions()}</select>
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangeMusicVote}
            vote={this.state.musicVote}
            placeHolder="Rösta på låten.."
          />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangePerformanceVote}
            vote={this.state.performanceVote}
            placeHolder="Rösta på framträdandet.."
          />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangeClothesVote}
            vote={this.state.clothesVote}
            placeHolder="Rösta på kläderna.."
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
