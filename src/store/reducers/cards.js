import { GET_CARDS } from '../actionTypes';

const card = (state = [], action) => {
  switch (action.type) {
    case GET_CARDS:
      return [...action.cards];
    default:
      return state;
  }
};

export default card;
