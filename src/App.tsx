import { useEffect, useState } from "react";
import "./App.css";
import { Voting } from "./Voting/Voting";
import { initFirebase } from "./firebase";
import { Votes } from "./Votes/Votes";
import { Login } from "./Login/Login";
import { ConnectionState, UserComment, Vote } from "./types";
import { TopList } from "./Toplist/TopList";
import { Chat } from "./Chat/Chat";
import { Refresh } from "./Refresh/Refresh";
import { useDebounce } from "./utils";
import { MoodList } from "./MoodList/MoodList";

const artists = [
  "When I'm Gone - Maria Sur",
  "Back To My Roots- Jay Smith",
  "Awful Liar - Lisa Ajax",
  "Heroes Are Calling - Smash Into Pieces",
  "Give My Heart A Break - Cazzi Opeia",
  "Light - Annika Wickihalder",
  "Unforgettable - Marcus & Martinus",
  "It's Not Easy to Write a Love Song - Dotter",
  "Que Sera - Medina ",
  "Dragon - Liamoo ",
  "Effortless - Jacqline",
  "Happy That You Found Me - Danny Saucedo",
];

const key = "20240309";

export const App = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [comments, setComments] = useState<UserComment[]>([]);
  const [user, setUser] = useState("");
  const [hasUnreadComments, setHasUnreadComments] = useState(false);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("connected");
  const debouncedConnectionState = useDebounce<ConnectionState>(
    connectionState,
    2000
  );

  useEffect(() => {
    setUser(localStorage.getItem(key) || "");
    initFirebase(addVote, changeVote, addComment, setConnectionState);
  }, []);

  const saveUser = (user: string) => {
    localStorage.setItem(key, user);
    setUser(user);
  };

  const addVote = (vote: Vote) => {
    setVotes((currVotes) => [...currVotes, vote]);
  };

  const changeVote = (changedVote: Vote) => {
    setVotes((currVotes) => {
      const index: number = currVotes.findIndex(
        (vote) => vote.key === changedVote.key
      );
      const left = currVotes.slice(0, index);
      const right = currVotes.slice(index + 1);
      return left.concat(changedVote, right);
    });
  };

  const addComment = (comment: UserComment) => {
    setHasUnreadComments(true);
    setComments((currComments) => [...currComments, comment]);
  };

  return (
    <>
      <div className="title">mellovision</div>
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            {!user ? (
              <Login onUserSet={saveUser} />
            ) : (
              <>
                <Voting user={user} votes={votes} artists={artists} />
                <Votes votes={votes} artists={artists} />
                <TopList votes={votes} artists={artists} />
                <MoodList votes={votes} />
                <Chat
                  user={user}
                  comments={comments}
                  hasUnreadComments={hasUnreadComments}
                  clearUnreadFlag={() => setHasUnreadComments(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {debouncedConnectionState === "disconnected" && <Refresh />}
    </>
  );
};

export default App;
