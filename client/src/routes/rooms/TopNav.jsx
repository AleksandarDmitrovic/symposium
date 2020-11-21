import React from 'react';

export default function TopNav(props) {

  // Will need creator's username as props

  return (
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="/">Back</a>
          <h4 class='nav-item'>Conversation Room</h4>
          <h4 class='nav-item'>Timer</h4>
        </div>
      </div>
    </nav>
  );
}