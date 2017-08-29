import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function AllStudentList (props) {
  const students = props.students;
  return (
    <div>
      <ul>
        {
          students.map(student => {
            return (
              <li key={student.id}>
                <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                ---->
                <NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students
  }
}

const AllStudentListContainer = connect(mapStateToProps)(AllStudentList);
export default AllStudentListContainer;
