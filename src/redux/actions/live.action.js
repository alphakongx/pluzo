import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setSortBy: ["sortBy"],
  setFilterCountry: ["country"],

  setStreamStatus: ["streamStatus"],
  setIsScrolling: ["isScrolling"],

  /// start strem
  requestStreamStart: ["params", "token"],
  requestStreamStop: ["params", "token"],

  requestStreamList: ["token"],
  streamListSuccess: ["data"],

  requestStreamUserList: ["channel_id", "token"],
  streamUserListSuccess: ["data"],
});

export const LiveTypes = Types;
export const LiveCreators = Creators;
