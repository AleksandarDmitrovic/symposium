import { useEffect, useState } from 'react';

import axios from 'axios';

export default function TopNav(props) {

  const [creator, setCreator] = useState('');

  useEffect(() => {
    // axios.get(`/${props.crerator_id}`)
    axios.get('/api/users/1')
    .then(res => {
      setCreator(res.data.user[0].username);
    })
    .catch(err => console.log('Error: ', err));
  }, []);

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
        <h5 class="navbar-brand mx-auto">{creator}'s Room</h5>
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