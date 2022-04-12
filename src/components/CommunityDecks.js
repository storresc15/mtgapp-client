import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCommunityDecks } from '../store/actions/communityDecks';
import SingleDeckDisplay from './SingleDeckDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

//To be deleted after the form component is finished
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const CommunityDecks = (props) => {
  useEffect(() => {
    props.fetchCommunityDecks();
  }, []);

  //Will need to fix to instead of returning the decklist let variable return the JSX and map it in there.
  const { communityDecks } = props;
  console.log(communityDecks);

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
    communityDecks: state.communityDecks
  };
}

export default connect(mapStateToProps, { fetchCommunityDecks })(
  CommunityDecks
);
