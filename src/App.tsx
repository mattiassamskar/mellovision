import { Component } from "react";
import "./App.css";
import Voting from "./Voting";
import { initFirebaseVotes } from "./FirebaseService";
import { Votes } from "./Votes/Votes";
import Login from "./Login/Login";
import Chat, { UserComment } from "./Chat/Chat";
import { Vote } from "./types";
import { TopList } from "./Toplist/TopList";

interface State {
  votes: Vote[];
  comments: UserComment[];
  user: string;
  hasUnreadComments: boolean;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      votes: [],
      comments: [],
      user: "",
      hasUnreadComments: false,
    };
  }

  artists = [
    "Paul Rey - Royals",
    "Casanovas - Så kommer känslorna tillbaka",
    "Melanie Wehbe - For the show",
    "Nordman - Släpp alla sorger",
    "Laurell - Sober",
    "Ida-Lova - Låt hela stan se på",
    "Marcus & Martinus - Air",
  ];

  key = "20230218";

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
        hasUnreadComments: true,
        comments: [...prevState.comments, comment],
      };
    });
  };

  onClearUnreadComments = () => {
    this.setState(() => {
      return {
        hasUnreadComments: false,
      };
    });
  };

  render() {
    return (
      <div className="container app">
        <div
          className="row"
          style={{
            marginTop: "1vh",
            marginBottom: "1vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="title">mellovision</div>
        </div>
        {this.state.user === "" ? (
          <Login onUserSet={this.onUserSet} />
        ) : (
          <>
            <Voting
              user={this.state.user}
              votes={this.state.votes}
              artists={this.artists}
            />
            <Votes votes={this.state.votes} artists={this.artists} />
            <TopList votes={this.state.votes} artists={this.artists} />
            <Chat
              user={this.state.user}
              comments={this.state.comments}
              hasUnreadComments={this.state.hasUnreadComments}
              onClearUnreadComments={this.onClearUnreadComments}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
