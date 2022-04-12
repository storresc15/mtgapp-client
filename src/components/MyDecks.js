import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyDecks } from '../store/actions/decks';
import SingleDeckDisplay from './SingleDeckDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NewDeck from './NewDeck';

//To be deleted after the form component is finished
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const MyDecks = (props) => {
  /*state = {
	userId: "613e6c983126ff0e8",},fe1feb"
	deckId: ""  
  };*/
  useEffect(() => {
    props.fetchMyDecks();
  }, []);

  //Will need to fix to instead of returning the decklist let variable return the JSX and map it in there.
  const { myDecks } = props;
  console.log(myDecks);

  return (
    <>
      <h1>My Decks</h1>
      <br></br>

      <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <NewDeck></NewDeck>
          </Grid>
          <Grid item xs={8}></Grid>
          {/*isSubmitting && <CircularProgress />*/}
          {myDecks.map((m) => (
            <SingleDeckDisplay
              key={m._id}
              deckId={m._id}
              date={m.createdDate}
              name={m.name}
              description={m.description}
              username={m.user.firstName}
              cards={m.cards}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  return {
    myDecks: state.decks
  };
}

export default connect(mapStateToProps, { fetchMyDecks })(MyDecks);
