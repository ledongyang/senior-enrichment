import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteCampus, searchCampus } from '../reducers/campuses';

function CampusList (props) {
  const campuses = props.matchCampuses.length > 0 ? props.matchCampuses : props.campuses;
  return (
    <div>
      <label htmlFor="search-bar">search a campus:</label>
      <input onChange={props.handleChange} name="search-bar" type="text" />
      <ul>
        {
          campuses.map(campus => {
            return (
              <li key = {campus.id}>
                <NavLink to={`/campuses/${campus.id}`}>
                  {campus.name}
                </NavLink>----
                <button value={campus.id} onClick={props.removeCampus}>x</button>
              </li>
            )
          })
        }
      </ul>
      <NavLink to="/new-campus">Create a campus</NavLink>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campusReducer.campuses,
    matchCampuses: state.campusReducer.matchCampuses
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeCampus: (e) => {
      // console.log(e.target.value)
      const campusId = e.target.value;
      dispatch(deleteCampus(campusId));
    },
    handleChange: (e) => {
      // console.log(e.target.value);
      const campusName = e.target.value;
      dispatch(searchCampus(campusName));
    }
  }
}

const CampusListContainer = connect(mapStateToProps, mapDispatch)(CampusList);
export default CampusListContainer;
