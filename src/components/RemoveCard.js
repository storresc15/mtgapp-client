import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { removeCardFromDeck } from '../store/actions/cards';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 310,
  bgcolor: 'background.paper',
  border: '2px solid #FF0000',
  boxShadow: 24,
  p: 2
};

const RemoveCard = (props) => {
  const deckId = props.deckId;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(1);
  const name = props.name;
  const inputProps = {
    max: props.cardCount,
    min: 1
  };

  const { removeCardFromDeck } = props;

  //const history = useHistory();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    //Information about Form
    //const fileInput = document.querySelector('input[type="file"]').files[0] ;
    const formData = new FormData();

    //formData.append('file', fileInput);
    formData.append('name', name);
    formData.append('count', count);

    const data = {
      name: name,
      count: count
    };

    removeCardFromDeck(deckId, JSON.stringify(data))
      .then(() => {
        setIsSubmitting(false);
        handleClose();
        //history.push({ pathname:  "/mydecks" });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <Button
        size="small"
        component="label"
        onClick={handleOpen}
        variant="outlined"
        color="error"
      >
        Remove Card
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {error && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success"></Alert>
              </Stack>
            )}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Remove Card
            </Typography>
            <br></br>
            <form onSubmit={formSubmitHandler}>
              <div className="textFieldsInModal">
                <Typography variant="body1" gutterBottom>
                  You are removing {name}, please select how many cards to
                  remove from this deck.
                </Typography>
                <br></br>
                <TextField
                  type="number"
                  inputProps={inputProps}
                  label="Number"
                  size="medium"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <br></br>
              <div>
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {' '}
                  Confirm{' '}
                </Button>
                {/* <Button onclick={setOpen(false)} size="large" color="secondary" variant="contained" > Cancel </Button> */}
                <br></br>
              </div>
            </form>
            {isSubmitting && <CircularProgress />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    cards: state.cards
  };
}

export default connect(mapStateToProps, { removeCardFromDeck })(RemoveCard);
