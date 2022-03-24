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
import CommunityDecks from "./CommunityDecks";
import DeckMain from './DeckMain';
import withAuth from '../hocs/withAuth';


const Main = props => {
  //const [currentTab, setCurrentTab] = useState("login")
	const { authUser, currentUser, errors } = props;
	
  return (
	<>
	<Route exact path="/" render={props => <HomePage currentUser={currentUser} {...props} />} />  
	<Route path="/login">  
	<Login errors={errors} onAuth={authUser} type={"login"}></Login>
	</Route>
		
	<Route path="/signup">  
	<Login errors={errors} onAuth={authUser} type={"signup"}></Login>
	</Route>		
		
	<Route path="/mydecks" component={withAuth(MyDecks)}>  
		  { /*<MyDecks></MyDecks>*/ }
	</Route>
	
	<Route path="/communitydecks" component={withAuth(CommunityDecks)}>  
		  {/*<CommunityDecks></CommunityDecks> */}
		  
	</Route>
		
	<Route path="/cardsearch" component={withAuth(CardSearch)}>  
		  {/*<CardSearch></CardSearch>*/}
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