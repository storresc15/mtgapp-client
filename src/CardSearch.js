import React, { Component } from "react";
import SingleCardDisplay from './SingleCardDisplay';

class CardSearch extends Component {
  state = {
    searchValue: "",
	deckId: "613e6c983126ff0e80fe1feb",  
	card: null,
	cards: null  
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  handleSave = () => {
	//this.saveCardAPICall(cardSelected);
	console.log('Saving this card: ')  
  };

  makeApiCall = searchInput => {
    var searchUrl = `/cards/search/${searchInput}`;
    fetch(searchUrl)
      .then(data => data.json())
	  .then(cards => this.setState({cards:cards}))
	  .catch(function(error) {
           console.log('Fetch error: ' + error.message);
         });	
  };
//With the update to handle bulk card call, will need to refactor this inorder to get only the card selected instead of referencing the state card
  saveCardAPICall = cardToSave => {
	 var track = cardToSave; 
	 fetch(`/cards/add/${track.name}`)
      .then(data => console.log(data))
	  .catch(function(error) {
           console.log('Fetch error: ' + error.message);
         });
  };	

  render() {
	let deckIdst = this.state.deckId;
	  console.log(deckIdst);
    return (
      <div id="main">
        <h1>Try Searching Cards for this deck: {this.state.deckId}</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
		{this.state.cards ? (
          <div id="cards-container">
              {this.state.cards.map((card, index) => (
              <div key={index}>
			<SingleCardDisplay name={card.name} colors={card.colors} type={card.type} imgUrl={card.imgUrl} mid={card.id} deck={deckIdst}/>
              </div>
            ))}
          </div>
        ) : (
          <p>Try searching for a card</p>
        )}	
      </div>
    );
  }
}

export default CardSearch;