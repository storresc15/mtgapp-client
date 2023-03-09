import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import decks from './decks';
import cards from './cards';
import communityDecks from './communityDecks';
import sideDecks from './sideDecks';
import reviews from './reviews';

const rootReducer = combineReducers({
  currentUser,
  errors,
  communityDecks,
  decks,
  sideDecks,
  cards,
  reviews
});

export default rootReducer;
