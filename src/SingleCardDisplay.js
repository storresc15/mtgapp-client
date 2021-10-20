import React, { Component } from "react";

class SingleCardDisplay extends Component {

  handleSave = () => {
	this.saveCardAPICall();
	console.log('Saving this card: ' + this.props.name);  
  };

//With the update to handle bulk card call, will need to refactor this inorder to get only the card selected instead of referencing the state card
  saveCardAPICall = () => {
	 //var track = cardToSave; 

	 fetch(`/decks/${this.props.deck}/cards`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"multiverseid" : this.props.mid,
							"name" : this.props.name,
							"colors" : this.props.colors,
							"type" : this.props.type, 
							"image" : this.props.imgUrl})
  })
	.then(data => console.log(data))
	.catch(function(error) {
           console.log('Fetch error: ' + error.message);
         });  
  };	

  render() {
	//var track = this.state.card;  
    return (
    	<div className = "cardContainer">
                <h2>{this.props.name}</h2>
				<p>MTG Multiverse ID: {this.props.mid}</p>
				<h3>{this.props.colors}</h3>
				<p>{this.props.type}</p>
			<p>The deck: {this.props.deck}</p>
				<br/>			
                <img src={this.props.imgUrl ? this.props.imgUrl : "https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg"} alt=""/>
				<br/>
				<br/>  
			<button onClick={this.handleSave}>Save to Deck</button>
			<hr/>

		</div>
    );
  }
}

export default SingleCardDisplay;