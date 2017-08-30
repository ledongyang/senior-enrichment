import React from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, postStudent } from '../reducers/students';

function NewStudentEntry (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Add a Student</label>
        <input  onChange={props.handleNameChange} value={props.newStudent.name} className="form-control" type="text" name="studentName" placeholder="Enter student name" />
        <input  onChange={props.handleEmailChange} value={props.newStudent.email} className="form-control" type="text" name="studentEmail" placeholder="Enter student email" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Add Student</button>
      </div>
    </form>
  )
}

const mapState = (state) => {
  return {
    newStudent: state.studentReducer.newStudent
  }
}

const mapDispatch = (dispatch, ownProps) => {
  // console.log('ownProps------>', ownProps)
  return {
    handleNameChange: (e) => {
      dispatch(writeStudentName(e.target.value))
    },
    handleEmailChange: (e) => {
      dispatch(writeStudentEmail(e.target.value))
    },
    handleSubmit: (e) => {
      const name = e.target.studentName.value;
      const email = e.target.studentEmail.value;
      const campusId = ownProps.match.params.id;
      e.preventDefault();
      dispatch(postStudent({name, email, campusId}, ownProps.history))
    }
  }
}

const newStudentContainer = connect(mapState, mapDispatch)(NewStudentEntry);
export default newStudentContainer;
