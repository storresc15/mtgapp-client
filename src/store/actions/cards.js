import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_CARDS } from '../actionTypes';

export const loadCards = (cards) => ({
  type: GET_CARDS,
  cards
});

export const fetchCards = (deckId) => {
  const id = deckId.replace(/^"(.+(?="$))"$/, '$1');
  return (dispatch) => {
    return apiCall('get', `/api/decks/${id}/cards`)
      .then((res) => {
        dispatch(loadCards(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};
//To review and add a story to post cards from  redux
export const saveCardsToDeck = (card, deckId) => /*(dispatch, getState)  => */ {
  //get current user from state - Do we need this??
  //let { currentUser } = getState();
  //const userId = currentUser.user.id;
  const id = deckId.replace(/^"(.+(?="$))"$/, '$1');

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `/api/decks/${id}/cards`, card)
        .then((res) => {
          //dispatch(removeError());
          dispatch(loadCards(res));
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
};

export const removeCardFromDeck = (deckId, data) => {
  const id = deckId.replace(/^"(.+(?="$))"$/, '$1');

  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('post', `/api/decks/${id}/cards/remove`, data)
        .then((res) => {
          //dispatch(removeError());
          dispatch(loadCards(res));
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
};
