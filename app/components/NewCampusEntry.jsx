import React from 'react';
import { connect } from 'react-redux';
import { writeCampusName, writeCampusImage, postCampus } from '../reducers/campuses';

function NewCampusEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Campus</label>
        <input  onChange={props.handleNameChange} value={props.newCampus.name} className="form-control" type="text" name="campusName" placeholder="Enter campus name" />
        <input  onChange={props.handleImageChange} value={props.newCampus.image} className="form-control" type="text" name="campusImage" placeholder="Enter campus image url" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Campus</button>
      </div>
    </form>
  )
}

const mapState = (state) => {
  console.log(state)
  return {
    newCampus: state.campusReducer.newCampus
  }
}

const mapDispatch = (dispatch, ownProps) => {

  return {
    handleNameChange: (e) => {
      dispatch(writeCampusName(e.target.value))
    },
    handleImageChange: (e) => {
      dispatch(writeCampusImage(e.target.value))
    },
    handleSubmit: (e) => {
      const campusName = e.target.campusName.value;
      let campusImage = e.target.campusImage.value;
      if (!campusImage.length) {
        campusImage = 'http://www.guiageo-americas.com/mapas/mapa/americas-nasa.jpg';
      }
      e.preventDefault();
      dispatch(postCampus({name: campusName, image: campusImage}, ownProps.history))
    }
  }
}

const newCampusContainer = connect(mapState, mapDispatch)(NewCampusEntry);
export default newCampusContainer;
