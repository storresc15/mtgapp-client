import { apiCall } from '../../services/api';
import { addError } from './errors';
import { GET_MY_DECKS } from '../actionTypes';

export const loadDecks = (decks) => ({
  type: GET_MY_DECKS,
  decks
});

export const fetchMyDecks = () => {
  return (dispatch) => {
    return apiCall('get', '/api/decks/mydecks')
      .then((res) => {
        dispatch(loadDecks(res));
      })
      .catch((err) => {
        dispatch(addError(err));
      });
  };
};

//Create deck function
export const createDeck = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('post', '/api/decks', data)
        .then((res) => {
          dispatch(loadDecks(res)); //review response to return decks
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
};

//Update deck function
export const updateDeck = (id, data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('post', '/api/decks/' + id, data)
        .then((res) => {
          dispatch(loadDecks(res)); //review response to return decks
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
};

//Delete deck function
export const deleteDeck = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return apiCall('delete', '/api/decks/' + id)
        .then((res) => {
          dispatch(loadDecks(res)); //review response to return decks
          resolve();
        })
        .catch((err) => {
          dispatch(addError(err));
          reject();
        });
    });
  };
};
