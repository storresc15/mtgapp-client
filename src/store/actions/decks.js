import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_MY_DECKS } from "../actionTypes";

export const loadDecks = decks => ({
	type: GET_MY_DECKS,
	decks
});

export const fetchMyDecks = () => {
	return dispatch => {
		return apiCall("get", "/decks/mydecks")
			.then(res =>{
		dispatch(loadDecks(res));
		})
			.catch(err => {
			dispatch(addError(err));
				   });
	};
}