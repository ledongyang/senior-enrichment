import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateStudent } from '../reducers/students';

function SingleStudent (props) {
  const student = props.students.filter(singleStudent => +singleStudent.id === +props.match.params.id)[0];
  if (!student) {
    return <div></div>
  } else {
    const campuses = props.campuses.filter(campus => +campus.id !== +student.campusId)
    return (
      <div>
        <h1>Student Name: {student.name}</h1>
        <h1>Student Campus: <NavLink to={`/campuses/${student.campusId}`}>{student.campus.name}</NavLink></h1>
        <form onSubmit={props.handleSubmit}>
          <label htmlFor="campusSelection">switch to another campus:</label>
          <input readOnly name="studentName" value={student.name} type="hidden" />
          <input  readOnly name="studentEmail" value={student.email} type="hidden" />
          <select name="campusSelection">
            {
              campuses.map(campus => {
                return (
                  <option value={campus.id} key={campus.id}>{campus.name}</option>
                )
              })
            }
          </select>
          <button type="submit">switch</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    campuses: state.campusReducer.campuses
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: (e) => {
      const campusId = e.target.campusSelection.value;
      const name = e.target.studentName.value;
      const email = e.target.studentEmail.value;
      const updatedStudent = { name, email, campusId };
      e.preventDefault();
      dispatch(updateStudent(updatedStudent, ownProps.match.params.id));
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatch)(SingleStudent);
export default SingleStudentContainer;
