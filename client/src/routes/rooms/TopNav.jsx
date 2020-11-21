import React from 'react';

export default function TopNav(props) {

  // Will need creator's username as props

  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-item nav-link active" href="/">Back</a>
          </li>
        </ul>
      </div>
      <div class="mx-auto order-0">
        <h5 class="navbar-brand mx-auto">Conversation Room</h5>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <h5 class='mr-sm-2'>Timer</h5>
          </li>
        </ul>
      </div>
    </nav>
  );
}