import { GET_MY_DECKS } from "../actionTypes";

const deck = (state = [], action) => {
	switch (action.type) {
		case GET_MY_DECKS:
			return [...action.decks];
		default: 
			return state;
	}
}

export default deck;