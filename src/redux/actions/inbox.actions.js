import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestChannels: ["token"],
  loadChannelsDone: null,

  // requestMessages: ["limit", "token"],

  requestAddFriend: ["username", "token"],
  addFriendSuccess: null,
  addFriendFailure: null,

  requestAcceptFriend: ["user_id", "token"],
  acceptFriendSuccess: null,
  acceptFriendFailure: null,

  requestRejectFriend: ["user_id", "token"],
  rejectFriendSuccess: null,
  rejectFriendFailure: null,

  requestPendingFriends: ["token"],
  pendingFriendsSuccess: ["pendingData"],
  pendingFriendsFailure: null,

  requestFriends: ["token"],
  requestFriendsSuccess: ["friends"],
  requestFriendsFailure: null,
});

export const InboxTypes = Types;
export const InboxCreators = Creators;
