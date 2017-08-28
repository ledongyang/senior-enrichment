import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function CampusList (props) {
  return (
    <ul>
      {
        props.campuses.map(campus => {
          return (
            <li key = {campus.id}>
              <NavLink to={`/campuses/${campus.id}`}>
                {campus.name}
              </NavLink>
            </li>
          )
        })
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campusReducer.campuses
  }
}

const CampusListContainer = connect(mapStateToProps)(CampusList);
export default CampusListContainer;
