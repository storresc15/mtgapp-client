import React, { Component } from 'react';
import SingleCardDisplay from './SingleCardDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class CardSearch extends Component {
  state = {
    searchValue: '',
    deckId: '',
    card: null,
    cards: null
  };

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = (searchInput) => {
    var searchUrl = `/api/cards/search/${searchInput}`;
    fetch(searchUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((data) => data.json())
      .then((cards) => this.setState({ cards: cards }))
      .catch(function (error) {
        console.log('Fetch error: ' + error.message);
      });
  };

  render() {
    //let deckIdst = this.state.deckId;
    //console.log(deckIdst);
    return (
      <div id="main">
        <h1>Search Card to add to your Deck!</h1>
        {/*<input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />*/}
        <TextField
          label="Search"
          defaultValue="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        {/*<button onClick={this.handleSearch}>Search</button> */}
        <Button
          onClick={this.handleSearch}
          size="large"
          color="primary"
          variant="contained"
        >
          Search
        </Button>
        <br></br>
        <br></br>
        <br></br>
        {this.state.cards ? (
          <div id="cards-container">
            <Container maxWidth="md">
              <Grid container spacing={4}>
                {this.state.cards.map((card, index) => (
                  <div key={index}>
                    <SingleCardDisplay
                      name={card.name}
                      colors={card.colors}
                      type={card.type}
                      imgUrl={card.imgUrl}
                      mid={card.id}
                      deckId={this.props.deckId}
                      description={card.description}
                      supertypes={card.supertypes}
                      types={card.types}
                      rarity={card.rarity}
                      manaCost={card.manaCost}
                      displaySave={this.props.deckId}
                    />
                  </div>
                ))}
              </Grid>
            </Container>
          </div>
        ) : (
          <p>Try searching for a card</p>
        )}
      </div>
    );
  }
}

export default CardSearch;
