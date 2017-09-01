import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteStudent, searchStudent } from '../reducers/students'

function StudentList (props) {
  let students = props.matchStudents.length > 0 ?  props.matchStudents : props.students;
  let campusId = props.match.params.id;
  if (campusId) {
    students = students.filter(student => +student.campusId === +campusId);
  }
  return (
    <div className="container">
      <div className="form-group">
        <input className="form-control" onChange={props.handleChange} name="search-bar" type="text" placeholder="Search a student" />
      </div>
      {
        campusId ? <div className="form-group">
            <NavLink to={`/campuses/${campusId}/new-student`}><button className="btn btn-primary">Add a student</button></NavLink>
          </div> : <div className="form-group">
            <NavLink to={`/new-student`}><button className="btn btn-primary">Add a student</button></NavLink>
          </div>
      }
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            {
              !campusId && <th>Campus</th>
            }
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {
          students.map(student => {
            return (
              <tr key={student.id}>
                <td>
                  <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                </td>
                {
                  !campusId && <td>
                    <NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink>
                  </td>
                }
                <td>{student.email}</td>
                <td>
                  <button className="btn btn-danger" value={student.id} onClick={props.removeStudent}>X</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    // campuses: state.campusReducer.campuses,
    matchStudents: state.studentReducer.matchStudents
  }
}

const mapDispatch = (dispatch) => {
  // console.log('ownProps---->', ownProps);
  return {
    removeStudent: (e) => {
      // console.log('event--->', e.target.value);
      const studentId = e.target.value;
      // dispatch(writeStudentCampusId(ownProps.match.params.id))
      dispatch(deleteStudent(studentId));
    },
    handleChange: (e) => {
      const studentName = e.target.value;
      // console.log(studentName);
      dispatch(searchStudent(studentName));
    }
  }
}

const StudentListContainer = connect(mapStateToProps, mapDispatch)(StudentList);
export default StudentListContainer;
