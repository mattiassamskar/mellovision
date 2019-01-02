import firebase from "firebase";
import { Vote } from "./Voting";

const VOTES = "votes";

export const initFirebaseVotes = (
  onVoteAdded: (vote: Vote) => void,
  onVoteChanged: (vote: Vote) => void
) => {

  firebase.initializeApp({
    "databaseURL": "https://eurovision-340ed.firebaseio.com",
  });

  firebase
    .database()
    .ref(VOTES)
    .on("child_added", (child: any) => {
      onVoteAdded({
        key: child.key,
        user: child.val().user,
        artist: child.val().artist,
        music: child.val().music,
        performance: child.val().performance,
        clothes: child.val().clothes
      });
    });

  firebase
    .database()
    .ref(VOTES)
    .on("child_changed", (child: any) => {
      onVoteChanged({
        key: child.key,
        user: child.val().user,
        artist: child.val().artist,
        music: child.val().music,
        performance: child.val().performance,
        clothes: child.val().clothes
      });
    });
};

export const addVote = (vote: Vote) => {
  firebase
    .database()
    .ref(VOTES)
    .push(vote);
};

export const updateVote = (vote: Vote) => {
  firebase
    .database()
    .ref(VOTES + "/" + vote.key)
    .set(vote);
};
