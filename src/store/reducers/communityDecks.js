import { GET_COMMUNITY_DECKS } from "../actionTypes";

const communityDeck = (state = [], action) => {
	switch (action.type) {
		case GET_COMMUNITY_DECKS:
			return [...action.communityDecks];
		default: 
			return state;
	}
}

export default communityDeck;