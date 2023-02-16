import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Vote } from "./Voting";
import { UserComment } from "./Chat/Chat";

const VOTES = "votes";
const COMMENTS = "comments";

firebase.initializeApp({
  databaseURL: "https://eurovision-340ed.firebaseio.com",
  storageBucket: "gs://eurovision-340ed.appspot.com",
});

export const initFirebaseVotes = (
  onVoteAdded: (vote: Vote) => void,
  onVoteChanged: (vote: Vote) => void,
  onCommentAdded: (comment: UserComment) => void
) => {
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
        clothes: child.val().clothes,
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
        clothes: child.val().clothes,
      });
    });

  firebase
    .database()
    .ref(COMMENTS)
    .on("child_added", (child: any) => {
      onCommentAdded({
        key: child.key,
        user: child.val().user,
        comment: child.val().comment,
        imageUrl: child.val().imageUrl,
      });
    });
};

export const addVote = (vote: Vote) => {
  firebase.database().ref(VOTES).push(vote);
};

export const updateVote = (vote: Vote) => {
  firebase
    .database()
    .ref(VOTES + "/" + vote.key)
    .set(vote);
};

export const addComment = (comment: UserComment) => {
  firebase.database().ref(COMMENTS).push(comment);
};

export const uploadImage = async (bytes: string): Promise<string> => {
  const name = uuidv4() + ".jpg";
  const ref = firebase.storage().ref().child(name);
  await ref.putString(bytes, "data_url");
  return await ref.getDownloadURL();
};
