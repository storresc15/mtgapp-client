import React from 'react';

const HomePage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div>
        <h1>Hello!</h1>
        <h4>Welcome to the MTG App!!</h4>
      </div>
    );
  }
  return (
    <div>
      <h1>You Made it!</h1>
      <h4>Welcome to the MTG App!!</h4>
    </div>
  );
};

export default HomePage;
