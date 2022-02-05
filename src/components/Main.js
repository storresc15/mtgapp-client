import React, { useState } from "react";
import Login from "./Login";
import CardSearch from "./CardSearch";
import { BrowserRouter as Router,
		Route,
		Link,
		withRouter,
	   Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import HomePage from "./HomePage";
import MyDecks from "./MyDecks";
import DeckMain from './DeckMain';
import withAuth from '../hocs/withAuth';


const Main = props => {
  //const [currentTab, setCurrentTab] = useState("login")
	const { authUser, currentUser, errors } = props;
	
  return (
	<>
	<Route exact path="/" render={props => <HomePage currentUser={currentUser} {...props} />} />  
	<Route path="/login">  
	<Login errors={errors} onAuth={authUser}></Login>
	</Route>
		
	<Route path="/signup">  
	<p>This should be the signup route</p>
	</Route>		
		
	<Route path="/mydecks">  
	<MyDecks></MyDecks>
	</Route>
	
	<Route path="/communitydecks">  
	<p>Route for searching other people decks</p>
	</Route>
		
	<Route path="/cardsearch">  
	<CardSearch></CardSearch>
	</Route>	
		
	<Route path="/news">  
	<p>The Route for news</p>
	</Route>
		
	<Route path="/myprofile">  
	<p>The route for profile</p>
	</Route>		
	
	
	<Route path="/viewdeck/:id" component={withAuth(DeckMain)}>  
		  {/*<p>The route for a single deck to be displayed</p>
	<DeckMain></DeckMain>	 */} 
	</Route>		
	</>	  
  )
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));