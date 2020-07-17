import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  requestSearch: ["keyword", "token"],
  searchSuccess: ["results"],
  searchFailure: null,

  initializeSearch: null,
});

export const SearchTypes = Types;
export const SearchCreators = Creators;
