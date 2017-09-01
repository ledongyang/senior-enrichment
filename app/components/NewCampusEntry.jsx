import React from 'react';
import { connect } from 'react-redux';
import { writeCampusName, writeCampusImage, postCampus, validateForm } from '../reducers/campuses';

function NewCampusEntry (props) {
  // console.log('validate', props.invalidForm);
  return (
    <div className="container">
      {
        props.invalidForm ? <div name="name-warning" className="alert alert-warning" role="alert">Please Enter a Campus Name!</div> : <div></div>
      }
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="campusName">Campus Name</label>
          <input  onChange={props.handleNameChange} value={props.newCampus.name} className="form-control" type="text" name="campusName" placeholder="Enter campus name" />
        </div>
        <div className="form-group">
          <label htmlFor="campusImage">Campus Image</label>
          <input  onChange={props.handleImageChange} value={props.newCampus.image} className="form-control" type="text" name="campusImage" placeholder="Enter campus image url" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Create Campus</button>
        </div>
      </form>
    </div>
  )
}

const mapState = (state) => {
  // console.log(state)
  return {
    newCampus: state.campusReducer.newCampus,
    invalidForm: state.campusReducer.invalidForm
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
      e.preventDefault();
      if (!campusImage.length) {
        campusImage = 'http://www.guiageo-americas.com/mapas/mapa/americas-nasa.jpg';
      }
      if (!campusName.length) {
        // console.log('please enter a campus name')
        dispatch(validateForm(true))
        return;
      }
      dispatch(validateForm(false));
      dispatch(postCampus({name: campusName, image: campusImage}, ownProps.history));
      dispatch(writeCampusName(''));
      dispatch(writeCampusImage(''));
    }
  }
}

const newCampusContainer = connect(mapState, mapDispatch)(NewCampusEntry);
export default newCampusContainer;
