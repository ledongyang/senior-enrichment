import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
// const WRITE_STUDENT_CAMPUSID = 'WRITE_STUDENT_CAMPUSID';

const initialState = {
  students: [],
  newStudent: {
    name: '',
    email: ''
  }
}

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function getStudent (student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

export function writeStudentName (studentName) {
  const action = { type: WRITE_STUDENT_NAME, studentName };
  return action;
}

export function writeStudentEmail (studentEmail) {
  const action = { type: WRITE_STUDENT_EMAIL, studentEmail };
  return action;
}

// export function writeStudentCampusId (campusId) {
//   const action = { type: WRITE_STUDENT_CAMPUSID, campusId };
//   return action;
// }

export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      const action = getStudents(students);
      dispatch(action);
    })
  }
}

export function postStudent (newStudent, history) {
  return function thunk (dispatch) {
    return axios.post('/api/students', newStudent)
    .then(res => res.data)
    .then(student => {
      const action = getStudent(student);
      dispatch(action);
      history.push(`/students/${student.id}`)
    })
  }
}

// export function fetchStudent (id) {
//   return function thunk (dispatch) {
//     return axios.get(`/api/students/${id}`)
//     .then(res => res.data)
//     .then(student => {
//       const action = getStudent(student);
//       dispatch(action);
//     })
//   }
// }

export default function studentReducer (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_STUDENT:
      return Object.assign({}, state, {students: [...state.students, action.student]});
    case WRITE_STUDENT_NAME:
      return Object.assign({}, state, {newStudent: {
        name: action.studentName,
        email: state.newStudent.email
      }});
    case WRITE_STUDENT_EMAIL:
      return Object.assign({}, state, {newStudent: {
        name: state.newStudent.name,
        email: action.studentEmail
      }});
      // case WRITE_STUDENT_CAMPUSID:
      //   return Object.assign({}, state, {newStudent: {
      //     name: state.newStudent.name,
      //     email: state.newStudent.email,
      //     campusId: action.campusId
      //   }});
    default:
      return state;
  }
}
