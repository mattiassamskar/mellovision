import React, { Component } from "react";
import Select from "react-select";
import VotePicker from "./VotePicker";

interface State {
  artists: any[];
  selectedArtist: string;
  musicVote: number;
  performanceVote: number;
  clothesVote: number;
}

interface Props {
}

class Voting extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      artists: [
        {
          value: "Artist 1",
          label: "Artist 1"
        },
        {
          value: "Artist 2",
          label: "Artist 2"
        },
        {
          value: "Artist 3",
          label: "Artist 3"
        },
        {
          value: "Artist 4",
          label: "Artist 4"
        },
      ],
      selectedArtist: "",
      musicVote: 0,
      performanceVote: 0,
      clothesVote: 0,
    }
  }

  handleChangeArtist = (selectedArtist: any) => this.setState({ selectedArtist });
  handleChangeMusicVote = (musicVote: any) => this.setState({ musicVote });
  handleChangePerformanceVote = (performanceVote: any) => this.setState({ performanceVote });
  handleChangeClothesVote = (clothesVote: any) => this.setState({ clothesVote });
  handleVoteButtonClick = () => {
    this.setState({ selectedArtist: "", musicVote: 0, performanceVote: 0, clothesVote: 0 });
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
