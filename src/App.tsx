import React, { Component } from "react";
import "./App.css";
import Voting, { Vote } from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";
import VoteList from "./VoteList";
import TopList from "./TopList";
import Login from "./Login";
import TotalTopList from "./TotalTopList";
import Chat, { UserComment } from "./Chat";

interface State {
  votes: Vote[];
  comments: UserComment[];
  user: string;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { votes: [], comments: [], user: "" };
  }

  artists = [
    "Andreas Johnson - Army Of Us",
    "Malou Prytz - I Do Me",
    "Oscar Enestad - I Love It",
    "Jan Malmsjö - Leva livet",
    "Vlad Reiser - Nakna i regnet",
    "Hanna Ferm & Liamoo - Hold You",
    "Margaret - Tempo"
  ];

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user !== null) this.setState({ user: user });
    initFirebaseVotes(
      this.onVoteAdded,
      this.onVoteChanged,
      this.onCommentAdded
    );
  }

  onUserSet = (user: string) => {
    localStorage.setItem("user", user);
    this.setState({ user: user });
  };

  onVoteAdded = (vote: Vote) => {
    this.setState((prevState: State) => {
      return {
        votes: [vote, ...prevState.votes]
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
        votes: left.concat(changedVote, right)
      };
    });
  };

  onCommentAdded = (comment: UserComment) => {
    this.setState((prevState: State) => {
      return {
        comments: [...prevState.comments, comment]
      };
    });
  };

  render() {
    return (
      <div className="container App">
        <div className="row" style={{ marginTop: "1vh" }}>
          <img src="logo.png" width="100%" />
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
        <VoteList votes={this.state.votes} />
        {/* <Chat user={this.state.user} comments={this.state.comments} /> */}
        <TotalTopList votes={this.state.votes} artists={this.artists} />
        <TopList votes={this.state.votes} />
      </div>
    );
  }
}

export default App;
