import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const SingleDeckDisplay = ({
  deckId,
  date,
  name,
  description,
  username,
  isCommunity
}) => {
  const strId = deckId; //JSON.stringify(deckId);
  return (
    <>
      <Grid item={true} xs={12} sm={6} md={4}>
        <div className="deckContainer">
          <h2>{name}</h2>
          <Link
            to={{
              pathname: '/viewdeck/' + strId,
              state: {
                deckId: strId,
                owner: username,
                name: name,
                description: description,
                date: date,
                isCommunity: isCommunity
              }
            }}
          >
            <img
              src="https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/making/mr224_back.jpg"
              alt={deckId}
              heigth="150"
              width="150"
            ></img>
          </Link>
          <br></br>
          <br></br>
          Created date: {date}
          <p>Description: {description}</p>
          <p>Owner: {username}</p>
        </div>
      </Grid>
    </>
  );
};
export default SingleDeckDisplay;
