import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

const initialState = {
  students: []
}

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

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

export default function studentReducer (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    default:
      return state;
  }
}
