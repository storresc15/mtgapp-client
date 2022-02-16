import React, { forwardRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveCardsToDeck } from "../store/actions/cards";
import { fetchCards } from "../store/actions/cards";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';


const SingleCardDisplay = props => {
	
	const [isSubmitting, setIsSubmitting] = useState(false); //For disable button
	const [open, setOpen] = React.useState(false); // For toast
	const { saveCardsToDeck } = props;
	const displaySave = props.displaySave;
	

	const handleSave = () => {
		console.log('the deck id from handle save: ' + props.deckId);
		setIsSubmitting(true)
		saveCardAPICall();
		
  };
	
	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false); 
  };

//With the update to handle bulk card call, will need to refactor this inorder to get only the card selected instead of referencing the state card
  const saveCardAPICall = () => {
	  //let idOfDeck = props.deckId.replace(/^"(.+(?="$))"$/, '$1');
	  
	  const data = {
		multiverseid: props.mid,
		name: props.name,
		colors:  props.colors,
		type: props.type, 
		image: props.imgUrl	  
	  };
	  
	  //console.log('the deck id: ' + this.props.deckId);

	  //Handle the saving of the card to the deck
	  console.log('Saving this card: ' + data.name);
	  saveCardsToDeck(JSON.stringify(data), props.deckId)
		  .then(() => {
		  console.log('On the then statement on single card display')
		  setOpen(true);
		  setIsSubmitting(false);
		  //setTimeout(() => {props.fetchCards(props.deckId)}, 1000);  
	  }).catch(error => {
		  //THE ERROR SHOULD GO HERE
		  console.log('We got error message');
		  setIsSubmitting(false);
	  })
	  
  };	

    return (
		<Grid item xs={4} sm={4} md={4}>
    	<div className = "cardContainer">
                <h2>{props.name}</h2>
			{props.mid && <p>MTG Multiverse ID: {props.mid}</p> }		
                <img src={props.imgUrl ? props.imgUrl : "https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg"} alt=""/>
				<br/>
			{displaySave && <Button type="submit" size="large" color="primary" onClick={handleSave} disabled={isSubmitting}>+ Add to Deck</Button> }
			
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Card {props.name} succesfully saved!
        </Alert>
      </Snackbar>

		</div>
		</Grid>	
    );
  }


 const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function mapStateToProps(state) {
	return {
		errors: state.errors,
		cards: state.cards
	};
}

export default connect(mapStateToProps, { saveCardsToDeck, fetchCards })(SingleCardDisplay);