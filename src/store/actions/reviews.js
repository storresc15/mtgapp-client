import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_REVIEWS } from '../actionTypes';

export const loadReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
});

export const fetchReviews = (deckId) => {
  const id = deckId.replace(/^"(.+(?="$))"$/, '$1');
  return (dispatch) => {
    return apiCall('get', `/api/decks/${id}/reviews`)
      .then((res) => {
        dispatch(loadReviews(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};