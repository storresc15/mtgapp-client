import { apiCall } from '../../services/api';
import { addError, removeError } from './errors';
import { GET_SIDEDECKS } from '../actionTypes';

export const loadSideDecks = (sideDecks) => ({
  type: GET_SIDEDECKS,
  sideDecks
});

export const fetchSideDecks = (deckId) => {
  //comment
  const id = deckId.replace(/^"(.+(?="$))"$/, '$1');
  return (dispatch) => {
    return apiCall('get', `/decks/${id}/sidedecks`)
      .then((res) => {
        dispatch(loadSideDecks(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};
