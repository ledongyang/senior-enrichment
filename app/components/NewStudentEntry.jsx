import React from 'react';
import { connect } from 'react-redux';
import { writeStudentName, writeStudentEmail, postStudent } from '../reducers/students';

function NewStudentEntry (props) {
  console.log(props)
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Add a Student</label>
        <input  onChange={props.handleNameChange} value={props.newStudent.name} className="form-control" type="text" name="studentName" placeholder="Enter student name" />
        <input  onChange={props.handleEmailChange} value={props.newStudent.email} className="form-control" type="text" name="studentEmail" placeholder="Enter student email" />
        {
          !props.match.params.id &&
          <div>
            <label htmlFor="campusSelection">select a campus:</label>
            <select name="campusSelection">
              {
                props.campuses.map(campus => {
                  return (
                    <option value={campus.id} key={campus.id}>{campus.name}</option>
                  )
                })
              }
            </select>
          </div>
        }

      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Add Student</button>
      </div>
    </form>
  )
}

const mapState = (state) => {
  return {
    newStudent: state.studentReducer.newStudent,
    campuses: state.campusReducer.campuses
  }
}

const mapDispatch = (dispatch, ownProps) => {
  // console.log('ownProps------>', ownProps)
  return {
    handleNameChange: (e) => {
      dispatch(writeStudentName(e.target.value))
    },
    handleEmailChange: (e) => {
      dispatch(writeStudentEmail(e.target.value))
    },

    handleSubmit: (e) => {
      const name = e.target.studentName.value;
      const email = e.target.studentEmail.value;
      const campusId = ownProps.match.params.id || e.target.campusSelection.value;
      e.preventDefault();
      dispatch(postStudent({name, email, campusId}, ownProps.history))
    }
  }
}

const newStudentContainer = connect(mapState, mapDispatch)(NewStudentEntry);
export default newStudentContainer;
