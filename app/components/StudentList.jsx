import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { writeStudentCampusId } from '../reducers/students'

function StudentList (props) {
  const students = props.students.filter(student => +student.campusId === +props.match.params.id);
  const campuses = props.campuses.filter(campus => +campus.id === +props.match.params.id);
  return (
    <div>
      { campuses[0] && <h1>{campuses[0].name} Campus</h1>}
      <ul>
        {
          students.map(student => {
            return (
              <li key={student.id}>
                <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
      <NavLink to={`/campuses/${props.match.params.id}/new-student`}>Add a student</NavLink>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    campuses: state.campusReducer.campuses
  }
}

// const mapDispatch = (dispatch, ownProps) => {
//   // console.log('ownProps---->', ownProps);
//   return {
//     addCampusIdToStudent: () => {
//       dispatch(writeStudentCampusId(ownProps.match.params.id))
//     }
//   }
// }

const StudentListContainer = connect(mapStateToProps)(StudentList);
export default StudentListContainer;
