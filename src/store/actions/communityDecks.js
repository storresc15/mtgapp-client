import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_COMMUNITY_DECKS } from "../actionTypes";

export const loadAllDecks = communityDecks => ({
	type: GET_COMMUNITY_DECKS,
	communityDecks
});


export const fetchCommunityDecks = () => {
	return dispatch => {
		return apiCall("get", "/decks/alldecks")
			.then(res =>{
		//console.log('Got this response: ' + JSON.stringify(res))	
		dispatch(loadAllDecks(res));
		})
			.catch(err => {
			dispatch(addError(err));
				   });
	};
}

