import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import jwtDecode from 'jwt-decode';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tampering with the key of jwtToken in localStorage --
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <React.Fragment>
            <div className="App">
              <Header></Header>
              <Main></Main>
            </div>
          </React.Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
