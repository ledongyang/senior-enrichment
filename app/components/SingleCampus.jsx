import React from 'react';
import { connect } from 'react-redux';
import StudentList from './StudentList';

function SingleCampus (props) {
  const campusId = props.match.params.id;
  const campuses = props.campuses;
  const campus = campuses.find(singleCampus => +singleCampus.id === +campusId);
  if (!campus)
  {
    return <div>404 Not Found Campus!</div>
  } else {
    const divStyle = {
      backgroundImage: `url(${campus.image})`,
    };
    return (
      <div>
        <div className="jumbotron" style={divStyle}>
          <h1>Welcome to {campus.name} Campus</h1>
          <p>One of the best campuses in Galaxy Academy</p>
        </div>
        <div className="container">
        </div>
        <StudentList match={props.match}/>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    students: state.studentReducer.students,
    campuses: state.campusReducer.campuses,
    matchStudents: state.studentReducer.matchStudents
  }
}

const SingleCampusContainer = connect(mapState)(SingleCampus);
export default SingleCampusContainer;

