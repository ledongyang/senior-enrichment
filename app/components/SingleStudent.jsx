import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function SingleStudent (props) {
  const student = props.students.filter(singleStudent => +singleStudent.id === +props.match.params.id)[0];
  if (!student) {
    return <div></div>
  } else {
    return (
      <div>
        <h1>Student Name: {student.name}</h1>
        <h1>Student Campus: <NavLink to={`/campuses/${student.campus.id}`}>{student.campus.name}</NavLink></h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students
  }
}

const SingleStudentContainer = connect(mapStateToProps)(SingleStudent);
export default SingleStudentContainer;
