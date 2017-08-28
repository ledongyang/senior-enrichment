import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar () {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li role="presentation" className="active" ><NavLink to="/campuses" activeClassName="active">Campuses</NavLink></li>
        <li role="presentation"><NavLink to="/students" activeClassName="active">Students</NavLink></li>
      </ul>
    </div>
  )
}
