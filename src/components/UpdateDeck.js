import React, { useState } from "react"
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router";
import { updateDeck } from "../store/actions/decks";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 470,	
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const UpdateDeck = props => {
	const previousTitle = props.name;
	const previousDescription = props.description;
	const deckId = props.deckId;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
  	const [title, setTitle] = useState(previousTitle)
  	const [description, setDescription] = useState(previousDescription)
	
	const [checked, setChecked] = React.useState(true);
	
	const { updateDeck } = props;
	
	const history = useHistory();
	
	const formSubmitHandler = e => {
		
	e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const genericErrorMessage = "Something went wrong! Please try again later."
	//Information about Form
	//const fileInput = document.querySelector('input[type="file"]').files[0] ;
	  const formData = new FormData();
	  
	  //formData.append('file', fileInput);
	  formData.append('title', title);
	  formData.append('body', description);
		
	const data = {
		name: title,
		description: description,
		public: checked
	}	
	  
	updateDeck(deckId, JSON.stringify(data))
		.then(() => {
		setIsSubmitting(false);
		handleClose();
		history.push({ pathname:  "/mydecks" });
	}).catch(error => {
		console.log("We got an error");
		setIsSubmitting(false);
	})

    
	  
  }

  return (
    <div>
      <Button size="large" variant="contained" component="label" onClick={handleOpen}>Update Deck</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
			  {error && <Stack sx={{ width: '100%' }} spacing={2}>
		  <Alert severity="success">
		  </Alert>
	  </Stack> }
            <Typography id="transition-modal-title" variant="h6" component="h2">
             Update Deck
            </Typography>
			<br></br>
            <form onSubmit={formSubmitHandler} >
			<div className="textFieldsInModal">	
          <TextField
          required
          id="outlined-required"
          label="Title"
		  onChange={e => setTitle(e.target.value)}
		  value={title}		  
        />
				<br></br>
				<br></br>
		<TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={5}
          variant="standard"
		  onChange={e => setDescription(e.target.value)}
		  value={description}		
        />
		</div>
		<br></br>
		<br></br>
		<p>Public?</p>
		<Checkbox
      checked={checked}
      onChange={e => setChecked(!checked)}
      inputProps={{ 'aria-label': 'controlled' }} />		
				<br></br>
				<br></br>
      <div>
		  <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}> Save </Button>
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
}

function mapStateToProps(state) {
	return {
		errors: state.errors,
		myDecks: state.decks
	};
}

export default connect(mapStateToProps, { updateDeck })(UpdateDeck);