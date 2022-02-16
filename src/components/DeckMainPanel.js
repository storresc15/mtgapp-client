import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Moment from "react-moment";
import SingleCardDisplay from './SingleCardDisplay';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardSearch from './CardSearch';

export default function DeckMainPanel(props) {
	const [value, setValue] = React.useState('1');
	const cards = props.cards;
	const { deckId, owner, name, description, date } = props;
	
  const handleChange = (event, newValue) => {
	  //testing deckid
	  console.log('The deck id from deckmainpanel: '+ deckId);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Deck Details" value="1" />
            <Tab label="Cards" value="2" />
            <Tab label="Add Cards" value="3" />
			<Tab label="Deck Reviews" value="4" />  
          </TabList>
        </Box>
        <TabPanel value="1">
			<p>Description: {description}</p>
			<p>Owner: {owner}</p>
			<p>Deck Id: {deckId}</p>
			Created date:  
			<Moment format="Do MM YYYY">
			 {date}	
			</Moment>
		</TabPanel>
        <TabPanel value="2">
			<h3>Cards: </h3>
			{ cards && <p>Cards are contained</p> }
			<br></br>
			<Container maxWidth="md">
          <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
			  { cards.map(m => (	
				<SingleCardDisplay name={m.name} colors={m.colors} type={m.type} imgUrl={m.image} mid={m.multiverseid} deckId={deckId}/>
			)) }
          </Grid>
        </Container>
		</TabPanel>
        <TabPanel value="3">
		  <CardSearch deckId={deckId}></CardSearch>
		 </TabPanel>
		 <TabPanel value="4">
		  <p>For Reviews</p>
		 </TabPanel> 
      </TabContext>
    </Box>
  );
}