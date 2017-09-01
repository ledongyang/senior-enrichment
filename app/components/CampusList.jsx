import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteCampus, searchCampus } from '../reducers/campuses';

function CampusList (props) {
  const campuses = props.matchCampuses.length > 0 ? props.matchCampuses : props.campuses;
  const divStyle = {
    backgroundImage: `url('/image/galaxy.jpg')`
  }
  return (
    <div>
      <div className="jumbotron" style={divStyle}>
        <h1>Welcome to Galaxy Academy</h1>
        <p>The Best Bootcamp in The Universe</p>
      </div>
      <div className="container">
        <div className="form-group">
          <input className="form-control" onChange={props.handleChange} name="search-bar" type="text" placeholder="Search a campus" />
        </div>
        <div className="form-group">
          <NavLink to="/new-campus"><button className="btn btn-primary">Create a campus</button></NavLink>
        </div>
        <div className="row">
        {
          campuses.map(campus => {
            return (
              <div key = {campus.id} className="col-xs-6 col-md-4">
                <div className="thumbnail">
                  <NavLink to={`/campuses/${campus.id}`}>
                    <img src={campus.image} alt="campus-image" />
                  </NavLink>
                  <div className="caption">
                    <NavLink to={`/campuses/${campus.id}`}>
                      <h1>{campus.name}</h1>
                    </NavLink>
                    <button className="btn btn-danger" value={campus.id} onClick={props.removeCampus}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
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
