import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function StudentList (props) {
  const students = props.students.filter(student => +student.campusId === +props.match.params.id);
  if (students.length <= 0) {
    return <div></div>
  } else {
    const campus = students[0].campus;
    return (
      <div>
        <h1>{campus.name} Campus</h1>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students
  }
}

const StudentListContainer = connect(mapStateToProps)(StudentList);
export default StudentListContainer;
