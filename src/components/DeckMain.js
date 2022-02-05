import React from "react";
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchCards } from "../store/actions/cards";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import DeckMainPanel from './DeckMainPanel';


const DeckMain = props => {
	
	const { deckId, owner, name, description, date } = props.location.state;
	const cards = props.cards;
	const { errors } = props;
	
	useEffect(() => {
		props.fetchCards(deckId);
		console.log(cards);
		console.log('The cards: ' + cards);
		console.log('The deck id from deck main: ' + deckId);
	},[])
	
return (
	<>
	{errors.message && <div>{errors.message}</div>}
	<Grid container spacing={1}>
		<Grid item xs={12} md={12}>
		<h1>{name}</h1>
		<DeckMainPanel deckId={deckId} owner={owner} name={name} description={description} date={date} cards={cards} />
		</Grid>
  </Grid>	
	</>
);

}

function mapStateToProps(state) {
	return {
		errors: state.errors,
		cards: state.cards
	};
}

export default connect(mapStateToProps, { fetchCards })(DeckMain);