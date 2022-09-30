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
import Checkbox from '@mui/material/Checkbox';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createDeck } from '../store/actions/decks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 570,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2
};

const NewDeck = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [checked, setChecked] = useState(true);
  const [format, setFormat] = useState('standard');

  const { createDeck } = props;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    //Information about Form
    //const fileInput = document.querySelector('input[type="file"]').files[0] ;
    const formData = new FormData();
    //formData.append('file', fileInput);
    formData.append('title', title);
    formData.append('body', description);
    formData.append('format', format);

    const data = {
      name: title,
      description: description,
      public: checked,
      format: format
    };

    createDeck(JSON.stringify(data))
      .then(() => {
        setIsSubmitting(false);
        handleClose();
      })
      .catch((error) => {
        console.log('We got an error');
        console.log(error);
        setIsSubmitting(false);
      });
  };

  //This is the flow steps variables
  const steps = [
    {
      label: 'Deck Format',
      description: 'Select your MTG deck format'
    },
    {
      label: 'Deck Details',
      description: 'Add information about your deck.'
    },
    {
      label: 'Share Deck?',
      description: 'Select if you wish your deck to be public or private.'
    }
  ];

  //Configuratiion of steps for flow
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        component="label"
        onClick={handleOpen}
      >
        Create Deck
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
            <form onSubmit={formSubmitHandler}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      {/* Selecting the deck format */}
                      {index == 0 && (
                        <>
                          <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                              Available Formats
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={format}
                              onChange={handleFormatChange}
                            >
                              <FormControlLabel
                                value="standard"
                                control={<Radio />}
                                label="Standard"
                              />
                              <FormControlLabel
                                value="modern"
                                control={<Radio />}
                                label="Modern"
                              />
                              <FormControlLabel
                                value="commander"
                                control={<Radio />}
                                label="Commander"
                              />
                            </RadioGroup>
                          </FormControl>
                        </>
                      )}

                      {/* Deck Main infromation */}
                      {index == 1 && (
                        <>
                          <div className="textFieldsInModal">
                            <br></br>
                            <TextField
                              required
                              id="outlined-required"
                              label="Title"
                              onChange={(e) => setTitle(e.target.value)}
                              value={title}
                            />
                            <br></br>
                            <TextField
                              id="standard-multiline-static"
                              label="Description"
                              multiline
                              rows={5}
                              variant="standard"
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                            />
                          </div>
                        </>
                      )}
                      {/* Deck Additional Information */}
                      {index == 2 && (
                        <>
                          <br></br>
                          <p>Public?</p>
                          <Checkbox
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          <br></br>
                        </>
                      )}

                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    size="large"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {' '}
                    Save{' '}
                  </Button>
                </Paper>
              )}
            </form>
            {isSubmitting && <CircularProgress />}
          </Box>

          {/*  	
          <Box sx={style}>
            {error && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success"></Alert>
              </Stack>
            )}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create Deck
            </Typography>
            <br></br>
            <form onSubmit={formSubmitHandler}>
              <div className="textFieldsInModal">
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <br></br>
              <br></br>
              <p>Public?</p>
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <br></br>
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
                  Save{' '}
                </Button>
                {// <Button onclick={setOpen(false)} size="large" color="secondary" variant="contained" > Cancel </Button> }
                <br></br>
              </div>
            </form>
            {isSubmitting && <CircularProgress />}
          </Box>
			*/}
        </Fade>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    errors: state.errors,
    myDecks: state.decks
  };
}

export default connect(mapStateToProps, { createDeck })(NewDeck);
