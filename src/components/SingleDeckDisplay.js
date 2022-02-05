import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';


const SingleDeckDisplay = ({deckId, date, name, description, username}) => {
	const strId = JSON.stringify(deckId);
return (
	<>
	<Grid item={true}  xs={12} sm={6} md={4} >	
	<div className = "cardContainer">
		<h2>{name}</h2>
		<Link to={{
				pathname: "/viewdeck/" + {strId},
				state: {
					deckId: strId,
					owner: username,
					name: name,
					description: description,
					date: date
				}
				}} >
		<img src="https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg" alt={deckId} heigth="100" width="100"></img>
		</Link>		
	<br></br>	
	Created date:  
	<Moment format="Do MM YYYY">
	 {date}	
	</Moment>
	<p>Description: {description}</p>
	<p>Owner: {username}</p>
	<p>Deck Id: {deckId}</p>	
	</div>
	</Grid>
	</>
);
}
export default SingleDeckDisplay;