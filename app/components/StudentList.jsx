import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteStudent, searchStudent } from '../reducers/students'

function StudentList (props) {
  let students, campuses = [];
  students = props.matchStudents.length > 0 ?  props.matchStudents : props.students;
  if (props.match.params.id) {
    students = students.filter(student => +student.campusId === +props.match.params.id);
    campuses = props.campuses.filter(campus => +campus.id === +props.match.params.id);
  }
  return (
    <div>
      { campuses[0] && <h1>{campuses[0].name} Campus</h1>}
      <label htmlFor="search-bar">search a student:</label>
      <input onChange={props.handleChange} name="search-bar" type="text" />
      <ul>
        {
          students.map(student => {
            return (
              <li key={student.id}>
                <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                {
                  !campuses[0] && <div> campus: <NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink>
                  </div>
                }
                ----<button value={student.id} onClick={props.removeStudent}>x</button>
              </li>
            )
          })
        }
      </ul>
      {
        props.match.params.id ? <NavLink to={`/campuses/${props.match.params.id}/new-student`}>Add a student</NavLink> : <NavLink to={`/new-student`}>Add a student</NavLink>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    campuses: state.campusReducer.campuses,
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
