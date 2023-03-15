import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ReviewMain = ({
  user,
  description
}) => {
  return (
    <>
    <Grid item={true} xs={12} sm={12} md={6}>
      <Card sx={{ maxWidth: 845 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://legendary-digital-network-assets.s3.amazonaws.com/geekandsundry/wp-content/uploads/2018/06/Island-MtG-Art.jpg"
          alt="rev"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {user}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    </>
  );
};
export default ReviewMain;
