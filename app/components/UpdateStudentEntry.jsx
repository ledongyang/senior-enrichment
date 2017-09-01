import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, validateEmail, validateName } from '../reducers/students';

function UpdateStudentEntry (props) {
  const studentId = props.match.params.id;
  const selectedStudent = props.students.find(student => +student.id === +studentId);
  if (!selectedStudent) {
    return (
      <div>404 Not Found Student to Update!</div>
    )
  } else {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          {
            props.invalidName ? <div name="name-warning" className="alert alert-warning" role="alert">Please Enter a Student Name!</div> : <div></div>
          }
          <input readOnly name="campusId" value={selectedStudent.campusId} type="hidden" />
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input defaultValue={selectedStudent.name}  className="form-control" type="text" name="studentName" placeholder="Enter student name" />
          </div>
          {
            props.invalidEmail ? <div name="email-warning" className="alert alert-warning" role="alert">Please Enter a Email!</div> : <div></div>
          }
          <div className="form-group">
            <label htmlFor="studentEmail">Student Email</label>
            <input defaultValue={selectedStudent.email} className="form-control" type="text" name="studentEmail" placeholder="Enter student email" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-warning">Update Student</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    students: state.studentReducer.students,
    newStudent: state.studentReducer.newStudent,
    invalidName: state.studentReducer.invalidName,
    invalidEmail: state.studentReducer.invalidEmail
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (e) => {
      const campusId = e.target.campusId.value;
      const name = e.target.studentName.value;
      const email = e.target.studentEmail.value;
      const updatedStudent = { name, email, campusId };
      e.preventDefault();
      console.log(name.length)
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
      dispatch(updateStudent(updatedStudent, ownProps.match.params.id, ownProps.history));
    }
  }
}

const UpdateStudentEntryContainer = connect(mapState, mapDispatch)(UpdateStudentEntry);
export default UpdateStudentEntryContainer;
