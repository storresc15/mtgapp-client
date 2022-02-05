import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMyDecks } from "../store/actions/decks";
import SingleDeckDisplay from './SingleDeckDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DeckMain from './DeckMain';

class MyDecks extends Component {
  /*state = {
	userId: "613e6c983126ff0e8",},fe1feb"
	deckId: ""  
  };*/
	
	
	componentDidMount() {
    //this.makeApiCall(this.state.userId);
	this.props.fetchMyDecks();
	
	}

//Will need to fix to instead of returning the decklist let variable return the JSX and map it in there.
  render() {
	const { myDecks } = this.props;
	console.log(myDecks)	
	  
	  return (
		  <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
			  {/*isSubmitting && <CircularProgress />*/}
			  {myDecks.map(m => (	  
		<SingleDeckDisplay key={m._id} deckId={m._id} date={m.createAt} name={m.name} description={m.description} username={m.user.firstName} cards={m.cards}/>
            ))}
          </Grid>
        </Container>  
	  ) 
}
}

function mapStateToProps(state) {
	return {
		myDecks: state.decks
	};
}

export default connect(mapStateToProps, { fetchMyDecks })(MyDecks);