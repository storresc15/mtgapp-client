import React, { forwardRef, useState } from 'react';
import { connect } from 'react-redux';
import { saveCardsToDeck } from '../store/actions/cards';
import { fetchCards } from '../store/actions/cards';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import RemoveCard from './RemoveCard';

const SingleCardDisplay = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false); //For disable button
  const [open, setOpen] = React.useState(false); // For toast
  const { saveCardsToDeck } = props;
  const displaySave = props.displaySave;
  const displayRemove = props.displayRemove;

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 230,
      fontSize: theme.typography.pxToRem(13),
      border: '2px solid #dadde9'
    }
  }));

  const handleSave = () => {
    setIsSubmitting(true);
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
      colors: props.colors,
      type: props.type,
      image: props.imgUrl,
      description: props.description,
      supertypes: props.supertypes,
      types: props.types,
      rarity: props.rarity,
      manaCost: props.manaCost
    };

    //console.log('the deck id: ' + this.props.deckId);

    //Handle the saving of the card to the deck
    saveCardsToDeck(JSON.stringify(data), props.deckId)
      .then(() => {
        setOpen(true);
        setIsSubmitting(false);
        //setTimeout(() => {props.fetchCards(props.deckId)}, 1000);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };
  return (
    <Grid item xs={4} sm={4} md={4}>
      <div className="cardContainer">
        <h3 className="singleCardHeader">{props.name}</h3>
        {props.count && <b>{'Card count: ' + props.count}</b>}
        {displaySave && (
          <Button
            type="submit"
            size="large"
            color="success"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            + Add to Deck
          </Button>
        )}
        {displayRemove && (
          <RemoveCard
            name={props.name}
            cardCount={props.count}
            deckId={props.deckId}
          />
        )}
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{props.name}</Typography>
              <b>{'Colors: '}</b>
              <em>{props.colors}</em>. <br></br>
              <b>{'Types: '}</b>
              {props.type}. <br></br>
              <b>{'Cost: '}</b>
              <em>{props.manaCost}</em>. <br></br>
              {'Description: '}
              {props.description && props.description}
            </React.Fragment>
          }
        >
          <img
            src={
              props.imgUrl
                ? props.imgUrl
                : 'https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg'
            }
            alt=""
          />
        </HtmlTooltip>
        <br />

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Card {props.name} succesfully saved!
          </Alert>
        </Snackbar>
      </div>
    </Grid>
  );
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function mapStateToProps(state) {
  return {
    errors: state.errors,
    cards: state.cards
  };
}

export default connect(mapStateToProps, { saveCardsToDeck, fetchCards })(
  SingleCardDisplay
);
