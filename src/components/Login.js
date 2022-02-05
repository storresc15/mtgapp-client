import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useContext, useState } from "react"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext"

const Login = (props) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [suMessage, setSuMessage] = useState("")
	const [error, setError] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userContext, setUserContext] = useContext(UserContext)
	
	const { onAuth } = props;
	const history = useHistory();
	
	const formSubmitHandler = e => {
	console.log('The form is actually submited?')	
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
	setSuMessage("")

    const genericErrorMessage = "Incorrect Username or Password."
	const data = JSON.stringify({ username: email, password })
	//POC WITH REDUX
	onAuth('login', data)
		.then(() => {
		setIsSubmitting(false);
		console.log("Logged In succesfully!!");
		console.log(localStorage.getItem("jwtToken"));
		setSuMessage("Success!")
		history.push({ pathname:  "/" });
	}).catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
/*
    fetch('/users/login', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async response => {
        setIsSubmitting(false)
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!")
          } else if (response.status === 401) {
            setError("Invalid email and password combination.")
          } else {
            setError(genericErrorMessage)
          }
        } else {
          const data = await response.json()
		  //remove the following token console
		  //console.log('The login was succesfull!!')
		  //console.log('The token: ' + data.token);
			setSuMessage("Success!")
          setUserContext(oldValues => {
            return { ...oldValues, token: data.token }
          })
        }
      })
      .catch(error => {
        setIsSubmitting(false)
        setError(genericErrorMessage)
      })
		*/
  }

  return (
    <>
	  {suMessage && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{suMessage}</Alert>
	  </Stack> }
	 {error && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
	  </Stack> }

	<h4>Welcome to the MTG App!!</h4>
	  <div className="auth-form">
      <form onSubmit={formSubmitHandler} className="login">
        <div>
          <TextField
			  required
			  id="outlined-required"
			  label="Email"
			  defaultValue="Email"
			  onChange={e => setEmail(e.target.value)}
			  value={email}
			/>
        </div>
		  <br/>
        <div>
           <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
		  onChange={e => setPassword(e.target.value)}
	      value={password}	   
        />
        </div>
		  <br/>
       <Button type="submit" size="large" color="primary" variant="contained" disabled={isSubmitting}>Login</Button>
      </form>
	</div>	  
    </>
  )
}

export default Login