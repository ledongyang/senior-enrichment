import React from 'react';
import { connect } from 'react-redux';

function StudentList (props) {
  return (
    <ul>
      {
        props.students.map(student => {
          return (
            <li key={student.id}>
              {student.name}
            </li>
          )
        })
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students
  }
}

const StudentListContainer = connect(mapStateToProps)(StudentList);
export default StudentListContainer;
