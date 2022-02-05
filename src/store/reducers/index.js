import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import decks from "./decks";
import cards from "./cards";

const rootReducer = combineReducers({
	currentUser,
	errors,
	decks,
	cards
});

export default rootReducer;
