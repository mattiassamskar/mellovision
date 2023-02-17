import { Vote } from "./types";

export const calculateVoteScore = (vote: Vote) => {
  return vote.music * 3 + vote.performance * 2 + vote.clothes * 1;
};
