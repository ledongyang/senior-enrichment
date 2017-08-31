import axios from 'axios';

// constants
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const REMOVE_STUDENTS = 'REMOVE_STUDENTS';
const SWITCH_STUDENT = 'SWITCH_STUDENT';
const SEARCH_STUDENT = 'SEARCH_STUDENT';

//initial state
const initialState = {
  students: [],
  matchStudents: [],
  newStudent: {
    name: '',
    email: ''
  }
}

//action creators
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

export function removeStudent (studentId) {
  const action = { type: REMOVE_STUDENT, studentId };
  return action;
}

export function removeStudents (campusId) {
  const action = { type: REMOVE_STUDENTS, campusId };
  return action;
}

export function switchStudent (updatedStudent) {
  const action = { type: SWITCH_STUDENT, updatedStudent };
  return action;
}

export function searchStudent (studentName) {
  const action = { type: SEARCH_STUDENT, studentName };
  return action;
}

//thunk creators
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
      return axios.get(`/api/students/${student.id}`)
      .then(res => res.data)
    })
    .then(foundStudent => {
      const action = getStudent(foundStudent);
      dispatch(action);
      history.push(`/students/${foundStudent.id}`)
    })
  }
}

export function deleteStudent (studentId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`)
    .then(() => {
      const action = removeStudent(studentId);
      dispatch(action);
    })

  }
}

export function updateStudent (updatedStudent, studentId) {
  return function thunk (dispatch) {
    return axios.put(`/api/students/${studentId}`, updatedStudent)
    .then(res => res.data)
    .then(student => {
      const action = switchStudent(student);
      dispatch(action);
    })
  }
}

//student reducer
export default function studentReducer (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, {students: action.students});
    case GET_STUDENT:
      return Object.assign({}, state, {students: [...state.students, action.student], matchStudents: []});
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
    case REMOVE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => +student.id !== +action.studentId)});
    case REMOVE_STUDENTS:
      return Object.assign({}, state, {students: state.students.filter(student => +student.campusId !== +action.campusId)});
    case SWITCH_STUDENT:
      return Object.assign({}, state, {students: state.students.map(student => {
        if (+student.id === action.updatedStudent.id) {
          return action.updatedStudent;
        } else {
          return student;
        }
      })})
    case SEARCH_STUDENT:
      return Object.assign({}, state, {matchStudents: state.students.filter(student => student.name.match(action.studentName) && action.studentName.length > 0)})
    default:
      return state;
  }
}
