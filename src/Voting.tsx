import React, { Component } from "react";
import Select from "react-select";
import VotePicker from "./VotePicker";
import { addVote, updateVote } from "./FirebaseService";

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
        {
          value: "Ashes to Ashes – Anna Bergendahl",
          label: "Ashes to Ashes – Anna Bergendahl"
        },
        {
          value: "Chasing Rivers – Nano",
          label: "Chasing Rivers – Nano"
        },
        {
          value: "Hello – Mohombi",
          label: "Hello – Mohombi"
        },
        {
          value: "Mina bränder – Zeana",
          label: "Mina bränder – Zeana"
        },
        {
          value: "Mina fyra årstider – Arja Saijonmaa",
          label: "Mina fyra årstider – Arja Saijonmaa"
        },
        {
          value: "No Drama – High15",
          label: "No Drama – High15"
        },
        {
          value: "Not With Me – Wiktoria",
          label: "Not With Me – Wiktoria"
        },
      ],
      selectedArtist: undefined,
      musicVote: undefined,
      performanceVote: undefined,
      clothesVote: undefined
    };
  }

  handleChangeArtist = (selectedArtist: any) => this.setState({ selectedArtist });
  handleChangeMusicVote = (musicVote: any) => this.setState({ musicVote });
  handleChangePerformanceVote = (performanceVote: any) => this.setState({ performanceVote });
  handleChangeClothesVote = (clothesVote: any) => this.setState({ clothesVote });
  handleVoteButtonClick = () => {
    this.vote();
    this.setState({ selectedArtist: undefined, musicVote: undefined, performanceVote: undefined, clothesVote: undefined });
  }

  vote = () => {
    const vote: Vote | undefined = this.props.votes.find(
      vote =>
        vote.user === "Elin" &&
        vote.artist === this.state.selectedArtist.value
    );

    if (vote) {
      updateVote({
        ...vote,
        artist: this.state.selectedArtist.value,
        music: this.state.musicVote.value,
        performance: this.state.performanceVote.value,
        clothes: this.state.clothesVote.value
      });
    } else {
      addVote({
        user: "Elin",
        artist: this.state.selectedArtist.value,
        music: this.state.musicVote.value,
        performance: this.state.performanceVote.value,
        clothes: this.state.clothesVote.value
      });
    }
  }

  render() {
    const renderArtistPicker = () => {
      return (
        <Select
          value={this.state.selectedArtist}
          onChange={this.handleChangeArtist}
          options={this.state.artists}
          placeholder="Välj artist.."
        />
      );
    };

    return (
      <div>
        <div className="twelve columns">
          {renderArtistPicker()}
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangeMusicVote}
            vote={this.state.musicVote}
            placeHolder="Rösta på låten.." />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangePerformanceVote}
            vote={this.state.performanceVote}
            placeHolder="Rösta på framträdandet.." />
        </div>
        <div className="twelve columns">
          <VotePicker
            onChange={this.handleChangeClothesVote}
            vote={this.state.clothesVote}
            placeHolder="Rösta på kläderna.." />
        </div>
        <div className="twelve columns">
          <button
            type="button"
            className="button-primary"
            onClick={this.handleVoteButtonClick}>
            Rösta!
            </button>
        </div>
      </div>
    );
  }
}

export default Voting;
