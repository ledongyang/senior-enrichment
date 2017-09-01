import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Landing () {
  return (
    <section id="bg">
      <div id="bg-text">
        <h1>Galaxy Academy: Coding for a better universe</h1>
        <h3><NavLink to="/campuses">Learn More</NavLink></h3>
      </div>
      <img className="bg-image" src="./image/galaxy.jpg" />
    </section>
  )
}
