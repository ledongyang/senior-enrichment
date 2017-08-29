import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

const initialState = {
  students: [],
  newStudent: {
    name: '',
    email: '',
    campusId: ''
  }
}

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

// export function getStudent (student) {
//   const action = { type: GET_STUDENT, student };
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
    // case GET_STUDENT:
    //   return Object.assign({}, state, {student: action.student});
    default:
      return state;
  }
}
