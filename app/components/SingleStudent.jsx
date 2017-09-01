import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateStudent } from '../reducers/students';

function SingleStudent (props) {
  const student = props.students.filter(singleStudent => +singleStudent.id === +props.match.params.id)[0];
  if (!student) {
    return <div>404 Not Found Student!</div>
  } else {
    const campuses = props.campuses.filter(campus => +campus.id !== +student.campusId)
    return (
      <div className="container">
        <div className="col-md-6 col-xs-12">
          <div className="thumbnail">
            <img src={student.campus.image} />
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <h1>Name: {student.name}</h1>
          <h1>Email: {student.email}</h1>
          <NavLink to={`/students/${student.id}/update`}><button className="btn btn-warning">Update Profile</button></NavLink>
          <h1>Campus: <NavLink to={`/campuses/${student.campusId}`}>{student.campus.name}</NavLink></h1>
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label htmlFor="campusSelection">Switch to another campus:</label>
              <select className="form-control" name="campusSelection">
                {
                  campuses.map(campus => {
                    return (
                      <option value={campus.id} key={campus.id}>{campus.name}</option>
                    )
                  })
                }
              </select>
              <input readOnly name="studentName" value={student.name} type="hidden" />
              <input  readOnly name="studentEmail" value={student.email} type="hidden" />
            </div>
            <div className="form-group">
              <button className="btn btn-warning" type="submit">Switch</button>
            </div>
          </form>
        </div>
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
      dispatch(updateStudent(updatedStudent, ownProps.match.params.id, ownProps.history));
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatch)(SingleStudent);
export default SingleStudentContainer;
