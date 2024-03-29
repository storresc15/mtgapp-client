import { GET_REVIEWS } from '../actionTypes';

const review = (state = [], action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return [...action.reviews];
    default:
      return state;
  }
};

export default review;