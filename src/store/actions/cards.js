import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { GET_CARDS, SAVE_CARD_TO_DECK } from "../actionTypes";


export const loadCards = cards => ({
	type: GET_CARDS,
	cards
});

export const fetchCards = (deckId) => {
	const id = deckId.replace(/^"(.+(?="$))"$/, '$1');
	return dispatch => {
		return apiCall("get", `/decks/${id}/cards`)
			.then(res =>{
		dispatch(loadCards(res));	
		})
			.catch(err => {
			dispatch(addError(err.message));
				   });
	};
}
//To review and add a story to post cards from  redux
export const saveCardsToDeck = (card, deckId) => /*(dispatch, getState)  => */{
	//get current user from state - Do we need this??
	//let { currentUser } = getState();
	//const userId = currentUser.user.id;
	const id = deckId.replace(/^"(.+(?="$))"$/, '$1');
	
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("post", `/decks/${id}/cards`, card )
		.then(res => {
			//dispatch(removeError());	
			resolve();
			})
		.catch(err => {
			dispatch(addError(err.message));
			reject();	
			});
		})
	}
}