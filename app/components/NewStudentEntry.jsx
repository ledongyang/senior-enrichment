import React from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, postStudent, validateEmail, validateName } from '../reducers/students';

function NewStudentEntry (props) {
  // console.log(props)
  return (
    <div className="container">
      <form onSubmit={props.handleSubmit}>
        {
          props.invalidName ? <div name="name-warning" className="alert alert-warning" role="alert">Please Enter a Student Name!</div> : <div></div>
        }
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input  onChange={props.handleNameChange} value={props.newStudent.name} className="form-control" type="text" name="studentName" placeholder="Enter student name" />
        </div>
        {
          props.invalidEmail ? <div name="email-warning" className="alert alert-warning" role="alert">Please Enter a Email!</div> : <div></div>
        }
        <div className="form-group">
          <label htmlFor="studentEmail">Student Email</label>
          <input  onChange={props.handleEmailChange} value={props.newStudent.email} className="form-control" type="text" name="studentEmail" placeholder="Enter student email" />
        </div>
          {
            !props.match.params.id &&
            <div className="form-group">
              <label htmlFor="campusSelection">Select a campus:</label>
              <select className="form-control" name="campusSelection">
                {
                  props.campuses.map(campus => {
                    return (
                      <option value={campus.id} key={campus.id}>{campus.name}</option>
                    )
                  })
                }
              </select>
            </div>
          }
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Add Student</button>
        </div>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    newStudent: state.studentReducer.newStudent,
    campuses: state.campusReducer.campuses,
    invalidName: state.studentReducer.invalidName,
    invalidEmail: state.studentReducer.invalidEmail
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
      const campusId = ownProps.match.params.id || e.target.campusSelection.value;
      e.preventDefault();
      if (!name.length) {
        dispatch(validateName(true));
        return;
      }
      if (!email.length) {
        dispatch(validateEmail(true));
        dispatch(validateName(false));
        return;
      }
      dispatch(validateName(false));
      dispatch(validateEmail(false));
      dispatch(postStudent({name, email, campusId}, ownProps.history));
      dispatch(writeStudentName(''));
      dispatch(writeStudentEmail(''));
    }
  }
}

const newStudentContainer = connect(mapState, mapDispatch)(NewStudentEntry);
export default newStudentContainer;
