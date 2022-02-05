import React from "react";
import { BrowserRouter as Router,
		Route,
		Link,
		withRouter,
	   Redirect} from 'react-router-dom';

const HomePage = ({ currentUser }) => {
	if(!currentUser.isAuthenticated){
	return(
	<div>
		<h1>What's happening</h1>
		<h4>Welcome to the MTG App!!</h4>
	
	</div>
		);
}
	return (
	<div>
		<h1>You Made it!</h1>
		<h4>Welcome to the MTG App!!</h4>	
	</div>
	)
}

export default HomePage