import { useEffect, useState } from 'react';

import axios from 'axios';

export default function TopNav(props) {



  const [creator, setCreator] = useState('');

  useEffect(() => {
    axios.get(`/api/users/${props.creatorID}`)
    .then(res => {
      setCreator(res.data.user[0].username);
    })
    .catch(err => console.log('Error: ', err));
  }, [props.creatorID]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-item nav-link active" href="/">Back</a>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <h5 className="navbar-brand mx-auto">{creator}'s Room</h5>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <h5 className='mr-sm-2'>Timer</h5>
          </li>
        </ul>
      </div>
    </nav>
  );
}