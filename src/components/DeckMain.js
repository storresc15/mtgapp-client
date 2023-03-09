import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../store/actions/cards';
import { fetchSideDecks } from '../store/actions/sideDecks';
import { fetchReviews } from '../store/actions/reviews';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeckMainPanel from './DeckMainPanel';

import { removeError } from '../store/actions/errors'; //POC for removing errors

const DeckMain = (props) => {
  const { deckId, owner, name, description, date, isCommunity } =
    props.location.state;
  const cards = props.cards;
  const sideDecks = props.sideDecks;
  const reviews = props.reviews;
  const { errors } = props;
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    props.fetchCards(deckId);
    props.fetchSideDecks(deckId);
    props.fetchReviews(deckId);
  }, []);

  return (
    <>
      {errors.message && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                    props.removeError();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errors.message}
            </Alert>
          </Collapse>{' '}
        </Stack>
      )}

      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <h1>{name}</h1>
          <DeckMainPanel
            deckId={deckId}
            owner={owner}
            name={name}
            description={description}
            date={date}
            cards={cards}
            sideDecks={sideDecks}
            reviews={reviews}
            isCommunity={isCommunity}
          />
        </Grid>
      </Grid>
    </>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    cards: state.cards,
    sideDecks: state.sideDecks,
    reviews: state.reviews
  };
}

export default connect(mapStateToProps, {
  fetchCards,
  fetchSideDecks,
  fetchReviews,
  removeError
})(DeckMain);
