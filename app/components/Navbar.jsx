import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar () {
  return (
    <div>

      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink to="/" className="navbar-brand">Galaxy Academy</NavLink>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><NavLink to="/campuses">Campuses <span className="sr-only">(current)</span></NavLink></li>
              <li><NavLink to="/students">Students</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
