import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../store/actions/auth';

const Header = (props) => {
  const { currentUser } = props;
  const history = useHistory();
  /* Menu Content */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout();
    history.push({ pathname: '/' });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          {currentUser.isAuthenticated && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <Link
                to="/mydecks"
                style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}
              >
                <MenuItem onClick={handleClose}>My Decks</MenuItem>
              </Link>
              <Link
                to="/communitydecks"
                style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}
              >
                <MenuItem onClick={handleClose}>Community Decks</MenuItem>
              </Link>
              <Link
                to="/cardsearch"
                style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}
              >
                <MenuItem onClick={handleClose}>Search for Cards</MenuItem>
              </Link>
              <Link
                to="/news"
                style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}
              >
                <MenuItem onClick={handleClose}>News</MenuItem>
              </Link>
              <Link
                to="/myprofile"
                style={{
                  textDecoration: 'none',
                  color: '#000000'
                }}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
              </Link>
            </Menu>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MTG App
          </Typography>
          {currentUser.isAuthenticated && (
            <a onClick={handleLogout}>
              <Button color="error" variant="outlined">
                Logout
              </Button>
            </a>
          )}
          {!currentUser.isAuthenticated && (
            <div>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button color="success" variant="outlined">
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button color="success" variant="outlined">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(Header);
