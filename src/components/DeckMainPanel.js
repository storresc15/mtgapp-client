import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Moment from 'react-moment';
import SingleCardDisplay from './SingleCardDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardSearch from './CardSearch';
import UpdateDeck from './UpdateDeck';
import RemoveDeck from './RemoveDeck';
import DownloadDeckAsCSV from './DownloadDeckAsCSV';
import ReviewMain from './ReviewMain';

export default function DeckMainPanel(props) {
  const [value, setValue] = React.useState('1');
  const cards = props.cards;
  const sideDecks = props.sideDecks;
  const reviews = props.reviews;
  const { deckId, owner, name, description, date, isCommunity } = props;
  const displayRemoveCards = isCommunity ? false : true;
  const handleChange = (event, newValue) => {
    //testing deckid
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Deck Details" value="1" />
            <Tab label="Cards" value="2" />
            {!isCommunity && <Tab label="Add Cards" value="3" />}
            <Tab label="Deck Reviews" value="4" />
            <Tab label="Side Deck" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="deckDetails">
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Owner:</strong> {owner}</p>
          <p><strong>Deck Id:</strong> {deckId}</p>
          <p><strong>Created date: </strong>
          <Moment format="MMMM Do, YYYY">{date}</Moment></p>
          
          <br></br>
          {!isCommunity && (
            <>
              <DownloadDeckAsCSV 
              data = {cards}
              fileName = {name}>
              </DownloadDeckAsCSV>
              <br></br>
              <UpdateDeck
                name={name}
                description={description}
                deckId={deckId}
              ></UpdateDeck>
              <br></br>
              <RemoveDeck name={name} deckId={deckId}></RemoveDeck>
            </>
          )}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <h1>Cards: </h1>
          {/* cards && <p>Cards are contained</p> */}
          <br></br>
          <Container maxWidth="md">
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 16 }} >
              {cards.map((m) => (
                <SingleCardDisplay
                  key={m.name}
                  name={m.name}
                  colors={m.colors}
                  type={m.type}
                  imgUrl={m.image}
                  mid={m.multiverseid}
                  description={m.description}
                  supertypes={m.supertypes}
                  types={m.types}
                  rarity={m.rarity}
                  manaCost={m.manaCost}
                  count={m.count}
                  deckId={deckId}
                  displayRemove={displayRemoveCards}
                />
              ))}
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel value="3">
          <CardSearch deckId={deckId}></CardSearch>
        </TabPanel>
        <TabPanel value="4">
          <h1>Reviews</h1>
          <Container maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p>Add Review</p>
          </Grid>
          {/*isSubmitting && <CircularProgress />*/}
          {reviews.map((m) => (
            <ReviewMain
              key={m._id}
              user={m.user.firstName}
              description={m.body}
            />
          ))}
        </Grid>
      </Container>
        </TabPanel>
        <TabPanel value="5">
          <p>For Side Deck</p>
          {sideDecks.size > 0 && <p>Contains decks</p>}
          {sideDecks <= 0 && <p>This deck does not contain any side decks</p>}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
