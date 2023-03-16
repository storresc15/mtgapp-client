import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyDecks } from '../store/actions/decks';
import SingleDeckDisplay from './SingleDeckDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { useHistory } from 'react-router-dom';
import { logout } from '../store/actions/auth';

import NewDeck from './NewDeck';

const MyDecks = (props) => {
  /*state = {
	userId: "613e6c983126ff0e8",},fe1feb"
	deckId: ""  
  };*/
  const { myDecks } = props;
  const { errors } = props;
  const history = useHistory();

  useEffect(() => {
    if (errors && errors.message == 'Session Expired') {
      props.logout();
      history.push({ pathname: '/' });
    } else {
      props.fetchMyDecks();
    }
    console.log(errors);
  }, []);

  return (
    <>
      {errors.message && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Collapse in={open}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.message}
            </Alert>
          </Collapse>{' '}
        </Stack>
      )}
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
    errors: state.errors,
    myDecks: state.decks
  };
}

export default connect(mapStateToProps, { fetchMyDecks, logout })(MyDecks);
