import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suMessage, setSuMessage] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onAuth } = props;
  const type = props.type;
  const history = useHistory();
  const buttonLabel = type === 'login' ? 'Login' : 'Sign up';
  let data = '';

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuMessage('');

    const genericErrorMessage = 'Incorrect Username or Password.';

    if (type === 'login') {
      data = JSON.stringify({ username: email, password });
    } else {
      data = JSON.stringify({
        username: email,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      });
    }
    //POC WITH REDUX
    onAuth(type, data)
      .then(() => {
        setIsSubmitting(false);
        setSuMessage('Success!');
        history.push({ pathname: '/' });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  return (
    <>
      {suMessage && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">{suMessage}</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      <h4>Welcome to the MTG App!!</h4>
      <div className="auth-form">
        <form onSubmit={formSubmitHandler} className="login">
          {type === 'signup' && (
            <>
              <div>
                <TextField
                  required
                  id="outline-first-name" //"outlined-required"
                  label="First Name"
                  //defaultValue="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <br />
              <div>
                <TextField
                  required
                  id="outline-last-name" //"outlined-required"
                  label="Last Name"
                  //defaultValue="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <br />
            </>
          )}
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <br />
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <br />
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            {buttonLabel}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
