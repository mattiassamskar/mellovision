import React, { Component } from "react";
import "./App.css";
import Voting, { Vote } from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";
import VoteList from "./VoteList/VoteList";
import Login from "./Login/Login";
import TotalTopList from "./TotalTopList";
import Chat, { UserComment } from "./Chat/Chat";

interface State {
  votes: Vote[];
  comments: UserComment[];
  user: string;
  chatIsVisible: boolean;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { votes: [], comments: [], user: "", chatIsVisible: false };
  }

  artists = [
    "Kadiatou – One touch",
    "Lillasyster – Pretender",
    "Jessica Andersson – Horizon",
    "Paul Rey –The missing piece",
    "Arvingarna – Tänker inte alls gå hem",
    "Nathalie Brydolf – Fingerprints",
    "Danny Saucedo – Dandi dansa",
  ];

  key = "20210206";

  componentDidMount() {
    const user = localStorage.getItem(this.key);
    if (user !== null) this.setState({ user: user });
    initFirebaseVotes(
      this.onVoteAdded,
      this.onVoteChanged,
      this.onCommentAdded
    );
  }

  onUserSet = (user: string) => {
    localStorage.setItem(this.key, user);
    this.setState({ user: user });
  };

  onVoteAdded = (vote: Vote) => {
    this.setState((prevState: State) => {
      return {
        votes: [vote, ...prevState.votes],
      };
    });
  };

  onVoteChanged = (changedVote: Vote) => {
    this.setState((prevState: State) => {
      const index: number = prevState.votes.findIndex(
        (vote: Vote) => vote.key === changedVote.key
      );

      const left = prevState.votes.slice(0, index);
      const right = prevState.votes.slice(index + 1);
      return {
        votes: left.concat(changedVote, right),
      };
    });
  };

  onCommentAdded = (comment: UserComment) => {
    this.setState((prevState: State) => {
      return {
        comments: [...prevState.comments, comment],
      };
    });
  };

  render() {
    return (
      <div className="container App">
        <div
          className="row"
          style={{
            marginTop: "1vh",
            marginBottom: "5vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="logo.svg"
            style={{ width: "60%", height: "60%", maxWidth: "600px" }}
            alt="logo"
          />
        </div>
        {this.state.user === "" ? (
          <Login onUserSet={this.onUserSet} />
        ) : (
          <Voting
            user={this.state.user}
            votes={this.state.votes}
            artists={this.artists}
          />
        )}
        <VoteList votes={this.state.votes} artists={this.artists} />
        <TotalTopList votes={this.state.votes} artists={this.artists} />
        <Chat user={this.state.user} comments={this.state.comments} />
      </div>
    );
  }
}

export default App;
