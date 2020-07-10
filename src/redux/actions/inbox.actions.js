import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestChannels: ["token"],
  loadChannelsDone: null,

  // requestMessages: ["limit", "token"],
});

export const InboxTypes = Types;
export const InboxCreators = Creators;
