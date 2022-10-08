import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCommunityDecks } from '../store/actions/communityDecks';
import SingleDeckDisplay from './SingleDeckDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';

import { logout } from '../store/actions/auth';

const CommunityDecks = (props) => {
  const { errors } = props;
  const history = useHistory();
  const { communityDecks } = props;

  useEffect(() => {
    if (errors && errors.message == 'Session Expired') {
      props.logout();
      history.push({ pathname: '/' });
    } else {
      props.fetchCommunityDecks();
    }
  }, []);

  //console.log(communityDecks);

  return (
    <>
      <h1>Community Decks! Welcome!!</h1>
      <br></br>

      <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {/*isSubmitting && <CircularProgress /> */}
          {communityDecks &&
            communityDecks.map((m) => (
              <SingleDeckDisplay
                key={m._id}
                deckId={m._id}
                date={m.createdDate}
                name={m.name}
                description={m.description}
                cards={m.cards}
                username={m.user.firstName}
                isCommunity={true}
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
    communityDecks: state.communityDecks
  };
}

export default connect(mapStateToProps, { fetchCommunityDecks, logout })(
  CommunityDecks
);
