import { GET_SIDEDECKS } from '../actionTypes';

const sideDeck = (state = [], action) => {
  switch (action.type) {
    case GET_SIDEDECKS:
      return [...action.sideDecks];
    default:
      return state;
  }
};

export default sideDeck;
